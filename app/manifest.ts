import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Quite Flame Co. — Hand-Poured Soy Candles",
    short_name: "Quite Flame Co.",
    description:
      "Hand-poured soy candles made in Troy, Michigan. Shop natural, long-lasting scented candles.",
    start_url: "/",
    display: "standalone",
    background_color: "#1a1a1a",
    theme_color: "#1a1a1a",
    icons: [
      {
        src: "/candle2.jpg",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/candle2.jpg",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}