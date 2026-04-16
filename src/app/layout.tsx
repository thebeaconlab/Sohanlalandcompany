import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const SITE_URL = "https://sohanlalandcompany.com";
const SITE_NAME = "Sohan Lal & Co.";
const SITE_DESCRIPTION =
  "Sohan Lal & Co. — 50+ years of premium construction materials including " +
  "bricks, blocks, paving solutions, facade & wall cladding, precast solutions, " +
  "and architectural & landscape products. Trusted quality from Punjab, India.";

const lora = localFont({
  src: [
    {
      path: "../assets/fonts/Lora-VariableFont_wght.ttf",
      style: "normal",
    },
    {
      path: "../assets/fonts/Lora-Italic-VariableFont_wght.ttf",
      style: "italic",
    },
  ],
  variable: "--font-lora",
  display: "swap",
});

const outfit = localFont({
  src: "../assets/fonts/Outfit-VariableFont_wght.ttf",
  variable: "--font-outfit",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2ebe5" },
    { media: "(prefers-color-scheme: dark)", color: "#3d2a1c" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: `${SITE_NAME} | Premium Construction & Building Materials`,
    template: `%s | ${SITE_NAME}`,
  },

  description: SITE_DESCRIPTION,

  keywords: [
    "Sohan Lal and Company",
    "Sohan Lal & Co",
    "sohanlalandcompany",
    "construction company Punjab",
    "building materials India",
    "bricks and blocks manufacturer",
    "paving solutions Punjab",
    "facade cladding India",
    "wall cladding supplier",
    "precast solutions",
    "architectural products",
    "landscape products",
    "construction materials supplier",
    "premium building materials India",
    "construction company 50 years",
    "bricks supplier near Manakpur",
    "concrete blocks Punjab",
    "interlocking pavers India",
    "building materials Biromajri",
  ],

  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Premium Construction & Building Materials`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — 50+ years of premium construction & building materials`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Premium Construction & Building Materials`,
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
  },

  category: "construction",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${lora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
