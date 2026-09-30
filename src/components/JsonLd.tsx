import { LOCATION, SITE_URL } from "@/lib/brand";

export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    name: "RV's Cold Brew",
    description:
      "CoreBrew Coffee Base and Okumidori matcha. Born in Belfast. Collection at Unit 11, Great Northern Mall.",
    url: SITE_URL,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${LOCATION.unit}, ${LOCATION.name}`,
      addressLocality: "Belfast",
      addressRegion: "Northern Ireland",
      addressCountry: "GB",
    },
    hasMenu: `${SITE_URL}/menu`,
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
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "00:00",
        closes: "00:00",
      },
    ],
    servesCuisine: "Coffee",
    priceRange: "£",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
