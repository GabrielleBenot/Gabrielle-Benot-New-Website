import type { Metadata } from "next";
import { Special_Elite } from "next/font/google";
import "./globals.css";

const typewriter = Special_Elite({
  weight: ['400'],
  subsets: ["latin"],
  variable: "--font-typewriter",
});

export const metadata: Metadata = {
  title: "Gabrielle Benot | Minimalist Dadaism",
  description: "Raw Analog Fine Art Portfolio",
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
