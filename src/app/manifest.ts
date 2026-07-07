import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "RV's Cold Brew",
    short_name: "RV's Cold Brew",
    description:
      "Smooth craft cold brew and premium matcha. Born in Belfast.",
    start_url: "/",
    display: "standalone",
    background_color: "#fff2cc",
    theme_color: "#0c343d",
    icons: [
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
