# SEO Plan — GrowthByte Website

A pragmatic roadmap for SEO features in the CMS, organised by impact and effort.

Last updated: 2026-05-18

---

## Current state

What's already in place:

- `metadataBase` set in `app/(site)/layout.tsx`
- Per-page **canonical URLs** on every real route (home, listings, all `[slug]` pages)
- Per-page **title + description** controlled from the CMS (`metaTitle` / `metaDescription` fields)
- **JSON-LD structured data** auto-generated per collection: BlogPosting, Service, Article, WebPage
- **Sitemap** at `/sitemap.xml` (services, industries, case studies, plus static pages)
- **Robots.txt** allowing all, disallowing `/api/`
- Static global **Open Graph image** at `app/(site)/opengraph-image.tsx`
- **Payload SEO plugin** configured (tabbed admin UI for `blog-posts`, `case-studies`, `services`, `industries`)

What's deliberately skipped:
- `/blog` and `/pricing` are 301 redirects — no canonicals needed.

---

## Gap analysis

| Area | Current | Gap |
|---|---|---|
| Sitemap | Static lists + hardcoded "now" `lastModified` | Misses CMS blog posts; `lastModified` should reflect real `updatedAt` |
| Open Graph | One global image | No per-post image, no per-page OG title/description override |
| Twitter Cards | Missing | No `twitter:card` metadata anywhere |
| Schema markup | Article/Service/WebPage | No BreadcrumbList, no FAQ, no Organization on the home page |
| Drafts / archived | Indexed if URL is guessed | No `noindex` on non-`published` workflow states |
| Slug changes | Old URL 404s | No automatic 301 redirect when a slug is edited |
| Admin previews | Title/description shown raw | No SEO preview card, no meta-length warnings |
| Images | No required alt text | Media collection accepts uploads without `alt` |
| Internal linking | Manual | No "related posts" or "suggested links" prompts |
| Analytics | Not integrated in this repo | No GSC / GA wiring documented |

---

## Roadmap

### Phase 1 — High-impact quick wins (1–2 days)

These move the needle the most for the least work.

1. **Dynamic sitemap from CMS.** Pull `blog-posts`, `services`, `case-studies`, `industries` from Payload at sitemap build time. Use each doc's real `updatedAt` for `lastModified`. Files: `app/(site)/sitemap.ts`.
2. **Per-post Open Graph image.** Each blog post should have an OG image derived from its `featuredImage` (1200×630). Add to `generateMetadata` in `app/(site)/blogs/[slug]/page.tsx` and `services/[slug]`, `case-studies/[slug]`, `industries/[slug]`. Fall back to the global OG image when missing.
3. **Twitter Card metadata.** Add `twitter: { card: 'summary_large_image', title, description, images }` to every page's metadata. Same source as OG.
4. **`noindex` for non-public states.** Posts in `workflowStatus` = `draft` / `review` / `archived` should emit `<meta name="robots" content="noindex,nofollow">`. Add to `[slug]/page.tsx` via `robots: { index: false }` in metadata.

### Phase 2 — CMS quality features (3–5 days)

Make the admin actively help writers ship SEO-good content.

5. **Meta-length validation in admin.** Add custom field components or `validate` functions for `metaTitle` (≤60 chars) and `metaDescription` (≤155 chars). Show warning when over.
6. **Featured image alt text required.** Make `alt` a `required: true` field on the Media collection so writers can't upload without it.
7. **Slug auto-generate from title.** A `beforeChange` hook on blog-posts (and others) that fills `slug` from `title` if blank, kebab-cased.
8. **Slug change → 301 redirect.** Maintain a `redirects` collection. When a slug changes, write old → new mapping. Add a `middleware.ts` to handle redirects on request.
9. **SEO preview card in admin.** Custom UI component showing the Google SERP-style preview (title, URL, description) as the writer types. Drop into the SEO tab.

### Phase 3 — Technical depth (1 week)

Crawler-facing improvements that compound over months.

10. **BreadcrumbList schema** on every detail page (`[slug]`). Auto-generated from the route segments.
11. **Organization schema on the home page** with `sameAs` linking to LinkedIn/Twitter.
12. **FAQ schema** for the home and contact pages (and any post with an explicit FAQ section).
13. **Image dimensions** stored on the Media collection (Payload supports this) and emitted in JSON-LD where applicable.
14. **`lastModified` on every page**, surfaced both in the sitemap and in the article schema as `dateModified`.
15. **Structured data validation in CI.** Add a small script that hits each route, extracts JSON-LD, and validates with `schema-dts` or similar.

### Phase 4 — Monitoring & ongoing (continuous)

16. **Google Search Console + Bing Webmaster Tools** verification meta tags in the root layout (env-driven).
17. **GA4 / Plausible** integration with consent gating.
18. **Lighthouse / Core Web Vitals** baseline + a check-in cron (manual or automated).
19. **Broken link scan** — internal script that crawls the sitemap and reports 404s.
20. **Index coverage tracking** in GSC, with a quarterly review.

---

## Suggested first sprint (this week)

Pick these four — they're the lowest-risk highest-value items and unblock most of Phase 2:

1. **Dynamic sitemap with real CMS content + real `updatedAt`** (Phase 1, item 1)
2. **Per-post OG image** (Phase 1, item 2)
3. **Twitter Cards** (Phase 1, item 3)
4. **`noindex` for non-published states** (Phase 1, item 4)

Estimated time: 4–6 hours total. After this sprint, the CMS is well above baseline SEO hygiene and ready for content scaling.

---

## Out of scope (intentionally)

- Multi-language / `hreflang` — only relevant when you add localised content.
- AMP — deprecated by Google, not worth the complexity.
- Server-side rendering tweaks beyond what Next.js already provides — already SSR-by-default for relevant routes.
