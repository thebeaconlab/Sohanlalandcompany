import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sohan Lal & Co. — Premium Construction & Building Materials",
    short_name: "Sohan Lal & Co.",
    description:
      "A trusted construction company with 50+ years of legacy. " +
      "Premium bricks, paving, facade, precast & architectural products.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#f2ebe5",
    theme_color: "#3d2a1c",
    categories: ["business", "construction"],
    icons: [
      // Add icons when ready:
      // { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      // { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
