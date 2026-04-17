import type { Metadata } from "next";
import { Special_Elite } from "next/font/google";
import "./globals.css";

const typewriter = Special_Elite({
  weight: ['400'],
  subsets: ["latin"],
  variable: "--font-typewriter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gabriellebenot.com"),
  title: "GABRIELLE BENOT | Studio Archive & Fine Art",
  description: "Official portfolio of Gabrielle Benot. Multimedia artist exploring kinetic energy, industrial metal, and brutalist aesthetics.",
  keywords: ["Gabrielle Benot", "Fine Art", "Multimedia Artist", "Contemporary Art", "Brutalism", "Parallax Art", "Abstract Impasto"],
  icons: {
    icon: '/icon.svg',
  },
  openGraph: {
    title: "GABRIELLE BENOT | Studio Archive & Fine Art",
    description: "Official portfolio of Gabrielle Benot. Multimedia artist exploring kinetic energy, industrial metal, and brutalist aesthetics.",
    url: "https://gabriellebenot.com",
    siteName: "Gabrielle Benot",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GABRIELLE BENOT | Studio Archive & Fine Art",
    description: "Official portfolio of Gabrielle Benot. Multimedia artist exploring kinetic energy, industrial metal, and brutalist aesthetics.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${typewriter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
