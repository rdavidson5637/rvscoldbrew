/** Set NEXT_PUBLIC_SPOTIFY_PLAYLIST_ID in .env.local with your real playlist */
export const SPOTIFY_PLAYLIST_ID =
  process.env.NEXT_PUBLIC_SPOTIFY_PLAYLIST_ID ?? "37i9dQZF1DX4sWSpwq3LiO";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://rvscoldbrew.com";

export const LOCATION = {
  unit: "Unit 11",
  name: "Great Northern Mall",
  detail: "Near Grand Central Station",
  city: "Belfast, Northern Ireland",
  full: "Unit 11, Great Northern Mall, Belfast — near Grand Central Station",
  mapsQuery: "Great+Northern+Mall,+Belfast,+Northern+Ireland",
  mapsDirectionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=Great+Northern+Mall,+Belfast,+Northern+Ireland",
} as const;

export const OPENING_HOURS = [
  { days: "Mon–Fri", hours: "7:00 – 17:00" },
  { days: "Sat", hours: "8:00 – 14:00" },
  { days: "Sun", hours: "Closed" },
] as const;

export const BRAND_TAGLINE =
  "Espresso-strength CoreBrew Coffee Base — powering premium hot and cold drinks, plus single cultivar Okumidori Matcha.";

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
