import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bakoel Nyonya Lie | Katalog Kue & Jajanan",
  description:
    "Katalog Bakoel Nyonya Lie — kue rumahan, jajanan tradisional, dan camilan gurih untuk dipesan via WhatsApp.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
