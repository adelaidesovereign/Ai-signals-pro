import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Solas Spa | Blue Ridge Mountain Sanctuary",
  description:
    "A luxury wellness sanctuary nestled in 200 acres of pristine Blue Ridge Mountain forest near Asheville, North Carolina. World-class spa, farm-to-table dining, and timeless accommodations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <body className="min-h-screen flex flex-col bg-cream text-forest">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
