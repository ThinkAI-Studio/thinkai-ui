import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const registry = JSON.parse(fs.readFileSync(path.join(root, "registry/registry.json"), "utf8"));
const catalogSource = fs.readFileSync(path.join(root, "src/data/catalog.ts"), "utf8");
const catalogSlugs = [...catalogSource.matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]);
const registryNames = new Set(registry.items.map((item) => item.name));
const missingRegistry = catalogSlugs.filter((slug) => !registryNames.has(slug));
const extraRegistry = [...registryNames].filter((name) => !catalogSlugs.includes(name));
const missingSource = [...catalogSource.matchAll(/sourcePath:\s*"([^"]+)"/g)]
  .map((match) => match[1])
  .filter((sourcePath) => !fs.existsSync(path.join(root, sourcePath)));

const missingManifest = registry.items
  .map((item) => `public/r/${item.name}.json`)
  .filter((manifestPath) => !fs.existsSync(path.join(root, manifestPath)));

if (missingRegistry.length || extraRegistry.length || missingSource.length || missingManifest.length) {
  if (missingRegistry.length) console.error(`Catalog items missing from registry: ${missingRegistry.join(", ")}`);
  if (extraRegistry.length) console.error(`Registry items missing from catalog: ${extraRegistry.join(", ")}`);
  if (missingSource.length) console.error(`Catalog source files missing: ${missingSource.join(", ")}`);
  if (missingManifest.length) console.error(`Registry manifests missing: ${missingManifest.join(", ")}`);
  process.exit(1);
}

console.log(`✓ Catalog verified: ${catalogSlugs.length} documented items match registry sources`);
