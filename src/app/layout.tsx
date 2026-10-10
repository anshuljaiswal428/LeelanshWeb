import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";
import ContactChooser from "@/components/ContactChooser";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${site.brandFull} — Safe Girls PG in ${site.city}`,
  description: site.heroSubtitle,
  keywords: [
    "Girls PG Jaipur",
    "PG for girls",
    "paying guest Jaipur",
    "Leelansh Girls PG",
    "ladies PG Jaipur",
  ],
  openGraph: {
    title: `${site.brandFull} — Safe Girls PG in ${site.city}`,
    description: site.heroSubtitle,
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body>
        {children}
        <ContactChooser />
      </body>
    </html>
  );
}
