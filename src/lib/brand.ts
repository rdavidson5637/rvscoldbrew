/** Set NEXT_PUBLIC_SPOTIFY_PLAYLIST_ID in .env.local with your real playlist */
export const SPOTIFY_PLAYLIST_ID =
  process.env.NEXT_PUBLIC_SPOTIFY_PLAYLIST_ID ?? "37i9dQZF1DX4sWSpwq3LiO";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://rvscoldbrew.com";

export const LOCATION = {
  unit: "Unit 11",
  name: "Great Northern Mall",
  street: "48–52 Great Victoria Street",
  detail: "Near Grand Central Station",
  postcode: "BT2 7GN",
  city: "Belfast, BT2 7GN",
  region: "Northern Ireland",
  full: "Unit 11, Great Northern Mall, Belfast BT2 7GN, near Grand Central Station",
  mapsQuery: "Great+Northern+Mall,+Belfast+BT2+7GN,+Northern+Ireland",
  mapsDirectionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=Great+Northern+Mall,+Belfast+BT2+7GN,+Northern+Ireland",
} as const;

export const CONTACT_EMAIL = "info@rvscoldbrew.co.uk";

export const COMPANY_LEGAL = {
  name: "RV's Cold Brew Ltd",
  jurisdiction: "Registered in Northern Ireland",
  companyNumber: "NI737247",
  line: "RV's Cold Brew Ltd · Registered in Northern Ireland, company number NI737247",
} as const;

export const OPENING_HOURS = [
  { days: "Mon–Fri", hours: "7:00 – 17:00" },
  { days: "Sat", hours: "8:00 – 14:00" },
  { days: "Sun", hours: "Closed" },
] as const;

/**
 * Machine-readable weekly hours (Europe/London), index 0 = Sunday.
 * Minutes from midnight. Keep in sync with OPENING_HOURS and JsonLd.
 */
export const WEEKLY_HOURS: ReadonlyArray<{ open: number; close: number } | null> = [
  null,
  { open: 7 * 60, close: 17 * 60 },
  { open: 7 * 60, close: 17 * 60 },
  { open: 7 * 60, close: 17 * 60 },
  { open: 7 * 60, close: 17 * 60 },
  { open: 7 * 60, close: 17 * 60 },
  { open: 8 * 60, close: 14 * 60 },
];

export const BRAND_TAGLINE =
  "Espresso-strength CoreBrew Coffee Base, powering premium hot and cold drinks, plus single cultivar Okumidori Matcha.";

export const PRODUCT_COPY =
  "All the caffeine, zero bitterness. 100% brewed in Belfast.";

export const IMAGES = {
  hero: "/media/coldbrew-milk-pour-poster.jpg",
  matcha: "/media/matcha-whisk-poster.jpg",
  cansFridge: "/media/cans-fridge.jpg",
  concentratePour: "/media/coldbrew-concentrate-pour-poster.jpg",
  matchaPour: "/media/matcha-pour-poster.jpg",
  cityHall: "/media/coldbrew-city-hall-poster.jpg",
  matchaStreet: "/media/matcha-belfast-street-poster.jpg",
  og: "/media/og-image.jpg",
  logo: "/logo.png",
  processBlend: "/media/coldbrew-concentrate-pour-poster.jpg",
  processSteep: "/media/coldbrew-milk-pour-poster.jpg",
  processCan: "/media/cans-fridge.jpg",
  placeholder: "/media/cans-fridge.jpg",
} as const;

export const VIDEOS = {
  milkPour: {
    src: "/media/coldbrew-milk-pour.mp4",
    poster: "/media/coldbrew-milk-pour-poster.jpg",
  },
  concentratePour: {
    src: "/media/coldbrew-concentrate-pour.mp4",
    poster: "/media/coldbrew-concentrate-pour-poster.jpg",
  },
  cityHall: {
    src: "/media/coldbrew-city-hall.mp4",
    poster: "/media/coldbrew-city-hall-poster.jpg",
  },
  matchaPour: {
    src: "/media/matcha-pour.mp4",
    poster: "/media/matcha-pour-poster.jpg",
  },
  matchaWhisk: {
    src: "/media/matcha-whisk.mp4",
    poster: "/media/matcha-whisk-poster.jpg",
  },
  matchaStreet: {
    src: "/media/matcha-belfast-street.mp4",
    poster: "/media/matcha-belfast-street-poster.jpg",
  },
} as const;
