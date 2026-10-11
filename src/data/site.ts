// ============================================================================
//  SINGLE SOURCE OF TRUTH
//  Edit ONLY this file to change any content on the website:
//  phone numbers, owners, amenities, and every PG (name, address, photo,
//  Google-map link, description). Add a new PG = add an object to `properties`.
// ============================================================================

export type Phone = {
  label: string;
  /** Pretty version shown to users, e.g. "+91 99291 22288" */
  display: string;
  /** Digits only, with country code, for tel:/wa.me — e.g. "919929122288" */
  raw: string;
};

export type Amenity = {
  /** Emoji or icon key */
  icon: string;
  title: string;
  description: string;
};

export type Property = {
  /** Short name used in headings, e.g. "Devi Nagar" */
  name: string;
  /** Small location tag shown on the photo */
  area: string;
  /** Full postal address */
  address: string;
  /** Google Maps share link */
  mapLink: string;
  /** Photo: a URL, or a file you drop in /public (e.g. "/pgs/devi-nagar.jpg") */
  image: string;
  /** One-line description */
  description: string;
};

export const site = {
  brand: "Leelansh",
  brandFull: "Leelansh Girls PG",
  /** Live domain, no trailing slash. Used for SEO: canonical URLs, sitemap, structured data. */
  url: "https://leelanshpg.com",
  heroEyebrow: "4 Premium Locations in Jaipur",
  heroTitle: ["Girls PG", "that feels", "like home."],
  heroSubtitle:
    "Safe, homely and fully-managed paying-guest stays for students & working women. Delicious meals, Wi-Fi, parking and 24/7 security — all under one roof.",
  city: "Jaipur, Rajasthan",

  // --- Contact -------------------------------------------------------------
  phones: [
    { label: "Primary", display: "+91 87702 84149", raw: "918770284149" },
    { label: "Alternate", display: "+91 99291 22288", raw: "919929122288" },
  ] as Phone[],
  // WhatsApp number (digits only, with country code)
  whatsapp: "919929122288",
  whatsappMessage: "Hi! I'm interested in Leelansh Girls PG. Please share details.",

  // --- Headline stats shown under the hero ---------------------------------
  stats: [
    { value: "4", label: "Locations" },
    { value: "24/7", label: "Security" },
    { value: "100%", label: "Homely Food" },
  ],

  // --- Owners --------------------------------------------------------------
  owners: {
    names: "Sonali & Navin Jaiswal",
    // Drop a real photo in /public and change this to e.g. "/owners.jpg"
    photo:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80",
    bio: "At Leelansh Girls PG, we believe in creating a homely and secure environment for every resident. We personally manage each property to ensure comfort, cleanliness and care in every detail. Our hands-on approach and commitment to a safe, welcoming atmosphere make Leelansh a trusted choice for students and working professionals in Jaipur.",
  },

  // --- Amenities -----------------------------------------------------------
  amenities: [
    { icon: "food", title: "Delicious Food", description: "Hygienic, homely meals served fresh every day." },
    { icon: "wifi", title: "Free Wi-Fi", description: "High-speed internet for study, work & streaming." },
    { icon: "parking", title: "Parking Space", description: "Secure parking — keep your vehicle safe & close." },
    { icon: "security", title: "24/7 Security", description: "Round-the-clock safety for total peace of mind." },
  ] as Amenity[],

  // --- Properties (the PG list) --------------------------------------------
  // To ADD a PG, copy one block and edit it. To REMOVE one, delete its block.
  properties: [
    {
      name: "Leelansh PG — Devi Nagar",
      area: "Sodala",
      address: "298-A, Devi Nagar, Near Gurjar Ki Thadi, Jaipur 302019",
      mapLink: "https://share.google/VgtKpma3P3zTXfhod",
      image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=900&q=80",
      description: "A safe and homely girls' PG in the heart of Devi Nagar, Sodala.",
    },
    {
      name: "Leelansh PG — Mansarovar Metro",
      area: "Mansarovar",
      address: "Near Pillar No. 16, Mansarovar Metro Station, Jaipur",
      mapLink: "https://share.google/CWI5TnPE4eAupQsFK",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=900&q=80",
      description: "Girls' paying-guest accommodation right by Mansarovar Metro Station.",
    },
    {
      name: "Leelansh PG — Nirman Nagar",
      area: "Kings Road",
      address: "AB-566, Nirman Nagar, Kings Road, Opp. RN Hospital, Jaipur",
      mapLink: "https://share.google/VgtKpma3P3zTXfhod",
      image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=900&q=80",
      description: "A comfortable and secure girls' PG located in Nirman Nagar.",
    },
    {
      name: "Leelansh PG — SheStays",
      area: "Shanti Vihar",
      address: "12A, Uma Colony, Santi Vihar, Jaipur, Rajasthan 302019",
      mapLink: "https://share.google/inAESO6bL72F8mvdR",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=900&q=80",
      description: "A comfortable and secure girls' PG located in Shanti Vihar.",
    },
  ] as Property[],

  // --- Hero decorative images (used only until admin adds real photos) -----
  // These are branding visuals for the homepage hero, NOT PG listings. Once
  // you upload gallery/PG photos in admin, the hero uses those instead.
  heroImages: [
    "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=900&q=80",
    "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=900&q=80",
  ],

  footerCredit: "Crafted with care by Anshul Jaiswal",
};

// --- Link helpers (used across components) ---------------------------------
export const waLink = (number = site.whatsapp, message = site.whatsappMessage) =>
  `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

export const telLink = (raw = site.phones[0].raw) => `tel:+${raw}`;

export type Site = typeof site;
