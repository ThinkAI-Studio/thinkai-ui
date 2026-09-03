import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ComponentDocClient from "../../ComponentDocClient";
import { catalogItems, getCatalogItem } from "@/data/catalog";

export function generateStaticParams() {
  return catalogItems.filter((item) => item.kind === "motion").map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = getCatalogItem(slug);
  return item ? { title: item.title, description: item.description } : {};
}

export default async function MotionComponentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getCatalogItem(slug);
  if (!item || item.kind !== "motion") notFound();
  return <ComponentDocClient item={item} />;
}
