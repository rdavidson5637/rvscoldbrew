import { LOCATION, SITE_URL } from "@/lib/brand";

export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    name: "RV's Cold Brew",
    description:
      "Espresso-strength cold brew concentrate and Okumidori matcha. Born in Belfast.",
    url: SITE_URL,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${LOCATION.unit}, ${LOCATION.name}`,
      addressLocality: "Belfast",
      addressRegion: "Northern Ireland",
      addressCountry: "GB",
    },
    hasMenu: `${SITE_URL}/order`,
    potentialAction: {
      "@type": "OrderAction",
      target: `${SITE_URL}/order`,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "14:00",
      },
    ],
    servesCuisine: "Coffee",
    priceRange: "£",
    sameAs: [],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
