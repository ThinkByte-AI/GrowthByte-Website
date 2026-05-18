# CLAUDE.md — GrowthByte Website Code Standards

These are the **mandatory rules** for any code you write, edit, or review in this repository. Apply them to new code, and apply them retroactively when touching existing code.

---

## 1. Function size

- A function SHOULD be **≤ ~60 lines** (body, excluding signature and closing brace).
- If a function grows past ~60 lines, split it into smaller helpers before continuing.
- Each helper must do **one thing** and be independently testable.

## 2. React component size

- The **main component body** in a file SHOULD be **≤ ~60 lines**.
- When a component grows, split presentational pieces into child components — either as separate files or co-located in the same folder.
- **One primary exported UI component per file** is fine, as long as the file stays under the file-length target.

## 3. Function & component naming

- The name MUST describe its **use case / intent**, not just its mechanics.
- Use a verb-led, specific name for functions: `publishScheduledBlogPosts`, `resolveTemplateForCollection`, `convertLexicalNodeToHtml`.
- Use a noun-led, specific name for components: `BlogPostHero`, `ServiceCapabilityList`, `TemplatePreviewPanel`.
- Avoid vague names: `handle`, `process`, `doStuff`, `helper`, `util`, `run`, `Wrapper`, `Box`.
- Reading the name alone should tell the next developer **what it is for**.

## 4. File size

- A source file (`.ts`, `.tsx`, `.py`) SHOULD be **≤ 150 lines**.
- If a module outgrows that, split it. Two acceptable patterns:
  - Move helpers into sibling files (e.g. `templateRenderer.ts` → `templateRenderer.ts` + `templateRenderer.placeholders.ts`).
  - Convert the module into a folder with an `index.ts` / `index.tsx` **barrel**, so external imports (e.g. `@/components/ui/select`) stay stable.
- Splits should follow responsibility lines, not arbitrary line cuts.

## 5. Code quality

Code MUST be:

- **Clean** — no dead code, no commented-out blocks, no `console.log` left behind, no unused imports/vars.
- **Reusable** — extract repeated logic (3+ similar usages) into a shared helper in `lib/`.
- **Generic** — write helpers that accept parameters over helpers hard-coded to one caller. Avoid hidden coupling to a specific collection, route, or template.
- **Typed** — no `any` unless interfacing with an untyped third-party surface; prefer `unknown` + narrowing.
- **Predictable** — pure functions where possible; isolate I/O (DB, S3, fetch) at the edges.

## 6. Comments

- **Prefer clear names over comments.** Types and structure should carry meaning. Most code should have **zero** comments.
- When a comment is justified, it MUST explain **why** — not restate what the next line does.
  - Good: `// S3 client times out on cold start; retry once before surfacing the error`
  - Bad:  `// retry the upload`
- Allowed comment uses (sparingly):
  - **Why** — non-obvious decisions, trade-offs, constraints
  - **Integration contracts** — assumptions about external APIs, env vars, security/auth, payload shapes
  - **One-line file or exported-symbol summary** when purpose is not obvious from path/name
  - **Workarounds** tied to a specific library bug (include library + version)
- Forbidden:
  - Restating the next line in English (`// increment counter` above `counter++`)
  - Duplicate / noisy commentary that adds nothing the code doesn't already say
  - Section banners (`// ===== HELPERS =====`)
  - Author/date tags (`// added by X on Y`) — git handles this
  - TODOs without an owner and a condition for removal

## 7. Refactoring existing code

When you touch a file that violates rules 1–6:

1. **Preserve behavior exactly.** No change to inputs, outputs, side effects, or external API.
2. Break oversized functions into named helpers per rule 3.
3. Split oversized components into child components per rule 2.
4. Split oversized files into focused modules per rule 4 — prefer barrels (`index.ts`) so import paths stay stable.
5. Re-run the relevant route/page/admin screen to confirm parity before reporting done.
6. Update imports across the repo in the same change — never leave dangling references.

Refactors are **mechanical**, not creative — do not redesign, rename public exports, or change call signatures unless the user explicitly asks.

## 8. Structure and organization

- `app/` — Next.js routes only (App Router). No business logic; delegate to `lib/` or `src/`.
- `lib/` — pure helpers, data fetchers, formatters. Framework-agnostic where possible.
- `src/collections/` — Payload collection configs. One collection per file.
- `payload-plugins/` — custom Payload plugins. One plugin per folder. Imported via `@/payload-plugins/...`.
- `components/` — presentational React components. No direct DB or Payload calls.
- One **default export per file** when the file represents a single thing (a page, a component, a collection); otherwise use named exports.
- When splitting a module into a folder, expose the public surface through `index.ts` / `index.tsx` (barrel) so consumers' import paths don't change.

## 9. Naming conventions

- Files: `kebab-case.ts` for utilities, `PascalCase.tsx` for React components, `PascalCase.ts` for Payload collections (matches existing repo style).
- Variables / functions: `camelCase`.
- Types / interfaces: `PascalCase`. No `I` prefix.
- Constants: `SCREAMING_SNAKE_CASE` only for module-level immutable config.
- Boolean variables: prefix with `is`, `has`, `should`, `can` (`isPublished`, `hasTemplate`).

## 10. Error handling

- Handle errors at the boundary (route handler, server action, hook). Don't wrap every internal call in try/catch.
- Never swallow errors silently. If you catch, you either recover, rethrow, or log with context.
- Validate inputs at system boundaries (incoming requests, env vars). Trust internal callers.

## 11. Definition of done

Before reporting a task complete:

- [ ] All touched files pass rules 1–6.
- [ ] `npm run lint` is clean for files you changed.
- [ ] TypeScript compiles (`next build` or `tsc --noEmit`) with no new errors.
- [ ] The affected route/admin screen was loaded and behaves as before (for UI changes).
- [ ] No new files created where editing an existing one would suffice.
- [ ] No comments added that violate rule 6.

---

**Precedence:** if these rules conflict with a quick fix, the rules win. Stop and refactor first.
