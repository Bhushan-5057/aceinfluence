# Deploy Aceinfluence on Namecheap Stellar Plus

This is a server-rendered Next.js application. Namecheap must run it through
cPanel's **Setup Node.js App** feature; uploading it as a plain static site to
`public_html` is not sufficient. The root `app.js` file is the cPanel/Passenger
startup file.

## Requirements

- A Namecheap Stellar Plus account with **Setup Node.js App**
- Node.js 22 (Next.js requires Node.js 20.9 or newer)
- The domain added to the same cPanel account
- A production build generated after dependencies are installed

Do not upload `.env`, `.next`, `node_modules`, `.git`, or local log files. The
server must install its own Linux dependencies and generate its own `.next`
build.

## 1. Test and prepare locally

From the project directory:

```bash
npm ci
npm run lint
npm run build
npm start
```

Open `http://localhost:3000` and check the primary pages. Stop the production
server before packaging the project.

Create a ZIP containing the project source, including `app.js`, `app`,
`components`, `data`, `lib`, `public`, `styles`, `package.json`,
`package-lock.json`, `next.config.mjs`, and the remaining configuration files.
Exclude the directories and files listed above.

## 2. Configure the domain

1. Open Namecheap **cPanel > Domains** and add the domain or subdomain.
2. If the domain uses Namecheap hosting nameservers, allow DNS propagation to
   complete. Otherwise, point the domain's A record to the shared-hosting IP
   shown in cPanel.
3. Do not place the Node.js application root inside the public document root.
   A directory such as `/home/CPANEL_USER/aceinfluence` is suitable.

## 3. Upload with File Manager

1. Open **cPanel > File Manager**.
2. In the account home directory, create `aceinfluence`.
3. Upload the ZIP to that directory and extract it.
4. Confirm these files are directly inside the application root:
   `app.js`, `package.json`, `package-lock.json`, and `next.config.mjs`.
   Avoid an accidental nested path such as
   `aceinfluence/Aceinfluence/package.json`.
5. Delete the uploaded ZIP after extraction.

For FTP/SFTP, upload the same source files to
`/home/CPANEL_USER/aceinfluence`. Do not transfer the Windows `node_modules`
directory.

## 4. Create the Node.js application

Open **cPanel > Setup Node.js App > Create Application** and use:

- **Node.js version:** 22.x
- **Application mode:** Production
- **Application root:** `aceinfluence`
- **Application URL:** the required domain or subdomain
- **Application startup file:** `app.js`

Create the application. The application root must be the directory containing
both `app.js` and `package.json`.

## 5. Install and build

1. On the Node.js application page, click **Run NPM Install**.
2. Open **cPanel > Terminal** and use the virtual-environment activation
   command displayed at the top of the Node.js application page.
3. Change to the application root and build:

   ```bash
   cd ~/aceinfluence
   npm run build
   ```

4. Confirm that the command completes successfully and creates `.next`.
5. Return to **Setup Node.js App** and click **Restart**.

If cPanel Terminal is unavailable, enable SSH access or ask Namecheap support
to run the production build. A Windows-generated `.next` directory should not
be used as a replacement for a server build.

## 6. Environment settings

Add public company settings under the Node.js application's **Environment
variables** section. Keep the contact form disabled until mail delivery is
configured:

```text
NEXT_PUBLIC_COMPANY_NAME=Aceinfluence
NEXT_PUBLIC_COMPANY_ADDRESS=55 Village Center Place, Mississauga, ON, L4Z 1S2
NEXT_PUBLIC_COMPANY_PHONE=647-313-7276
NEXT_PUBLIC_COMPANY_EMAIL=info@aceinfluence.com
NEXT_PUBLIC_CONTACT_FORM_ENABLED=false
```

Run `npm run build` again whenever a `NEXT_PUBLIC_*` value changes, then
restart the application. These values are embedded in the browser bundle at
build time.

## 7. Enable SSL

1. Open **cPanel > SSL/TLS Status**.
2. Select the domain and run **AutoSSL**.
3. Wait until both the root domain and `www` host show valid certificates.
4. Open the site over `https://` and verify there are no certificate or mixed
   content warnings.
5. Enable Namecheap's HTTPS redirect in **cPanel > Domains** if it is
   available for the domain.

## 8. Test after deployment

- Open Home, About, Services, Contact, every service detail page, and an
  unknown URL to verify the custom 404.
- Test navigation, the mobile drawer, service accordions, carousel, map,
  phone links, and email links.
- Test at mobile, tablet, and desktop widths.
- In browser developer tools, confirm page, JavaScript, CSS, font, and image
  requests return 200 responses.
- Confirm `https://domain.example/sitemap.xml` and
  `https://domain.example/robots.txt` load.
- Confirm the contact form remains unavailable while
  `NEXT_PUBLIC_CONTACT_FORM_ENABLED=false`.
- Review the Passenger log configured on the Node.js application page if a
  request returns 500 or 503.

## Updating the website

Upload the changed source files, then activate the cPanel Node environment and
run:

```bash
cd ~/aceinfluence
npm install
npm run build
```

Restart the application from **Setup Node.js App** after every production
build.

## Common deployment errors

- **The repo does not have a startup file:** Ensure root-level `app.js` is in
  the deployed repository and set the cPanel startup file to exactly
  `app.js`.
- **Application cannot find a production build:** Run `npm run build` in the
  application root and confirm `.next` exists.
- **Cannot find module:** Run **Run NPM Install** in the correct application.
- **503 Service Unavailable:** Check the Passenger log, Node.js version,
  application root, build result, and environment settings, then restart.
- **Changes do not appear:** Rebuild when client environment values or source
  files change, then restart the application and clear any browser/CDN cache.
