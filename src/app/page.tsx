import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Properties from "@/components/Properties";
import Amenities from "@/components/Amenities";
import Gallery from "@/components/Gallery";
import Owners from "@/components/Owners";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { getProperties, getGallery, getOwnerPhoto } from "@/lib/data";
import { site } from "@/data/site";

export const dynamic = "force-dynamic";

/** Build schema.org LodgingBusiness JSON-LD for every PG so Google can show
 *  each location as a local business in "pg in jaipur" style searches. */
function buildLodgingJsonLd(
  properties: { name: string; area: string; address: string; image: string; description: string }[],
) {
  const postalFrom = (address: string) => address.match(/\b(\d{6})\b/)?.[1];
  return {
    "@context": "https://schema.org",
    "@graph": properties.map((p) => ({
      "@type": "LodgingBusiness",
      name: p.name,
      description: p.description,
      image: p.image || undefined,
      url: site.url,
      priceRange: "₹₹",
      telephone: `+${site.phones[0].raw}`,
      address: {
        "@type": "PostalAddress",
        streetAddress: p.address,
        addressLocality: "Jaipur",
        addressRegion: "Rajasthan",
        postalCode: postalFrom(p.address),
        addressCountry: "IN",
      },
      amenityFeature: site.amenities.map((a) => ({
        "@type": "LocationFeatureSpecification",
        name: a.title,
        value: true,
      })),
    })),
  };
}

export default async function Home() {
  const [properties, gallery, ownerPhoto] = await Promise.all([
    getProperties(),
    getGallery(),
    getOwnerPhoto(),
  ]);

  // Hero imagery uses real admin content (gallery first, then PG photos).
  const heroImages = [
    ...gallery.map((g) => g.image),
    ...properties.map((p) => p.image),
  ]
    .filter(Boolean)
    .slice(0, 2);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildLodgingJsonLd(properties)),
        }}
      />
      <Nav />
      <Hero propertyCount={properties.length} heroImages={heroImages} />
      <Properties properties={properties} />
      <Amenities />
      <Gallery images={gallery} />
      <Owners photo={ownerPhoto} />
      <Footer />
      <FloatingActions />
    </main>
  );
}
