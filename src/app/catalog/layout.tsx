import type { ReactNode } from "react";
import { DocsShell } from "@/app/docs/DocsShell";
import { SmoothScroll } from "@/components/tai-ui/SmoothScroll";

export default function CatalogLayout({ children }: { children: ReactNode }) {
  return <><SmoothScroll /><DocsShell>{children}</DocsShell></>;
}
