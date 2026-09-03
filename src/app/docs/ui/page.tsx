import type { Metadata } from "next";
import { CatalogIndex } from "../ComponentDocClient";

export const metadata: Metadata = { title: "UI primitives", description: "Source-owned ThinkAI UI primitives." };

export default function UiDocsPage() {
  return <CatalogIndex kind="ui" />;
}
