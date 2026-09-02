<div align="center">

```text
  ████████╗██╗  ██╗██╗███╗   ██╗██╗  ██╗ █████╗ ██╗     ██╗   ██╗██╗
  ╚══██╔══╝██║  ██║██║████╗  ██║██║ ██╔╝██╔══██╗██║     ██║   ██║██║
     ██║   ███████║██║██╔██╗ ██║█████╔╝ ███████║██║     ██║   ██║██║
     ██║   ██╔══██║██║██║╚██╗██║██╔═██╗ ██╔══██║██║     ██║   ██║██║
     ██║   ██║  ██║██║██║ ╚████║██║  ██╗██║  ██║███████╗╚██████╔╝██║
     ╚═╝   ╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚═╝
```

### **ThinkAI Studio — UI Component Registry**

*0px Sharp Architectural Geometry · Obsidian Monochromatic Depth · Precision Motion Physics*

[![License: MIT](https://img.shields.io/badge/License-MIT-white.svg?style=flat-square)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15%2B%20%2F%2016%2B-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![React 19](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![Motion](https://img.shields.io/badge/Motion-12%2B%20%2F%2013%2B-FF0055?style=flat-square)](https://motion.dev)

---

</div>

## 📌 Introduction

**`thinkai-ui`** is an **infrastructure-grade, 0px border-radius component registry** crafted for technical luxury. Built with modern Next.js, Tailwind CSS v4, Three.js WebGL shaders, and Motion physics.

Inspired by the distributed systems engineering and modern dark-mode editorial craft, `thinkai-ui` delivers copy-pasteable, registry-first components designed to eliminate "AI slop" and bring physical, mechanical tactility to digital user interfaces.

---

## ⚡ Quick Start

### 1. Initialize your project

Run the initializer in your Next.js project root:

```bash
npx thinkai-ui init
```

This creates:
- `src/lib/utils.ts` with the typed `cn()` helper (`clsx` + `tailwind-merge`).
- `src/lib/motion.ts` with ThinkAI spring physics (`TAI_SPRING`) and luxury easing curves (`TAI_EASE`).
- `components.json` mapping your project aliases.

### 2. Add components

Install any component directly into your workspace:

```bash
npx thinkai-ui add tai-button
npx thinkai-ui add wipe-button
npx thinkai-ui add product-mockup
```

---

## 🏛️ The 4 Impeccable Design Pillars

1. **Obsidian Monochromatic Depth:**
   - Deep obsidian background layers (`#08080a`, `#0d0d10`, `#131316`) instead of flat pure black `#000000`.
   - Linear-grade 1px top-inset light highlights (`shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]`).
   - Dynamic alpha hairline borders (`border-white/[0.07]`).
   - LED optical glow (`#4ade80`) for live systems telemetry.

2. **Sharp Architectural Geometry (Zero-Radius):**
   - **100% Zero Border-Radius** across all cards, buttons, drawers, modals, inputs, and pills.
   - Strict **4px Baseline Grid** (all margins/paddings are multiples of 4).
   - High-contrast square focus states for WCAG AAA accessibility.

3. **Analog Micro-Grain Tactility:**
   - Ultra-fine SVG micro-grain noise overlay (`feTurbulence`) for physical texture.
   - Heavy frosted depth (`backdrop-blur-xl bg-black/40`) contrasting with sharp geometric surfaces.

4. **Tectonic Motion Mechanics:**
   - Spring physics `{ damping: 32, stiffness: 280, mass: 1 }` and Luxury Easing `[0.16, 1, 0.3, 1]`.
   - Mechanical compression feedback (`active:scale-[0.98]`) on clicks.
   - Linear Z/X parallax spatial shifts for drawers and modals.

---

## 📦 Component Catalog (16 Production Primitives)

| Component | Command | Description | Dependencies |
| :--- | :--- | :--- | :--- |
| **TaiButton** | `npx thinkai-ui add tai-button` | 0px architectural button with top-inset light sweep, CVA variants & Slot `asChild` | `motion`, `@radix-ui/react-slot`, `cva`, `clsx`, `tailwind-merge` |
| **WipeButton** | `npx thinkai-ui add wipe-button` | Signature Forward-Wipe hover button with luxury physics | `motion`, `@radix-ui/react-slot`, `clsx`, `tailwind-merge` |
| **ProductMockup** | `npx thinkai-ui add product-mockup` | Studio laptop/browser mockup frame with LED status & clip-path reveal | `motion`, `lucide-react` |
| **HalftoneBanner** | `npx thinkai-ui add halftone-banner` | WebGL ocean caustics banner integrated with ThinkAI logomark | `three`, `motion` |
| **ThreeHalftoneCanvas** | `npx thinkai-ui add three-halftone-canvas` | Three.js procedural ocean halftone shader canvas with 60/120fps throttle | `three` |
| **TaiHeader** | `npx thinkai-ui add tai-header` | Sticky architectural navigation header with full-bleed mobile drawer | `motion`, `lucide-react` |
| **AboutDrawer** | `npx thinkai-ui add about-drawer` | High-contrast spring sliding drawer with native scroll trapping | `motion`, `lucide-react` |
| **ArchitectureModal** | `npx thinkai-ui add architecture-modal` | Multi-tab deep-dive system architecture dialog with code previews | `motion`, `lucide-react` |
| **ContactModal** | `npx thinkai-ui add contact-modal` | Sharp geometric contact dialog with instant clipboard actions | `motion`, `lucide-react` |
| **MaskedTextReveal** | `npx thinkai-ui add masked-text-reveal` | Editorial text reveal using geometric clip-path masking | `motion` |
| **TextRoll** | `npx thinkai-ui add text-roll` | Slot-machine text tumbler roll for display headlines | `motion` |
| **ButtonTextRoll** | `npx thinkai-ui add button-text-roll` | Dual-layer kinetic typography tumbler for buttons | `motion` |
| **ArrowRoll** | `npx thinkai-ui add arrow-roll` | Directional arrow roll micro-interaction | `motion` |
| **SmoothScroll** | `npx thinkai-ui add smooth-scroll` | Lenis 120Hz smooth scroll coordination wrapper | `lenis` |
| **AiBrandIcons** | `npx thinkai-ui add ai-brand-icons` | Vector marks for Claude, Gemini, OpenAI, Groq, Ollama, DeepSeek | — |
| **TechLogos** | `npx thinkai-ui add tech-logos` | High-contrast inverted tech stack tiles with snappy hover lift | `motion` |

---

## 📖 Design Specification

For detailed tokens, math curves, typography clamp formulas, and accessibility compliance, refer to [`DESIGN.md`](DESIGN.md).

---

## 📄 License & Attribution

Licensed under the [MIT License](LICENSE).  
Authored & Maintained by **ThinkAI Studio / Nguyen Huu Binh Minh** (c) 2026.
