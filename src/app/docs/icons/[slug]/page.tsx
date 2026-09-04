import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { catalogItems, getCatalogItem } from "@/data/catalog";
import ComponentDocClient from "../../ComponentDocClient";

export function generateStaticParams() {
  return catalogItems.filter((item) => item.kind === "icons").map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = getCatalogItem(slug);
  return { title: item?.title ?? "Icon", description: item?.description };
}

export default async function IconPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getCatalogItem(slug);
  if (!item || item.kind !== "icons") notFound();
  return <ComponentDocClient item={item} />;
}
