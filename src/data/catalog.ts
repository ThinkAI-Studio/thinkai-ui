export type CatalogKind = "ui" | "motion" | "icons";

export type PropDefinition = {
  name: string;
  type: string;
  defaultValue?: string;
  description: string;
};

export type CatalogItem = {
  slug: string;
  title: string;
  kind: CatalogKind;
  category: "Action" | "Overlay" | "Typography" | "Display" | "WebGL" | "System" | "Forms" | "Controls" | "Disclosure" | "Feedback" | "Text" | "Effects" | "Animate" | "Observability" | "Developer Tools" | "Navigation" | "AI Console" | "AI Motion";
  description: string;
  sourcePath: string;
  dependencies: string[];
  previewId: string;
  usage: string;
  variants: string[];
  whenToUse: string;
  whenNotToUse: string;
  accessibility: string[];
  reducedMotion: string;
  motionNotes?: string;
  props?: PropDefinition[];
};

const motion = ["motion"];

export const catalogItems: CatalogItem[] = [
  {
    slug: "tai-button",
    title: "TaiButton",
    kind: "ui",
    category: "Action",
    description: "A sharp action primitive with explicit variants, mechanical feedback, and reduced-motion support.",
    sourcePath: "src/components/tai-ui/TaiButton.tsx",
    dependencies: ["motion", "@radix-ui/react-slot", "class-variance-authority", "clsx", "tailwind-merge"],
    previewId: "tai-button",
    usage: '<TaiButton variant="primary">Deploy system</TaiButton>',
    variants: ["primary", "secondary", "outline", "ghost"],
    whenToUse: "Use for a user intent that submits, changes state, or advances a workflow.",
    whenNotToUse: "Do not use for plain navigation; use an anchor with a clear destination instead.",
    accessibility: ["Use a concise action label.", "Preserves native button semantics and keyboard activation.", "Focus-visible styling remains visible on dark surfaces."],
    reducedMotion: "Removes sweep and transform travel while preserving hover and active state contrast.",
    motionNotes: "Small spring lift and mechanical press; no layout animation.",
    props: [
      { name: "variant", type: '"primary" | "secondary" | "outline" | "ghost"', defaultValue: "primary", description: "Sets action hierarchy." },
      { name: "size", type: '"sm" | "default" | "lg"', defaultValue: "default", description: "Sets control density." },
    ],
  },
  {
    slug: "masked-text-reveal",
    title: "MaskedTextReveal",
    kind: "motion",
    category: "Typography",
    description: "A geometric mask reveal for short display statements.",
    sourcePath: "src/components/tai-ui/MaskedTextReveal.tsx",
    dependencies: motion,
    previewId: "masked-text-reveal",
    usage: '<MaskedTextReveal text="ENGINEERING LUXURY SOFTWARE" />',
    variants: ["viewport reveal", "static reveal"],
    whenToUse: "Use for a short heading or statement entering the viewport once.",
    whenNotToUse: "Avoid for long paragraphs, repeated cards, or content that must be instantly scannable.",
    accessibility: ["Text remains real DOM content.", "The reveal is progressive enhancement, not a content gate."],
    reducedMotion: "Displays the full statement immediately.",
    motionNotes: "Opacity plus restrained mask movement; one-shot viewport trigger.",
  },
  {
    slug: "about-drawer",
    title: "AboutDrawer",
    kind: "ui",
    category: "Overlay",
    description: "A full-height information drawer with a sharp surface and spring entrance.",
    sourcePath: "src/components/tai-ui/AboutDrawer.tsx",
    dependencies: ["motion", "lucide-react"],
    previewId: "about-drawer",
    usage: '<AboutDrawer isOpen={open} onClose={() => setOpen(false)} lang="en" />',
    variants: ["English", "Vietnamese"],
    whenToUse: "Use for secondary context that should preserve the current page underneath.",
    whenNotToUse: "Do not hide a required task or primary form inside a drawer.",
    accessibility: ["Close with Escape and an explicit close button.", "Use dialog semantics and keep the panel independently scrollable.", "Lock background scrolling while open."],
    reducedMotion: "Removes slide travel and keeps the content available immediately.",
    motionNotes: "Soft right-edge spring with a restrained backdrop fade.",
  },
  {
    slug: "architecture-modal",
    title: "ArchitectureModal",
    kind: "ui",
    category: "Overlay",
    description: "A multi-tab architecture inspection modal for source and system context.",
    sourcePath: "src/components/tai-ui/ArchitectureModal.tsx",
    dependencies: ["motion", "lucide-react"],
    previewId: "architecture-modal",
    usage: '<ArchitectureModal projectId="homelab" onClose={close} lang="en" />',
    variants: ["system overview", "source", "verification"],
    whenToUse: "Use when users need focused technical context without leaving the current surface.",
    whenNotToUse: "Avoid using a modal as a replacement for durable documentation.",
    accessibility: ["Tabs must expose selected state.", "Escape and close button must dismiss the modal.", "Code remains selectable text."],
    reducedMotion: "Uses an immediate open/close state with no scale travel.",
    motionNotes: "Small opacity and vertical settle; tabs should not animate layout-heavy content.",
  },
  {
    slug: "contact-modal",
    title: "ContactModal",
    kind: "ui",
    category: "Overlay",
    description: "A focused contact dialog with explicit clipboard feedback.",
    sourcePath: "src/components/tai-ui/ContactModal.tsx",
    dependencies: ["motion", "lucide-react"],
    previewId: "contact-modal",
    usage: '<ContactModal isOpen={open} onClose={() => setOpen(false)} />',
    variants: ["contact", "copy feedback"],
    whenToUse: "Use for a short contact action or copyable address.",
    whenNotToUse: "Do not use it for a long contact form without a clear task model.",
    accessibility: ["Label the dialog and every copy action.", "Announce copy success without relying only on color."],
    reducedMotion: "Removes entrance travel while preserving copy feedback.",
  },
  {
    slug: "tai-header",
    title: "TaiHeader",
    kind: "ui",
    category: "System",
    description: "A sticky architectural header with a mobile full-bleed navigation drawer.",
    sourcePath: "src/components/tai-ui/TaiHeader.tsx",
    dependencies: ["motion", "lucide-react"],
    previewId: "tai-header",
    usage: '<TaiHeader onOpenAbout={openAbout} onOpenContact={openContact} />',
    variants: ["desktop", "mobile"],
    whenToUse: "Use as the shared site-level navigation shell.",
    whenNotToUse: "Avoid adding multiple sticky navigation layers on one page.",
    accessibility: ["Use a labelled menu button on small screens.", "Expose expanded state for the mobile drawer.", "Keep link labels single-line and discoverable."],
    reducedMotion: "Menu state changes without sliding travel.",
  },
  {
    slug: "product-mockup",
    title: "ProductMockup",
    kind: "ui",
    category: "Display",
    description: "A responsive product screenshot frame with source-owned live-preview context.",
    sourcePath: "src/components/tai-ui/ProductMockup.tsx",
    dependencies: motion,
    previewId: "product-mockup",
    usage: '<ProductMockup title="ThinkAI Console" domain="console.thinkai.studio" type="homelab" />',
    variants: ["homelab", "studio"],
    whenToUse: "Use to frame a real product image or verified preview link.",
    whenNotToUse: "Do not use fake metrics, fake browser chrome, or invented product status.",
    accessibility: ["Images require meaningful alt text.", "The live preview link must describe its destination."],
    reducedMotion: "Removes parallax/reveal travel and shows the mockup in its final state.",
  },
  {
    slug: "halftone-banner",
    title: "HalftoneBanner",
    kind: "motion",
    category: "WebGL",
    description: "A procedural visual banner that should remain optional and content-independent.",
    sourcePath: "src/components/tai-ui/HalftoneBanner.tsx",
    dependencies: ["three", "motion"],
    previewId: "halftone-banner",
    usage: '<HalftoneBanner />',
    variants: ["static fallback", "interactive canvas"],
    whenToUse: "Use for a short atmospheric banner where the canvas is not required to understand the content.",
    whenNotToUse: "Avoid on documentation pages, low-power devices, or repeated card surfaces.",
    accessibility: ["Provide a meaningful static fallback.", "Never put required information only inside the canvas."],
    reducedMotion: "Disables continuous drift and uses the static fallback treatment.",
    motionNotes: "WebGL is a separate performance tier and requires explicit device/reduced-motion guards.",
  },
  {
    slug: "three-halftone-canvas",
    title: "ThreeHalftoneCanvas",
    kind: "motion",
    category: "WebGL",
    description: "A procedural Three.js canvas intended for controlled visual experiments.",
    sourcePath: "src/components/tai-ui/ThreeHalftoneCanvas.tsx",
    dependencies: ["three"],
    previewId: "three-halftone-canvas",
    usage: '<ThreeHalftoneCanvas className="h-44 w-full" />',
    variants: ["canvas", "reduced fallback"],
    whenToUse: "Use only when a procedural visual materially supports the page hierarchy.",
    whenNotToUse: "Do not use as decorative motion behind dense docs content.",
    accessibility: ["Canvas must be decorative or paired with equivalent DOM content.", "Respect reduced-motion and visibility changes."],
    reducedMotion: "Stops animation and renders a quiet static surface.",
  },
  {
    slug: "smooth-scroll",
    title: "SmoothScroll",
    kind: "motion",
    category: "System",
    description: "A Lenis provider for pages where smooth scrolling is intentionally part of the experience.",
    sourcePath: "src/components/tai-ui/SmoothScroll.tsx",
    dependencies: ["lenis"],
    previewId: "smooth-scroll",
    usage: '<SmoothScroll isLocked={isDialogOpen} />',
    variants: ["active", "locked"],
    whenToUse: "Use only for long-form showcase pages where scroll behavior has a clear benefit.",
    whenNotToUse: "Avoid in dense docs, forms, or pages with nested scroll surfaces.",
    accessibility: ["Do not interfere with keyboard scrolling.", "Lock only while an overlay requires it.", "Provide native behavior when reduced motion is enabled."],
    reducedMotion: "Falls back to native scroll behavior.",
    motionNotes: "Infrastructure behavior, not a visual effect; must not fight nested panel scrolling.",
  },
  {
    slug: "tech-logos",
    title: "TechLogos",
    kind: "icons",
    category: "Display",
    description: "A compact technology mark display for verified technologies.",
    sourcePath: "src/components/tai-ui/TechLogos.tsx",
    dependencies: motion,
    previewId: "tech-logos",
    usage: '<TechLogo name="Go" />',
    variants: ["default", "hover"],
    whenToUse: "Use for a factual technology list with recognizable labels.",
    whenNotToUse: "Avoid using logos as decorative proof without a real relationship.",
    accessibility: ["Include text or accessible labels for each technology.", "Do not rely on logo shape alone."],
    reducedMotion: "Removes hover lift.",
  },
  {
    slug: "ai-brand-icons",
    title: "AiBrandIcons",
    kind: "icons",
    category: "Display",
    description: "Source-owned SVG marks for AI providers used in factual integrations.",
    sourcePath: "src/components/tai-ui/AiBrandIcons.tsx",
    dependencies: [],
    previewId: "ai-brand-icons",
    usage: '<OpenAiIcon size={24} />',
    variants: ["icon", "labelled icon"],
    whenToUse: "Use when the provider identity is relevant to the user task.",
    whenNotToUse: "Do not imply an integration that the product does not actually provide.",
    accessibility: ["Provide an accessible label when icons are interactive or informative."],
    reducedMotion: "No motion required.",
  },
  {
    slug: "draw-underline", title: "DrawUnderline", kind: "motion", category: "Text",
    description: "A restrained underline draw that reinforces a text link or phrase.", sourcePath: "src/components/tai-ui/DrawUnderline.tsx", dependencies: ["motion"], previewId: "draw-underline", usage: '<DrawUnderline>Read the source</DrawUnderline>', variants: ["accent", "static"], whenToUse: "Use when the underline itself helps identify a text action or emphasis.", whenNotToUse: "Do not apply to every heading or paragraph.", accessibility: ["Text stays visible without the underline animation.", "Pair interactive use with a real anchor or button."], reducedMotion: "Underline is present immediately.",
  },
  {
    slug: "number-flow", title: "NumberFlow", kind: "motion", category: "Text",
    description: "A small numeric settle for values that genuinely change.", sourcePath: "src/components/tai-ui/NumberFlow.tsx", dependencies: ["motion"], previewId: "number-flow", usage: '<NumberFlow value={activeUsers} />', variants: ["integer", "string"], whenToUse: "Use for real changing numbers with a stable label and context.", whenNotToUse: "Do not invent metrics just to create an animation.", accessibility: ["Uses a polite live region for value changes.", "Keep the surrounding label visible."], reducedMotion: "Replaces the value without travel.",
  },
  { slug: "tai-icon-button", title: "TaiIconButton", kind: "icons", category: "Controls", description: "An accessible icon-only action with a consistent focus target.", sourcePath: "src/components/tai-ui/TaiIconButton.tsx", dependencies: ["motion"], previewId: "tai-icon-button", usage: '<TaiIconButton label="Open settings"><SettingsIcon /></TaiIconButton>', variants: ["default", "disabled"], whenToUse: "Use when the icon action is familiar and space is constrained.", whenNotToUse: "Use a labelled button when the action is unfamiliar.", accessibility: ["Requires an explicit accessible label.", "Provides a visible focus ring and title."], reducedMotion: "No motion required." },
  { slug: "progressive-blur", title: "ProgressiveBlur", kind: "motion", category: "Effects", description: "A restrained blur settle for a visual surface entering its final state.", sourcePath: "src/components/tai-ui/ProgressiveBlur.tsx", dependencies: ["motion"], previewId: "progressive-blur", usage: '<ProgressiveBlur><img alt="..." /></ProgressiveBlur>', variants: ["media", "static"], whenToUse: "Use on a non-essential visual surface with a clear final state.", whenNotToUse: "Do not blur controls, code, or required instructions.", accessibility: ["Never make essential information depend on the blur transition."], reducedMotion: "Renders without blur." },
];

export const getCatalogItem = (slug: string) => catalogItems.find((item) => item.slug === slug);
export const uiItems = catalogItems.filter((item) => item.kind === "ui");
export const motionItems = catalogItems.filter((item) => item.kind === "motion");
export const iconItems = catalogItems.filter((item) => item.kind === "icons");
