import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const registry = JSON.parse(fs.readFileSync(path.join(root, "registry/registry.json"), "utf8"));
const catalogSource = fs.readFileSync(path.join(root, "src/data/catalog.ts"), "utf8");
const catalogSlugs = [...catalogSource.matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]);
const registryNames = new Set(registry.items.map((item) => item.name));
const missingRegistry = catalogSlugs.filter((slug) => !registryNames.has(slug));
const missingSource = [...catalogSource.matchAll(/sourcePath:\s*"([^"]+)"/g)]
  .map((match) => match[1])
  .filter((sourcePath) => !fs.existsSync(path.join(root, sourcePath)));

if (missingRegistry.length || missingSource.length) {
  if (missingRegistry.length) console.error(`Catalog items missing from registry: ${missingRegistry.join(", ")}`);
  if (missingSource.length) console.error(`Catalog source files missing: ${missingSource.join(", ")}`);
  process.exit(1);
}

console.log(`✓ Catalog verified: ${catalogSlugs.length} documented items match registry sources`);
