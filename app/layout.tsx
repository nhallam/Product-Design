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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full">
        <SiteShell>{children}</SiteShell>
        <Analytics />
      </body>
    </html>
  );
}
