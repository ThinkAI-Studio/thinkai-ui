import { catalogItems } from "@/data/catalog";

export type DocPage = {
  slug: string;
  title: string;
  summary: string;
  category: "Guide" | "Components" | "System";
  sections: { id: string; title: string; body: string; code?: string }[];
};

export type AnswerConfidence = "grounded" | "fallback";

export type Answer = {
  answer: string;
  sourceSlug: string;
  sourceTitle: string;
  confidenceState: AnswerConfidence;
};

export type DocsSearchResult = {
  slug: string;
  title: string;
  kind: "guide" | "ui" | "motion";
  description: string;
};

export const docPages: DocPage[] = [
  {
    slug: "installation",
    title: "Installation",
    summary: "Install ThinkAI UI into a Next.js or React project and keep the generated source in your repository.",
    category: "Guide",
    sections: [
      { id: "initialize", title: "Initialize the registry", body: "Run the init command from the project where you want the primitives to live. It prepares the local registry configuration without hiding the resulting files.", code: "npx thinkai-ui init" },
      { id: "add", title: "Add a component", body: "Choose a primitive from the catalog and copy it into your own UI folder. The output is regular source code: inspect it, rename it, or change its behavior.", code: "npx thinkai-ui add wipe-button" },
      { id: "compose", title: "Import the source", body: "Import the installed component using your project alias and compose it with your own product UI.", code: "import { WipeButton } from \"@/components/ui/wipe-button\";" },
    ],
  },
  {
    slug: "tai-button",
    title: "TaiButton",
    summary: "A compact action primitive with explicit variants, gentle feedback, and reduced-motion support.",
    category: "Components",
    sections: [
      { id: "usage", title: "Usage", body: "Use TaiButton for actions that change state or submit an intent. Keep the label short and let the variant communicate priority.", code: "<TaiButton variant=\"primary\">Deploy service</TaiButton>" },
      { id: "variants", title: "Variants", body: "Primary is the strongest action. Secondary and outline support adjacent actions. Ghost is for low-emphasis utility controls." },
      { id: "motion", title: "Motion behavior", body: "Hover uses a small spring lift and the icon follows the content. Tap settles one pixel down instead of applying a rigid scale." },
    ],
  },
  {
    slug: "wipe-button",
    title: "WipeButton",
    summary: "A source-owned forward wipe for high-intent actions and links.",
    category: "Components",
    sections: [
      { id: "usage", title: "Usage", body: "Use the wipe sparingly for a primary call to action. The text color inherits from the host class unless an explicit color is provided.", code: "<WipeButton className=\"bg-white text-black\">Explore</WipeButton>" },
      { id: "colors", title: "Color contract", body: "The wipe layer is independent from the foreground label. This prevents white-on-white failures when the button uses a light surface." },
      { id: "accessibility", title: "Accessibility", body: "Use a real button for actions and an anchor for navigation. Focus-visible styles remain available and reduced motion removes the sweep." },
    ],
  },
  {
    slug: "motion",
    title: "Motion system",
    summary: "A calm motion language for hierarchy, state, and tactile feedback.",
    category: "System",
    sections: [
      { id: "principles", title: "Principles", body: "Motion should explain what changed. Prefer opacity, small travel, and a soft settle over large transforms or looping decoration." },
      { id: "spring", title: "Spring baseline", body: "Use this baseline for controls and small surface transitions, then tune only when the interaction needs a different physical response.", code: "const gentleSpring = { type: \"spring\", stiffness: 180, damping: 24, mass: 0.9 };" },
      { id: "reduced-motion", title: "Reduced motion", body: "Every animated surface must provide the same state change without travel or a loop when prefers-reduced-motion is enabled." },
    ],
  },
  {
    slug: "accessibility",
    title: "Accessibility",
    summary: "Semantic controls, visible focus, and predictable motion are part of every ThinkAI UI primitive.",
    category: "System",
    sections: [
      { id: "semantics", title: "Use the right element", body: "Use a real button for actions and an anchor for navigation. Labels should describe the result of the action, not the implementation behind it." },
      { id: "keyboard", title: "Keyboard behavior", body: "Keep controls reachable in the natural tab order, provide a crisp focus-visible ring, and make Enter or Space activate controls according to their native semantics." },
      { id: "disclosures", title: "Disclosures", body: "Expose expanded state with aria-expanded and connect the control to its content. Do not hide important status changes from assistive technology." },
    ],
  },
  {
    slug: "design-principles",
    title: "Design principles",
    summary: "ThinkAI UI favors source ownership, sharp geometry, honest states, and motion with a clear job.",
    category: "System",
    sections: [
      { id: "ownership", title: "Source ownership", body: "The registry distributes readable source files into your project. You can inspect, rename, and adapt each primitive without depending on a hidden runtime." },
      { id: "states", title: "Honest states", body: "Controls should communicate what is happening through their label and state. Avoid fabricated telemetry, fake counts, and decorative status that suggests work the product does not perform." },
      { id: "motion", title: "Purposeful motion", body: "Use opacity, small travel, and a soft settle to explain change. Respect prefers-reduced-motion by keeping the final state and removing travel or loops." },
    ],
  },
];

export const getDocPage = (slug: string) => docPages.find((page) => page.slug === slug) ?? docPages[0];

const searchIndex: DocsSearchResult[] = [
  ...docPages.map((page) => ({ slug: page.slug, title: page.title, kind: "guide" as const, description: page.summary })),
  ...catalogItems.map((item) => ({ slug: `${item.kind}/${item.slug}`, title: item.title, kind: item.kind, description: item.description })),
];

export function searchDocs(query: string): DocsSearchResult[] {
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (!terms.length) return searchIndex.slice(0, 8);
  return searchIndex.filter((entry) => terms.every((term) => `${entry.title} ${entry.description} ${entry.kind}`.toLowerCase().includes(term))).slice(0, 8);
}

export function answerQuestion(question: string): Answer {
  const normalized = question.toLowerCase();
  const answers: { terms: string[]; answer: string; sourceSlug: string; sourceTitle: string }[] = [
    { terms: ["install", "setup", "start", "registry", "add component"], answer: "Run `npx thinkai-ui init`, then add a primitive with `npx thinkai-ui add tai-button`. The CLI copies source into your project so you can own and edit it.", sourceSlug: "installation", sourceTitle: "Installation" },
    { terms: ["motion", "animation", "spring", "reduced motion"], answer: "Use Motion for intentional reveals, gentle springs, and component feedback. Reduced-motion users receive the same state change without travel.", sourceSlug: "motion", sourceTitle: "Motion system" },
    { terms: ["tai-button", "tai button", "component variant"], answer: "Use TaiButton for actions that change state or submit an intent. Choose primary for the strongest action, then secondary, outline, or ghost for supporting actions.", sourceSlug: "tai-button", sourceTitle: "TaiButton" },
    { terms: ["wipebutton", "wipe button"], answer: "Use WipeButton sparingly for a primary forward action or link. Keep the label short and use a real anchor when the action navigates.", sourceSlug: "wipe-button", sourceTitle: "WipeButton" },
    { terms: ["accessibility", "a11y", "keyboard", "focus", "aria", "semantic"], answer: "Use semantic buttons and links, visible focus styles, labelled controls, and `aria-expanded` for disclosures. Native keyboard behavior should remain predictable.", sourceSlug: "accessibility", sourceTitle: "Accessibility" },
    { terms: ["license", "ownership", "source", "telemetry", "principle", "design"], answer: "The primitives are distributed as source files. You own the runtime in your repository; components do not include tracking hooks or background telemetry.", sourceSlug: "design-principles", sourceTitle: "Design principles" },
  ];
  const match = answers.find((entry) => entry.terms.some((term) => normalized.includes(term)));
  if (match) return { answer: match.answer, sourceSlug: match.sourceSlug, sourceTitle: match.sourceTitle, confidenceState: "grounded" };
  const catalogMatch = catalogItems.find((item) => normalized.includes(item.slug) || normalized.includes(item.title.toLowerCase()));
  if (catalogMatch) return { answer: `${catalogMatch.title}: ${catalogMatch.description} ${catalogMatch.whenToUse}`, sourceSlug: `${catalogMatch.kind}/${catalogMatch.slug}`, sourceTitle: catalogMatch.title, confidenceState: "grounded" };
  return {
    answer: "This local docs index does not cover that topic yet. Try installation, components, motion, accessibility, or source ownership.",
    sourceSlug: "design-principles",
    sourceTitle: "Design principles",
    confidenceState: "fallback",
  };
}
