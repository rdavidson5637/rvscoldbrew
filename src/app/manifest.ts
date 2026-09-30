import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "RV's Cold Brew",
    short_name: "RV's",
    description:
      "Smooth craft cold brew and premium matcha. Born in Belfast. Order for collection at Unit 11, Great Northern Mall.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#fff2cc",
    theme_color: "#0c343d",
    categories: ["food", "drink", "shopping"],
    icons: [
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      {
        name: "View Menu",
        short_name: "Menu",
        url: "/menu",
      },
      {
        name: "Order Now",
        short_name: "Order",
        url: "/order",
      },
    ],
  };
}
