import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { SessionProviders } from "@/components/providers/SessionProviders";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

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
      "The science of becoming who you actually are. Consciousness engineering taught by Adelaide Taylor.",
    url: "https://shesadelaide.com",
    siteName: "Adelaide Taylor",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-cream text-sage-deep antialiased">
        <SessionProviders>{children}</SessionProviders>
      </body>
    </html>
  );
}
