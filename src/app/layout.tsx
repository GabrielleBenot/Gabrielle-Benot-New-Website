import type { Metadata } from "next";
import { Special_Elite } from "next/font/google";
import "./globals.css";

const typewriter = Special_Elite({
  weight: ['400'],
  subsets: ["latin"],
  variable: "--font-typewriter",
});

export const metadata: Metadata = {
  title: "Gabrielle Benot | Mixed Media Equine & Multimedia Artist",
  description: "Official portfolio of Gabrielle Benot. Multimedia artist creating a collision of high and low culture through mixed media equine art and conceptual minimalism.",
  keywords: ["Gabrielle Benot", "Mixed Media", "Equine Art", "Multimedia Artist", "Fine Art", "Contemporary Art", "Conceptual Minimalism"],
  openGraph: {
    title: "Gabrielle Benot | Mixed Media Equine Artist",
    description: "Official portfolio of Gabrielle Benot. Multimedia artist creating a collision of high and low culture through mixed media equine art and conceptual minimalism.",
    url: "https://gabriellebenot.com",
    siteName: "Gabrielle Benot",
    images: [
      {
        url: "/art1.png",
        width: 1200,
        height: 630,
        alt: "Gabrielle Benot Fine Art",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gabrielle Benot | Studio Archive",
    description: "Official portfolio of Gabrielle Benot. Mixed media equine art and conceptual minimalism.",
    images: ["/art1.png"],
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
