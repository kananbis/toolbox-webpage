import fs from "node:fs";
import path from "node:path";

const root = "dist";
const files = [];

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const filePath = path.join(dir, name);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walk(filePath);
    } else if (name === "index.html") {
      files.push(filePath);
    }
  }
}

function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function match(html, regex) {
  return html.match(regex)?.[1] ?? "";
}

function pageUrl(filePath) {
  return `/${path.relative(root, filePath).replaceAll("\\", "/").replace(/index\.html$/, "")}`;
}

walk(root);

const categoryPattern = /^\/(ko|en)\/tools\/(text|calculator|converter|audio|pdf|fun|generator|developer|electronics|image)\/$/;
const toolPattern = /^\/(ko|en)\/tools\/[^/]+\/$/;

const pages = files.map((filePath) => {
  const html = fs.readFileSync(filePath, "utf8");
  const text = stripHtml(html);
  const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map((item) => item[1]);
  return {
    url: pageUrl(filePath),
    title: match(html, /<title>(.*?)<\/title>/),
    description: match(html, /<meta name="description" content="(.*?)"/),
    h1: stripHtml(match(html, /<h1[^>]*>(.*?)<\/h1>/)),
    canonical: match(html, /<link rel="canonical" href="(.*?)"/),
    robots: match(html, /<meta name="robots" content="(.*?)"/),
    hreflangCount: [...html.matchAll(/rel="alternate" hreflang=/g)].length,
    textLength: text.length,
    adLabels: (html.match(/>광고<|>Advertisement</g) ?? []).length,
    hrefs,
  };
});

function duplicates(field) {
  const map = new Map();
  for (const page of pages) {
    const value = page[field];
    map.set(value, [...(map.get(value) ?? []), page.url]);
  }
  return [...map.entries()]
    .filter(([value, urls]) => value && urls.length > 1)
    .map(([value, urls]) => ({ value, count: urls.length, urls }));
}

const allExistingPaths = new Set(
  files.map((filePath) => pageUrl(filePath)).concat(["/robots.txt", "/sitemap.xml"]),
);
const brokenLinks = [];
const redirectLikeLinks = [];
for (const page of pages) {
  for (const href of page.hrefs) {
    if (!href.startsWith("/") || href.startsWith("//")) continue;
    if (href.includes("#")) continue;
    const normalized = href.endsWith("/") ? href : `${href}/`;
    if (!allExistingPaths.has(normalized) && !href.includes(".")) {
      brokenLinks.push({ from: page.url, href });
    }
    if (!href.endsWith("/") && !href.includes(".") && href !== "/") {
      redirectLikeLinks.push({ from: page.url, href });
    }
  }
}

const report = {
  htmlPages: pages.length,
  indexableUrls: pages.length + 2,
  toolPages: pages.filter((page) => toolPattern.test(page.url) && !categoryPattern.test(page.url)).length,
  categoryPages: pages.filter((page) => categoryPattern.test(page.url)).length,
  shortestPages: [...pages].sort((a, b) => a.textLength - b.textLength).slice(0, 30).map(({ url, textLength, title, adLabels }) => ({ url, textLength, title, adLabels })),
  duplicateTitles: duplicates("title"),
  duplicateDescriptions: duplicates("description"),
  badCanonicals: pages.filter((page) => !page.canonical.startsWith("https://mfwtools.com/") || page.canonical.includes("www.") || page.canonical.includes("localhost") || page.canonical.includes("pages.dev") || !page.canonical.endsWith("/")).map(({ url, canonical }) => ({ url, canonical })),
  badRobots: pages.filter((page) => page.robots !== "index, follow").map(({ url, robots }) => ({ url, robots })),
  badHreflang: pages.filter((page) => page.hreflangCount < 3).map(({ url, hreflangCount }) => ({ url, hreflangCount })),
  pagesWithAdLabels: pages.filter((page) => page.adLabels > 0).length,
  topAdLabelPages: pages.filter((page) => page.adLabels > 0).slice(0, 20).map(({ url, adLabels }) => ({ url, adLabels })),
  brokenLinks: brokenLinks.slice(0, 100),
  brokenLinkCount: brokenLinks.length,
  redirectLikeLinks: redirectLikeLinks.slice(0, 100),
  redirectLikeLinkCount: redirectLikeLinks.length,
};

console.log(JSON.stringify(report, null, 2));
