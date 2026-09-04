import type { ReactNode } from "react";
import { DocsShell } from "./DocsShell";
import { SmoothScroll } from "@/components/tai-ui/SmoothScroll";

export default function DocsLayout({ children }: { children: ReactNode }) {
  return <><SmoothScroll /><DocsShell>{children}</DocsShell></>;
}
