import type { Metadata, Viewport } from "next";
import { SessionProviders } from "@/components/providers/SessionProviders";
import { PWARegister } from "@/components/providers/PWARegister";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://shesadelaide.com"),
  title: {
    default: "Adelaide Taylor — The Quantum Engineer",
    template: "%s — Adelaide Taylor",
  },
  description:
    "Reality is not fixed. Your brain is running a program. Adelaide Taylor teaches you how to rewrite it. Not manifestation. Mechanism.",
  openGraph: {
    title: "Adelaide Taylor — The Quantum Engineer",
    description:
      "The science of coming home to who you actually are. Consciousness engineering taught by Adelaide Taylor.",
    url: "https://shesadelaide.com",
    siteName: "Adelaide Taylor",
    type: "website",
  },
  robots: { index: true, follow: true },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "The Quantum Engineer",
  },
};

export const viewport: Viewport = {
  themeColor: "#7A8C7E",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin=""
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body className="min-h-screen bg-cream text-sage-deep antialiased">
        <SessionProviders>{children}</SessionProviders>
        <PWARegister />
      </body>
    </html>
  );
}
