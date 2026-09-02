#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const GITHUB_RAW_BASE = "https://raw.githubusercontent.com/ThinkAI-Studio/thinkai-ui/main";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = process.argv.slice(2);
const command = args[0];

const BANNER = `
  ████████╗██╗  ██╗██╗███╗   ██╗██╗  ██╗ █████╗ ██╗     ██╗   ██╗██╗
  ╚══██╔══╝██║  ██║██║████╗  ██║██║ ██╔╝██╔══██╗██║     ██║   ██║██║
     ██║   ███████║██║██╔██╗ ██║█████╔╝ ███████║██║     ██║   ██║██║
     ██║   ██╔══██║██║██║╚██╗██║██╔═██╗ ██╔══██║██║     ██║   ██║██║
     ██║   ██║  ██║██║██║ ╚████║██║  ██╗██║  ██║███████╗╚██████╔╝██║
     ╚═╝   ╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚═╝
     0px Architectural Geometry · Obsidian Depth · Precision Motion
`;

async function main() {
  if (!command || command === "--help" || command === "-h") {
    console.log(BANNER);
    console.log(`Usage:
  npx thinkai-ui init               Initialize ThinkAI design tokens and utils in your project
  npx thinkai-ui add <component>   Add a component to your project
  npx thinkai-ui add --all          Install all 16 production components at once
  npx thinkai-ui list               List all available components in the registry
  npx thinkai-ui --help             Show this help message

Examples:
  npx thinkai-ui add tai-button
  npx thinkai-ui add wipe-button product-mockup
  npx thinkai-ui add --all
`);
    return;
  }

  if (command === "list") {
    console.log(BANNER);
    console.log("Fetching ThinkAI Studio registry catalog...\n");
    try {
      const registry = await fetchRegistry();
      console.log(`Available ThinkAI UI Components (\x1b[32m${registry.items.length} Primitives\x1b[0m):\n`);
      for (const item of registry.items) {
        console.log(`  ● \x1b[1m\x1b[37m${item.name.padEnd(20)}\x1b[0m \x1b[90m│\x1b[0m ${item.description}`);
        if (item.dependencies && item.dependencies.length > 0) {
          console.log(`    \x1b[2m\x1b[36m└─ pkgs: ${item.dependencies.join(", ")}\x1b[0m`);
        }
      }
      console.log("\nInstall any component using: \x1b[32mnpx thinkai-ui add <name>\x1b[0m");
      console.log("Install all components using: \x1b[32mnpx thinkai-ui add --all\x1b[0m");
    } catch (err) {
      console.error("\x1b[31mFailed to fetch registry:\x1b[0m", err.message);
    }
    return;
  }

  if (command === "init") {
    console.log(BANNER);
    console.log("Initializing ThinkAI UI Design Tokens & Utilities...\n");

    const cwd = process.cwd();
    const libDir = path.join(cwd, "src", "lib");
    if (!fs.existsSync(libDir)) {
      fs.mkdirSync(libDir, { recursive: true });
    }

    // 1. Create src/lib/utils.ts
    const utilsPath = path.join(libDir, "utils.ts");
    if (!fs.existsSync(utilsPath)) {
      const utilsContent = `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`;
      fs.writeFileSync(utilsPath, utilsContent, "utf-8");
      console.log("  ✓ Created \x1b[32msrc/lib/utils.ts\x1b[0m (clsx + tailwind-merge helper)");
    } else {
      console.log("  ℹ \x1b[33msrc/lib/utils.ts\x1b[0m already exists.");
    }

    // 2. Create src/lib/motion.ts
    const motionPath = path.join(libDir, "motion.ts");
    if (!fs.existsSync(motionPath)) {
      const motionContent = `export const TAI_EASE = {
  luxury: [0.16, 1, 0.3, 1] as const,
  spring: [0.32, 0.72, 0, 1] as const,
  snappy: [0.19, 1, 0.22, 1] as const,
};

export const TAI_SPRING = {
  default: { type: "spring", damping: 32, stiffness: 280, mass: 1 },
  stiff: { type: "spring", damping: 30, stiffness: 400, mass: 0.8 },
  gentle: { type: "spring", damping: 38, stiffness: 200, mass: 1.2 },
} as const;
`;
      fs.writeFileSync(motionPath, motionContent, "utf-8");
      console.log("  ✓ Created \x1b[32msrc/lib/motion.ts\x1b[0m (TAI_SPRING & TAI_EASE)");
    }

    // 3. Create components.json
    const configPath = path.join(cwd, "components.json");
    const configContent = {
      "$schema": "https://ui.thinkai.studio/schema.json",
      "style": "default",
      "rsc": true,
      "tsx": true,
      "tailwind": {
        "config": "",
        "css": "src/app/globals.css",
        "baseColor": "neutral"
      },
      "aliases": {
        "components": "@/components/tai-ui",
        "utils": "@/lib/utils",
        "motion": "@/lib/motion"
      }
    };
    fs.writeFileSync(configPath, JSON.stringify(configContent, null, 2), "utf-8");
    console.log("  ✓ Created \x1b[32mcomponents.json\x1b[0m");

    console.log("\n\x1b[32m✔ ThinkAI UI foundation successfully initialized!\x1b[0m");
    console.log("\x1b[1mNext Step: Install recommended dependencies:\x1b[0m");
    console.log("  \x1b[36mnpm install clsx tailwind-merge class-variance-authority @radix-ui/react-slot motion\x1b[0m\n");
    return;
  }

  if (command === "add") {
    let componentNames = args.slice(1);
    if (componentNames.length === 0) {
      console.error("\x1b[31mPlease specify at least one component to add, or use --all.\x1b[0m");
      console.log("Example: npx thinkai-ui add tai-button");
      return;
    }

    if (componentNames.includes("--all")) {
      const registry = await fetchRegistry();
      componentNames = registry.items.map(item => item.name);
      console.log(`\x1b[35mInstalling all ${componentNames.length} components...\x1b[0m`);
    }

    console.log(BANNER);
    const collectedDeps = new Set();
    for (const name of componentNames) {
      const deps = await addComponent(name);
      if (deps) {
        deps.forEach(d => collectedDeps.add(d));
      }
    }

    if (collectedDeps.size > 0) {
      console.log("\x1b[1m\x1b[32m✔ Installation complete!\x1b[0m");
      console.log(`Ensure you have installed the required packages:`);
      console.log(`  \x1b[36mnpm install ${Array.from(collectedDeps).join(" ")}\x1b[0m\n`);
    }
  }
}

async function fetchRegistry() {
  const candidates = [
    path.resolve(__dirname, "../../../registry/registry.json"),
    path.resolve(__dirname, "../../registry/registry.json"),
    path.resolve(process.cwd(), "registry/registry.json"),
  ];

  for (const p of candidates) {
    if (fs.existsSync(p)) {
      return JSON.parse(fs.readFileSync(p, "utf-8"));
    }
  }

  const res = await fetch(`${GITHUB_RAW_BASE}/registry/registry.json`);
  if (!res.ok) {
    throw new Error(`Registry HTTP error: ${res.status}`);
  }
  return await res.json();
}

async function addComponent(name) {
  console.log(`\x1b[34m➤\x1b[0m Installing \x1b[1m\x1b[37m${name}\x1b[0m...`);
  const cwd = process.cwd();
  const targetDir = path.join(cwd, "src", "components", "tai-ui");

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  try {
    let manifest;
    const candidates = [
      path.resolve(__dirname, `../../../registry/ui/${name}.json`),
      path.resolve(__dirname, `../../registry/ui/${name}.json`),
      path.resolve(process.cwd(), `registry/ui/${name}.json`),
    ];

    for (const p of candidates) {
      if (fs.existsSync(p)) {
        manifest = JSON.parse(fs.readFileSync(p, "utf-8"));
        break;
      }
    }

    if (!manifest) {
      const res = await fetch(`${GITHUB_RAW_BASE}/registry/ui/${name}.json`);
      if (!res.ok) {
        console.error(`  \x1b[31m✖ Component "${name}" not found in registry.\x1b[0m`);
        return null;
      }
      manifest = await res.json();
    }

    // Install registry dependencies first
    if (manifest.registryDependencies && manifest.registryDependencies.length > 0) {
      for (const dep of manifest.registryDependencies) {
        await addComponent(dep);
      }
    }

    // Write component files
    for (const file of manifest.files) {
      const targetFilePath = path.join(targetDir, file.name);
      fs.writeFileSync(targetFilePath, file.content, "utf-8");
      console.log(`  \x1b[32m✓\x1b[0m Wrote \x1b[37msrc/components/tai-ui/${file.name}\x1b[0m`);
    }

    return manifest.dependencies || [];
  } catch (err) {
    console.error(`  \x1b[31m✖ Failed to install ${name}:\x1b[0m`, err.message);
    return null;
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
