# Flipdish ordering - setup steps

The `/order` page and embed are already built (`components/FlipdishOrder.tsx`,
config in `lib/brand.ts`). It shows a placeholder until these steps are done.

## What we need from the owner
- Their **Flipdish App ID** (Flipdish portal, looks like `fd12345`).
- Confirmation the site's **domain has been whitelisted** in their Flipdish
  portal (Flipdish blocks embeds on non-whitelisted hostnames).

## Steps

1. **Get the App ID** in the Flipdish portal
   (help.flipdish.com/en/articles/9585391-how-do-i-find-my-appid).

2. **Whitelist the hostname** - in the Flipdish portal, add the live domain
   (e.g. `rvscoldbrew.com`) and the Vercel preview domain if you want ordering
   to work on previews. Without this the embed will not load.

3. **Generate the embed once** at https://flipdish.website/ and check the exact
   `<script>` src it outputs. Our default in `lib/brand.ts` is a best guess -
   if the generator gives a different URL, use theirs.

4. **Add env vars** (Vercel project settings and local `.env.local`):
   ```
   NEXT_PUBLIC_FLIPDISH_APP_ID=fd12345
   # only if the generator's script URL differs from our default:
   NEXT_PUBLIC_FLIPDISH_EMBED_SCRIPT=https://.../embed.js
   ```

5. **Confirm https** - the site must be served over https (Vercel is, by
   default). Flipdish requires SSL for the embed.

6. **Redeploy** and open `/order`. The live menu + checkout should render. The
   embed is set to open on the menu screen (`data-initial-screen="menu"`) with
   the dark theme to match the brand.

## Notes
- Keep the embed on `/order` (its own page). Flipdish's docs say it misbehaves
  on a homepage or low down a long page.
- If the basket overlaps the sticky header, Flipdish's generator has a
  "space above the basket" pixel offset - set it to roughly the header height.
