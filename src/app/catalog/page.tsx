import type { Metadata } from "next";
import { CatalogIndex } from "../docs/ComponentDocClient";

export const metadata: Metadata = { title: "Catalog", description: "Browse ThinkAI UI source-owned primitives." };

export default function CatalogPage() {
  return <CatalogIndex />;
}
