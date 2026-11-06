/** 100-task data loader. Isolated from the already-working pilot snapshots. */
import {getConnection, fetchChecked, sha256} from "./duckdb-loader.js";

const DATA = new URL("/proofsql/data/public/full-v2/", window.location.origin);
const SQL = new URL("/proofsql/queries/full-v2/", window.location.origin);
const TABLES = new Set([
  "dim_customers","dim_dates","dim_products","dim_sellers",
  "fact_delivery","fact_orders","fact_payments","fact_reviews","fact_sales",
]);
let manifestPromise;
let schemaPromise;
const loaded = new Set();

export async function fullManifestExists() {
  try {
    const response = await fetch(new URL("manifest.json",DATA), {method:"GET",cache:"no-store"});
    return response.ok;
  } catch { return false; }
}

async function getManifest(signal) {
  if (!manifestPromise) manifestPromise = (async () => {
    const response = await fetchChecked(new URL("manifest.json",DATA), signal);
    const meta = await response.json();
    if (meta.version !== "full-v2" || !Array.isArray(meta.files) ||
        meta.files.length !== 9 || meta.status !== "static_non_live_snapshot") {
      throw new Error("Full ProofSQL snapshot manifest is invalid or incomplete.");
    }
    const names = new Set(meta.files.map(f=>f.name));
    if (![...TABLES].every(name=>names.has(`${name}.csv`))) {
      throw new Error("Full ProofSQL snapshot is missing required tables.");
    }
    return meta;
  })().catch(error=>{ manifestPromise=undefined;throw error; });
  return manifestPromise;
}

async function ensureSchema(conn) {
  if (!schemaPromise) schemaPromise = conn.query("CREATE SCHEMA IF NOT EXISTS proofsql_full").catch(e=>{
    schemaPromise=undefined;throw e;
  });
  await schemaPromise;
}

async function loadTable(table, manifest, signal, progress) {
  if (!TABLES.has(table)) throw new Error("Unapproved ProofSQL table");
  if (loaded.has(table)) return;
  const entry = manifest.files.find(e=>e.name===`${table}.csv`);
  if (!entry || !Number.isSafeInteger(entry.size_bytes) || !/^[A-Fa-f0-9]{64}$/.test(entry.sha256)) {
    throw new Error(`Invalid manifest entry for ${table}`);
  }
  progress?.(`Downloading and checking ${table}…`);
  const res = await fetchChecked(new URL(entry.name,DATA),signal);
  const bytes = await res.arrayBuffer();
  if (bytes.byteLength !== entry.size_bytes || (await sha256(bytes)) !== entry.sha256.toUpperCase()) {
    throw new Error(`CSV checksum mismatch: ${entry.name}`);
  }
  if (signal.aborted) throw new DOMException("Verification cancelled", "AbortError");
  const {db,conn} = await getConnection();
  await ensureSchema(conn);
  const virtualFile = `full_v2_${table}.csv`;
  await db.registerFileBuffer(virtualFile,new Uint8Array(bytes));
  // Only hardcoded table/file names reach the SQL engine. Schema is not visitor input.
  await conn.query(`CREATE OR REPLACE VIEW proofsql_full."${table}" AS SELECT * FROM read_csv_auto('${virtualFile}', header=true, all_varchar=false, sample_size=-1)`);
  loaded.add(table);
}

function convert(raw) {
  if (raw === null || raw === undefined) return null;
  if (typeof raw === "bigint") {
    return Number.isSafeInteger(Number(raw)) ? Number(raw) : raw.toString();
  }
  if (typeof raw === "number" || typeof raw === "string") return raw;
  if (typeof raw === "boolean") return raw;
  return typeof raw.toString === "function" ? raw.toString() : null;
}

/** Run a trusted fixed query and select the same public output field aliases as FastAPI. */
export async function executeFullSQL(tool, def, signal, progress) {
  if (!/^[a-z_]+$/.test(tool) || !def || !Array.isArray(def.tables) ||
      !def.tables.every(t=>TABLES.has(t))) throw new Error("Tool is not allowlisted");
  const manifest = await getManifest(signal);
  const {conn} = await getConnection();
  for (const table of def.tables) {
    if (signal?.aborted) throw new DOMException("Verification cancelled", "AbortError");
    await loadTable(table,manifest,signal,progress);
  }
  const sqlRes = await fetchChecked(new URL(`${tool}.sql`,SQL),signal);
  const sql = await sqlRes.text();
  if (!/^\s*(?:--[^\n]*\n\s*)*(SELECT|WITH)\b/i.test(sql) ||
      /;\s*\S/.test(sql) || /\b(DROP|DELETE|INSERT|UPDATE|ALTER|ATTACH|COPY|PRAGMA|CALL|EXPORT)\b/i.test(sql)) {
    throw new Error("Only a single approved, read-only SELECT is permitted");
  }
  progress?.(`Executing independent browser SQL for ${tool}…`);
  const result = await conn.query(sql);
  if (signal?.aborted) throw new DOMException("Verification cancelled", "AbortError");
  const rows = result.toArray();
  if (rows.length > 500) throw new Error("The result exceeds the 500-row verification limit");
  const records = rows.map(entry=>{
    const row = typeof entry.toJSON === "function" ? entry.toJSON() : entry;
    const projected={};
    for (const [output,sqlField] of Object.entries(def.fields)) {
      const value = convert(row[sqlField]);
      projected[output] = value === null && def.nullToZero.includes(output) ? 0 : value;
    }
    return projected;
  });
  return {records, sql, manifest, verifiedFiles:def.tables.map(t=>`${t}.csv`),engineVersion:"1.30.0"};
}
