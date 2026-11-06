import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";
import {FULL_QUERIES,fullQueryForTool} from "../engine/full-registry.js";
import {compareFullRecords} from "../engine/full-comparator.js";
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const tasks=fs.readFileSync(path.resolve(root,"../ai-tasks.js"),"utf-8")
  .split('const CATEGORIES = {')[1].split('};')[0].match(/"[a-z_]+"/g).map(s=>s.slice(1,-1));

test("exact same 100 tasks are registered for SQL verification",()=>{
  assert.equal(tasks.length,100);assert.equal(new Set(tasks).size,100);
  assert.deepEqual(new Set(Object.keys(FULL_QUERIES)),new Set(tasks));
  assert.equal(fullQueryForTool("drop_table"),null);
});

test("all 100 generated queries are readonly with approved tables and mapped result fields",()=>{
  const tableNames=new Set(["dim_customers","dim_dates","dim_products","dim_sellers",
    "fact_delivery","fact_orders","fact_payments","fact_reviews","fact_sales"]);
  for(const [tool,def] of Object.entries(FULL_QUERIES)){
    const sql=fs.readFileSync(path.join(root,"queries/full-v2",`${tool}.sql`),"utf-8");
    assert.match(sql,/\bSELECT\b/i,tool);
    assert.doesNotMatch(sql,/\b(DROP|DELETE|INSERT|UPDATE|ALTER|ATTACH|COPY|EXPORT)\b/i,tool);
    assert.doesNotMatch(sql,/SAFE_DIVIDE|`detleng-case-studies/i,tool);
    assert.ok(def.tables.every(table=>tableNames.has(table)),tool);
    assert.ok(Object.keys(def.fields).length>0,tool);
    for(const name of Object.values(def.fields))assert.match(sql,new RegExp(`\\b${name}\\b`),`${tool}: ${name}`);
    assert.ok(def.suppressedIdentifiers.every(k=>!Object.hasOwn(def.fields,k)));
    assert.ok(def.dimensions.every(k=>Object.hasOwn(def.fields,k)));
  }
});

test("scalar match, mismatch, invalid types and missing fields",()=>{
  const def={fields:{total_revenue:"total_revenue",total_orders:"total_orders"},dimensions:[],integer:["total_orders"],nullToZero:[],suppressedIdentifiers:[]};
  let report=compareFullRecords([{total_revenue:15843553.24,total_orders:99441}],
    [{total_revenue:15843553.241,total_orders:99441}],def);
  assert.equal(report.status,"MATCH");assert.equal(report.checkedCells,2);
  report=compareFullRecords([{total_revenue:15843553.24,total_orders:99441}],
    [{total_revenue:15843553.24,total_orders:99442}],def);
  assert.equal(report.status,"MISMATCH");
  assert.equal(compareFullRecords([{total_revenue:5}],[],def).status,"NOT VERIFIABLE");
});

test("list comparison matches irrespective of SQL row ordering; not identities",()=>{
  const def={fields:{product_category:"product_category_name",total_revenue:"total_revenue"},dimensions:["product_category"],integer:[],nullToZero:[],suppressedIdentifiers:["product_id"]};
  const a=[{product_category:"books",total_revenue:100.00},{product_category:"toys",total_revenue:80.00}];
  const b=[{product_category:"toys",total_revenue:80.001},{product_category:"books",total_revenue:100.00}];
  assert.equal(compareFullRecords(a,b,def).status,"PARTIAL MATCH");
  assert.equal(compareFullRecords(a,[{product_category:"clothes",total_revenue:100},{product_category:"toys",total_revenue:80}],def).status,"MISMATCH");
  assert.equal(compareFullRecords([],[],def).status,"NOT VERIFIABLE");
});

test("all full CSV data is generated off-repository and not silently published",()=>{
  const rootData=path.join(root,"data/public/full-v2");
  // The package must never pretend missing rows were shipped for a full proof.
  if(fs.existsSync(path.join(rootData,"manifest.json"))){
    const meta=JSON.parse(fs.readFileSync(path.join(rootData,"manifest.json"),"utf8"));
    assert.equal(meta.files.length,9);
  }
  assert.ok(fs.existsSync(path.join(root,"tools/prepare_full_snapshot.py")));
});
