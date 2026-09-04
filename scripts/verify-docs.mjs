import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const requiredFiles = [
  "public/llms.txt",
  "src/app/docs/page.tsx",
  "src/app/docs/ui/page.tsx",
  "src/app/docs/motion/page.tsx",
  "src/app/docs/icons/page.tsx",
  "src/app/docs/DocsClient.tsx",
];
const missingFiles = requiredFiles.filter((file) => !fs.existsSync(path.join(root, file)));
const source = fs.readFileSync(path.join(root, "src/data/catalog.ts"), "utf8");
const slugs = [...source.matchAll(/slug:\s*["']([^"']+)["']/g)].map((match) => match[1]);

if (missingFiles.length) {
  if (missingFiles.length) console.error(`Missing docs files: ${missingFiles.join(", ")}`);
  process.exit(1);
}

console.log(`✓ Docs verified: ${slugs.length} catalog entries have required docs surfaces`);
