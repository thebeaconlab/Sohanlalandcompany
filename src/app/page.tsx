import type { Metadata } from "next";
import Header from "../components/sections/Header/Header";
import Hero from "../components/sections/Hero/Hero";
import Category from "../components/sections/Category/Category";
import Legacy from "../components/sections/Legacy/Legacy";
import Testimonial from "../components/sections/Partners-Review/Testimonial/Testimonial";
import Footer from "../components/Footer/Footer";

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
      name: "Sohan Lal & Co.",
      alternateName: "Sohan Lal and Company",
      url: SITE_URL,
      logo: `${SITE_URL}/og-image.png`,
      description:
        "A trusted construction company with a legacy spanning over 50 years, " +
        "delivering premium building materials and innovative construction solutions " +
        "from Punjab, India.",
      foundingDate: "1975",
      numberOfEmployees: { "@type": "QuantitativeValue", minValue: 50 },
      knowsAbout: [
        "Bricks & Blocks",
        "Paving Solutions",
        "Facade & Wall Cladding",
        "Precast Solutions",
        "Architectural & Landscape Products",
      ],
      address: {
        "@type": "PostalAddress",
        streetAddress: "Village Biromajri",
        addressLocality: "Near Manakpur",
        addressRegion: "Punjab",
        postalCode: "140602",
        addressCountry: "IN",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+91-99889-00382",
          contactType: "sales",
          availableLanguage: ["English", "Hindi", "Punjabi"],
        },
        {
          "@type": "ContactPoint",
          telephone: "+91-81980-00382",
          contactType: "customer service",
          availableLanguage: ["English", "Hindi", "Punjabi"],
        },
      ],
      areaServed: {
        "@type": "Country",
        name: "India",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Sohan Lal & Co.",
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en-IN",
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#homepage`,
      url: SITE_URL,
      name: "Sohan Lal & Co. | Premium Construction & Building Materials",
      description:
        "Explore Sohan Lal & Co.'s premium range of bricks, paving solutions, " +
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
          url: `${SITE_URL}/products/bricks-blocks`,
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
          url: `${SITE_URL}/products/wall-cladding`,
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
          url: `${SITE_URL}/products/architecture-landscape`,
        },
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#localbusiness`,
      name: "Sohan Lal & Co.",
      image: `${SITE_URL}/og-image.png`,
      url: SITE_URL,
      telephone: "+91-99889-00382",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Village Biromajri",
        addressLocality: "Near Manakpur",
        addressRegion: "Punjab",
        postalCode: "140602",
        addressCountry: "IN",
      },
      priceRange: "$$",
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "18:00",
      },
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
        <Testimonial />
      </main>
      <Footer />
    </>
  );
}
