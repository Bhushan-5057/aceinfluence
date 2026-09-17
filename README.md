# Ace Influence Website

Production-oriented marketing website for Aceinfluence, built with Next.js App Router, Tailwind CSS, AOS, Lucide icons, local JSON content, and an internal Nodemailer contact route.

## Local development

```bash
npm install
npm run dev
```

Create `.env.local` from `.env.example`, add SMTP credentials, and run the app on a Node-capable host to test real form delivery.

## Structure

```text
app/
  about/page.js
  contact/page.js
  api/contact/route.js
  services/page.js
  services/[slug]/page.js
  globals.css
  layout.js
  not-found.js
  page.js
components/
  forms/ContactForm.js
  layout/
    Footer.js
    Navbar.js
    SiteShell.js
  sections/HomeCarousel.js
  ui/index.js
data/
  company.json
  navLinks.json
  pages.json
  services.json
  testimonials.json
public/assets/
  favicon/
  images/
    brand/
    content/
    hero/
    services/
    testimonials/
scripts/localize-images.mjs
styles/scrollbar.css
DEPLOYMENT.md
app.js
next.config.mjs
```

The display face is **Space Grotesk**, selected for its precise, technical geometry and distinctive large headlines. **Manrope** is used for body and interface copy because its open shapes remain highly legible at small sizes. Both Google Font families are bundled locally through Fontsource, avoiding build-time and client-side dependencies on Google’s font servers.

All routes and marketing copy are generated from files in `data`. Add a complete service object to a category in `services.json`, reference valid related service slugs, and rebuild to prerender the new detail route.

Deploy to a Node.js-capable Next.js host so the internal contact route can send email securely. The root `app.js` file is the production startup file required by cPanel/Passenger.
Set `NEXT_PUBLIC_CONTACT_FORM_ENABLED=true` when SMTP delivery is ready.

See `DEPLOYMENT.md` for the complete Namecheap Stellar Plus cPanel setup,
upload, build, domain, SSL, and testing instructions.
