import {queryForTool} from "./query-registry.js";
import {compareMetrics, displayNumber} from "./kpi-comparator.js";

let current = null;

function appendText(tag, className, text, parent) {
  const element = document.createElement(tag);
  element.className = className;
  element.textContent = text;
  parent.append(element);
  return element;
}
function addCSS() {
  if (document.getElementById("dt-proofsql-style")) return;
  const link = document.createElement("link");
  link.id = "dt-proofsql-style";
  link.rel = "stylesheet";
  link.href = "/proofsql/ui/proofsql.css";
  document.head.append(link);
}
function close() {
  if (!current) return;
  const {overlay, controller, trigger, keyHandler} = current;
  current = null;
  controller.abort();
  overlay.removeEventListener("keydown", keyHandler);
  overlay.remove();
  if (trigger?.isConnected) trigger.focus();
}
function focusTrap(event, overlay) {
  if (event.key === "Escape") {
    event.preventDefault();event.stopPropagation();close();return;
  }
  if (event.key !== "Tab") return;
  const items = [...overlay.querySelectorAll("button:not([disabled]),a[href],summary,[tabindex='0']")].filter(item => item.getClientRects().length > 0);
  if (!items.length) return;
  const first = items[0], last = items[items.length-1];
  if (event.shiftKey && document.activeElement === first) {event.preventDefault();last.focus();}
  else if (!event.shiftKey && document.activeElement === last) {event.preventDefault();first.focus();}
}

function addComparison(target, report) {
  const badge = appendText("div", `dt-proofsql-result dt-proofsql-result-${report.status.toLowerCase().replace(/ /g,"-")}`,
    report.status === "MATCH" ? "✓ SQL NUMBERS MATCH" : report.status === "MISMATCH" ? "! NUMERIC MISMATCH" : "NOT VERIFIABLE", target);
  badge.setAttribute("role", "status");
  const tableWrap = appendText("div", "dt-proofsql-table-wrap", "", target);
  const table = document.createElement("table");
  table.className = "dt-proofsql-table";
  const header = table.createTHead().insertRow();
  for (const heading of ["KPI", "AI / BigQuery", "Browser SQL", "Difference", "Status"]) appendText("th", "", heading, header);
  const body = table.createTBody();
  for (const row of report.rows) {
    const tr = body.insertRow();
    const cells = [row.label, displayNumber(row.ai,row.unit), displayNumber(row.browser,row.unit),
      row.difference === null ? "—" : displayNumber(row.difference, row.unit), row.status];
    cells.forEach((cell,index) => {
      const td = appendText("td", index === 4 ? `dt-proofsql-cell-${row.status.toLowerCase().replace(/ /g,"-")}` : "", cell, tr);
      if (index === 0) td.setAttribute("data-label","KPI");
    });
  }
  tableWrap.append(table);
  appendText("p", "dt-proofsql-footnote",
    "MATCH checks only listed numeric KPIs (counts exact; money and percentages ±0.005). " +
    "It does not certify the AI's prose, business interpretation or underlying KPI definitions.", target);
}

export async function openVerification({tool, taskNumber, originalAnswer, evidence, trigger}) {
  const definition = queryForTool(tool);
  if (!definition || !evidence || evidence.tool !== tool || typeof originalAnswer !== "string") {
    throw new Error("No structured verification data is available for this result.");
  }
  close();
  addCSS();
  const controller = new AbortController();
  const overlay = document.createElement("div");
  overlay.className = "dt-proofsql-overlay";
  const dialog = document.createElement("section");
  dialog.className = "dt-proofsql-dialog";
  dialog.setAttribute("role", "dialog");
  dialog.setAttribute("aria-modal", "true");
  dialog.setAttribute("aria-labelledby", "dt-proofsql-heading");
  dialog.tabIndex = -1;
  overlay.append(dialog);
  const head = document.createElement("header");
  head.className = "dt-proofsql-heading";
  dialog.append(head);
  const headText = document.createElement("div");head.append(headText);
  appendText("p", "dt-proofsql-eyebrow", "DeTLeng · Independent Analytics Verification", headText);
  const heading = appendText("h2", "", "⚖ ProofSQL", headText);
  heading.id = "dt-proofsql-heading";
  const closeBtn = appendText("button", "dt-proofsql-close", "×", head);
  closeBtn.type = "button";closeBtn.setAttribute("aria-label","Close verification");
  closeBtn.addEventListener("click",close);
  const body = document.createElement("div");body.className = "dt-proofsql-body";dialog.append(body);
  appendText("p", "dt-proofsql-task", `${taskNumber ? `Task #${String(taskNumber).padStart(2,"0")} · ` : ""}${definition.label} · ${tool}`, body);
  const answerSection = document.createElement("section"); answerSection.className = "dt-proofsql-section";body.append(answerSection);
  appendText("h3", "", "Original AI answer", answerSection);
  appendText("pre", "dt-proofsql-answer", originalAnswer, answerSection);
  const verificationSection = document.createElement("section");verificationSection.className="dt-proofsql-section";body.append(verificationSection);
  appendText("h3", "", "Independent SQL calculation", verificationSection);
  const progress = appendText("p", "dt-proofsql-progress", "Initializing browser verification…", verificationSection);
  progress.setAttribute("role", "status");progress.setAttribute("aria-live", "polite");
  const resultArea = document.createElement("div");verificationSection.append(resultArea);
  const keyHandler = event => focusTrap(event, overlay);
  overlay.addEventListener("keydown", keyHandler);
  overlay.addEventListener("pointerdown", event => {if (event.target === overlay) close();});
  document.body.append(overlay);
  current = {overlay,controller,trigger,keyHandler};
  closeBtn.focus();
  const sameSession = () => current?.overlay === overlay && !controller.signal.aborted;
  try {
    const {executeBrowserSQL} = await import("./duckdb-loader.js");
    const output = await executeBrowserSQL(tool, definition, controller.signal, message => {
      if (sameSession()) progress.textContent = message;
    });
    if (!sameSession()) return;
    progress.textContent = "Browser SQL executed · CSV checksums verified";
    const report = compareMetrics(evidence.metrics, output.metrics, definition.metrics);
    addComparison(resultArea, report);
    const meta = document.createElement("div");meta.className="dt-proofsql-meta";resultArea.append(meta);
    appendText("h3", "", "Evidence and provenance", meta);
    appendText("p", "", `Snapshot: ${output.manifest.version} · ${output.manifest.snapshot_date} · STATIC, not live`, meta);
    appendText("p", "", `BigQuery execution: ${evidence.live_queried_at || "not recorded"}`, meta);
    appendText("p", "", `Data: ${output.verifiedFiles.join(", ")} · SHA-256 checked`, meta);
    appendText("p", "", `SQL provenance: backend/analytics/tools/${definition.source}`, meta);
    appendText("p", "", `Browser engine: DuckDB-Wasm ${output.engineVersion} · no second BigQuery call`, meta);
    const details = document.createElement("details");meta.append(details);
    appendText("summary", "", "Show the SQL that ran in your browser", details);
    appendText("pre", "dt-proofsql-sql", output.sql, details);
    const caveat = appendText("p", "dt-proofsql-footnote",
      "Static snapshots may differ from current BigQuery data. Partial summaries verify only the displayed KPI subset. " +
      "Unlisted metrics and narrative claims remain unverified.", resultArea);
    caveat.setAttribute("aria-label","Verification scope notice");
  } catch (error) {
    if (!sameSession()) return;
    progress.textContent = "NOT VERIFIABLE · Browser calculation could not be completed.";
    appendText("p", "dt-proofsql-error", String(error?.message || "Unable to load snapshot or SQL engine.").slice(0,250), resultArea);
    const retry = appendText("button", "dt-proofsql-retry", "Retry verification", resultArea);
    retry.type = "button";
    retry.addEventListener("click", () => openVerification({tool,taskNumber,originalAnswer,evidence,trigger}));
  }
}
