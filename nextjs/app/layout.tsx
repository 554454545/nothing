import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./(web)/globals.css";

export const metadata: Metadata = { title: "Next.js Minimal", description: "Minimal Next.js runtime" };

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
