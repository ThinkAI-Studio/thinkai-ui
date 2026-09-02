<div align="center">

```text
  ████████╗██╗  ██╗██╗███╗   ██╗██╗  ██╗ █████╗ ██╗     ██╗   ██╗██╗
  ╚══██╔══╝██║  ██║██║████╗  ██║██║ ██╔╝██╔══██╗██║     ██║   ██║██║
     ██║   ███████║██║██╔██╗ ██║█████╔╝ ███████║██║     ██║   ██║██║
     ██║   ██╔══██║██║██║╚██╗██║██╔═██╗ ██╔══██║██║     ██║   ██║██║
     ██║   ██║  ██║██║██║ ╚████║██║  ██╗██║  ██║███████╗╚██████╔╝██║
     ╚═╝   ╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚═╝
```

### **ThinkAI Studio — Official UI Component Registry**

*0px Sharp Architectural Geometry · Obsidian Monochromatic Depth · Infrastructure-Grade Motion*

[![License: MIT](https://img.shields.io/badge/License-MIT-white.svg?style=flat-square)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15%2B%20%2F%2016%2B-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict_5.x-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![React 19](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![Motion](https://img.shields.io/badge/Motion-v12%2B%20%2F%20v13%2B-FF0055?style=flat-square)](https://motion.dev)
[![Accessibility](https://img.shields.io/badge/A11y-WCAG_AAA_Compliant-4ADE80?style=flat-square)](DESIGN.md)

---

</div>

## 📌 Executive Summary

**`thinkai-ui`** is an **infrastructure-grade, copy-pasteable UI component registry** engineered for high-performance applications that demand **technical luxury, architectural rigor, and deliberate physical motion**.

Unlike generic component libraries that rely on rounded pill buttons and hyper-saturated gradients, `thinkai-ui` is built on **4 anti-AI-slop design pillars**:
1. **Obsidian Monochromatic Depth:** Deep gray layers (`#08080a`, `#0d0d10`) with top-inset light reflections and dynamic alpha borders (`rgba(255, 255, 255, 0.07)`).
2. **Sharp Architectural Geometry:** Strict **0px border-radius** and a mathematically rigid **4px baseline grid**.
3. **Analog Micro-Grain Tactility:** SVG micro-noise texture eliminating the sterile coldness of standard digital interfaces.
4. **Tectonic Motion Mechanics:** Frictionless heavy spring physics (`damping: 32, stiffness: 280`) and luxury easing curves (`cubic-bezier(0.16, 1, 0.3, 1)`).

---

## ⚡ The Production Hallmark: Contrast Matrix

| Dimension | Standard Generic UI | **ThinkAI Studio (`thinkai-ui`)** |
| :--- | :--- | :--- |
| **Geometry** | `rounded-xl` / `rounded-full` pills | **100% Zero Border-Radius (`rounded-none`)** |
| **Surfaces** | Flat pure black `#000000` | **Obsidian Layered Depth (`#08080a` → `#0d0d10` → `#131316`)** |
| **Borders** | Hardcoded opaque grays (`#27272a`) | **Dynamic Alpha Hairlines (`border-white/[0.07]`)** |
| **Lighting** | Heavy muddy drop shadows | **Linear-Grade 1px Top-Inset Reflections (`inset 0 1px 0 0 white/8%`)** |
| **Motion Physics** | Floating squishy rubber-banding | **Tectonic Heavy Frictionless Mechanics (`stiffness: 280, mass: 1`)** |
| **Click Feedback** | Color opacity change only | **Mechanical Compression (`active:scale-[0.98]`)** |
| **Typography** | 100% pure white (optical bleed) | **Balanced White Alpha (`text-white/90` & `text-white/60`, tight tracking)** |
| **Status Telemetry** | Flat green dots | **Optical LED Glow (`drop-shadow-[0_0_6px_rgba(74,222,128,0.45)]`)** |
| **Code Ownership** | Opaque `node_modules` dependency | **Registry-First: 100% source code ownership in your repository** |

---

## 🏗️ Architecture & Registry Flow

`thinkai-ui` adopts the modern **Registry-First Paradigm** (pioneered by `shadcn/ui`). You do not import compiled CSS or blackbox npm packages; our CLI pulls typed, production-ready TypeScript components directly into your project's workspace.

```text
┌─────────────────────────────────────────────────────────────┐
│             ThinkAI Studio Decentralized Registry           │
│        (https://raw.githubusercontent.com/.../registry/)    │
└──────────────────────────────┬──────────────────────────────┘
                               │
                      npx thinkai-ui add
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                      Your Next.js App                       │
│  ├── src/components/tai-ui/   ◄── (Zero-Bloat .tsx Primitives)│
│  ├── src/lib/utils.ts         ◄── (clsx + tailwind-merge)   │
│  ├── src/lib/motion.ts        ◄── (Springs & Luxury Easing) │
│  └── components.json          ◄── (Import Alias Manifest)   │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Start & CLI Usage

### 1. Initialize ThinkAI Foundation

Run the initializer in your Next.js root directory:

```bash
npx thinkai-ui init
```

The CLI automatically configures:
- `src/lib/utils.ts` — Typed `cn()` utility combining `clsx` and `tailwind-merge`.
- `src/lib/motion.ts` — ThinkAI standard spring physics (`TAI_SPRING`) and luxury easing curves (`TAI_EASE`).
- `components.json` — Workspace alias configuration.

### 2. Add Interactive Components

Install individual components with resolved dependencies:

```bash
# Add Core Buttons
npx thinkai-ui add tai-button
npx thinkai-ui add wipe-button

# Add Studio Mockups & WebGL Canvas
npx thinkai-ui add product-mockup
npx thinkai-ui add halftone-banner

# Add Navigation & Overlays
npx thinkai-ui add tai-header
npx thinkai-ui add about-drawer
```

### 3. List All Available Primitives

```bash
npx thinkai-ui list
```

---

## 📦 Production Component Catalog (16 Primitives)

Every component is written in **TypeScript Strict Mode**, supports polymorphic **Radix Slot (`asChild`)**, and enforces full **WCAG AAA Reduced-Motion compliance**.

| Primitive | CLI Command | Category | Key Capabilities & Highlights |
| :--- | :--- | :--- | :--- |
| **TaiButton** | `npx thinkai-ui add tai-button` | *Action* | CVA variants, `asChild` Slot, top-inset light sweep, `active:scale-[0.98]` click compression |
| **WipeButton** | `npx thinkai-ui add wipe-button` | *Action* | Signature Forward-Wipe interactive fill, luxury easing `[0.16, 1, 0.3, 1]` |
| **ProductMockup** | `npx thinkai-ui add product-mockup` | *Display* | Studio browser/laptop frame, SSL capsule, LED telemetry glow, clip-path reveals |
| **HalftoneBanner** | `npx thinkai-ui add halftone-banner` | *Visual* | Three.js ocean caustics WebGL canvas integrated with ThinkAI Studio vector mark |
| **ThreeHalftoneCanvas** | `npx thinkai-ui add three-halftone-canvas` | *Engine* | Procedural WebGL ocean shader, 60/120fps throttle, auto-cleanup on unmount |
| **TaiHeader** | `npx thinkai-ui add tai-header` | *Navigation* | Translucent sticky header, zero-border architectural layout, full-bleed mobile drawer |
| **AboutDrawer** | `npx thinkai-ui add about-drawer` | *Overlay* | High-contrast spring sliding sheet, Lenis scroll prevention, ESC keyboard trapping |
| **ArchitectureModal** | `npx thinkai-ui add architecture-modal` | *Overlay* | Multi-tab deep-dive system architecture dialog, telemetry tabs, code verification |
| **ContactModal** | `npx thinkai-ui add contact-modal` | *Overlay* | Sharp geometric contact dialog, instant clipboard copier, optical micro-toast |
| **MaskedTextReveal** | `npx thinkai-ui add masked-text-reveal` | *Typography* | Editorial typography reveal via geometric `clip-path: inset()` masking |
| **TextRoll** | `npx thinkai-ui add text-roll` | *Typography* | High-speed tumbler slot-machine roll for headlines and metrics |
| **ButtonTextRoll** | `npx thinkai-ui add button-text-roll` | *Typography* | Dual-layer micro-tumbler for kinetic button labels |
| **ArrowRoll** | `npx thinkai-ui add arrow-roll` | *Micro* | Directional forward translation arrow with spring physics |
| **SmoothScroll** | `npx thinkai-ui add smooth-scroll` | *Provider* | Lenis 120Hz smooth scrolling coordination with touch and anchor normalization |
| **AiBrandIcons** | `npx thinkai-ui add ai-brand-icons` | *Vectors* | Pure SVG brand marks: Claude, Gemini, OpenAI, Groq, Ollama, DeepSeek |
| **TechLogos** | `npx thinkai-ui add tech-logos` | *Display* | High-contrast inverted hover tiles with snappy spring lift physics |

---

## 📐 Design Tokens Reference

### Obsidian Dark Surfaces (Tailwind v4 `@theme`)

```css
@theme {
  --color-tai-bg: #08080a;             /* Deepest canvas backdrop */
  --color-tai-sheet: #0d0d10;          /* Primary content cards & sections */
  --color-tai-card: #131316;           /* Elevated interactive cards */
  --color-tai-border: rgba(255, 255, 255, 0.07);        /* Subtle alpha hairline */
  --color-tai-border-strong: rgba(255, 255, 255, 0.18); /* Hover & active boundary */
  --color-tai-green: #4ade80;          /* Verified status LED accent */
  --ease-spring: cubic-bezier(0.32, 0.72, 0, 1);
  --ease-luxury: cubic-bezier(0.16, 1, 0.3, 1);
}
```

### Spring Physics Constants

```typescript
export const TAI_SPRING = {
  default: { type: "spring", damping: 32, stiffness: 280, mass: 1 },
  stiff:   { type: "spring", damping: 30, stiffness: 400, mass: 0.8 },
  gentle:  { type: "spring", damping: 38, stiffness: 200, mass: 1.2 },
} as const;
```

---

## ♿ Accessibility & Reduced Motion (WCAG AAA)

Every interactive component automatically listens to `prefers-reduced-motion`:
- **Bail Strategy:** Ambient particles and background WebGL caustics reduce complexity or freeze.
- **Snap Strategy:** Motion transitions drop duration to `0.01ms`, resolving directly to their final states.
- **High-Contrast Focus:** Key navigation displays a sharp 2px solid square focus ring (`outline: 2px solid rgba(255, 255, 255, 0.85)`).

---

## 📖 Deep Specification

For complete mathematical clamp formulas, architectural diagrams, and font tracking tables, read the official [`DESIGN.md`](DESIGN.md).

---

## 📄 License & Attribution

Distributed under the **MIT License**.  
Authored & Maintained by **ThinkAI Studio / Nguyen Huu Binh Minh** (c) 2026.
