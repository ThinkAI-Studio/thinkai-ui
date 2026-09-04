import type { Metadata } from "next";
import { CatalogIndex } from "../ComponentDocClient";

export const metadata: Metadata = { title: "Icons", description: "Factual and accessible ThinkAI UI icon resources." };

export default function IconsPage() {
  return <CatalogIndex kind="icons" />;
}
