import { COMPANY_LEGAL, CONTACT_EMAIL, LOCATION, SITE_URL } from "@/lib/brand";

export default function JsonLd() {
  // TODO Ryan: live Wix page says tasting room open every day; clock hours in schema are retail/collection hours already in this repo. Confirm before launch.
  const schema = {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    name: "RV's Cold Brew",
    legalName: COMPANY_LEGAL.name,
    description:
      "RV's Cold Brew brews fresh cold brew concentrate and nitro cold brew in Belfast and supplies it on tap to cafés, bars and coffee roasters, with the taps, delivery and line cleaning included. Tasting room at Unit 11, Great Northern Mall.",
    url: SITE_URL,
    email: CONTACT_EMAIL,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${LOCATION.unit}, ${LOCATION.name}`,
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
