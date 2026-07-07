# RV's Cold Brew - owner brief status

Response to the owner's requests (branding, footer, Flipdish, design).

## Done (in the code now, type-checked)

### Footer - location + hours
- `lib/brand.ts` `LOCATION` now includes **Unit 11** and the full address reads
  "Unit 11, Great Northern Mall, Belfast".
- Footer "Visit" column shows Unit 11 + opening hours (Mon-Fri 7-17, Sat 8-14,
  Sun closed) and a Get Directions link. Confirm the hours are current.

### Flipdish online ordering
- New **`/order`** page with a Flipdish web-ordering embed
  (`components/FlipdishOrder.tsx`). Flipdish's docs say the embed shouldn't sit
  on the homepage, so it has its own page.
- "Order Online" added to the header nav, mobile menu, and footer.
- Until it's configured it shows a friendly "ordering on its way" placeholder
  instead of an empty box.
- Schema (`JsonLd.tsx`) updated with the Unit 11 address, `hasMenu` and an
  `OrderAction` pointing at `/order` (helps Google surface ordering).

## Need from the owner / you to finish

1. **Logo file** - I can see the round "RV's Cold Brew" badge on the cup photo,
   but I need it as a clean **transparent PNG or SVG** to use in the header and
   as the favicon. The cup photo and the "Coolest Brew in Town" graphic aren't
   usable as a logo asset on their own. Send the logo and I'll wire the header
   + favicon in one pass.
2. **Flipdish App ID** - from the Flipdish portal (looks like `fd12345`). Set it
   as `NEXT_PUBLIC_FLIPDISH_APP_ID` (and, if the generator gives a different
   script URL, `NEXT_PUBLIC_FLIPDISH_EMBED_SCRIPT`) in Vercel + `.env.local`.
   See the TODO in `lib/brand.ts`.
3. **Whitelist the site hostname** in the Flipdish portal and make sure the site
   is served over https, or the embed won't load.
4. **Brand photos/videos** - the site currently uses Unsplash stock in
   `lib/brand.ts` `IMAGES`. Once real files land in `public/`, swap those paths.

## Design direction (from the reference sites) - proposed, not yet built

Holding the bigger redesign until the logo + assets arrive, then one clean pass:

- **kissthehippo.com** - persistent, minimal top nav + generous product layout.
  Plan: make the header sticky, tighten the product grid on `/shop`.
- **seed.vmos.io** - snappy, app-like mobile menu. Plan: full-height slide-in
  panel, larger tap targets, quick "Order Online" CTA pinned.
- **grind.co.uk** - bold typography + confident brand presence. Plan: lean
  harder into the display font for hero + section headers once the logo sets
  the tone.
- **oatco.co.uk** - clean, impactful hero. Plan: single strong brand image/video
  + one line + one CTA ("Order Online"), less competing text.

## Photo / video shot list (owner asked for ideas)

Most useful to shoot next:
- Clean **logo/pack shots** on a plain background (for header, favicon, OG image).
- The **hero moment**: a cold brew being poured over ice, close up, slow-mo
  video loop (great for an oatco-style hero).
- **Menu items** shot straight-on on a consistent background (for Flipdish + shop
  cards so they look uniform).
- The **kiosk/unit in Great Northern Mall** (storefront + a shot with people) -
  builds trust and supports the "visit us" section.
- A short **15-30s brand video**: pour, hand-off, first sip, logo end-frame.
- **Matcha** prep shot to match the coffee ones.

Portrait 4:5 and square 1:1 crops help for social; landscape 16:9 for hero/video.
