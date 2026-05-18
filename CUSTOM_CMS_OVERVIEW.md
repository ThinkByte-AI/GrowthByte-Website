# Custom CMS Overview - GrowthByte Website

**Status:** In Development (Custom-CMS Branch)
**Last Updated:** 2026-05-17

---

## Summary

The GrowthByte website has been enhanced with a custom CMS built on **Payload CMS 3.x**. This implementation provides a flexible, template-based content management system with visual editing capabilities, SEO automation, and scheduled publishing workflows.

---

## Core Technology Stack

| Component | Technology |
|-----------|------------|
| CMS | Payload CMS 3.x |
| Database | MongoDB (via Mongoose adapter) |
| Rich Text Editor | Lexical Editor (Payload's default) |
| Media Storage | AWS S3 (Payload Storage Plugin) |
| SEO | Payload SEO Plugin |
| Frontend | Next.js 15 (App Router) |
| Visual Builder | GrapesJS (planned) |

---

## Collections (Content Types)

### 1. Blog Posts (`blog-posts`)
**Status:** Fully Implemented

**Features:**
- Full versioning with 50 version history and autosave drafts
- Workflow status: Draft → Review → Published → Scheduled → Archived
- Scheduled publishing with `publishedAt` date
- Automatic unpublishing with `unpublishAt` date
- Template assignment (relationship to `page-templates`)
- Hero section with image, subtitle, and overlay options
- Additional content blocks: gallery, video embed, pull quotes
- Sidebar content with custom widgets
- Auto-calculated read time
- Author profile with bio and image
- Categories: Growth Strategy, Performance Marketing, SEO, Marketing Automation, Analytics, Industry Insights
- Tags support
- SEO metadata and auto-generated JSON-LD schema

**Access Control:**
- Public: Can only see published posts that are currently live
- Authenticated: Can see all posts

**Custom Endpoint:**
- `POST /api/blog-posts/publish-scheduled` - Cron endpoint to publish scheduled posts and archive expired ones

---

### 2. Services (`services`)
**Status:** Fully Implemented

**Features:**
- Template assignment with type filtering
- Short title and outcome fields
- Capabilities list (array)
- Icon support
- SEO metadata and auto-generated JSON-LD schema (Service schema)
- Featured image support

---

### 3. Case Studies (`case-studies`)
**Status:** Fully Implemented

**Features:**
- Client and industry fields
- Headline and metric display (e.g., "44% CAC reduction")
- Challenge/Solution/Results structure
- Quote with author attribution
- Timeframe
- SEO metadata and auto-generated JSON-LD schema (Article schema)

---

### 4. Industries (`industries`)
**Status:** Fully Implemented

**Features:**
- Name and slug
- Challenge description
- Detailed information
- SEO metadata and auto-generated JSON-LD schema (WebPage schema)

---

### 5. Page Templates (`page-templates`)
**Status:** Implemented with Visual Builder

**Features:**
- Template name and type (Blog, Service, Landing Page, Case Study)
- Default template flag per type
- Visual layout builder with two modes:
  - **Code Mode:** Direct HTML/CSS editing
  - **Visual Builder:** GrapesJS drag-and-drop editor
- Placeholder system for dynamic content injection
- Preview functionality
- Component data storage (JSON)

**Placeholders Available:**
- `{{title}}`, `{{slug}}`, `{{excerpt}}`, `{{content}}`
- `{{featuredImage}}`, `{{featuredImageAlt}}`
- `{{category}}`, `{{tags}}`, `{{publishedAt}}`
- `{{author}}`, `{{authorBio}}`, `{{authorImage}}`
- `{{readTime}}`, `{{metaTitle}}`, `{{metaDescription}}`
- Block placeholders: `{{#relatedPosts}}...{{/relatedPosts}}`

---

### 6. Media (`media`)
**Status:** Fully Implemented

**Features:**
- Automatic image resizing (thumbnail: 300x300, card: 768x512, hero: 1920x1080)
- AWS S3 storage integration
- Alt text for accessibility
- Image-only mime type restriction

---

### 7. Users (`users`)
**Status:** Basic Implementation

**Features:**
- Email-based authentication
- Name field
- Login attempt limiting (5 max attempts, 30-minute lockout)

---

## Visual Template Editor

**Location:** `src/payload-plugins/TemplateEditorPlugin/index.tsx`

**Capabilities:**
- Dual-mode editor: Code (HTML/CSS) and Visual Builder tabs
- Code mode with syntax highlighting
- Live preview in new window
- Auto-save integration with Payload form data
- Dark theme matching Payload admin

**Planned Visual Builder:**
- Uses GrapesJS for drag-and-drop editing
- Component-based architecture
- Pre-built blocks for common patterns
- Custom block creation

---

## Frontend Rendering

### Template Renderer
**Location:** `lib/templateRenderer.ts`

**Capabilities:**
- Placeholder replacement for dynamic content
- Lexical JSON to HTML conversion
- Block iteration (related posts, popular posts)
- Category list generation
- Custom data injection

### Lexical to HTML
**Location:** `lib/lexicalToHtml.ts`

Converts Payload's Lexical rich text JSON to semantic HTML, supporting:
- Paragraphs and headings (h1-h6)
- Lists (ordered/unordered)
- Links (internal/external)
- Blockquotes
- Text formatting (bold, italic, underline, strikethrough)
- Image uploads
- Code blocks

### API Utilities
**Location:** `lib/api.ts`

Server-side data fetching utilities:
- `fetchContent()` - Fetch content with template populated
- `fetchTemplate()` - Fetch template by ID
- `fetchDefaultTemplate()` - Get default template for content type
- `getEffectiveTemplate()` - Template resolution with fallback
- `fetchRelatedContent()` - Related posts by category
- `fetchSidebarData()` - Popular posts and categories

---

## Page Routes

| Route | Collection | Template Support |
|-------|------------|------------------|
| `/blogs/[slug]` | blog-posts | Yes |
| `/services/[slug]` | services | Yes |
| `/case-studies/[slug]` | case-studies | Planned |
| `/industries/[slug]` | industries | Planned |

---

## SEO Features

### Auto-Generated Schema
Each collection auto-generates JSON-LD schema:

| Collection | Schema Type |
|------------|-------------|
| Blog Posts | BlogPosting |
| Services | Service |
| Case Studies | Article |
| Industries | WebPage |

### SEO Plugin Integration
- Meta title and description fields
- Open Graph support
- Tabbed UI in admin panel
- Regenerate schema checkbox on save

---

## Security & Access Control

### Access Pattern
All collections follow this access control model:

| Action | Public | Authenticated |
|--------|--------|---------------|
| Read | Yes (with filtering for blog) | Yes |
| Create | No | Yes |
| Update | No | Yes |
| Delete | No | Yes |

### Blog-Specific Filtering
Public users only see:
- `_status` equals 'published'
- `publishedAt` is in the past
- `unpublishAt` is either null or in the future

---

## Uncommitted Changes (Current Branch)

| Status | Files |
|--------|-------|
| Modified | BlogPosts.ts, Services.ts, payload.config.ts |
| Modified | blogs/[slug]/page.tsx, services/[slug]/page.tsx |
| Deleted | media/57.jpg, media/59.jpg |
| Untracked | PageTemplates.ts, TemplateEditorPlugin |
| Untracked | lib/api.ts, lib/templateRenderer.ts, lib/lexicalToHtml.ts |
| Untracked | app/preview/, components/template/ |

---

## Pending / Future Work

### High Priority
1. Complete GrapesJS visual builder integration
2. Add case studies and industries template rendering
3. Implement preview route (`/preview/templates/[id]`)
4. Add template ingestion/import feature

### Medium Priority
1. Add more default templates for each content type
2. Template duplication/cloning
3. Bulk template assignment
4. Template usage analytics

### Nice to Have
1. Block-based editing instead of full-page templates
2. A/B testing with multiple templates
3. Template marketplace/sharing
4. Custom component library

---

## Environment Variables Required

```env
DATABASE_URI=mongodb://...
PAYLOAD_SECRET=...
S3_BUCKET=bucket-name
S3_REGION=ap-south-1
S3_ACCESS_KEY_ID=...
S3_SECRET_ACCESS_KEY=...
VERCEL_URL=... (production)
```
