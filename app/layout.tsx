import type { Metadata } from "next";
import "./globals.css";
import SiteShell from "@/components/SiteShell";
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  title: "Nick Hallam — Product Designer",
  description: "A product designer and founder living in Brooklyn, NY.",
  icons: {
    icon: [
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/Favicon1.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

function ordinal(n: number) {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return n + (s[(v - 20) % 10] ?? s[v] ?? s[0])
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Computed at build/render time on the server, so it reflects the last deploy.
  const now = new Date()
  const lastUpdated = `${ordinal(now.getDate())} ${now.toLocaleDateString('en-GB', { month: 'long' })}, ${now.getFullYear()}`

  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.dataset.theme=t;}catch(e){}})();`,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full">
        <SiteShell lastUpdated={lastUpdated}>{children}</SiteShell>
        <Analytics />
      </body>
    </html>
  );
}
