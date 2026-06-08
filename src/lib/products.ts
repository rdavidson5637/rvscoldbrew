import { IMAGES, PRODUCT_COPY } from "./brand";

export type Product = {
  id: string;
  image: string;
  name: string;
  subtitle: string;
  description: string;
  price: number;
  badge: string;
};

export const PRODUCTS: Product[] = [
  {
    id: "can",
    image: IMAGES.coldBrewCan,
    name: "Cold Brew Can",
    subtitle: "Single serve",
    description: `${PRODUCT_COPY} One chilled can, ready when you are.`,
    price: 3.5,
    badge: "Bestseller",
  },
  {
    id: "4-pack",
    image: IMAGES.coldBrewPour,
    name: "Cold Brew 4-Pack",
    subtitle: "Grab & go bundle",
    description:
      "Four cans for the week ahead. Smooth, bold, and proudly independent.",
    price: 12.0,
    badge: "Best Value",
  },
  {
    id: "6-pack",
    image: IMAGES.icedCoffee,
    name: "Cold Brew 6-Pack",
    subtitle: "Fridge filler",
    description:
      "Stock the fridge and skip the queue — our biggest can bundle.",
    price: 17.0,
    badge: "Stock Up",
  },
  {
    id: "concentrate",
    image: IMAGES.concentrate,
    name: "Cold Brew Concentrate 500ml",
    subtitle: "Espresso-strength",
    description:
      "24-hour steeped concentrate for café-quality hot and iced pours at home.",
    price: 9.5,
    badge: "Barista Pick",
  },
  {
    id: "matcha",
    image: IMAGES.matcha,
    name: "Okumidori Matcha Tin 30g",
    subtitle: "Ceremonial grade",
    description:
      "Single cultivar from Uji. Vivid green, naturally sweet, zero bitterness.",
    price: 14.0,
    badge: "Premium",
  },
];

export function formatPrice(amount: number): string {
  return `£${amount.toFixed(2)}`;
}
