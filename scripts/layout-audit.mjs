import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const sourceDirs = ["src/components", "src/pages"];
const files = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
    } else if (/\.(astro|ts)$/.test(entry.name)) {
      files.push(fullPath);
    }
  }
}

for (const dir of sourceDirs) {
  walk(path.join(root, dir));
}

const issues = [];
const allowedMaxWidthFiles = new Set([
  path.normalize("src/components/BookmarkPrompt.astro"),
  path.normalize("src/pages/[lang]/index.astro"),
]);

for (const file of files) {
  const rel = path.relative(root, file);
  const normalized = path.normalize(rel);
  const text = fs.readFileSync(file, "utf8");

  if (!allowedMaxWidthFiles.has(normalized) && /max-w-(xl|2xl|3xl|prose)[^"]*text-lg/.test(text)) {
    issues.push({ file: rel, issue: "Narrow max-width on a large intro paragraph" });
  }

  if (/break-all|overflow-wrap:\s*anywhere|word-break:\s*break-all/.test(text)) {
    issues.push({ file: rel, issue: "Aggressive word breaking in page/component source" });
  }
}

if (issues.length) {
  console.error(JSON.stringify({ issues }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({ issues: 0 }, null, 2));
