import type { Metadata } from "next";
import DocsClient from "../DocsClient";
import { docPages, getDocPage } from "../docs-data";

export function generateStaticParams() {
  return docPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getDocPage(slug);
  return { title: page.title, description: page.summary };
}

export default async function DocDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <DocsClient page={getDocPage(slug)} />;
}
