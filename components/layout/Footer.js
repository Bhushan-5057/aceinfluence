import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { company } from "../../lib/company";
import navLinks from "../../data/navLinks.json";
import { serviceCategories } from "../../lib/services";

const category = (slug) => serviceCategories.find((item) => item.slug === slug);

function FooterServiceGroup({ item, limit }) {
  if (!item) return null;

  return (
    <div className="footer-service-group">
      <strong>{item.title}</strong>
      {item.services.slice(0, limit).map((service) => (
        <Link key={service.slug} href={`/services/${service.slug}`}>{service.title}</Link>
      ))}
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid container">
        <div className="footer-brand">
          <span className="footer-label">{company.footerLabels.company}</span>
          <p>{company.footerBlurb}</p>
          <p>{company.address}</p>
          <a href={`mailto:${company.email}`}>{company.email} <ArrowUpRight size={16} /></a>
          <a href={`tel:${company.phone.replace(/\D/g, "")}`}>{company.phone}</a>
          <div className="footer-socials">{company.socials.map((social) => <a key={social.label} href={social.href} target="_blank" rel="noreferrer">{social.label}</a>)}</div>
        </div>

        <div className="footer-links">
          <span className="footer-label">{company.footerLabels.navigation}</span>
          {navLinks.filter((item) => !item.megaMenu).map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
          <Link href="/services">All Services</Link>
        </div>

        <div className="footer-links">
          <span className="footer-label">Development</span>
          <FooterServiceGroup item={category("development-services")} limit={7} />
        </div>

        <div className="footer-links">
          <span className="footer-label">Testing & compliance</span>
          <FooterServiceGroup item={category("penetration-testing")} limit={3} />
          <FooterServiceGroup item={category("governance-risk-compliance")} limit={3} />
        </div>

        <div className="footer-links">
          <span className="footer-label">Cyber resilience</span>
          <FooterServiceGroup item={category("cybersecurity-operations")} limit={4} />
          <FooterServiceGroup item={category("training-awareness")} limit={3} />
        </div>
      </div>
      <div className="footer-bottom container">
        <Image src="/assets/images/brand/aceinfluence-logo.png" alt={company.name} width={150} height={48} />
        <p>© {new Date().getFullYear()} {company.copyright}</p>
      </div>
    </footer>
  );
}
