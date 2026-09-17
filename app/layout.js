import "@fontsource-variable/manrope";
import "@fontsource-variable/space-grotesk";
import "aos/dist/aos.css";
import "./globals.css";
import "../styles/scrollbar.css";
import SiteShell from "../components/layout/SiteShell";
import { company } from "../lib/company";

export const metadata = {
  metadataBase: new URL("https://aceinfluence.com"),
  title: {
    default: `${company.name} — ${company.tagline}`,
    template: `%s | ${company.name}`,
  },
  description: company.description,
  applicationName: company.name,
  creator: company.name,
  publisher: company.name,
  keywords: ["software development", "penetration testing", "cybersecurity services", "SOC 2 readiness", "ISO 27001", "cloud security", "Mississauga"],
  manifest: "/assets/favicon/site.webmanifest",
  icons: {
    icon: [
      { url: "/assets/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/assets/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/assets/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: company.name,
    description: company.description,
    type: "website",
    images: [{ url: "/assets/images/brand/aceinfluence-logo-square.png", width: 1000, height: 1000, alt: company.name }],
  },
};

export default function RootLayout({ children }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: company.name,
    url: "https://aceinfluence.com",
    email: company.email,
    telephone: company.phone,
    address: company.address,
    openingHours: ["Mo-Fr 09:00-17:00"],
  };

  return (
    <html lang="en">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
