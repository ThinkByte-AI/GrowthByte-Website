# Story: FAQ + HowTo JSON-LD Schema Generation for Blog Posts — Brownfield Addition

**Status:** Draft
**Created:** 2026-05-19
**Estimated effort:** 1.5–2 hours focused work

---

## User Story

As an **SEO-focused content editor**,
I want **optional FAQ and HowTo fields on blog posts that auto-emit valid JSON-LD schema at render time**,
so that **posts with FAQ or step-by-step content can earn rich-result visibility where engines still grant it (Bing, Yandex, future Google) without manual schema maintenance**.

---

## Story Context

**Existing System Integration:**

- **Integrates with:** `BlogPosts` collection in Payload CMS, `/blogs/[slug]` Next.js route
- **Technology:** Payload 3.x, Next.js 16 (App Router), TypeScript, MongoDB
- **Follows pattern:** Existing schema generators in `src/collections/*/schema.ts` — same generator-function shape, but rendered at request time instead of stored on save
- **Touch points:**
  - `src/collections/BlogPosts/fields/` — two new field files (`faq.ts`, `howTo.ts`)
  - `src/collections/BlogPosts/fields/index.ts` — concat new fields into the ordered array
  - `lib/schema/` — new module: generator functions + `<JsonLd>` server component
  - `app/(site)/blogs/[slug]/page.tsx` — render the schema scripts in both the custom-template branch and the fallback branch
  - `lib/templates/types.ts` — extend `TemplateContent` with `faqItems` and `howTo`

**Important discovery:** The existing stored `seoSchema` field is written by the `beforeChange` hook but **never rendered on any page** (no `<script type="application/ld+json">` tags exist anywhere in `app/`). This story incidentally fixes that by also emitting the existing `BlogPosting` schema at render time. The stored `seoSchema` field is left intact to avoid a DB migration.

---

## Acceptance Criteria

### Functional Requirements

1. BlogPosts collection has an optional `faqItems` field — array of `{ question: string, answer: string }`.
2. BlogPosts collection has an optional `howTo` group field with `{ name, description, totalTime, image, steps: [{ stepName, stepText, image?, url? }] }`.
3. When `faqItems` has at least one valid item, `/blogs/[slug]` emits a valid `FAQPage` JSON-LD `<script>` tag.
4. When `howTo.steps` has at least one valid step, `/blogs/[slug]` emits a valid `HowTo` JSON-LD `<script>` tag.
5. The existing `BlogPosting` schema (currently unrendered) is also emitted at render time as a `<script>` tag.
6. Empty/missing fields produce **no** schema tag (no empty or malformed `<script>` blocks).
7. Multiple JSON-LD scripts on the same page is supported (Google parses each independently).

### Integration Requirements

8. Existing field order and admin-UI sidebar grouping for BlogPosts is preserved.
9. New fields appear in a logical position in the admin form (after `additionalBlocks`, before the SEO tab).
10. Existing custom-HTML template rendering flow (`customLayout.html` via `dangerouslySetInnerHTML`) continues to work unchanged.
11. Fallback render (`FallbackArticle.tsx`, used when no custom template) also emits the schema scripts.
12. Existing `seoSchema` and `regenerateSchema` fields are left in place — no DB migration, no data loss.

### Quality Requirements

13. `npx tsc --noEmit` passes with zero new errors.
14. `npx next build` completes successfully.
15. One sample blog post with all three schemas (BlogPosting + FAQPage + HowTo) validates cleanly in [Google's Rich Results Test](https://search.google.com/test/rich-results).
16. Code follows CLAUDE.md rules: file ≤150 lines, functions ≤~60 lines, comments WHY-only, named files reveal usecase.

---

## Technical Notes

- **Integration approach:** Render-time JSON-LD emission via a small React server component `<JsonLd data={...} />` that serialises a structured object inside `<script type="application/ld+json">`. No client JS required.
- **Generator signature:** Each generator returns either a JSON-LD object or `null` (when input is empty/incomplete). The page conditionally renders only non-null results.
- **Existing pattern reference:**
  - `src/collections/BlogPosts/schema.ts:10` — `generateBlogSchema()` signature to mirror
  - `src/collections/BlogPosts/fields/intro.ts` — group-field shape to mirror for `howTo`
  - `src/collections/BlogPosts/fields/content.ts` — array-field shape to mirror for `faqItems` and `howTo.steps`
- **Key constraints:**
  - Do not break the custom-HTML template flow — JSON-LD scripts must coexist with the existing `dangerouslySetInnerHTML` template output.
  - Match field-order preservation discipline established in `fields/index.ts` (writer-facing field order matters for admin UX).
  - No new client components — JsonLd is server-only.

---

## Definition of Done

- [ ] Two new field files exist and are imported into `fields/index.ts` in the correct order
- [ ] `lib/schema/` module exports three generators and a `<JsonLd>` component
- [ ] `/blogs/[slug]` (both template branch and fallback branch) emits the three schemas when their inputs are populated
- [ ] Empty inputs produce no scripts (verified by viewing source on a post with no FAQ and no HowTo)
- [ ] One sample post with all three schemas passes Google Rich Results Test
- [ ] `npx tsc --noEmit` clean
- [ ] `npx next build` clean
- [ ] No regression: existing posts still render, save, and publish exactly as before

---

## Risk & Compatibility

**Primary Risk:** Malformed JSON-LD could produce Search Console warnings (not errors) and undermine SEO trust signals.

**Mitigation:**
- Generators return `null` when inputs are missing or invalid; only valid schemas are rendered.
- Input types are strictly modelled in TypeScript so the generators can't be passed unexpected shapes.
- Pre-commit verification step: one sample post validated in Rich Results Test before merging.

**Rollback:**
- Revert: delete the two new field files, delete `lib/schema/`, remove the JsonLd render block from the two `page.tsx` branches, and revert the `fields/index.ts` concat. No DB changes to roll back. Total time: <5 minutes.

**Compatibility checklist:**

- [x] No breaking changes to existing APIs
- [x] Database changes are **additive only** (two new optional fields)
- [x] UI changes follow existing field-group/array patterns
- [x] Performance impact negligible (a few small `<script>` tags per page, server-rendered)
- [x] No new dependencies required

---

## Validation Checklist

**Scope:**
- [x] Single focused development session (~1.5–2 hours)
- [x] No new architecture or design work
- [x] Follows existing patterns exactly
- [x] Integration approach is straightforward

**Clarity:**
- [x] Requirements are unambiguous
- [x] Integration points are listed by file path
- [x] Success criteria are testable
- [x] Rollback approach is simple and complete

---

## Out of Scope (for this story)

- FAQ / HowTo fields on Services, CaseStudies, or Industries (follow-up story if needed)
- Removing the stored `seoSchema` field (separate cleanup story; requires migration)
- BreadcrumbList, Organization, or other schema types (separate stories in the SEO_PLAN roadmap)
- SEO admin preview UI / meta-length validation (Phase 2 of SEO_PLAN)
- Auto-extracting Q&A or steps from prose content (explicitly rejected — unreliable, Google-policy-incompatible)
