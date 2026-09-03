import fs from 'fs';
import path from 'path';

const REGISTRY_UI_DIR = path.resolve('registry/ui');
const PUBLIC_R_DIR = path.resolve('public/r');
const SRC_DIR = path.resolve('src/components/tai-ui');

// Ensure output directories exist
for (const dir of [REGISTRY_UI_DIR, PUBLIC_R_DIR]) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

const registryIndexPath = path.resolve('registry/registry.json');
const registryIndex = JSON.parse(fs.readFileSync(registryIndexPath, 'utf-8'));

// Copy registry.json to public/r/registry.json
fs.writeFileSync(
  path.join(PUBLIC_R_DIR, 'registry.json'),
  JSON.stringify(registryIndex, null, 2),
  'utf-8'
);

for (const item of registryIndex.items) {
  const componentFile = item.files[0].path.replace('ui/', '');
  const sourcePath = path.join(SRC_DIR, componentFile);

  if (fs.existsSync(sourcePath)) {
    const content = fs.readFileSync(sourcePath, 'utf-8');
    const itemManifest = {
      $schema: "https://ui.thinkai.studio/schema/registry-item.json",
      name: item.name,
      type: item.type,
      title: item.title,
      description: item.description,
      dependencies: item.dependencies || [],
      registryDependencies: item.registryDependencies || [],
      files: [
        {
          name: componentFile,
          content: content
        }
      ]
    };

    const manifestJson = JSON.stringify(itemManifest, null, 2);

    // Write to registry/ui/[name].json
    fs.writeFileSync(path.join(REGISTRY_UI_DIR, `${item.name}.json`), manifestJson, 'utf-8');
    // Write to public/r/[name].json
    fs.writeFileSync(path.join(PUBLIC_R_DIR, `${item.name}.json`), manifestJson, 'utf-8');

    console.log(`✓ Emitted registry manifest: ${item.name}`);
  } else {
    console.warn(`✖ Source file not found for ${item.name}: ${sourcePath}`);
  }
}

console.log(`\n✔ Successfully generated ${registryIndex.items.length} registry manifests in registry/ui/ and public/r/`);
