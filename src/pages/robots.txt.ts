import { SITE_CONFIG } from "../../site.config.mjs";

export function GET({ site }: { site?: URL }) {
  const baseUrl = site?.toString().replace(/\/$/, "") ?? SITE_CONFIG.siteUrl;
  const body = `User-agent: *\nAllow: /\n\nSitemap: ${baseUrl}/sitemap.xml\n`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
