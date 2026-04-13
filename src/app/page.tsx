import type { Metadata } from "next";
import Header from "../components/sections/Header/Header";
import Hero from "../components/sections/Hero/Hero";
import Category from "../components/sections/Category/Category";
import Legacy from "../components/sections/Legacy/Legacy";
import LaunchingSoon from "../components/sections/LaunchSoon/Launching_soon";

const SITE_URL = "https://sohanlalandcompany.com";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "SL Build Tech",
      alternateName: "Sohan Lal and Company",
      url: SITE_URL,
      logo: `${SITE_URL}/og-image.png`,
      description:
        "A trusted construction company with a legacy spanning over 50 years, " +
        "delivering premium building materials and innovative construction solutions.",
      foundingDate: "1975",
      numberOfEmployees: { "@type": "QuantitativeValue", minValue: 50 },
      knowsAbout: [
        "Bricks & Blocks",
        "Paving Solutions",
        "Facade & Wall Cladding",
        "Precast Solutions",
        "Architectural & Landscape Products",
      ],
      /* TODO: Add when ready
      address: {
        "@type": "PostalAddress",
        streetAddress: "...",
        addressLocality: "...",
        addressRegion: "...",
        postalCode: "...",
        addressCountry: "IN",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91-...",
        contactType: "sales",
        availableLanguage: ["English", "Hindi"],
      },
      sameAs: [
        "https://www.instagram.com/...",
        "https://www.linkedin.com/company/...",
      ],
      */
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "SL Build Tech",
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en-IN",
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#homepage`,
      url: SITE_URL,
      name: "SL Build Tech | Premium Construction & Building Solutions",
      description:
        "Explore SL Build Tech's premium range of bricks, paving solutions, " +
        "facade cladding, precast products, and architectural designs — " +
        "backed by 50+ years of trusted craftsmanship.",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en-IN",
    },
    {
      "@type": "ItemList",
      name: "Product Categories",
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      numberOfItems: 5,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Bricks & Blocks",
          url: `${SITE_URL}/products/bricks-and-blocks`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Paving Solutions",
          url: `${SITE_URL}/products/paving-solutions`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Facade & Wall Cladding",
          url: `${SITE_URL}/products/facade-and-wall-cladding`,
        },
        {
          "@type": "ListItem",
          position: 4,
          name: "Precast Solutions",
          url: `${SITE_URL}/products/precast-solutions`,
        },
        {
          "@type": "ListItem",
          position: 5,
          name: "Architectural & Landscape",
          url: `${SITE_URL}/products/architectural-and-landscape`,
        },
      ],
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>
        <Hero />
        <Category />
        <Legacy />
        <LaunchingSoon />
      </main>
    </>
  );
}
