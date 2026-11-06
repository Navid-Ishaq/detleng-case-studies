/** Lazy, single-threaded DuckDB-Wasm browser connection. No server-side SQL. */

// Pin both the ESM package and worker/wasm bundle to the same published release.
// Source: https://duckdb.org/docs/stable/clients/wasm/instantiation
const VERSION = "1.30.0";
const CDN_ROOT = `https://cdn.jsdelivr.net/npm/@duckdb/duckdb-wasm@${VERSION}`;
const DATA_ROOT = new URL("/proofsql/data/public/pilot/", window.location.origin);
const SQL_ROOT = new URL("/proofsql/queries/", window.location.origin);
const VALID_TABLES = new Set(["fact_sales", "fact_orders", "fact_delivery", "dim_products"]);

let connectionPromise;
let manifestPromise;
const loadedTables = new Set();

async function initialize() {
  const duckdb = await import(`${CDN_ROOT}/+esm`);
  const dist = `${CDN_ROOT}/dist/`;
  const bundle = await duckdb.selectBundle({
    mvp: {mainModule:`${dist}duckdb-mvp.wasm`, mainWorker:`${dist}duckdb-browser-mvp.worker.js`},
    eh: {mainModule:`${dist}duckdb-eh.wasm`, mainWorker:`${dist}duckdb-browser-eh.worker.js`},
  });
  if (!bundle?.mainWorker || !bundle?.mainModule) throw new Error("No compatible DuckDB-Wasm bundle found.");
  const workerURL = URL.createObjectURL(new Blob([
    `importScripts(${JSON.stringify(bundle.mainWorker)});`,
  ], {type:"text/javascript"}));
  const worker = new Worker(workerURL);
  const db = new duckdb.AsyncDuckDB(new duckdb.ConsoleLogger(), worker);
  try {
    await db.instantiate(bundle.mainModule, bundle.pthreadWorker);
    const conn = await db.connect();
    return {db, conn};
  } catch (error) {
    worker.terminate();
    throw error;
  } finally {
    URL.revokeObjectURL(workerURL);
  }
}

export function getConnection() {
  if (!connectionPromise) connectionPromise = initialize().catch(error => {
    connectionPromise = undefined;
    throw error;
  });
  return connectionPromise;
}

export async function fetchChecked(url, signal) {
  const response = await fetch(url, {cache:"no-store", signal});
  if (!response.ok) throw new Error(`Could not load ${new URL(url).pathname} (${response.status}).`);
  return response;
}

async function getManifest(signal) {
  if (!manifestPromise) manifestPromise = (async () => {
    const response = await fetchChecked(new URL("manifest.json", DATA_ROOT), signal);
    const data = await response.json();
    if (data.version !== "pilot-1" || !Array.isArray(data.files)) {
      throw new Error("Unexpected ProofSQL snapshot version.");
    }
    return data;
  })().catch(error => {
    manifestPromise = undefined;
    throw error;
  });
  return manifestPromise;
}

export async function sha256(bytes) {
  if (!globalThis.crypto?.subtle) throw new Error("Secure browser hashing is unavailable.");
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map(b => b.toString(16).padStart(2,"0")).join("").toUpperCase();
}

async function loadTable(tableName, manifest, signal, onProgress) {
  if (!VALID_TABLES.has(tableName)) throw new Error("SQL table not in pilot allowlist.");
  if (loadedTables.has(tableName)) return;
  onProgress?.(`Checking ${tableName} CSV integrity…`);
  const file = manifest.files.find(item => item.name === `${tableName}.csv`);
  if (!file?.sha256 || !Number.isSafeInteger(file.size_bytes)) {
    throw new Error(`CSV manifest entry missing for ${tableName}.`);
  }
  const res = await fetchChecked(new URL(file.name, DATA_ROOT), signal);
  const buffer = await res.arrayBuffer();
  if (buffer.byteLength !== file.size_bytes || (await sha256(buffer)) !== file.sha256.toUpperCase()) {
    throw new Error(`SHA-256 mismatch for ${file.name}. Snapshot data has changed.`);
  }
  const {db, conn} = await getConnection();
  // Identifiers can never come from untrusted visitor input.
  await db.registerFileBuffer(file.name, new Uint8Array(buffer));
  await conn.query(`CREATE OR REPLACE VIEW "${tableName}" AS SELECT * FROM read_csv_auto('${file.name}', header=true, all_varchar=true)`);
  loadedTables.add(tableName);
}

export function numberFromArrow(raw) {
  if (typeof raw === "number") return Number.isFinite(raw) ? raw : null;
  if (typeof raw === "bigint") return Number.isSafeInteger(Number(raw)) ? Number(raw) : null;
  if (typeof raw === "string" && raw.trim() !== "") {
    const parsed = Number(raw);
    return Number.isFinite(parsed) ? parsed : null;
  }
  if (raw != null && typeof raw.toString === "function") return numberFromArrow(raw.toString());
  return null;
}

export async function executeBrowserSQL(tool, definition, signal, onProgress) {
  if (!/^[a-z_]+$/.test(tool) || !definition || !Array.isArray(definition.tables)) {
    throw new Error("Unsupported SQL verification task.");
  }
  const manifest = await getManifest(signal);
  onProgress?.("Starting independent browser SQL engine…");
  await getConnection();
  for (const table of definition.tables) {
    if (signal?.aborted) throw new DOMException("Verification closed", "AbortError");
    await loadTable(table, manifest, signal, onProgress);
  }
  const sqlResponse = await fetchChecked(new URL(`${tool}.sql`, SQL_ROOT), signal);
  const sql = await sqlResponse.text();
  onProgress?.("Executing read-only SQL in your browser…");
  const {conn} = await getConnection();
  const result = await conn.query(sql);
  const firstRow = result.toArray()[0];
  if (!firstRow) throw new Error("SQL returned no result row.");
  const row = typeof firstRow.toJSON === "function" ? firstRow.toJSON() : firstRow;
  const metrics = {};
  for (const name of definition.metrics) {
    metrics[name] = numberFromArrow(row[name]);
  }
  return {metrics, sql, manifest, verifiedFiles:definition.tables.map(table => `${table}.csv`), engineVersion:VERSION};
}
