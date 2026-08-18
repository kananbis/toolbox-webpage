import fs from "node:fs";
import path from "node:path";

const inputPath = process.argv[2];
if (!inputPath) {
  console.error("Usage: node scripts/analyze-indexing-urls.mjs <urls.txt-or-csv>");
  process.exit(1);
}

const root = "dist";
const siteUrl = "https://mfwtools.com";
const core = new Set(["image-compressor", "image-resizer", "image-format-converter", "image-cropper", "image-rotate-flip", "image-watermark", "remove-image-metadata", "image-color-picker", "pdf-merger", "audio-converter", "audio-cutter", "audio-compressor", "audio-merger", "iphone-ringtone-maker", "character-counter", "date-calculator", "loan-interest-calculator", "percent-calculator", "unit-converter"]);
const focused = new Set(["webp-converter", "image-mosaic", "image-color-replacer", "make-color-transparent", "pdf-splitter", "pdf-page-extractor", "image-to-pdf", "pdf-rotate", "pdf-page-delete", "pdf-to-jpg", "pdf-watermark", "pdf-page-numbers", "pdf-organizer", "audio-volume-editor", "time-zone-converter", "pyeong-calculator", "margin-calculator", "compound-interest-calculator", "salary-net-calculator", "json-formatter", "base64-converter", "url-encoder-decoder", "csv-json-converter", "text-compare", "image-to-ascii-art", "image-to-pixel-art", "ohms-law-calculator", "led-resistor-calculator", "voltage-divider-calculator", "battery-life-calculator", "resistor-color-code-calculator", "filter-calculator"]);

function htmlPath(url) {
  const pathname = new URL(url, siteUrl).pathname.replace(/\/$/, "");
  return path.join(root, pathname, "index.html");
}

function value(html, expression) {
  return html.match(expression)?.[1] ?? "";
}

const urls = fs.readFileSync(inputPath, "utf8")
  .split(/\r?\n|,/) 
  .map((entry) => entry.trim().replace(/^"|"$/g, ""))
  .filter((entry) => entry.startsWith("http") || entry.startsWith("/"));

const results = urls.map((input) => {
  const url = new URL(input, siteUrl);
  const file = htmlPath(url.toString());
  const slug = url.pathname.split("/").filter(Boolean).at(-1) ?? "";
  const quality = core.has(slug) ? "A" : focused.has(slug) ? "B" : "C-or-non-tool";
  if (!fs.existsSync(file)) return { url: url.toString(), quality, built: false };
  const html = fs.readFileSync(file, "utf8");
  return {
    url: url.toString(),
    quality,
    built: true,
    canonical: value(html, /<link rel="canonical" href="(.*?)"/),
    robots: value(html, /<meta name="robots" content="(.*?)"/),
    title: value(html, /<title>(.*?)<\/title>/),
  };
});

console.log(JSON.stringify(results, null, 2));
