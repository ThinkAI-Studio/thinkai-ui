import type { Metadata } from "next";
import DocsClient from "./DocsClient";

export const metadata: Metadata = {
  title: "Documentation",
  description: "Install, compose, and extend ThinkAI UI primitives with source ownership.",
};

export default function DocumentationPage() {
  return <DocsClient />;
}
