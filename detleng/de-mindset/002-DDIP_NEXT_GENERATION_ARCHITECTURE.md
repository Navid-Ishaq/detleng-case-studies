# DeTLeng Data Intelligence Platform (DDIP)
# Next-Generation Universal Semantic Intelligence Architecture

Prepared by: Chief Platform Architect, DeTLeng  
Date: 2026-07-14  
Scope: Architecture specification only  
Implementation status: Future-state design, preserving the current FastAPI + OpenAI + MCP + BigQuery architecture

---

## Section 1: Vision

The future DeTLeng Data Intelligence Platform is a universal AI-powered semantic business intelligence platform for Google BigQuery warehouses.

The current platform answers business questions by routing user intent to predefined MCP tools that contain SQL. That is correct for one curated analytics dataset. The next-generation platform must evolve from dataset-specific tools into a metadata-driven semantic intelligence system.

The core future principle is:

Business intent remains stable. Warehouse implementation changes.

For example:

- Revenue may mean `fact_sales.total_sale_value` in one warehouse.
- Revenue may mean `orders.order_total` in another warehouse.
- Revenue may mean `invoice.amount` in a finance warehouse.

The user should still ask: "What is total revenue?"

The platform should understand the business concept, resolve it through the semantic layer, generate safe SQL, validate it, execute it against BigQuery, and explain the trusted result.

DDIP should become a reusable Google Cloud Data Intelligence operating system:

- Connect any BigQuery warehouse.
- Scan metadata automatically.
- Infer facts, dimensions, measures, relationships, grain, and business concepts.
- Build a customer-specific semantic layer.
- Expose universal business tools through MCP.
- Use OpenAI only for reasoning, explanation, and assisted semantic modeling, never as the source of KPI truth.

---

## Section 2: Current Architecture

The current architecture should not be replaced. It should be preserved and extended.

Current strengths:

- FastAPI backend provides a stable frontend contract.
- OpenAI integration is already isolated from trusted metric execution.
- MCP server gives the AI system controlled access to business tools.
- Deterministic routing prevents the LLM from deciding whether a KPI tool should run.
- BigQuery access is isolated behind the MCP server.
- 100+ BI tools prove the business value of the model.
- The tool registry already acts as a governance boundary.
- The knowledge layer separates company/platform knowledge from BI execution.
- The current architecture is understandable, deployable, and production-style.

Why not replace it:

- The current design already has the correct control plane: Python decides, MCP executes, OpenAI explains.
- A rebuild would recreate the same outer architecture.
- The limitation is not FastAPI, MCP, or OpenAI; the limitation is that SQL and schema knowledge live inside individual tools.
- The right evolution is to insert intelligent semantic layers between business intent and warehouse SQL.

Current architecture to preserve:

Frontend -> FastAPI Backend -> Deterministic Routing -> MCP Client -> FastMCP Server -> Business Tool Registry -> BigQuery -> OpenAI Explanation -> Frontend

Future architecture should preserve this path but replace hardcoded tool SQL with semantic resolution and validated SQL generation.

---

## Section 3: Future Architecture

Future DDIP architecture:

```text
Business User
    ↓
AI Business Intelligence Assistant
    ↓
FastAPI Backend
    ↓
Intent Layer
    ↓
Universal Tool Engine
    ↓
Semantic Intelligence Layer
    ↓
Metadata Layer + Vector Intelligence Layer
    ↓
Semantic Mapping Engine
    ↓
SQL Generation Layer
    ↓
Validation and Governance Layer
    ↓
Warehouse Connector
    ↓
Google BigQuery
    ↓
Structured Result
    ↓
OpenAI Explanation Layer
    ↓
Business Response
```

Primary layers:

1. AI Layer  
Handles user interaction, explanation, clarification, and natural language output.

2. Intent Layer  
Classifies user requests into KPI, discovery, metadata, glossary, documentation, technology, troubleshooting, or general knowledge.

3. Universal Tool Engine  
Exposes stable tools such as `get_metric`, `rank_dimension`, `compare_periods`, `explain_dataset`, and `list_business_concepts`.

4. Semantic Intelligence Layer  
The brain of the platform. It knows business concepts, semantic models, measures, dimensions, mappings, relationships, and grain.

5. Metadata Layer  
Stores extracted technical metadata from BigQuery and enriched business metadata.

6. Vector Intelligence Layer  
Retrieves relevant documentation, glossary entries, semantic definitions, examples, and metadata context.

7. Semantic Mapping Engine  
Maps universal concepts like Revenue, Customer, Order, Profit, Region, Product, and Time to customer-specific warehouse structures.

8. SQL Generation Layer  
Generates warehouse-specific SQL from semantic plans, not directly from raw user prompts.

9. Validation and Governance Layer  
Rejects unsafe SQL, validates joins, validates grain, enforces dataset scope, and checks cost controls.

10. Warehouse Connector  
Executes governed queries against BigQuery and returns structured results.

---

## Section 4: Semantic Intelligence Layer

The Semantic Intelligence Layer is the most important future component.

Purpose:

To convert business intent into trusted, governed, customer-specific analytical logic without hardcoding table names or SQL inside MCP tools.

Responsibilities:

- Store universal business concepts.
- Store customer-specific semantic mappings.
- Resolve user intent to a semantic plan.
- Understand measures, dimensions, filters, hierarchies, time grains, and relationships.
- Prevent metric ambiguity.
- Provide structured input to SQL generation.
- Maintain semantic consistency across tools, prompts, documentation, and query execution.

Inputs:

- User intent from the Intent Layer.
- MCP tool name or universal tool request.
- Extracted BigQuery metadata.
- Business glossary.
- Dataset documentation.
- Relationship graph.
- KPI definitions.
- Vector-retrieved context.
- Customer-specific semantic model.

Outputs:

- Semantic query plan.
- Required measures.
- Required dimensions.
- Required filters.
- Required time grain.
- Required joins.
- Grain rules.
- Validation constraints.
- SQL generation context.
- Explanation metadata.

Internal components:

- Business Concept Registry  
  Stores universal concepts such as Revenue, Customer, Order, Product, Seller, Payment, Delivery, Review, Region, Time, Profit, Margin, Inventory, Churn, Retention.

- Metric Definition Store  
  Stores measures such as Total Revenue, Average Order Value, Customer Count, Repeat Customers, Delivery Success Rate.

- Dimension Definition Store  
  Stores dimensions such as Customer State, Product Category, Seller City, Payment Type, Review Score, Month, Quarter, Year.

- Relationship Graph  
  Stores table-level and concept-level relationships.

- Grain Manager  
  Knows the grain of each fact and dimension and prevents invalid aggregations.

- Semantic Resolver  
  Converts a request into a semantic query plan.

- Ambiguity Resolver  
  Detects unclear concepts and requests clarification or uses approved defaults.

- Mapping Manager  
  Maps universal concepts to customer-specific warehouse columns.

- Policy Manager  
  Applies dataset, tenant, security, and cost rules.

Lifecycle:

1. Metadata is extracted from BigQuery.
2. Candidate business concepts are inferred.
3. Semantic mappings are generated.
4. Human data owner reviews and approves mappings.
5. Approved mappings become active.
6. Universal tools use the active semantic model.
7. Usage feedback improves confidence scores and suggestions.

How business concepts are stored:

Business concepts should be stored as semantic entities:

- Concept ID
- Name
- Synonyms
- Description
- Type: measure, dimension, entity, hierarchy, time concept
- Business definition
- Calculation rule
- Default aggregation
- Allowed dimensions
- Allowed filters
- Grain
- Owner
- Certification status
- Version

How concepts map to datasets:

Each tenant or dataset has a semantic mapping layer:

- Universal concept: Revenue
- Dataset mapping: `fact_sales.total_sale_value`
- Aggregation: SUM
- Currency: configured or inferred
- Grain: order item
- Valid joins: sales -> products, sales -> sellers, sales -> orders
- Certified: true or false

How universal concepts become customer-specific mappings:

Universal concepts are templates. Customer-specific mappings bind those templates to real BigQuery tables and columns.

Example:

- Universal concept: Revenue
- Customer A: `fact_sales.total_amount`
- Customer B: `sales.order_total`
- Customer C: `invoice.amount`

The tool never changes. The semantic mapping changes.

---

## Section 5: Metadata Engine

The Metadata Engine is responsible for automatically understanding the warehouse.

Automatic metadata extraction must include:

- Projects
- Datasets
- Tables
- Views
- Materialized views
- Columns
- Data types
- Nullable fields
- Partitioning
- Clustering
- Table descriptions
- Column descriptions
- Row counts
- Table size
- Last modified time
- Primary keys where available
- Foreign keys where available
- Constraints where available
- BigQuery policy tags
- Data classification tags
- Authorized views
- Access controls
- Query history where available
- Table usage frequency
- Column usage frequency
- Statistics and cardinality estimates

Primary BigQuery sources:

- `INFORMATION_SCHEMA.TABLES`
- `INFORMATION_SCHEMA.COLUMNS`
- `INFORMATION_SCHEMA.TABLE_OPTIONS`
- `INFORMATION_SCHEMA.COLUMN_FIELD_PATHS`
- `INFORMATION_SCHEMA.PARTITIONS`
- `INFORMATION_SCHEMA.TABLE_STORAGE`
- `INFORMATION_SCHEMA.JOBS`
- BigQuery Data Catalog / Dataplex metadata
- BigQuery table and column descriptions
- BigQuery constraints where available

Metadata enrichment sources:

- Existing README files
- dbt docs if present
- Looker semantic models if present
- Data catalogs
- Business glossary documents
- Sample dashboards
- Sample SQL queries
- User-provided KPI definitions
- Historical query logs

Metadata storage model:

- Technical metadata store: exact warehouse facts.
- Business metadata store: inferred and approved business meaning.
- Relationship store: graph of table and column relationships.
- Statistics store: profiling results, cardinality, null ratios, uniqueness.
- Version store: tracks metadata changes over time.

Metadata Engine output:

- Dataset profile
- Table catalog
- Column catalog
- Relationship graph
- Candidate facts and dimensions
- Candidate measures and dimensions
- Candidate glossary terms
- Data quality observations
- Semantic model draft

---

## Section 6: Vector Intelligence Layer

The Vector Intelligence Layer is not conversation memory.

Its purpose is contextual retrieval for semantic understanding, metadata enrichment, documentation grounding, and SQL generation support.

Possible contents:

- Business glossary
- Dataset documentation
- Table documentation
- Column documentation
- Relationship documentation
- KPI definitions
- Sample queries
- Approved SQL patterns
- Generated metadata summaries
- Enterprise documentation
- Semantic definitions
- Data quality reports
- dbt model documentation
- Dashboard definitions
- User-approved business rules

Retrieval strategy:

- Retrieve by business concept, not only by keyword.
- Combine vector search with metadata filters.
- Filter by tenant, dataset, domain, certification status, and version.
- Prefer certified definitions over inferred definitions.
- Retrieve table/column context only for the relevant semantic plan.
- Use hybrid retrieval: lexical + vector + graph traversal.

Embedding strategy:

- Embed semantic chunks, not raw entire documents.
- Chunk by concept, table, column group, KPI, relationship, and business rule.
- Store metadata with every embedding:
  - tenant ID
  - dataset ID
  - object type
  - certification status
  - source
  - version
  - last updated
  - lineage

Update strategy:

- Re-embed when documentation changes.
- Re-embed when schema changes.
- Re-embed when semantic definitions change.
- Keep old versions for auditability.
- Use incremental sync, not full rebuild, for large enterprises.

Synchronization strategy:

- Metadata Engine detects warehouse changes.
- Semantic Engine identifies impacted concepts.
- Documentation Engine updates generated docs.
- Vector Engine updates only affected embeddings.
- Validation Engine marks impacted metrics as requiring review if breaking changes occur.

---

## Section 7: Semantic Mapping Engine

The Semantic Mapping Engine connects stable business meaning to variable warehouse schemas.

Architecture:

```text
Universal Concept Library
    ↓
Candidate Mapping Generator
    ↓
Metadata + Vector + Statistics + Query Log Context
    ↓
Confidence Scoring
    ↓
Human Approval Workflow
    ↓
Certified Semantic Mapping
    ↓
Runtime Semantic Resolution
```

Mapping process:

1. Detect candidate concepts from column names, descriptions, data types, values, and usage.
2. Compare candidates against universal concepts.
3. Use vector retrieval to find supporting documentation.
4. Use statistics to validate likely measures and dimensions.
5. Use query history to infer common joins and aggregations.
6. Score mappings.
7. Ask a human steward to approve or correct important mappings.
8. Store approved mappings as the active semantic model.

Example:

Universal concept: Revenue

Customer A:

- Table: `fact_sales`
- Column: `total_amount`
- Aggregation: SUM
- Grain: order item

Customer B:

- Table: `sales`
- Column: `order_total`
- Aggregation: SUM
- Grain: order

Customer C:

- Table: `invoice`
- Column: `amount`
- Aggregation: SUM
- Grain: invoice line

Business concepts remain stable:

- Revenue
- Customer
- Order
- Product
- Payment
- Region
- Time

Warehouse implementation changes:

- table names
- column names
- joins
- grain
- filters
- domains

The engine must support:

- one concept mapped to one column
- one concept mapped to an expression
- one concept mapped to multiple columns
- domain-specific concept variants
- certified and uncertified mappings
- mapping versioning
- tenant-specific overrides

---

## Section 8: Dynamic SQL Generation

SQL should never be generated directly from raw user text.

Correct flow:

User question -> Intent -> Semantic Plan -> SQL Generation -> Validation -> Execution

SQL generation architecture:

- Input is a structured semantic query plan.
- SQL generator receives only approved metadata context.
- Generator uses the active semantic model.
- Generator produces BigQuery Standard SQL.
- Validator checks safety, scope, joins, grain, and cost before execution.

Metadata injection:

- Inject only relevant tables, columns, relationships, measures, dimensions, filters, and grain rules.
- Never inject the full warehouse schema into a prompt.
- Prefer deterministic template generation for common patterns.
- Use LLM-assisted generation only when deterministic templates cannot cover the request.

Hallucination prevention:

- The SQL generator cannot invent tables or columns.
- Every referenced table and column must exist in the metadata store.
- Every join must exist in the relationship graph.
- Every measure must map to a certified semantic definition.
- Every generated SQL query must pass validation before execution.

Validation:

- Parse SQL AST.
- Reject non-read operations.
- Reject unauthorized datasets.
- Reject unknown tables or columns.
- Reject Cartesian joins.
- Reject invalid grain joins.
- Reject unbounded expensive queries when policy requires limits.
- Dry-run against BigQuery.
- Estimate bytes processed.
- Enforce maximum bytes billed.
- Require partition filters where configured.

Unsafe SQL rejection:

- Return a structured error explaining that the request cannot be executed safely.
- Do not ask OpenAI to guess.
- If possible, recommend the nearest certified metric or dimension.

---

## Section 9: Universal Tool Engine

Current state:

- 100 hardcoded tools.
- Each tool represents a KPI or analysis pattern.
- SQL lives inside tools.

Future state:

- Universal tools represent analysis patterns.
- SQL lives in the semantic and generation layers.
- Tools know business intent, not schemas.

Future universal tools:

- `get_metric`
- `rank_dimension`
- `trend_metric`
- `compare_periods`
- `breakdown_metric`
- `filter_metric`
- `explain_metric`
- `list_business_concepts`
- `list_available_metrics`
- `list_available_dimensions`
- `explain_dataset`
- `explain_relationships`
- `generate_dashboard_summary`

Example:

Current:

- `get_top_customers()` executes SQL against known tables.

Future:

- Business intent: Top Customers
- Universal tool: `rank_dimension`
- Measure: Revenue
- Dimension: Customer
- Sort: Revenue descending
- Limit: 10
- Semantic Layer resolves mappings
- SQL Layer generates BigQuery SQL
- Validator approves
- Warehouse executes

Benefits:

- Fewer tools.
- More flexibility.
- Any warehouse can be onboarded.
- Tool registry becomes stable.
- New datasets require semantic mapping, not tool rewrites.

---

## Section 10: Warehouse Onboarding

Onboarding process:

1. Connect BigQuery  
   Register GCP project, dataset access, service account, region, and permissions.

2. Scan Warehouse  
   Metadata Engine reads BigQuery metadata and storage statistics.

3. Read INFORMATION_SCHEMA  
   Extract tables, columns, data types, descriptions, partitioning, clustering, constraints, and usage.

4. Profile Data  
   Compute safe statistics: row counts, uniqueness, null ratios, cardinality, date ranges, value samples where allowed.

5. Extract Relationships  
   Use constraints, naming patterns, query logs, uniqueness checks, and documentation to infer joins.

6. Detect Facts and Dimensions  
   Identify transaction tables, event tables, entity tables, time dimensions, slowly changing dimensions, and bridge tables.

7. Generate Business Model Draft  
   Identify candidate domains, entities, measures, dimensions, and KPIs.

8. Generate Semantic Layer Draft  
   Build candidate semantic mappings with confidence scores.

9. Generate Embeddings  
   Embed docs, glossary entries, metadata summaries, KPI definitions, and relationship notes.

10. Human Review  
   Data owner approves critical concepts, joins, and certified KPIs.

11. Validation  
   Run dry-run SQL checks and sample metric tests.

12. Platform Ready  
   Universal tools become available for the customer dataset.

---

## Section 11: Business Glossary Generator

The Business Glossary Generator creates business-friendly definitions from metadata, documentation, and approved semantic mappings.

Inputs:

- Table and column names.
- Descriptions.
- Data types.
- Sample values.
- Query usage.
- Existing documentation.
- Dashboard labels.
- KPI definitions.
- User-provided business rules.

Outputs:

- Business terms.
- Synonyms.
- Definitions.
- Related tables and columns.
- Related metrics and dimensions.
- Owner and certification status.
- Examples of use.
- Ambiguity warnings.

Generation approach:

- Infer glossary terms automatically.
- Link every glossary term to metadata evidence.
- Assign confidence score.
- Require human approval for certified enterprise terms.
- Version all glossary changes.

Example:

Business term: Revenue  
Definition: Total monetary value recognized from sales or invoices.  
Possible mappings: `sales.total_amount`, `invoice.amount`, `orders.order_total`  
Certification: Requires data owner approval.

---

## Section 12: Dataset Intelligence

Dataset Intelligence automatically understands analytical structure.

Capabilities:

- Fact detection  
  Identify high-volume transactional/event tables with measures and foreign keys.

- Dimension detection  
  Identify descriptive entity tables.

- Measure detection  
  Identify numeric columns suitable for SUM, AVG, MIN, MAX, COUNT.

- KPI detection  
  Infer common KPIs from measures, dimensions, and business glossary.

- Relationship detection  
  Infer joins from constraints, naming, uniqueness, data overlap, and query logs.

- Hierarchy detection  
  Identify hierarchies like country -> state -> city, year -> quarter -> month -> day, category -> product.

- Grain detection  
  Determine whether a table represents order, order item, customer, invoice, event, payment, review, shipment, etc.

- Slowly Changing Dimension detection  
  Detect effective dates, current flags, version numbers, and surrogate keys.

- Time intelligence  
  Identify date columns, calendar tables, fiscal calendars, and valid time grains.

Output:

- Dataset intelligence profile.
- Semantic model candidates.
- Relationship graph.
- Data quality observations.
- Mapping confidence report.

---

## Section 13: Enterprise Documentation Generator

The Documentation Generator creates enterprise-grade documentation from metadata and semantic models.

Generated documents:

- Data Dictionary  
  Technical tables, columns, data types, nullability, descriptions.

- Business Dictionary  
  Business terms, meanings, synonyms, owners, examples.

- Table Documentation  
  Purpose, grain, keys, relationships, usage, freshness.

- Column Documentation  
  Definition, data type, business meaning, quality notes.

- Architecture Documentation  
  Dataset architecture, source-to-analytics flow, semantic layer overview.

- Relationship Documentation  
  Join paths, cardinality, approved relationships, forbidden joins.

- KPI Documentation  
  Definition, formula, owner, grain, dimensions, filters, examples.

Documentation quality rules:

- Every generated statement should link back to metadata evidence.
- Certified docs require approval.
- Docs should be versioned.
- Docs should be searchable and embedded into the Vector Intelligence Layer.

---

## Section 14: Platform Modules

Future DDIP modules:

- DDIP Core  
  Platform orchestration, tenant context, configuration, lifecycle.

- AI Layer  
  User interaction, explanations, clarification, response style.

- Intent Engine  
  Request classification and business intent extraction.

- Universal Tool Engine  
  Stable MCP-facing tools based on analytical patterns.

- Semantic Engine  
  Business concepts, metrics, dimensions, grain, hierarchies, semantic plans.

- Metadata Engine  
  BigQuery scanning, profiling, metadata versioning.

- Vector Engine  
  Retrieval over documentation, glossary, metadata, and semantic definitions.

- Mapping Engine  
  Universal concept to warehouse-specific mapping.

- SQL Generation Engine  
  Semantic-plan-to-BigQuery SQL generation.

- Validation Engine  
  SQL safety, semantic validation, cost checks, dry-run enforcement.

- Warehouse Connector  
  BigQuery execution, query jobs, retries, cost controls.

- Knowledge Engine  
  Business and platform knowledge management.

- Documentation Engine  
  Generated enterprise docs.

- Security Engine  
  Auth, RBAC, tenant isolation, policy enforcement.

- Observability Engine  
  Logs, traces, metrics, audit events, quality dashboards.

- Governance Engine  
  Certification workflow, ownership, lineage, approvals.

- Cache Engine  
  Metadata, semantic, result, and query-plan caching.

---

## Section 15: Future MCP Architecture

Current MCP architecture is dataset-specific. Future MCP architecture should be universal.

Current:

- Tool: `get_total_revenue`
- SQL: embedded inside tool
- Dataset: known
- Tables and columns: known

Future:

- Tool: `get_metric`
- Intent: Total Revenue
- Semantic Layer: resolves Revenue
- Mapping Engine: resolves customer-specific schema
- SQL Engine: generates SQL
- Validator: approves SQL
- BigQuery Connector: executes SQL

Future MCP tools should expose capabilities, not dataset-specific SQL:

- Business metric tools
- Discovery tools
- Metadata tools
- Glossary tools
- Documentation tools
- Validation tools
- Dataset intelligence tools

MCP remains the boundary between AI and trusted execution.

Future MCP responsibilities:

- Expose universal analytical capabilities.
- Enforce semantic model usage.
- Prevent raw SQL execution from user prompts.
- Return structured results and metadata.
- Provide tool discovery from active semantic model.
- Support tenant/dataset context.

---

## Section 16: Product Roadmap

Phase 1: Metadata Foundation

- Build Metadata Engine.
- Extract BigQuery metadata.
- Store tables, columns, types, descriptions, stats.
- Add schema versioning.
- Add metadata sync jobs.

Dependencies:

- BigQuery permissions.
- Metadata storage.
- Tenant/dataset configuration.

Phase 2: Semantic Model Foundation

- Create universal concept registry.
- Build semantic mapping model.
- Add facts, dimensions, measures, relationships, grain.
- Add certification workflow.

Dependencies:

- Metadata Engine.
- Business glossary structure.

Phase 3: Universal Tool Engine

- Introduce universal MCP tools.
- Keep current hardcoded tools during transition.
- Add semantic query plan generation.
- Add deterministic validation.

Dependencies:

- Semantic Engine.
- Mapping Engine.
- Validation Engine.

Phase 4: Vector and Documentation Intelligence

- Add vector store.
- Embed glossary, metadata docs, KPI docs, semantic definitions.
- Generate documentation automatically.
- Add retrieval-grounded semantic assistance.

Dependencies:

- Metadata and semantic model.
- Documentation generator.

Phase 5: Enterprise Platform

- Add tenant isolation.
- Add auth/RBAC.
- Add observability.
- Add query budgets and governance.
- Add admin console for semantic approval.
- Add multi-warehouse and multi-domain support.

Dependencies:

- Stable semantic runtime.
- Security and governance engines.

---

## Section 17: Technology Recommendations

Preserve:

- FastAPI backend.
- OpenAI integration.
- Custom FastMCP server.
- BigQuery warehouse.
- Deterministic routing pattern.

Recommended vector database:

- Short term: PostgreSQL with pgvector for simplicity and operational control.
- Enterprise scale: Vertex AI Vector Search if the platform standardizes on Google Cloud.
- Alternative: Qdrant for open-source vector search with strong filtering.

Recommended metadata storage:

- PostgreSQL for semantic metadata, registry, tenants, mappings, approvals, versions.
- BigQuery for large-scale profiling results and historical metadata snapshots.
- Graph extension or separate graph store later if relationship complexity grows.

Recommended caching:

- Redis for short-lived query-plan, metadata, and tool-discovery cache.
- BigQuery result cache for warehouse-level optimization.
- Application-level cache for certified metadata and semantic models.

Recommended configuration:

- Environment variables for deployment basics.
- PostgreSQL-backed tenant/dataset configuration for runtime platform settings.
- Secret Manager for credentials.

Recommended prompt storage:

- Versioned prompt registry in PostgreSQL.
- Prompt templates linked to semantic model versions.
- Approval workflow for production prompts.

Recommended knowledge storage:

- Source documents in object storage or Git.
- Parsed knowledge chunks in metadata store.
- Embeddings in vector store.
- Certified definitions in semantic store.

---

## Section 18: Final Architecture

The final DDIP architecture should be implementation-ready as follows:

```text
User / Frontend
    ↓
FastAPI Backend
    - request validation
    - tenant context
    - intent classification
    - response contract
    ↓
Intent Engine
    - KPI
    - discovery
    - dataset intelligence
    - documentation
    - glossary
    - technology
    ↓
Universal Tool Engine
    - stable MCP tools
    - business intent payloads
    - no SQL
    - no table names
    ↓
FastMCP Server
    - trusted execution boundary
    - tool registry
    - tenant-aware semantic runtime
    ↓
Semantic Intelligence Layer
    - concept registry
    - metrics
    - dimensions
    - relationships
    - grain
    - hierarchies
    - semantic query plans
    ↓
Metadata + Vector Context
    - BigQuery metadata
    - glossary
    - documentation
    - KPI definitions
    - relationship graph
    ↓
Semantic Mapping Engine
    - universal concept to warehouse mapping
    - confidence scores
    - approval state
    - version control
    ↓
SQL Generation Engine
    - semantic plan to BigQuery SQL
    - deterministic templates first
    - LLM assistance only with strict metadata grounding
    ↓
Validation Engine
    - AST validation
    - dataset scope
    - join validation
    - grain validation
    - dry-run
    - cost controls
    ↓
BigQuery Connector
    - query execution
    - retries
    - job labels
    - maximum bytes billed
    - structured results
    ↓
OpenAI Explanation Layer
    - explains verified results only
    - no fabricated metrics
    - uses business glossary and semantic metadata
    ↓
Final Business Answer
```

Key architectural decisions:

- Keep the current working architecture.
- Add semantic intelligence between intent and SQL.
- Replace dataset-specific SQL tools with universal intent tools over time.
- Make metadata and semantic mappings the source of truth.
- Use vector search for retrieval-grounded context, not memory.
- Validate every generated query before BigQuery execution.
- Require human certification for enterprise-critical metrics.
- Treat MCP as the trusted execution boundary.

Final principle:

DDIP should not be a chatbot that writes SQL.  
DDIP should be a governed semantic intelligence platform that understands business meaning, maps it to any BigQuery warehouse, executes validated analytics, and explains trusted results.

