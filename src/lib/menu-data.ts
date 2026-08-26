/**
 * RV's Cold Brew - real menu, mirrored from the live Square Online site
 * (https://rvs-cold-brew-coffee.square.site) as of 26 Aug 2026.
 *
 * PURPOSE: typed fallback only. The Square Catalog API is authoritative at
 * runtime for prices, descriptions, images, and availability. This file exists
 * so the site renders a real menu when Square is unreachable or env vars are
 * missing, and so category ordering on the site is stable and intentional
 * rather than whatever order the API returns.
 *
 * IDs below are Square catalog object IDs taken from the live Square Online
 * sitemap. They are stable and safe to use for lookups.
 *
 * NOT INCLUDED: prices. They are deliberately omitted rather than guessed -
 * the Catalog API supplies them. Never hardcode a price here.
 *
 * Category assignment for a couple of items is inferred from the product name
 * (flagged with `categoryInferred: true`). The Catalog API's category is
 * authoritative and should override these when available.
 */

export type MenuCategoryId =
  | "hot-coffee"
  | "iced-coffee"
  | "hot-matcha"
  | "iced-matcha"
  | "chocolate"
  | "food"
  | "bakery"
  | "in-store";

export type MenuCategory = {
  id: MenuCategoryId;
  /** Square category object ID */
  squareId: string;
  name: string;
  /** Path on the Square Online site, useful for cross-linking during migration */
  squarePath: string;
  blurb: string;
};

export type MenuItem = {
  /** Square catalog object ID (ITEM) */
  squareId: string;
  slug: string;
  name: string;
  category: MenuCategoryId;
  /** Populated from Square at runtime; verified copy only where known */
  description?: string;
  categoryInferred?: boolean;
};

/** Display order on the site. Drinks first, food after. */
export const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: "iced-coffee",
    squareId: "RBL5WO7ZSRUOI5UXGMIWJ2KR",
    name: "Iced Coffee",
    squarePath: "/shop/iced-coffee/RBL5WO7ZSRUOI5UXGMIWJ2KR",
    blurb: "Built on our CoreBrew base. Smooth, never bitter.",
  },
  {
    id: "iced-matcha",
    squareId: "JI4FGFCULXZ6HCHHI43ELPPZ",
    name: "Iced Matcha",
    squarePath: "/shop/iced-matcha/JI4FGFCULXZ6HCHHI43ELPPZ",
    blurb: "Single cultivar Okumidori, whisked fresh and poured over ice.",
  },
  {
    id: "hot-coffee",
    squareId: "JBDYFZWNN7OLIQLV2D7RZHV4",
    name: "Hot Coffee",
    squarePath: "/shop/hot-coffee/JBDYFZWNN7OLIQLV2D7RZHV4",
    blurb: "Espresso-strength CoreBrew, served hot.",
  },
  {
    id: "hot-matcha",
    squareId: "F3GA6CTNFEOKAHCFNNBXPIYH",
    name: "Hot Matcha",
    squarePath: "/shop/hot-matcha/F3GA6CTNFEOKAHCFNNBXPIYH",
    blurb: "Ceremonial grade matcha, hot whisked.",
  },
  {
    id: "chocolate",
    squareId: "FKK5A5SLDWCE35RKTJCISXZI",
    name: "Chocolate",
    squarePath: "/shop/chocolate/FKK5A5SLDWCE35RKTJCISXZI",
    blurb: "Hot or iced, properly rich.",
  },
  {
    id: "food",
    squareId: "ACDMXJDP5O7L2DL3J67HJYR2",
    name: "Food",
    squarePath: "/shop/food/ACDMXJDP5O7L2DL3J67HJYR2",
    blurb: "Toasties and sausage rolls, made to order.",
  },
  {
    id: "bakery",
    squareId: "LDMX7L2NAHZ7WYA7GUF7HMMY",
    name: "Bakery",
    squarePath: "/shop/bakery/LDMX7L2NAHZ7WYA7GUF7HMMY",
    blurb: "Fresh in daily. When it's gone, it's gone.",
  },
  {
    id: "in-store",
    squareId: "KVINEJWUQ6Z54KVW2SJLH7ED",
    name: "In-Store",
    squarePath: "/shop/in-store/KVINEJWUQ6Z54KVW2SJLH7ED",
    blurb: "Available at the counter, Unit 11.",
  },
];

export const MENU_ITEMS: MenuItem[] = [
  // ---- Iced Coffee ----
  {
    squareId: "LHI2Q2BSRJKJV7S6XMASUOWB",
    slug: "cold-brew",
    name: "Cold Brew",
    category: "iced-coffee",
  },
  {
    squareId: "RJHMOWC67RD2H2ASKZL7KNHV",
    slug: "cold-brew-can",
    name: "Cold Brew Can",
    category: "iced-coffee",
  },
  {
    squareId: "TA3U3RD77QJMDLS3P5N2IXKG",
    slug: "irish-nitro-brew",
    name: "Irish Nitro Brew",
    category: "iced-coffee",
  },
  {
    squareId: "K3PQBB2HGI4KZMSA5XKPFQGL",
    slug: "orange-cold-brew",
    name: "Orange Cold Brew",
    category: "iced-coffee",
  },
  {
    squareId: "BVJKZNVMOL3F5QEEGL7O45XJ",
    slug: "iced-latte",
    name: "Iced Latte",
    category: "iced-coffee",
  },
  {
    squareId: "ZX2D6W4G5XW2VTPKIHVZEMP6",
    slug: "iced-vanilla-latte",
    name: "Iced Vanilla Latte",
    category: "iced-coffee",
  },
  {
    squareId: "FPBO7UA65GHN7RIIKN4ZX4WZ",
    slug: "iced-caramel-latte",
    name: "Iced Caramel Latte",
    category: "iced-coffee",
  },
  {
    squareId: "E76GROMUX5LRJ5HIYRD4IGSW",
    slug: "iced-hazelnut-latte",
    name: "Iced Hazelnut Latte",
    category: "iced-coffee",
  },
  {
    squareId: "JK6R2UHMDLDE2J4F4QAVZND5",
    slug: "iced-lavender-latte",
    name: "Iced Lavender Latte",
    category: "iced-coffee",
  },
  {
    squareId: "G2JIZG6CE3QEYKM5XDD6W336",
    slug: "iced-pistachio-latte",
    name: "Iced Pistachio Latte",
    category: "iced-coffee",
  },
  {
    squareId: "KTUTLLIGBJKFGW5Y2X346UIV",
    slug: "iced-rose-latte",
    name: "Iced Rose Latte",
    category: "iced-coffee",
  },
  {
    squareId: "RGMCMXOLXQGCYZ5NB7WO6474",
    slug: "iced-mocha",
    name: "Iced Mocha",
    category: "iced-coffee",
  },
  {
    squareId: "WGASVKQLETMU6SGH5RWXQCX3",
    slug: "iced-white-chocolate-mocha",
    name: "Iced White Chocolate Mocha",
    category: "iced-coffee",
  },
  {
    squareId: "JZR2E2V7BH4NASFMQSOHOUUG",
    slug: "iced-strawberry-lavender-cold-brew-fizz",
    name: "Iced Strawberry Lavender Cold Brew Fizz",
    category: "iced-coffee",
    description:
      "A refreshing fusion of strawberry puree and lavender extract, blended with CoreBrew coffee base and topped off with the effervescence of San Pellegrino sparkling mineral water.",
  },

  // ---- Iced Matcha ----
  {
    squareId: "OQZ7GGK4B7LWBNSAS75HAV7K",
    slug: "iced-matcha-latte",
    name: "Iced Matcha Latte",
    category: "iced-matcha",
  },
  {
    squareId: "NUHNWMMYPARS33JELK3EKRBB",
    slug: "iced-vanilla-matcha-latte",
    name: "Iced Vanilla Matcha Latte",
    category: "iced-matcha",
  },
  {
    squareId: "7QE73B4PXWP5NXQUXRSUQMY7",
    slug: "iced-caramel-matcha-latte",
    name: "Iced Caramel Matcha Latte",
    category: "iced-matcha",
  },
  {
    squareId: "BVYZQK5MKRCAUE3PBAJ5DNRL",
    slug: "iced-hazelnut-matcha-latte",
    name: "Iced Hazelnut Matcha Latte",
    category: "iced-matcha",
  },
  {
    squareId: "4KINR5M5KI765P6BFHRKSTFY",
    slug: "iced-lavender-matcha-latte",
    name: "Iced Lavender Matcha Latte",
    category: "iced-matcha",
  },
  {
    squareId: "XN33EX4NIFEAH256R2X2HV57",
    slug: "iced-mango-matcha-latte",
    name: "Iced Mango Matcha Latte",
    category: "iced-matcha",
  },
  {
    squareId: "ERGOK6ZRI7MALJRASDPLA4MO",
    slug: "iced-pistachio-matcha-latte",
    name: "Iced Pistachio Matcha Latte",
    category: "iced-matcha",
  },
  {
    squareId: "VTX22XXR7IPEVIRZTKC4PDBC",
    slug: "iced-rose-matcha-latte",
    name: "Iced Rose Matcha Latte",
    category: "iced-matcha",
  },
  {
    squareId: "HWYNRIFA46UJ4QV5IUENVGWR",
    slug: "iced-strawberry-matcha-latte",
    name: "Iced Strawberry Matcha Latte",
    category: "iced-matcha",
  },
  {
    squareId: "HO77KC5QK7IC2ST6TDAQ35JR",
    slug: "iced-white-chocolate-matcha",
    name: "Iced White Chocolate Matcha",
    category: "iced-matcha",
  },

  // ---- Hot Coffee ----
  {
    squareId: "DPAIY5UF5YFIDLAPG2BJ3KHP",
    slug: "americano",
    name: "Americano",
    category: "hot-coffee",
  },
  {
    squareId: "AHTC3USCRF3TMIATFVVIXMW2",
    slug: "latte",
    name: "Latte",
    category: "hot-coffee",
  },
  {
    squareId: "YUNFDRM6L72E5RC7V3JSFW7F",
    slug: "flat-white",
    name: "Flat White",
    category: "hot-coffee",
    description:
      "Our CoreBrew Coffee Base is topped with velvety micro-foam, creating an exceptionally smooth flat white with a coffee-forward finish.",
  },
  {
    squareId: "OBENEGHPVI2UQD3NC4NCYOX7",
    slug: "cappuccino",
    name: "Cappuccino",
    category: "hot-coffee",
  },
  {
    squareId: "CDGOJIRFJ26EQS7YEIP3FMLB",
    slug: "mocha",
    name: "Mocha",
    category: "hot-coffee",
  },
  {
    squareId: "E7NUGYCQKCKNI57WUFHSC3K2",
    slug: "lavender-latte",
    name: "Lavender Latte",
    category: "hot-coffee",
  },
  {
    squareId: "VVQFG63EI5YPKCNEJMSWLTDI",
    slug: "rose-latte",
    name: "Rose Latte",
    category: "hot-coffee",
  },

  // ---- Hot Matcha ----
  {
    squareId: "GZNOGEPOVU6RZ6726O62BXP2",
    slug: "matcha-latte",
    name: "Matcha Latte",
    category: "hot-matcha",
  },
  {
    squareId: "NA23Q4KWBQAWUIAXLMYRBMUF",
    slug: "lavender-matcha-latte",
    name: "Lavender Matcha Latte",
    category: "hot-matcha",
  },
  {
    squareId: "GULUGYQTBGPTRXDC5D3ZAIB6",
    slug: "rose-matcha-latte",
    name: "Rose Matcha Latte",
    category: "hot-matcha",
  },

  // ---- Chocolate ----
  {
    squareId: "PFTIUKRYZ5WBTTZ5QPYETXSP",
    slug: "hot-chocolate",
    name: "Hot Chocolate",
    category: "chocolate",
  },
  {
    squareId: "M54T47E4BMZZBQL22IUPKJXB",
    slug: "iced-chocolate",
    name: "Iced Chocolate",
    category: "chocolate",
  },

  // ---- Tea (category inferred, verify in Square) ----
  {
    squareId: "VRHTKB4YZURAAYMIW7KN5FI3",
    slug: "breakfast-tea",
    name: "Breakfast Tea",
    category: "in-store",
    categoryInferred: true,
  },

  // ---- Food ----
  {
    squareId: "ES7OSORRC4CQEX6O4GFNMEMR",
    slug: "toasted-ham-cheese",
    name: "Toasted Ham & Cheese",
    category: "food",
  },
  {
    squareId: "OSAYQRDK6UB2K6EGJZ7N4SGB",
    slug: "pork-and-fennel-sausage-roll",
    name: "Pork and Fennel Sausage Roll",
    category: "food",
  },
  {
    squareId: "2Z6IUHY3DYFRZBHLKFYOAFUC",
    slug: "chickpea-and-olive-sausage-roll-vegan-",
    name: "Chickpea and Olive Sausage Roll (Vegan)",
    category: "food",
  },

  // ---- Bakery ----
  {
    squareId: "JNMR36IP53TVPNXISIBMKO2R",
    slug: "butter-croissant",
    name: "Butter Croissant",
    category: "bakery",
  },
  {
    squareId: "QOBKXS7JBOCN3LREOI45HIMA",
    slug: "fruit-scone",
    name: "Fruit Scone",
    category: "bakery",
  },
  {
    squareId: "NRY2W6SZBHJPV7MFTQBJL3VU",
    slug: "plain-scone",
    name: "Plain Scone",
    category: "bakery",
  },
  {
    squareId: "BTJ3KBHFKSJVIPSA5SH65IFV",
    slug: "chocolate-chip-cookie",
    name: "Chocolate Chip Cookie",
    category: "bakery",
  },
  {
    squareId: "H4PA6OAEU2BU3TUUJRYBSRDM",
    slug: "carrot-cake",
    name: "Carrot Cake",
    category: "bakery",
  },
  {
    squareId: "7EW34G33QEM5774SWTOUR2R5",
    slug: "coffee-cake",
    name: "Coffee Cake",
    category: "bakery",
  },
  {
    squareId: "IBWVFUBUJX52LB4UTIL355MP",
    slug: "creamy-raspberry-tart",
    name: "Creamy Raspberry Tart",
    category: "bakery",
  },
  {
    squareId: "YMPYODL5MJIKKRYRTWGWQTQY",
    slug: "any-traybake",
    name: "Any Traybake",
    category: "bakery",
  },
  {
    squareId: "KKUIRH6HLZWOOEETJPSSWVOH",
    slug: "dark-chocolate-and-granola-bar",
    name: "Dark Chocolate and Granola Bar",
    category: "bakery",
  },
];

export function itemsByCategory(categoryId: MenuCategoryId): MenuItem[] {
  return MENU_ITEMS.filter((item) => item.category === categoryId);
}

export function findItemBySquareId(squareId: string): MenuItem | undefined {
  return MENU_ITEMS.find((item) => item.squareId === squareId);
}
