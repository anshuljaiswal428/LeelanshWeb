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

const title = `${site.brandFull} — Best Girls PG & Hostel in Jaipur`;
const description =
  "Looking for the best girls PG in Jaipur? Leelansh offers safe, homely & fully-managed paying guest and girls hostel accommodation across 4 locations in Jaipur — Sodala, Mansarovar, Nirman Nagar & Shanti Vihar. Homely food, Wi-Fi, parking & 24/7 security for students and working women.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: `%s | ${site.brandFull}`,
  },
  description,
  keywords: [
    "best pg in jaipur",
    "pg in jaipur",
    "girls pg in jaipur",
    "girls hostel in jaipur",
    "hostels in jaipur",
    "ladies pg in jaipur",
    "paying guest in jaipur",
    "pg for girls in jaipur",
    "women pg jaipur",
    "girls pg sodala",
    "girls pg mansarovar",
    "girls pg nirman nagar",
    "pg near mansarovar metro",
    "student accommodation jaipur",
    "working women pg jaipur",
    "Leelansh Girls PG",
  ],
  applicationName: site.brandFull,
  authors: [{ name: site.brandFull }],
  creator: site.brandFull,
  publisher: site.brandFull,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description,
    url: site.url,
    siteName: site.brandFull,
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "Accommodation",
  // After you set up Google Search Console, paste the verification code here:
  // verification: { google: "your-google-site-verification-code" },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.brandFull,
  url: site.url,
  logo: `${site.url}/logo.png`,
  description,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Jaipur",
    addressRegion: "Rajasthan",
    addressCountry: "IN",
  },
  telephone: site.phones.map((p) => `+${p.raw}`),
  areaServed: "Jaipur, Rajasthan, India",
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.brandFull,
  url: site.url,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        {children}
        <ContactChooser />
      </body>
    </html>
  );
}
