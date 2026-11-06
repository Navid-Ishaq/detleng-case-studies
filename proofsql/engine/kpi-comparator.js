import {METRIC_DEFS} from "./query-registry.js";

function numeric(value) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "bigint" && Number.isSafeInteger(Number(value))) return Number(value);
  if (typeof value === "string" && value.trim() && Number.isFinite(Number(value))) return Number(value);
  return null;
}

/** Compare allowlisted structured BigQuery values with actual DuckDB results. */
export function compareMetrics(expected, actual, names) {
  const rows = names.map(name => {
    const info = METRIC_DEFS[name];
    if (!info) throw new Error(`Unrecognized KPI comparison: ${name}`);
    const ai = numeric(expected?.[name]);
    const browser = numeric(actual?.[name]);
    const difference = ai === null || browser === null ? null : Math.round((browser - ai)*1e8)/1e8;
    const match = difference !== null && Math.abs(difference) <= info.tolerance + 1e-9;
    return {
      name, label:info.label, unit:info.unit, tolerance:info.tolerance,
      ai, browser, difference,
      status: difference === null ? "NOT VERIFIABLE" : match ? "MATCH" : "MISMATCH",
    };
  });
  let status = "MATCH";
  if (rows.some(row => row.status === "MISMATCH")) status = "MISMATCH";
  else if (rows.some(row => row.status === "NOT VERIFIABLE")) status = "NOT VERIFIABLE";
  return {status, rows, compared:rows.filter(row=>row.status!=="NOT VERIFIABLE").length};
}

export function displayNumber(value, unit="count") {
  if (value === null || value === undefined) return "—";
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits:unit === "count" ? 0 : 2,
    maximumFractionDigits:unit === "count" ? 0 : 2,
  }).format(value) + (unit === "%" ? "%" : "");
}
