import { baseTools, categorySlugs, languages } from "@/i18n/translations";
import { SITE_CONFIG } from "../../site.config.mjs";

export function GET({ site }: { site?: URL }) {
  const baseUrl = site?.toString().replace(/\/$/, "") ?? SITE_CONFIG.siteUrl;
  const normalizePath = (path: string) => (path.endsWith("/") ? path : `${path}/`);
  const paths = languages.flatMap((lang) => [
    `/${lang}`,
    `/${lang}/tools`,
    ...categorySlugs.map((category) => `/${lang}/tools/${category}`),
    ...baseTools.map((tool) => `/${lang}/tools/${tool.slug}`),
    `/${lang}/about`,
    `/${lang}/contact`,
    `/${lang}/privacy`,
    `/${lang}/terms`,
  ]);

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map((path) => `  <url><loc>${baseUrl}${normalizePath(path)}</loc></url>`).join("\n")}\n</urlset>`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml" },
  });
}
