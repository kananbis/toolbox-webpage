# Toolbox

Toolbox is a static web utility site built with Astro. It provides free online tools for text, calculations, conversions, images, developer tasks, and electronics calculators.

Most tools run directly in the browser. The project does not require a backend server, database, login system, or file upload API.

## Tech Stack

- Astro
- TypeScript
- Tailwind CSS
- Static Site Generation
- Cloudflare Pages compatible deployment

## Requirements

- Node.js 22.12 or newer
- npm

The recommended Node version is also defined in `.nvmrc`.

## Local Development

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

To test from another device on the same network:

```bash
npm run dev -- --host 0.0.0.0 --port 4321
```

## Build

Create a production build:

```bash
npm run build
```

Astro generates the static site in the `dist` directory.

## Preview

Preview the production build locally:

```bash
npm run preview
```

## Cloudflare Pages Deployment

After pushing the project to GitHub, create a Cloudflare Pages project with these settings:

- Framework preset: `Astro`
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: project root
- Node version: `22.12.0` or newer

Cloudflare Pages should install dependencies and run the build command automatically.

## Environment Variables

Set these variables in Cloudflare Pages before production deployment:

```txt
PUBLIC_SITE_URL=https://your-domain.com
PUBLIC_CONTACT_EMAIL=contact@your-domain.com
GA_MEASUREMENT_ID=G-XXXXXXXXXX
PUBLIC_ENABLE_ADSENSE=false
PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX
PUBLIC_ADSENSE_SLOT_TOOL_TOP=0000000000
PUBLIC_ADSENSE_SLOT_TOOL_BOTTOM=0000000000
PUBLIC_ADSENSE_SLOT_HOME_MIDDLE=0000000000
```

Current config defaults:

- `PUBLIC_SITE_URL` falls back to `https://mfwtools.com`
- `PUBLIC_CONTACT_EMAIL` has no public fallback value and should be set in the deployment environment
- `PUBLIC_ENABLE_ADSENSE` is disabled unless it is exactly `true`
- `PUBLIC_ADSENSE_CLIENT_ID` and slot values are empty by default
- `GA_MEASUREMENT_ID` enables Google Analytics when set

Before real deployment, set `PUBLIC_SITE_URL` to the production domain. This value is used for canonical URLs, hreflang links, sitemap, robots.txt, and Open Graph URLs.

## AdSense Setup

AdSense is prepared but disabled by default. Before approval, keep `PUBLIC_ENABLE_ADSENSE=false` so pages show only lightweight ad placeholders.

After AdSense approval:

1. Set `PUBLIC_ENABLE_ADSENSE=true` in Cloudflare Pages.
2. Set `PUBLIC_ADSENSE_CLIENT_ID` to the AdSense client ID, for example `ca-pub-XXXXXXXXXXXXXXXX`.
3. Set the ad slot variables:
   - `PUBLIC_ADSENSE_SLOT_TOOL_TOP`
   - `PUBLIC_ADSENSE_SLOT_TOOL_BOTTOM`
   - `PUBLIC_ADSENSE_SLOT_HOME_MIDDLE`
4. Update `public/ads.txt` with the real publisher line from AdSense:

```txt
google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
```

`ads.txt` uses the `pub-` publisher ID, not the `ca-pub-` client ID. Redeploy after changing environment variables or `ads.txt`.

## Folder Structure

```txt
src/
  components/  Shared layout, header, footer, tool layout, tool runner
  i18n/        Language text, category metadata, tool metadata
  pages/       Astro routes and static pages
  styles/      Global Tailwind styles
public/        Static public assets
```

## How To Add A Tool

1. Add the tool slug, category, name, description, SEO title, and SEO description in `src/i18n/translations.ts`.
2. Add Korean and English content for usage, examples, FAQ, calculation notes, and related tools.
3. Add UI and browser-side logic in `src/components/ToolRunner.astro` when the tool needs interaction.
4. Run `npm run build` and confirm that both `/ko/tools/[slug]` and `/en/tools/[slug]` are generated.

## SEO Metadata

Common SEO tags are generated in `src/components/Layout.astro` and `src/components/ToolLayout.astro`.

The site supports:

- language-specific `title` and `description`
- canonical URLs
- `hreflang` links for `ko`, `en`, and `x-default`
- Open Graph metadata
- `sitemap.xml`
- `robots.txt`

## Deployment Checklist

Before deployment:

1. Set `PUBLIC_SITE_URL` to the real production domain.
2. Set `PUBLIC_CONTACT_EMAIL` to a real contact address.
3. Run `npm run build`.
4. Check `dist/sitemap.xml` and `dist/robots.txt`.
5. Confirm `/ko`, `/en`, tool pages, and policy pages are generated.

## Future Roadmap

- Improve tool-specific UX
- Add more browser-only utilities
- Add analytics and advertising only after policy and consent requirements are reviewed
