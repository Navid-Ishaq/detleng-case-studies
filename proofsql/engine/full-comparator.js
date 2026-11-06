/** Compare numeric KPI cells and public grouping labels across two engines.
 * No extracted AI prose is used. Never return MATCH for missing columns/rows.
 */
function numeric(value) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "bigint" && Number.isSafeInteger(Number(value))) return Number(value);
  if (typeof value === "string" && value.trim() && Number.isFinite(Number(value))) return Number(value);
  return null;
}

function normalizeRecord(record, def) {
  if (!record || typeof record !== "object" || Array.isArray(record)) return null;
  const out={};
  for (const key of Object.keys(def.fields)) {
    if (!Object.prototype.hasOwnProperty.call(record,key)) return null;
    const value=record[key];
    if (def.dimensions.includes(key)) {
      if (value !== null && typeof value !== "string") return null;
      out[key]=value===null ? null : value.trim().toLowerCase();
    } else {
      if (value===null) out[key]=null;
      else {
        const n=numeric(value);
        if (n===null) return null;
        out[key]=n;
      }
    }
  }
  return out;
}

function ordering(a,b,def) {
  // Consistent matching across engines, independent of equal-value ORDER BY ties.
  for (const key of [...def.dimensions, ...Object.keys(def.fields).filter(k=>!def.dimensions.includes(k))]) {
    const x=a[key],y=b[key];
    const xa=x===null?"":String(x), ya=y===null?"":String(y);
    if (xa!==ya) return xa<ya?-1:1;
  }
  return 0;
}

export function compareFullRecords(expected, actual, def) {
  if (!Array.isArray(expected) || !Array.isArray(actual) || !def || !def.fields ||
      expected.length>500 || actual.length>500) {
    return {status:"NOT VERIFIABLE",details:[],rowsExpected:expected?.length??null,
            rowsBrowser:actual?.length??null,checkedCells:0,reason:"Invalid or oversized result records"};
  }
  const a=expected.map(r=>normalizeRecord(r,def)),b=actual.map(r=>normalizeRecord(r,def));
  if (a.some(r=>r===null) || b.some(r=>r===null)) {
    return {status:"NOT VERIFIABLE",details:[],rowsExpected:a.length,
            rowsBrowser:b.length,checkedCells:0,reason:"Result fields are missing or have unexpected types"};
  }
  const numericFields=Object.keys(def.fields).filter(k=>!def.dimensions.includes(k));
  if (!numericFields.length || (!a.length && !b.length)) {
    return {status:"NOT VERIFIABLE",details:[],rowsExpected:a.length,
            rowsBrowser:b.length,checkedCells:0,reason:"No numeric results to independently compare"};
  }
  a.sort((x,y)=>ordering(x,y,def));b.sort((x,y)=>ordering(x,y,def));
  let mismatches=0,checkedCells=0;
  const details=[];
  const samples=[];
  if (a.length!==b.length) {
    mismatches++;
    details.push({key:"Row count", live:a.length, browser:b.length, status:"MISMATCH"});
  }
  for (let i=0;i<Math.min(a.length,b.length);i++) {
    for (const key of Object.keys(def.fields)) {
      const x=a[i][key],y=b[i][key];
      if (def.dimensions.includes(key)) {
        if (x!==y) {
          mismatches++;
          if (details.length<20)details.push({key:`Row ${i+1} · ${key}`,live:x,browser:y,status:"MISMATCH"});
        }
      } else {
        checkedCells++;
        // NULLs must match as NULL, except explicit to_json_number(x or 0) normalization.
        const tolerance=def.integer.includes(key)?0:0.005+1e-9;
        const ok=(x===null&&y===null)||(x!==null&&y!==null&&Math.abs(x-y)<=tolerance);
        if (!ok) {
          mismatches++;
          if(details.length<20)details.push({key:`Row ${i+1} · ${key}`,live:x,browser:y,status:"MISMATCH"});
        } else if (samples.length<12) {
          const label=def.dimensions.length
            ? def.dimensions.map(dim=>`${dim}: ${a[i][dim]??"—"}`).join(" · ")
            : `Row ${i+1}`;
          samples.push({key:`${label} · ${key}`,live:x,browser:y,status:"MATCH"});
        }
      }
    }
  }
  const partial=Boolean(def.suppressedIdentifiers?.length);
  return {
    status:mismatches?"MISMATCH":partial?"PARTIAL MATCH":"MATCH",
    details:details.length?details:samples,rowsExpected:a.length,rowsBrowser:b.length,checkedCells,mismatches,
    identityNotChecked:partial,
    reason:partial?"Source IDs are suppressed for privacy; identity-to-metric associations are not verified.":null,
  };
}
