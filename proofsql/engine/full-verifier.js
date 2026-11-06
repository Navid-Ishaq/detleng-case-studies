/** Full-coverage modal; uses real SQL only if all nine approved snapshots exist. */
import {fullQueryForTool} from "./full-registry.js";
import {executeFullSQL} from "./full-loader.js";
import {compareFullRecords} from "./full-comparator.js";

let current = null;
function text(parent,tag,cls,value) {
  const el=document.createElement(tag);
  if (cls) el.className=cls;
  el.textContent=String(value);
  parent.append(el);
  return el;
}
function setupCss() {
  if (document.getElementById("dt-proofsql-style")) return;
  const link=document.createElement("link");link.id="dt-proofsql-style";
  link.rel="stylesheet";link.href="/proofsql/ui/proofsql.css";document.head.append(link);
}
function close() {
  if (!current)return;
  const state=current;current=null;
  state.controller.abort();state.overlay.remove();
  if(state.trigger?.isConnected)state.trigger.focus();
}
function trap(ev,overlay) {
  if(ev.key==="Escape") {ev.preventDefault();ev.stopPropagation();close();return;}
  if(ev.key!=="Tab")return;
  const els=[...overlay.querySelectorAll('button:not([disabled]),a[href],[tabindex="0"]')].filter(x=>x.getClientRects().length);
  if(!els.length)return;
  const first=els[0],last=els.at(-1);
  if(ev.shiftKey&&document.activeElement===first){ev.preventDefault();last.focus();}
  else if(!ev.shiftKey&&document.activeElement===last){ev.preventDefault();first.focus();}
}

export async function openFullVerification({tool,taskNumber,originalAnswer,evidence,trigger}) {
  const def=fullQueryForTool(tool);
  if (!def || evidence?.tool!==tool || !Array.isArray(evidence.records)) {
    throw new Error("Structured KPI evidence is missing for this analytics task.");
  }
  close();setupCss();
  const controller=new AbortController();
  const overlay=document.createElement("div");overlay.className="dt-proofsql-overlay";
  const dialog=document.createElement("section");dialog.className="dt-proofsql-dialog";
  dialog.setAttribute("role","dialog");dialog.setAttribute("aria-modal","true");
  dialog.setAttribute("aria-labelledby","dt-full-proofsql-heading");dialog.tabIndex=-1;
  overlay.append(dialog);
  const head=text(dialog,"header","dt-proofsql-heading","");
  const lead=text(head,"div","","");
  text(lead,"p","dt-proofsql-eyebrow","DeTLeng · 100-task SQL verification");
  const h=text(lead,"h2","","⚖ ProofSQL");h.id="dt-full-proofsql-heading";
  const closeBtn=text(head,"button","dt-proofsql-close","×");
  closeBtn.type="button";closeBtn.setAttribute("aria-label","Close verification");
  closeBtn.addEventListener("click",close);
  const body=text(dialog,"div","dt-proofsql-body","");
  text(body,"p","dt-proofsql-task",`${taskNumber?`Task #${String(taskNumber).padStart(2,"0")} · `:""}${tool.replaceAll("_"," ")}`);
  const original=text(body,"section","dt-proofsql-section","");
  text(original,"h3","","Original AI answer");
  text(original,"pre","dt-proofsql-answer",originalAnswer);
  const section=text(body,"section","dt-proofsql-section","");
  text(section,"h3","","Independent SQL calculation");
  const status=text(section,"p","dt-proofsql-progress","Checking full snapshot availability…");
  status.setAttribute("role","status");status.setAttribute("aria-live","polite");
  const result=text(section,"div","","");
  overlay.addEventListener("keydown",event=>trap(event,overlay));
  overlay.addEventListener("pointerdown",event=>{if(event.target===overlay)close();});
  document.body.append(overlay);current={overlay,controller,trigger};closeBtn.focus();
  const alive=()=>current?.overlay===overlay&&!controller.signal.aborted;
  try {
    const run=await executeFullSQL(tool,def,controller.signal,message=>{
      if(alive())status.textContent=message;
    });
    if(!alive())return;
    const report=compareFullRecords(evidence.records,run.records,def);
    status.textContent=`Browser SQL executed · SHA-256 verified · ${report.checkedCells} numeric cells compared`;
    const badge=text(result,"div",`dt-proofsql-result dt-proofsql-result-${report.status.toLowerCase().replaceAll(" ","-")}`,
      report.status==="MATCH"?"✓ SQL NUMBERS MATCH":report.status==="PARTIAL MATCH"?"◐ NUMERIC VALUES MATCH · IDs NOT CHECKED":report.status==="MISMATCH"?"! MISMATCH FOUND":"NOT VERIFIABLE");
    badge.setAttribute("role","status");
    text(result,"p","dt-proofsql-footnote",`Live result rows: ${report.rowsExpected} · Browser result rows: ${report.rowsBrowser} · ${report.checkedCells} numerical comparisons`);
    if(report.reason)text(result,"p","dt-proofsql-footnote",report.reason);
    if(report.details.length) {
      const wrapper=text(result,"div","dt-proofsql-table-wrap","");
      const table=document.createElement("table");table.className="dt-proofsql-table dt-proofsql-full-table";wrapper.append(table);
      const th=table.createTHead().insertRow();
      for(const name of ["Measure","AI / BigQuery","Browser SQL","Status"])text(th,"th","",name);
      const tbody=table.createTBody();
      for(const detail of report.details) {
        const tr=tbody.insertRow();
        for(const value of [detail.key,detail.live??"—",detail.browser??"—",detail.status])text(tr,"td","",value);
      }
    }
    const meta=text(result,"div","dt-proofsql-meta","");
    text(meta,"h3","","Evidence and provenance");
    text(meta,"p","",`Snapshot: ${run.manifest.version} · ${run.manifest.created_at_utc} · STATIC, not live`);
    text(meta,"p","",`BigQuery execution: ${evidence.live_queried_at||"unknown"}`);
    text(meta,"p","",`SHA-256 verified CSV: ${run.verifiedFiles.join(", ")}`);
    text(meta,"p","",`Original Python SQL source: backend/analytics/tools/${def.source}`);
    text(meta,"p","",`DuckDB-Wasm ${run.engineVersion} · no second BigQuery query`);
    const details=document.createElement("details");meta.append(details);
    text(details,"summary","","Show the actual SQL executed in your browser");
    text(details,"pre","dt-proofsql-sql",run.sql);
    text(result,"p","dt-proofsql-footnote","SQL verifies the listed numerical evidence only. Matching data does not certify AI prose, assumptions, hidden identifiers, or KPI definitions.");
  } catch(error) {
    if(!alive())return;
    status.textContent="NOT VERIFIABLE · No successful browser SQL comparison";
    const msg=String(error?.message||"Unknown verification error");
    text(result,"p","dt-proofsql-error",msg.includes("404")?
      "The nine-table full snapshot is not published yet. Existing five-KPI pilot remains available. Prepare and publish the approved full-v2 data first.":msg.slice(0,280));
    const retry=text(result,"button","dt-proofsql-retry","Retry verification");retry.type="button";
    retry.addEventListener("click",()=>openFullVerification({tool,taskNumber,originalAnswer,evidence,trigger}));
  }
}
