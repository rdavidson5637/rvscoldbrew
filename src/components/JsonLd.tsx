import { COMPANY_LEGAL, CONTACT_EMAIL, LOCATION, SITE_URL } from "@/lib/brand";

export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    name: "RV's Cold Brew",
    legalName: COMPANY_LEGAL.name,
    description:
      "CoreBrew Coffee Base, nitro cold brew, and Okumidori matcha. Brewed in Belfast, served daily at Unit 11, Great Northern Mall, and supplied on tap across Northern Ireland.",
    url: SITE_URL,
    email: CONTACT_EMAIL,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${LOCATION.unit}, ${LOCATION.name}, ${LOCATION.street}`,
      addressLocality: "Belfast",
      postalCode: LOCATION.postcode,
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
