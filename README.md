# Karpexa Technologies — website

React 18 + Vite. Statically prerendered to real HTML for every URL, deployed on Vercel


---

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # builds + prerenders every route into /dist
npm run preview  # serve the built site locally
```

`npm run build` does three things:

1. `vite build` — the client bundle
2. `vite build --ssr` — a server bundle used only at build time
3. `node scripts/prerender.mjs` — renders each route to static HTML, then writes `sitemap.xml` and `robots.txt`

Every route ends up as a real file: `/dist/capabilities/cloud/index.html` and so on.

---

## Deploying to Vercel

1. Push this folder to a GitHub repository.
2. In Vercel: **Add New → Project → Import** that repository.
3. Vercel reads `vercel.json` and needs no manual configuration. Confirm it shows:
   - Framework: **Vite**
   - Build command: `npm run build`
   - Output directory: `dist`
4. Deploy.
5. **Settings → Domains** → add `karpexa.com` and `www.karpexa.com`, then follow the DNS instructions at your registrar. Set one as primary and let Vercel redirect the other.

### After the domain is live

Open `src/data/content.js` and `src/seo/routes.js` and confirm `SITE_URL` matches the final domain exactly (no trailing slash). Rebuild after changing it — canonicals and the sitemap are generated from that value.

---

## Getting the Google sitelinks

Sitelinks are chosen by Google, not requested. The site is built to satisfy the conditions Google looks for:

- **A real HTML page per URL.** Fifteen prerendered pages, each with its own title, description and canonical.
- **Clear, shallow hierarchy.** `/capabilities`, `/sectors`, `/company`, `/contact`, with capability pages one level down and cross-linked from the nav, footer and related blocks.
- **Structured data.** `Organization`, `WebSite`, `SiteNavigationElement`, `BreadcrumbList`, `Service`, `FAQPage` and `OfferCatalog`, generated from `src/seo/routes.js`.
- **Distinct, descriptive titles.** Sitelink labels are drawn from page titles and anchor text, so nothing is called "Learn more".
- **A sitemap**, regenerated on every build.

What you still need to do:

1. Verify the domain in **Google Search Console** (DNS TXT record).
2. Submit `https://karpexa.com/sitemap.xml` there.
3. Request indexing for the home page.
4. Create a **Google Business Profile** and link it — this materially helps brand-query results.
5. Publish the LinkedIn page at the URL in `brand.social` so the `sameAs` links resolve.

Sitelinks typically appear a few weeks to a few months after the brand query starts returning the site consistently at position one. There is no way to force them, and nobody can sell you a shortcut.

---

## Images

The site uses three photographs only — the hero slides. They live in
`public/home/desktop/` and `public/home/mobile/` (one desktop and one mobile
crop per slide). Replace them in place, keeping the same filenames, to change
the hero without touching any code. There are no other image dependencies.

---

## Editing content

| What | Where |
|---|---|
| Brand name, email, phone, address, social | `src/data/content.js` → `brand` |
| Hero slides | `src/data/content.js` → `heroSlides` |
| Home about block and its figures | `src/data/content.js` → `about` |
| Partner names | `src/data/content.js` → `partners` |
| Sectors, values, journey | `src/data/content.js` |
| A capability page (all of its copy, including its FAQ) | `src/pages/capabilities/<Name>.jsx` |
| Page titles, descriptions, structured data | `src/seo/routes.js` |
| Colours, spacing, type scale | `src/styles/variables.css` |

### Adding a capability

1. Copy an existing file in `src/pages/capabilities/` and rewrite every field.
2. Register it in `src/pages/capabilities/index.js` (both `capabilities` and `capabilityRoutes`).

Routing, the mega menu, the home grid, the sitemap and the structured data all read from that one array — nothing else needs editing.

### Before launch

Search the project for `*`. The asterisked figures in `about.stats` (partner
count, engagements delivered) are still marked as unverified — replace them
with confirmed numbers, or remove those two tiles.

---

## Design system

**Obsidian & Plasma.** Near-black surfaces with a single signature gradient — aqua `#56E7C6` → azure `#5B8CFF` → violet `#A87BFF` — used sparingly, on numbers, edges and one word at a time.

Type: Space Grotesk (display), Manrope (body), JetBrains Mono (technical labels).

### Section theming

Every `<section>` carries `data-theme="light | tint | dark | obsidian"`. That attribute remaps a set of semantic CSS variables (`--bg`, `--title`, `--text`, `--muted`, `--rule`, `--card-bg`), so components never hard-code a colour and any section can be flipped by changing one attribute.

The navbar reads the same attribute. `useNavTheme` measures which section currently sits under the bar and switches the navbar between transparent, light-on-dark and dark-on-light accordingly — which is why it stays legible over every section without a per-page setting.

### Motion

Ambient motion (`.aurora`, `.gridlines`, `.grain`, `.marquee`, the plasma gradient) runs continuously rather than firing once. Entrance animation is handled by `.reveal` classes and an IntersectionObserver in `useReveal`, staggered per parent.

Everything is disabled under `prefers-reduced-motion: reduce`.

---

## Accessibility

Skip link, semantic landmarks, keyboard-navigable menus with `aria-expanded`, focus-visible rings, labelled form fields, `aria-hidden` on decorative layers, and a colour palette checked for contrast on both light and dark surfaces...

---

## Contact form

`src/pages/Contact.jsx` composes a pre-filled email in the visitor's mail client — no backend required, works on Vercel's free tier from day one.

To switch to a hosted endpoint later (Formspree, Resend, a Vercel function), replace the body of `onSubmit` with a `fetch()` call. Nothing else on the page needs to change.
