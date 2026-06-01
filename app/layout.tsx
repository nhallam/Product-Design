import type { Metadata } from "next";
import "./globals.css";
import SiteShell from "@/components/SiteShell";
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  title: "Nick Hallam — Product Designer",
  description: "A product designer and founder living in Brooklyn, NY.",
  icons: { icon: '/Favicon.svg' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full">
        <SiteShell>{children}</SiteShell>
        <Analytics />
      </body>
    </html>
  );
}
