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

/**
 * Flipdish online ordering embed.
 * TODO (owner/dev): from the Flipdish portal, generate the embed at
 * https://flipdish.website/ and paste:
 *  - APP_ID: your Flipdish App ID (looks like "fd12345")
 *  - EMBED_SCRIPT: the exact <script> src the generator gives you
 * Also: whitelist the site's hostname in the Flipdish portal and ensure the
 * site is served over https, or the embed will not load.
 */
export const FLIPDISH = {
  APP_ID: process.env.NEXT_PUBLIC_FLIPDISH_APP_ID ?? "",
  EMBED_SCRIPT:
    process.env.NEXT_PUBLIC_FLIPDISH_EMBED_SCRIPT ??
    "https://d1nnvltbcfrgy2.cloudfront.net/webembed/embed.js",
} as const;

export const OPENING_HOURS = [
  { days: "Mon–Fri", hours: "7:00 – 17:00" },
  { days: "Sat", hours: "8:00 – 14:00" },
  { days: "Sun", hours: "Closed" },
] as const;

export const BRAND_TAGLINE =
  "Espresso-strength cold brew concentrate — powering premium hot and cold drinks, plus single cultivar Okumidori Matcha.";

export const PRODUCT_COPY =
  "All the caffeine, zero bitterness. 100% brewed in Belfast.";

export const IMAGES = {
  hero:
    "https://images.unsplash.com/photo-1517701554-2fa99ff4b7f7?w=1200&q=85",
  matcha:
    "https://images.unsplash.com/photo-1536252843750-bf565563b72d?w=900&q=85",
  coldBrewCan:
    "https://images.unsplash.com/photo-1495474472287-4d47bcdddb65?w=600&q=80",
  coldBrewPour:
    "https://images.unsplash.com/photo-1517701554-2fa99ff4b7f7?w=600&q=80",
  beans:
    "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&q=80",
  icedCoffee:
    "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80",
  concentrate:
    "https://images.unsplash.com/photo-1514434755167-49f01a784db0?w=600&q=80",
  processBlend:
    "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&q=80",
  processSteep:
    "https://images.unsplash.com/photo-1495474472287-4d47bcdddb65?w=400&q=80",
  processCan:
    "https://images.unsplash.com/photo-1517701554-2fa99ff4b7f7?w=400&q=80",
} as const;
