# Multi-Tenant CMS Platform — Planning Doc

Working notes for turning the GrowthByte CMS into a hosted, multi-tenant, SEO-first SaaS served from the SeoByte platform. **Not a decision record yet** — captures current state, options, and tradeoffs as of 2026-05-21.

---

## 1. Current state

### `C:\Users\abc\GrowthByte-Website` (this repo)

- Next.js 15 App Router + Payload CMS, **single-tenant**.
- Publishing routes: `/blog`, `/blogs`, `/case-studies`, `/services`, `/industries`, `/insights`, `/about`, `/contact`, `/pricing`.
- Payload collections: `BlogPosts`, `CaseStudies`, `Industries`, `Services`, `PageTemplates`, `Media`, `Users`.
- Custom Payload plugins live under `payload-plugins/`.
- Existing SEO scaffolding: `sitemap.ts`, `robots.ts`, `opengraph-image.tsx`, canonical URLs, JSON-LD schema (per recent commits `2966f33`, `34efb66`).
- This is the **rendering / publishing** surface — the part clients would "see."

### `C:\SeoByte`

- Turborepo monorepo (pnpm).
- `apps/web` — Next.js 15 dashboard (workflows, agents, skills authoring UI).
- `apps/api` — FastAPI, **single-tenant** (scoped by `SEOBYTE_ORG_ID` env var, "no per-request org switching in v1").
- `apps/mcp` — FastMCP StreamableHTTP server.
- Supabase (Postgres) for persistence.
- Today it's a workflow/agent/skill authoring tool — **not a content CMS**. It's the SaaS shell (auth-ready, org concept, multi-app monorepo) that the CMS could plug into.

### Gap

Neither side is multi-tenant. The CMS (Payload, content models, rendering) lives in GrowthByte-Website. The SaaS shell (org, Supabase, dashboard layout) lives in SeoByte. They need to converge.

---

## 2. Goal

Productize the CMS so **any client** can:

1. Sign up on the SeoByte platform.
2. Author blog posts, case studies, services, etc.
3. Have their content served at **their own domain** — `client.com/blog`, `client.com/case-studies/...` — even when `client.com` is hosted somewhere else (Webflow, WordPress, Squarespace, custom origin, whatever).
4. Get **full SEO benefit on their root domain**, not on a subdomain we control.

Mental model: HubSpot CMS / Webflow's reverse-proxy / Shopify's subdirectory offering — not a "blog.client.com" subdomain product.

---

## 3. SEO requirements (the load-bearing constraint)

These are non-negotiable for an SEO product. Every architectural choice below is measured against them.

### 3.1 URL & domain
- **Content lives on the client's apex domain under a subdirectory** (`client.com/blog/<slug>`). Subdomains (`blog.client.com`) split link equity and are not acceptable as the default.
- One canonical URL per page. No `?utm=`-style duplicates indexed.
- Clean, hierarchical slugs. No IDs in URLs.
- 301 redirects on slug changes (per-tenant redirect map).
- Trailing-slash policy enforced consistently (pick one, redirect the other).

### 3.2 Rendering
- **SSR or SSG, not client-only rendering.** All content visible in initial HTML for crawlers. Next.js App Router handles this — must not regress.
- ISR (Incremental Static Regeneration) for blog/listing pages — fast TTFB, fresh content.
- No content gated behind JS hydration.

### 3.3 Metadata
- Per-page `<title>`, meta description, canonical, Open Graph, Twitter card, JSON-LD (`Article`, `BreadcrumbList`, `Organization`, `WebSite`).
- Per-tenant defaults (brand name, logo, default OG image) overridable per page.
- Open Graph image generation (already present via `opengraph-image.tsx` — needs to be tenant-aware).

### 3.4 Crawl & indexing
- Per-tenant `sitemap.xml` served at the right path (`client.com/blog/sitemap.xml` or `/sitemap-blog.xml`).
- Per-tenant `robots.txt` directives — staging tenants must be `noindex`.
- Proper HTTP status codes — 404 for missing posts (not 200 + empty), 301 for moved content, 410 for permanently removed.
- `lastmod` timestamps in sitemap, accurate.

### 3.5 Performance (Core Web Vitals)
- LCP < 2.5s, INP < 200ms, CLS < 0.1 on real client domains.
- Edge caching for HTML; long-cache hashed assets.
- `next/image` with proper `sizes` for responsive images, AVIF/WebP.
- Font loading via `next/font` with `display: swap`.
- Preload critical resources; defer non-critical JS.

### 3.6 Structured data & internal linking
- JSON-LD for every content type (Article, FAQ, BreadcrumbList, Product where relevant).
- Breadcrumb UI matches breadcrumb JSON-LD.
- Internal linking between posts (related posts, category pages).
- hreflang for tenants who run multi-language sites.

### 3.7 Analytics & verification
- Per-tenant Google Search Console verification (DNS TXT or HTML meta).
- Per-tenant GA4 / Plausible / etc. tag injection.
- Server-side logging of crawler hits, response codes, 404s.

---

## 4. Tenancy model — options

### Option A — Shared Payload + tenant scoping  *(recommended starting point)*
- One Payload instance, one DB.
- Add a `Tenants` collection. Every other collection gets a `tenantId` field with access-control filters.
- Use [`@payloadcms/plugin-multi-tenant`](https://payloadcms.com/docs/plugins/multi-tenant) (official).
- **Pros**: fastest to ship, single deploy, single migration story, cheap.
- **Cons**: noisy-neighbor risk; one tenant's bad query slows others; per-tenant customization is harder; one DB outage = all tenants down.

### Option B — Per-tenant Payload instance (WordPress-style)
- Each client gets isolated DB + media storage; control plane provisions a tenant on signup.
- **Pros**: hard isolation, per-tenant plugins/themes, easier to migrate one tenant out.
- **Cons**: N migrations, N backups, N deploys; ops burden grows linearly with customers; expensive at low tenant counts.

### Option C — Hybrid
- Shared Payload by default; offer dedicated instance as an enterprise tier.

**Recommendation**: start with A. Move to C if a paying customer demands isolation. B as a starting point is over-engineering.

---

## 5. Custom-domain routing — options (where SEO bites hardest)

DNS alone cannot do path-splitting. DNS resolves hostnames, not paths. So `client.com/blog` served by us requires an HTTP-layer rewrite at the **client's edge**, not just a DNS record.

### Option 1 — Reverse proxy / subdirectory  *(SEO-optimal, recommended default)*
- Client's CDN/edge rewrites `client.com/blog/*` → `cms.seobyte.com/<tenant>/blog/*`.
- Content appears on the apex domain → **full link-equity consolidation**.
- Implementation depends on what the client uses for their main site:
  - **Cloudflare** in front of their site → one Worker, ~20 lines, we ship the snippet.
  - **Vercel** → `next.config.js` `rewrites()` or `vercel.json` rewrite.
  - **Nginx / Apache** → one `location /blog` block.
  - **Netlify** → `_redirects` rule.
  - **AWS CloudFront** → behavior + origin pointing at our hostname.
- **Pros**: SEO win — this is the whole product pitch. URLs stay on `client.com`.
- **Cons**: client has to configure their edge (one-time, but a real onboarding step); we have to handle host-header rewriting, cookie scoping, and asset paths carefully.

### Option 2 — Subdomain (`blog.client.com`)
- Client adds a CNAME → our platform.
- We terminate SSL via Cloudflare for SaaS / Vercel custom-domains / Caddy on-demand TLS.
- **Pros**: DNS-only on client side; instant onboarding; automatic SSL.
- **Cons**: **SEO penalty** — Google treats subdomains as largely separate sites. Link equity from `client.com` does not fully flow to `blog.client.com`. For an SEO product, this is a hard "no" as the default.
- Could exist as a fallback for clients whose edge we genuinely can't reach, but should not be marketed as the primary mode.

### Option 3 — Hybrid (recommended overall)
- **Default**: subdirectory via reverse proxy. Onboarding ships a per-CDN snippet (Cloudflare/Vercel/Nginx).
- **Fallback**: subdomain for clients with no edge to configure.
- **Pitch**: "we host your blog on your domain, where the SEO compounds — not on a subdomain you'll regret in 18 months."

### Edge-layer concerns (whichever option)
- **Host header rewriting** — our origin must render with the client's hostname so canonical URLs, OG URLs, and internal links are correct.
- **Asset paths** — images, CSS, JS must resolve through the proxy. Either rewrite to absolute URLs that the proxy also serves, or namespace assets under `/blog/_assets/`.
- **Cookies** — scope to the right host; never leak our platform cookies to the client domain.
- **Cache invalidation** — when a post is published, we must purge the client's CDN, not just ours.
- **CSP / security headers** — coordinate so the client's existing CSP doesn't block our embedded content.

---

## 6. Where the CMS code should live — options

### Option α — Keep GrowthByte-Website separate, add tenant scoping in place
- **Pros**: smallest move; current deploy keeps working.
- **Cons**: two repos to keep in sync; SeoByte dashboard can't reach Payload directly; awkward identity story.

### Option β — Fold GrowthByte-Website into SeoByte as `apps/cms`
- Move Payload + rendering routes into `C:\SeoByte\apps\cms`.
- Share Supabase as the underlying DB (Payload supports Postgres adapter), unifying tenants with SeoByte's existing org concept.
- SeoByte's `apps/web` dashboard adds CMS authoring screens (or keeps Payload admin as an embedded surface).
- **Pros**: one identity, one org model, one deploy pipeline, one place to ship.
- **Cons**: real migration work; Payload's Mongo-vs-Postgres adapter choice matters; risk of conflating concerns.

### Option γ — New `apps/cms` in SeoByte; GrowthByte-Website stays as the **first tenant** (dogfood)
- Build `apps/cms` fresh as multi-tenant from day one.
- Migrate GrowthByte's content into it as tenant `growthbyte`.
- Original repo becomes a thin reference / archive.
- **Pros**: clean break, no half-migrated state; GrowthByte itself proves the platform works.
- **Cons**: highest upfront cost; risk of "rewrite" trap.

**Recommendation**: β. The migration is real but bounded, and we keep the working CMS code instead of rebuilding.

---

## 7. Authoring surface — options

### Option i — Keep Payload Admin as-is
- Tenant-scoped Payload admin at `cms.seobyte.com/admin`.
- **Pros**: rich block editor (Lexical) for free; we already use it; collection configs already exist.
- **Cons**: visually distinct from SeoByte dashboard; two UIs for the customer.

### Option ii — Custom authoring inside SeoByte's Next.js dashboard
- Build a content editor inside `apps/web` that talks to Payload via REST/GraphQL.
- **Pros**: one consistent UX.
- **Cons**: huge build; have to recreate rich-text editing, media library, drafts, previews.

### Option iii — Hybrid
- SeoByte dashboard owns project/site setup, billing, analytics, AI-powered workflows.
- "Edit content" deep-links into Payload admin (same SSO).
- **Pros**: ship fast; reuse Payload's strengths; build custom UX only where SeoByte adds value (AI assistance, SEO scoring).
- **Cons**: still two UIs, but with a clear seam.

**Recommendation**: iii.

---

## 8. SEO-specific implementation notes

These cut across whichever architecture we pick:

- **Tenant-aware `sitemap.ts`** — must read `tenantId` from the host header / path and emit only that tenant's URLs.
- **Tenant-aware `robots.ts`** — staging/preview tenants emit `Disallow: /`; production tenants emit allow-all + sitemap pointer.
- **Tenant-aware canonical** — `metadata.alternates.canonical` must build from the *client's* hostname when accessed via reverse proxy, not our origin. Read `X-Forwarded-Host` (set by the proxy) and use it.
- **Tenant-aware OG image** — `opengraph-image.tsx` uses tenant brand colors, logo, default fallback.
- **Per-tenant 301 redirect table** — Payload collection `Redirects` (source slug → target). Honored before 404.
- **ISR + on-demand revalidation** — Payload `afterChange` hook calls `revalidatePath` on our render origin **and** purges the client's CDN (Cloudflare API / Vercel deploy hook / etc.) for the affected path.
- **Per-tenant Search Console verification** — store verification token in the `Tenants` collection; render meta tag in `<head>` automatically.
- **Per-tenant analytics tag** — same pattern; inject in `layout.tsx` based on tenant.
- **Image origin** — serve images through `next/image` from a fast CDN. If proxied through client's edge, ensure the rewrite covers `/blog/_next/image*` too.
- **Schema.org** — Article schema on posts, BreadcrumbList sitewide, Organization at root. Already partially in place — needs tenant-aware fields.

---

## 9. Open questions

1. **Authoring**: Payload admin embedded vs. custom-built — agree on i/ii/iii above?
2. **DB**: Payload's Postgres adapter (so we share Supabase with SeoByte's FastAPI) vs. keep Payload on Mongo and integrate via API?
3. **Pricing axis**: per-site, per-post, per-pageview?
4. **Onboarding UX**: how do we make "paste this Cloudflare Worker / Vercel rewrite into your edge" feel less scary to non-technical clients? Do we auto-detect their host and ship a one-click integration for the big ones?
5. **Media storage**: shared bucket with tenant prefixes vs. per-tenant bucket?
6. **Custom domains for the authoring UI**: do clients log in at `cms.seobyte.com` only, or at `admin.client.com`? Former is simpler.
7. **Preview**: how do previews render when the live site is reverse-proxied? Likely a separate `preview.seobyte.com/<tenant>/<draft>` URL gated by token.
8. **Migration of existing GrowthByte content**: dogfood as tenant `growthbyte`, or freeze the current site and start fresh on the platform?

---

## 10. Suggested first slice (if we proceed)

Roughly in order — each is independently shippable:

1. Move GrowthByte-Website into `C:\SeoByte\apps\cms` (no behavior change, just relocation + build wiring).
2. Add `Tenants` collection + `tenantId` field on every other collection. Backfill all existing content as tenant `growthbyte`. Site keeps working.
3. Add host-aware tenant resolution in middleware (`X-Forwarded-Host` → tenant lookup).
4. Tenant-aware `sitemap.ts`, `robots.ts`, canonical URLs, OG image.
5. Sign up a second internal "tenant" (e.g. for SeoByte's own marketing site) — prove multi-tenancy works.
6. Build reverse-proxy onboarding: docs + per-CDN snippets (Cloudflare Worker first).
7. First external pilot client on `client.com/blog` via subdirectory rewrite.
8. Add SeoByte dashboard surfaces (project picker, billing, analytics) once we have ≥2 paying tenants.

---

*Living doc — edit freely. No decisions are final until we update the relevant CLAUDE.md and ship code.*
