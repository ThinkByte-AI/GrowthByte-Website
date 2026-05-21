# Repos Context — GrowthByte-Website + SeoByte

Dense reference for both repos so future sessions can skip the re-exploration. Snapshot as of 2026-05-21. **Facts only** — strategy/recommendations live in `MULTI_TENANT_CMS_PLAN.md`.

---

## 1. Quick reference

| | GrowthByte-Website | SeoByte |
|---|---|---|
| Path | `C:\Users\abc\GrowthByte-Website` | `C:\SeoByte` |
| GitHub | `github.com/ThinkByte-AI/GrowthByte.git` | (not checked) |
| Branch | `main` (clean) | (not checked) |
| Type | Next.js + Payload CMS site | Turborepo monorepo (Next.js + FastAPI + FastMCP) |
| Tenancy | Single-tenant | Single-tenant (scoped by `SEOBYTE_ORG_ID`) |
| DB | MongoDB (Mongoose adapter) | Supabase / Postgres |
| Purpose today | GrowthByte's own marketing site | AI-powered SEO workflow engine (workflow/agent/skill authoring) |
| Intended future role | The CMS engine | The SaaS shell that hosts the CMS for many clients |

---

## 2. GrowthByte-Website

### 2.1 Tech stack

- Next.js **16.2.6** (App Router) + React **19.2.6**
- Payload CMS **3.84.1** with `@payloadcms/db-mongodb`, `@payloadcms/richtext-lexical`, `@payloadcms/plugin-seo`, `@payloadcms/storage-s3`
- AWS S3 for media (`ap-south-1` default region)
- MongoDB via `DATABASE_URI`
- Tailwind **3.4.19**, TypeScript **5.3.3**, ESLint **9.35.0**
- GrapesJS (`0.22.16`) — planned visual builder, not yet fully integrated
- Hosting: Vercel (`vercel.json` declares one cron: `/api/blog-posts/publish-scheduled` every 5 min)

### 2.2 Directory layout

```
GrowthByte-Website/
  app/
    (site)/                 # public marketing site
      about/  blog/  blogs/[slug]/  case-studies/[slug]/  contact/
      industries/[slug]/  insights/  pricing/  services/[slug]/
      layout.tsx            # root layout w/ metadata, GA tag, Inter font
      page.tsx              # homepage
      sitemap.ts            # static sitemap (NOT CMS-driven yet)
      robots.ts
      opengraph-image.tsx   # global OG image
      globals.css
    (payload)/
      admin/                # Payload admin route group
      api/                  # Payload's REST/GraphQL endpoints
    api/
      contact/              # Next.js route handler — contact form
    preview/                # template preview route
    layout.tsx              # outermost layout
  src/
    payload.config.ts       # Payload buildConfig — entry point
    get-payload.ts          # getPayloadClient() helper
    collections/
      BlogPosts/  (index.ts, access.ts, fields/, hooks.ts, schema.ts,
                   publishScheduledEndpoint.ts)
      CaseStudies/  (index.ts, fields.ts, hooks.ts, schema.ts)
      Services/     (index.ts, fields.ts, hooks.ts, schema.ts)
      PageTemplates/  (index.ts, stylingGroup.ts)
      Industries.ts
      Media.ts
      Users.ts
    components/TemplateEditor/  # GrapesJS-related UI
  payload-plugins/
    TemplateEditorPlugin/   # custom plugin — dual-mode HTML/visual editor
      index.tsx, CodeTab.tsx, DynamicTemplateEditor.tsx,
      LoadingPlaceholder.tsx, ReadOnlyPlaceholder.tsx,
      TabBar.tsx, previewWindow.ts, styles.ts, types.ts
  components/                # presentational React (NO direct DB calls)
    CTA.tsx, Header.tsx, TocActiveSpy.tsx
    Footer/  sections/  template/
  lib/                       # pure helpers, framework-agnostic
    api/        (config, fetchContent, fetchTemplate, fetchRelatedContent,
                 fetchSidebarData, index)
    templateRenderer/  (renderTemplate, placeholders, replaceBlocks,
                        replaceContent, replaceField, buildTocHtml,
                        buildTypographyCss, types)
    templates/  (defaults/, types.ts, index.ts)
    schema/     (JsonLd.tsx, faqPage, howTo, index)
    constants/  (SERVICES, INDUSTRIES, CASE_STUDY_HIGHLIGHTS — used by sitemap)
    lexicalToHtml.ts
    structured-data.ts        # organizationSchema, websiteSchema
    types.ts, utils.ts
  docs/stories/              # (story files — not deeply inspected)
  media/                     # local media (legacy / dev)
  public/
  next.config.mjs            # wraps next config with withPayload()
  vercel.json                # cron for publish-scheduled
  CLAUDE.md                  # code standards (see §2.7)
  SEO_PLAN.md                # SEO roadmap
  CUSTOM_CMS_OVERVIEW.md     # CMS implementation summary
  CMS-FEATURES-GUIDE.md, DEPLOYMENT.md, OPTIMIZATION_SUMMARY.md
  MULTI_TENANT_CMS_PLAN.md   # platform vision (this session)
  Schema Sample.docx
  push-to-github.ps1
```

### 2.3 Payload collections

| Slug | File | Notes |
|---|---|---|
| `users` | `src/collections/Users.ts` | Auth (5 max attempts, 30-min lockout). `name` field only. Used as Payload admin user. |
| `services` | `src/collections/Services/` | `useAsTitle: 'title'`. Public read. Has `beforeChangeService` hook. Auto-generates Service JSON-LD. |
| `industries` | `src/collections/Industries.ts` | Public read. `regenerateSchema` checkbox + `seoSchema` JSON field. Generates WebPage JSON-LD via `generateIndustrySchema(data)` inside the file. |
| `case-studies` | `src/collections/CaseStudies/` | Public read. Article JSON-LD auto-generated. |
| `blog-posts` | `src/collections/BlogPosts/` | **Most complex.** Versions w/ autosave drafts (50 max). Workflow states: `draft → review → published → scheduled → archived`. `publishedAt` + `unpublishAt`. Custom endpoint `/publish-scheduled` (cron). Public access filters: `_status = published` AND `publishedAt <= now` AND `(unpublishAt = null OR unpublishAt > now)`. Has hero, gallery, video embed, pull quotes, sidebar widgets, computed read time, author profile. Categories: Growth Strategy / Performance Marketing / SEO / Marketing Automation / Analytics / Industry Insights. |
| `media` | `src/collections/Media.ts` | Auto-resizes: thumbnail (300×300), card (768×512), hero (1920×1080). S3-backed. `alt` field (currently NOT required — flagged in SEO_PLAN). Image mime types only. |
| `page-templates` | `src/collections/PageTemplates/` | Visual/code dual editor (GrapesJS planned). `type`: blog/service/landing/case-study. `isDefault` per type. `customLayout.{html, css, components}`. Preview at `/preview/templates/[id]`. UI field hooks up `@/payload-plugins/TemplateEditorPlugin#TemplateEditorField`. |

### 2.4 Lexical editor features (in `payload.config.ts`)

All headings h1-h6, Bold, Italic, Underline, Strike, Sub/Superscript, InlineCode, Link (with `rel` select: noopener/noreferrer/nofollow, no enabled collections for internal links), ordered/unordered/checklist lists, Blockquote, HorizontalRule, Align, Indent, Upload (with caption + alt fields on media), Relationship (`services`, `case-studies`, `blog-posts`), FixedToolbar + InlineToolbar.

### 2.5 SEO plugin config

```ts
seoPlugin({
  collections: ['blog-posts', 'case-studies', 'services', 'industries'],
  uploadsCollection: 'media',
  tabbedUI: true,
})
```

### 2.6 Page rendering — template flow (key insight)

A page like `/blogs/[slug]` does:

1. `getBlogPost(slug)` — fetch the post.
2. `resolveBlogTemplate(post)` — find the assigned or default `page-templates` doc.
3. If the template has `customLayout.html` → run `renderTemplate(template, post, ctx)` from `lib/templateRenderer/`, which does placeholder substitution (`{{title}}`, `{{content}}`, `{{#relatedPosts}}…{{/relatedPosts}}`, etc.), converts Lexical to HTML via `lib/lexicalToHtml.ts`, and `dangerouslySetInnerHTML`s the result.
4. Otherwise → fall back to `_components/FallbackArticle`.
5. `PostJsonLdScripts` emits structured data in either case.

So **page-templates are a first-class concept** — content + template = page. Multi-tenant design must preserve this.

### 2.7 Code standards (from `CLAUDE.md`)

- Functions ≤ ~60 lines. React components' main body ≤ ~60 lines. Files ≤ 150 lines.
- Verb-led function names, noun-led component names. No vague names (`handle`, `process`, `Wrapper`).
- Split oversized files via sibling files or folder-with-`index.ts` barrels.
- Default to NO comments; comments must explain **why**.
- `app/` is routes only — no business logic; delegate to `lib/` or `src/`.
- `components/` is presentational — no direct DB/Payload calls.
- Files: `kebab-case.ts` for utils, `PascalCase.tsx` for components, `PascalCase.ts` for collections.
- Booleans prefixed `is`/`has`/`should`/`can`.
- Errors handled at boundaries (route/server-action/hook); don't wrap every call.

### 2.8 SEO state (from `SEO_PLAN.md`)

**Done**: `metadataBase`, per-page canonicals, per-page title/description from CMS, JSON-LD (BlogPosting/Service/Article/WebPage), `/sitemap.xml`, `/robots.txt`, global OG image, Payload SEO plugin.

**Pending** (Phase 1, highest-impact): CMS-driven sitemap with real `updatedAt`; per-post OG images; Twitter Cards; `noindex` for non-published states.

**Known gaps**: no BreadcrumbList/FAQ/Organization-on-home schemas, no auto-301 on slug change, no `alt` validation, no GSC/GA wiring docs.

### 2.9 Env vars

```
DATABASE_URI=mongodb://...
PAYLOAD_SECRET=...
S3_BUCKET=...
S3_REGION=ap-south-1
S3_ACCESS_KEY_ID=...
S3_SECRET_ACCESS_KEY=...
VERCEL_URL=... (production)
```

### 2.10 Image config (`next.config.mjs`)

- `formats: ['image/avif', 'image/webp']`
- `remotePatterns: [{hostname: 'localhost'}, {hostname: '*.growthbyte.ai'}]`
- `unoptimized: true` (for Payload media serving — note: this disables Next's image optimizer)
- Device sizes: 640, 750, 828, 1080, 1200, 1920, 2048, 3840
- `compress: true`, `poweredByHeader: false`, `optimizePackageImports: ['lucide-react']`

### 2.11 Root layout metadata (`app/(site)/layout.tsx`)

- `metadataBase: 'https://www.growthbyte.ai'`
- Title template: `'%s — GrowthByte'`
- Google Search Console verification: `jbQWvQPuXS1f5YYxhgJpuqaE0Ey0DplprdQtFdcaO0s`
- Twitter card: `summary_large_image`
- GA4 ID: `G-BRK30WK0FW` (hardcoded in layout via `next/script`)
- `organizationSchema` and `websiteSchema` injected via `metadata.other['script:ld+json']`

### 2.12 Sitemap (`app/(site)/sitemap.ts`) — known gap

Uses STATIC lists from `lib/constants` (`SERVICES`, `INDUSTRIES`, `CASE_STUDY_HIGHLIGHTS`) — **does not query Payload**, so CMS-created blog posts and CMS-added entries are not in the sitemap. `lastModified: new Date()` is hardcoded. This is item #1 on SEO_PLAN Phase 1.

### 2.13 Cron — scheduled publishing

`vercel.json` runs `POST /api/blog-posts/publish-scheduled` every 5 minutes. Endpoint code is in `src/collections/BlogPosts/publishScheduledEndpoint.ts`. It batches in groups of 100, finds posts where `workflowStatus=scheduled` AND `publishedAt <= now` and flips them to `published`; then finds `workflowStatus=published` AND `unpublishAt <= now` and flips them to `archived`.

---

## 3. SeoByte

### 3.1 Tech stack

- Monorepo: pnpm workspaces (`apps/*`, `packages/*`) + Turborepo
- Node ≥ 20.11, pnpm ≥ 8.0, Python 3.11+, Poetry
- `apps/web`: Next.js **15.3.0**, React **18.3.1**, shadcn-style Radix UI components, SWR, React Hook Form + Zod, framer-motion, `@xyflow/react` (node-based editor), mermaid, sonner, lucide
- `apps/api`: FastAPI **0.120.x**, Pydantic v2, pydantic-settings, supabase-py **2.x**, python-jose, python-json-logger
- `apps/mcp`: FastMCP (StreamableHTTP transport at `POST /mcp`)
- `packages/eslint-config` — shared lint config
- Persistence: **Supabase (Postgres)** for everything

### 3.2 Directory layout

```
SeoByte/
  apps/
    web/                     # Next.js 15 dashboard (port 3000)
      app/
        agents/  executions/  knowledge/  mcp/  onboard/
        projects/  skills/  templates/  workflows/
        layout.tsx, page.tsx, globals.css
      components/
        ui/  layout/  agents/  knowledge/  mcp/  onboard/
        skills/  templates/  workflows/
      hooks/
        use-workflows.ts, use-agents.ts, use-skills.ts,
        use-clients.ts, use-kb-sections.ts, use-onboard.ts,
        use-workflow-templates.ts, use-seobyte-mcp.ts,
        use-toast.ts, toast-state.ts
      lib/
        api-client.ts        # typed fetch → NEXT_PUBLIC_API_URL
        mcp-client.ts, mcp-build-args.ts, mcp-session-ops.ts
        swr-fetcher.ts, logger.ts, utils.ts, mock-executions.ts
        types/  workflows/  data/
      middleware.ts          # ONLY logs requests — no auth/tenant routing
      next.config.js, tailwind.config.ts, tsconfig.json
    api/                     # FastAPI (port 8000)
      app/
        main.py              # app factory, CORS, router mount, /health
        config.py            # pydantic-settings (SEOBYTE_ORG_ID, SUPABASE_*, CORS_ORIGINS)
        dependencies.py      # get_supabase(), get_org_id()
        lib/                 # logger config etc
        routers/             # workflows, agents, skills, projects,
                             # knowledge, clients, templates, kb_sections
        services/            # workflow_service, agent_service, skill_service,
                             # project_service, knowledge_service,
                             # client_service, kb_section_service,
                             # supabase_client, supabase_logging,
                             # playbook_registry, template_registry
        models/              # workflow, agent, skill, project, knowledge,
                             # client, template, kb_section, common
        templates/, workflows/
      pyproject.toml, README.md, CLAUDE.md
    mcp/                     # FastMCP (port 8051) — not deeply inspected
  packages/
    eslint-config/
  supabase/
    config.toml
    migrations/              # all dated 2026-04-15 (see §3.5)
  scripts/
  turbo.json
  pnpm-workspace.yaml
  package.json, pnpm-lock.yaml
  README.md, CLAUDE.md
```

### 3.3 API surface

All routes mounted under `/fastapi/seobyte/*` (reserved namespace — Next's `/api/*` is for the web app only). Routers loaded in `apps/api/app/main.py`:

`workflows`, `agents`, `skills`, `projects`, `knowledge`, `clients`, `templates`, `kb_sections`.

Single-tenant via `get_org_id()` returning `settings.seobyte_org_id`. No per-request org switching.

### 3.4 Web app

- Dashboard routes mirror the API surface: `/workflows`, `/agents`, `/skills`, `/projects`, `/knowledge`, `/templates`, `/onboard`, `/executions`, `/mcp`.
- All data calls go through `lib/api-client.ts` to `NEXT_PUBLIC_API_URL`. Browser does not touch Supabase directly.
- `middleware.ts` currently just logs requests — no auth or tenant routing yet.
- MCP Tools page calls `NEXT_PUBLIC_MCP_URL` directly from the browser (CORS allowed in `apps/mcp`).

### 3.5 Supabase schema (`supabase/migrations/`)

All migrations dated `2026-04-15`, applied via `supabase link` + `supabase db push`. RLS is enabled on every table (but policies not inspected here).

| Order | File | Table / change |
|---|---|---|
| 00 | `seobyte_organizations.sql` | `organizations(id, name, created_at)` — tenant root |
| 01 | `seobyte_org_workflow_configs.sql` | per-org workflow configs |
| 02 | `seobyte_org_workflow_versions.sql` | workflow versioning |
| 03 | `seobyte_org_agent_templates.sql` | agent templates |
| 04 | `seobyte_org_skill_configs.sql` | skill configs |
| 05 | `seobyte_updated_at_triggers.sql` | shared `seobyte_set_updated_at()` trigger fn |
| 06 | `seobyte_org_projects.sql` | projects |
| 07 | `seobyte_org_knowledge_items.sql` | knowledge items |
| 08 | `seobyte_org_clients.sql` | `org_clients(id, organization_id, name, description, avatar_color, tags[], created_at, updated_at)` — **per-org "clients" concept already exists** |
| 09 | `add_client_id_to_projects_and_knowledge.sql` | wires projects + knowledge to clients |
| 10 | `add_domain_location_to_clients.sql` | adds `domain` + `location` text fields to clients |
| 11 | `add_industry_tier_settings_to_clients.sql` | adds industry/tier/settings to clients |
| 12 | `seobyte_knowledge_base_sections.sql` | `org_knowledge_base_sections(client_id, section_number, section_key, title, content, structured_data jsonb, version, is_complete, gap_score, last_reviewed_at)` |
| 13 | `randomize_client_colors.sql` | data migration |

**Key insight**: `org_clients` already has `domain` and `location`. This is the natural attachment point for "which tenant owns which custom domain" if we extend SeoByte into the CMS platform.

### 3.6 Conventions (from `CLAUDE.md`)

- **API routing split**: `/api/*` → Next.js handlers only; `/fastapi/*` → FastAPI only. Never collide.
- **Python imports** always at module level — never inside functions or conditionals.
- **MCP transport**: StreamableHTTP (`type: "http"`) in editor MCP config.
- Python: Google-style docstrings, `isinstance()` for type validation.
- TypeScript: strict typing, `typeof` + `isNaN` for runtime validation.
- React: functional components + TypeScript; escape apostrophes in JSX with `&apos;`.
- File length ≤ 150 lines; functions ≤ ~60 lines; React component bodies ≤ ~60 lines (same as GrowthByte).
- Prefer **why**-style comments; clear names over commentary.

### 3.7 Env vars

```
# apps/api/.env
SEOBYTE_ORG_ID=<uuid>
SUPABASE_URL=https://<project>.supabase.co
SUPABASE_SERVICE_KEY=<service-role-key>
CORS_ORIGINS=http://localhost:3000

# apps/mcp/.env
MCP_PORT=8051
MCP_HOST=0.0.0.0
CORS_ALLOWED_ORIGINS=...

# apps/web/.env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_MCP_URL=http://127.0.0.1:8051
```

### 3.8 Forbidden ops (from `CLAUDE.md`)

- No FastAPI routes under `/api/*`.
- No `rm -rf /`, `DROP TABLE`, `DELETE FROM` without explicit confirmation.

---

## 4. How they relate today vs. the intended future

### Today (as of 2026-05-21)

- **No code-level relationship.** Two unrelated repos, two databases (Mongo vs. Postgres), two stacks (Payload+Next vs. Next+FastAPI), no shared deploy.
- GrowthByte-Website serves `growthbyte.ai` and its CMS surface.
- SeoByte is internal tooling for SEO workflows/agents/skills.

### Intended future (vision stated 2026-05-21)

- Turn the CMS into a **multi-tenant SaaS hosted on the SeoByte platform**.
- Clients sign up → author content → their `/blog` (and other CMS pages) get served from SeoByte even when their main site is hosted elsewhere.
- Edge routing approach must be **SEO-first** → subdirectory (`client.com/blog`) via reverse proxy, not subdomain.
- See `MULTI_TENANT_CMS_PLAN.md` for the full options matrix (tenancy model, custom-domain routing, authoring surface, code location, SEO requirements).

---

## 5. Key files cheat sheet (for future-me)

When you need to know X, open Y first.

| To learn... | Open |
|---|---|
| Payload config / collections wiring | `GrowthByte-Website/src/payload.config.ts` |
| What a blog post looks like in the DB | `src/collections/BlogPosts/fields/` + `index.ts` |
| How a blog page is rendered | `app/(site)/blogs/[slug]/page.tsx` → `_fetchers.ts` → `lib/templateRenderer/` |
| Template placeholder system | `lib/templateRenderer/placeholders.ts` + `replaceBlocks.ts` + `replaceField.ts` |
| Lexical → HTML conversion | `lib/lexicalToHtml.ts` |
| Visual template editor | `payload-plugins/TemplateEditorPlugin/` |
| Scheduled publishing cron | `vercel.json` + `src/collections/BlogPosts/publishScheduledEndpoint.ts` |
| Current sitemap (and its gap) | `app/(site)/sitemap.ts` |
| SEO roadmap | `SEO_PLAN.md` |
| CMS overview narrative | `CUSTOM_CMS_OVERVIEW.md` |
| Code rules for both repos | `GrowthByte-Website/CLAUDE.md`, `SeoByte/CLAUDE.md`, `SeoByte/apps/web/CLAUDE.md`, `SeoByte/apps/api/CLAUDE.md` |
| SeoByte API entry | `SeoByte/apps/api/app/main.py` |
| SeoByte tenant scoping | `SeoByte/apps/api/app/dependencies.py` (`get_org_id`) + `config.py` |
| SeoByte schema (everything) | `SeoByte/supabase/migrations/` (read in order) |
| "Clients" concept in SeoByte | migrations 08, 09, 10, 11 |
| SeoByte web data layer | `SeoByte/apps/web/lib/api-client.ts` + `hooks/use-*.ts` |
| Multi-tenant platform plan | `MULTI_TENANT_CMS_PLAN.md` |

---

## 6. Things to verify before recommending changes

Memory/notes go stale. Before quoting specifics:

- File or path mentioned here → check it exists (refactors happen).
- Field on a collection → confirm in `src/collections/<X>/fields*.ts`.
- DB schema → grep migrations; column may have been added in a later one.
- "Single-tenant" status of SeoByte → check if multi-tenant work has landed since this snapshot.
- Next/Payload versions → both move fast; verify `package.json` before relying on a feature.

---

*Snapshot doc — regenerate when significant structure changes. Last full scan: 2026-05-21.*
