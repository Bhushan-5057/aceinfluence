# Aceinfluence deployment

This project requires a Node.js-capable Next.js host because `app/api/contact/route.js` sends contact enquiries with Nodemailer.

## Environment

Copy `.env.example` into the deployment provider and configure:

- The four `NEXT_PUBLIC_COMPANY_*` values
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM`
- `NEXT_PUBLIC_CONTACT_FORM_ENABLED=true` after SMTP delivery is verified

Never expose SMTP credentials through a `NEXT_PUBLIC_` variable.

## Build and run

```bash
npm ci
npm run lint
npm run build
npm start
```

Vercel, Render, Railway, or a cPanel plan with Node.js application support can run the complete site. Plain shared static hosting cannot execute the contact route.

## Launch checklist

- Test Home, About, Services, Contact, every generated service URL, and the custom 404.
- Verify the desktop mega-menu, right-side mobile drawer, nested service accordions, and scroll-to-top control.
- Submit valid and invalid contact forms; verify SMTP delivery, reply-to, and the company signature.
- Check the Google map, business hours, phone, email, structured data, sitemap, and social metadata.
- Test at 320 px, 768 px, 1024 px, and a wide desktop viewport.
- Confirm SMTP credentials are absent from page source, client bundles, logs, and version control.
