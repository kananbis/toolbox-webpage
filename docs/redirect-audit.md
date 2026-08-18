# Redirect Audit

Last reviewed: 2026-08-18

## Configured Redirects

| Source | Status | Destination | Purpose |
| --- | ---: | --- | --- |
| `https://www.mfwtools.com/` | 301 | `https://mfwtools.com/ko/` | Avoid the additional root-to-Korean redirect for the www home page. |
| `https://www.mfwtools.com/*` | 301 | `https://mfwtools.com/:splat` | Use the non-www canonical host. |
| `/` | 302 | `/ko/` | Send the language-neutral root to the Korean entry page. |

## Build-Level Findings

- No configured self-loop was found.
- No configured redirect source is included in the sitemap.
- No internal static HTML link points to a configured redirect source.
- The sitemap contains final language-specific URLs with trailing slashes.

## Production Follow-Up

Search Console may report historical redirects that are not represented in the current static project. When its URL export is available, run:

```powershell
node scripts/analyze-indexing-urls.mjs path\to\search-console-urls.csv
```

This inspects the corresponding build page, canonical URL, robots directive, title, and current A/B/C classification. It does not make assumptions about URLs that are not supplied.
