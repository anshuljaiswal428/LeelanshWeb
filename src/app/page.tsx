import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Properties from "@/components/Properties";
import Amenities from "@/components/Amenities";
import Gallery from "@/components/Gallery";
import Owners from "@/components/Owners";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { getProperties, getGallery, getOwnerPhoto } from "@/lib/data";

export const dynamic = "force-dynamic";

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
