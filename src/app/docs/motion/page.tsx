import type { Metadata } from "next";
import { CatalogIndex } from "../ComponentDocClient";

export const metadata: Metadata = { title: "Motion primitives", description: "Purposeful motion primitives for ThinkAI UI." };

export default function MotionDocsPage() {
  return <CatalogIndex kind="motion" />;
}
