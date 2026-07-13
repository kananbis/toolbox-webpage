# AGENTS.md

## Role

You are a coding agent working on a low-cost, SEO-oriented static web utility service.

Your job is to implement the project according to the external project specification provided by the user. When a detailed task instruction or project brief is provided, treat that document as the source of truth for feature scope.

This file defines the development rules, constraints, and project behavior standards that must be followed while working in this repository.

---

## Project Direction

Build a fast, static, mobile-friendly web utility site.

The service provides simple browser-based tools such as calculators, converters, text tools, generators, and developer utilities.

The business goal is organic search traffic through SEO, with future monetization through advertising such as Google AdSense.

---

## Core Principles

Always prioritize:

1. Low operating cost
2. Static generation
3. SEO-friendly pages
4. Fast page loading
5. Browser-side processing
6. Simple user experience
7. Easy expansion of new tools
8. Maintainable project structure

Do not over-engineer the MVP.

---

## Preferred Tech Stack

Use the following stack unless the user explicitly changes it:

```txt
Astro
TypeScript
Tailwind CSS
Static Site Generation
Cloudflare Pages compatible deployment
```

Prefer Astro components and vanilla TypeScript.

Use React, Preact, Svelte, or other client-side frameworks only when a specific tool genuinely needs more complex state handling.

---

## Hard Constraints

Do not add the following unless the user explicitly requests it:

```txt
Backend server
Database
Login system
User accounts
Payment system
Complex admin dashboard
Server-side text processing
Server-side file upload
Real advertising scripts
Unnecessary external API dependencies
```

Advertising placeholders are allowed. Real ad scripts should not be added during the MVP unless explicitly requested.

---

## Privacy Rules

User input should be processed locally in the browser whenever possible.

For tools such as text counters, JSON formatters, Base64 converters, password generators, and QR code generators:

```txt
Do not send user input to any server.
Do not store user input.
Do not log user input.
```

Relevant tool pages should include this Korean privacy note where appropriate:

```txt
입력한 내용은 서버로 전송되지 않으며, 브라우저 안에서만 처리됩니다.
```

---

## SEO Rules

Each public page should be indexable and useful as a standalone SEO page.

Important page content must be rendered as static HTML where possible.

Every tool page should include:

```txt
Clear H1
Short introduction
Tool UI
Usage explanation
Examples
FAQ
Related tools
SEO title
SEO description
Canonical URL
Open Graph metadata
```

Do not create pages that only contain a bare tool UI with no explanatory content.

---

## UX Rules

The site should be simple, practical, and fast.

Prioritize:

```txt
Mobile-first layout
Readable typography
Clear input fields
Clear result display
Copy/reset buttons where useful
Accessible labels
Keyboard-friendly controls
Minimal visual clutter
```

Avoid:

```txt
Heavy animations
Large images
Blocking popups
Unnecessary UI libraries
Ads above the main tool UI
```

---

## Architecture Rules

Use reusable metadata and components.

Prefer a structure similar to:

```txt
src/
├─ components/
├─ data/
├─ pages/
├─ styles/
└─ utils/
```

Tool metadata should be centralized where practical, for example:

```txt
src/data/tools.ts
src/data/categories.ts
```

Use metadata to support:

```txt
Tool listing pages
Category pages
Related tool links
SEO metadata
Sitemap generation
```

---

## Implementation Priority

When starting from an empty project, proceed in this order:

```txt
1. Project scaffold
2. Shared layout and SEO components
3. Tool metadata structure
4. Home page
5. Tools index page
6. Category pages
7. Static legal pages
8. Core functional tools
9. Remaining tool pages
10. Sitemap and robots.txt
11. README
12. Build verification
```

If the task scope is large, implement in phases instead of attempting everything at once.

---

## Quality Requirements

Before considering work complete:

```txt
npm run build
```

must pass successfully.

If linting or formatting is configured, run the relevant commands and fix issues.

Do not leave:

```txt
Broken imports
Missing routes
TypeScript errors
Invalid Astro components
Dead placeholder text that should have been replaced
Console errors in normal use
```

---

## README Requirements

Maintain a useful `README.md` with:

```txt
Project overview
Tech stack
Local development
Build command
Preview command
Folder structure
How to add a new tool
How to update SEO metadata
Deployment notes
Future roadmap
```

---

## Decision Rule

When choosing between two implementation options, choose the one that better supports:

```txt
Lower cost
Less backend complexity
Better SEO
Faster page load
Simpler maintenance
Easier tool expansion
```

When in doubt, keep the implementation static, simple, and browser-side.
