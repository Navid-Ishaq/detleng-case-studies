import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";
import {METRIC_DEFS, QUERIES, queryForTool} from "../engine/query-registry.js";
import {compareMetrics, displayNumber} from "../engine/kpi-comparator.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

test("all 5 pilot KPI tool definitions and 3 summary subsets are registered", () => {
  const required = ["total_revenue","total_orders","total_products","average_order_value","delivery_success_rate","executive_dashboard","sales_summary","delivery_summary"];
  for (const tool of required) assert.ok(queryForTool(tool), tool);
  assert.equal(queryForTool("drop_table"), null);
  assert.equal(queryForTool(""), null);
  assert.equal(QUERIES.executive_dashboard.metrics.length, 4);
});

test("every allowlisted query has read-only SQL and manifest-backed table refs", () => {
  const manifest = JSON.parse(fs.readFileSync(path.join(root,"data/public/pilot/manifest.json"),"utf8"));
  const tableNames = new Set(manifest.files.map(file => file.name.slice(0,-4)));
  for (const [tool, def] of Object.entries(QUERIES)) {
    const sql = fs.readFileSync(path.join(root,"queries",`${tool}.sql`), "utf8");
    assert.match(sql,/\bSELECT\b/i);
    assert.doesNotMatch(sql,/\b(DROP|DELETE|INSERT|UPDATE|ALTER|CREATE|TRUNCATE|ATTACH|COPY)\b/i);
    for (const table of def.tables) assert.ok(tableNames.has(table),`${tool}: table ${table}`);
    for (const metric of def.metrics) {
      assert.ok(Object.hasOwn(METRIC_DEFS,metric), `${tool}: KPI ${metric}`);
      assert.match(sql,new RegExp(`\\b${metric}\\b`), `${tool}: SQL alias ${metric}`);
    }
  }
});

test("numeric equality, cents tolerance, integer exactness and missing values", () => {
  let report = compareMetrics({total_revenue:15843553.24,total_orders:99441},
    {total_revenue:15843553.24,total_orders:99441},["total_revenue","total_orders"]);
  assert.equal(report.status,"MATCH");assert.equal(report.compared,2);
  report=compareMetrics({total_revenue:100}, {total_revenue:100.003}, ["total_revenue"]);
  assert.equal(report.status,"MATCH");
  report=compareMetrics({total_revenue:100}, {total_revenue:100.01}, ["total_revenue"]);
  assert.equal(report.status,"MISMATCH");
  report=compareMetrics({total_orders:99441}, {total_orders:99442}, ["total_orders"]);
  assert.equal(report.status,"MISMATCH");
  report=compareMetrics({total_orders:99441}, {}, ["total_orders"]);
  assert.equal(report.status,"NOT VERIFIABLE");
  report=compareMetrics({total_orders:99441}, {total_orders:"bad"}, ["total_orders"]);
  assert.equal(report.status,"NOT VERIFIABLE");
});

test("formatting and task coverage are explicit", () => {
  assert.equal(displayNumber(99441), "99,441");
  assert.equal(displayNumber(89.15,"%"), "89.15%");
  assert.equal(displayNumber(null), "—");
  assert.ok(QUERIES.sales_summary.metrics.includes("total_orders"));
  assert.ok(fs.readFileSync(path.join(root,"queries/sales_summary.sql"),"utf8").includes("COUNT(DISTINCT order_id)"));
});
