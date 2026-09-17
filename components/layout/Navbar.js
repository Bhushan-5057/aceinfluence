"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import navLinks from "../../data/navLinks.json";
import pages from "../../data/pages.json";
import { company } from "../../lib/company";
import { serviceCategories } from "../../lib/services";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [openCategories, setOpenCategories] = useState({});

  const closeMenu = () => {
    setOpen(false);
    setServicesOpen(false);
  };

  useEffect(() => {
    document.body.classList.toggle("drawer-open", open);
    const closeOnEscape = (event) => event.key === "Escape" && closeMenu();
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.classList.remove("drawer-open");
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  const toggleCategory = (slug) => {
    setOpenCategories((current) => ({ ...current, [slug]: !current[slug] }));
  };

  return (
    <header className="navbar">
      <a className="skip-link" href="#main-content">{pages.navigation.skip}</a>
      <div className="nav-inner">
        <Link href="/" className="brand" aria-label={`${company.name} home`}>
          <Image src="/assets/images/brand/aceinfluence-logo.png" alt={company.name} width={176} height={58} priority />
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navLinks.map((link) =>
            link.megaMenu ? (
              <div className="nav-mega-wrap" key={link.label}>
                <button className="nav-link" aria-expanded="false">
                  {link.label}<ChevronDown size={15} />
                </button>
                <div className="mega-menu">
                  <div className="mega-intro">
                    <span className="eyebrow">{pages.navigation.megaEyebrow}</span>
                    <p>{pages.navigation.megaText}</p>
                    <Link href="/services">{pages.navigation.viewAll} <ArrowUpRight size={16} /></Link>
                  </div>
                  <div className="mega-categories">
                    {serviceCategories.map((category) => (
                      <section className="mega-category" key={category.slug}>
                        <h3>{category.title}</h3>
                        {category.services.map((service) => (
                          <Link key={service.slug} href={`/services/${service.slug}`}>
                            <strong>{service.title}</strong>
                            <ArrowUpRight size={15} />
                          </Link>
                        ))}
                      </section>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link className={`nav-link ${pathname === link.href ? "active" : ""}`} href={link.href} key={link.label}>
                {link.label}
              </Link>
            )
          )}
        </nav>

        <Link href="/contact" className="button button-small nav-cta">{pages.navigation.contactButton} <ArrowUpRight size={16} /></Link>
        <button className="menu-toggle" aria-label="Open navigation" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(true)}>
          <Menu />
        </button>
      </div>

      <button className={`menu-backdrop ${open ? "open" : ""}`} aria-label="Close navigation" tabIndex={open ? 0 : -1} onClick={closeMenu} />
      <aside className={`mobile-menu ${open ? "open" : ""}`} id="mobile-navigation" aria-hidden={!open}>
        <div className="mobile-menu-head">
          <span>{company.name}</span>
          <button aria-label="Close navigation" onClick={closeMenu}><X /></button>
        </div>
        <nav aria-label="Mobile navigation">
          {navLinks.map((link) =>
            link.megaMenu ? (
              <div className="mobile-services" key={link.label}>
                <button onClick={() => setServicesOpen(!servicesOpen)} aria-expanded={servicesOpen}>
                  {link.label}<ChevronDown className={servicesOpen ? "rotate" : ""} />
                </button>
                <div className={`mobile-service-links ${servicesOpen ? "open" : ""}`}>
                  {serviceCategories.map((category) => (
                    <div className="mobile-category" key={category.slug}>
                      <button onClick={() => toggleCategory(category.slug)} aria-expanded={Boolean(openCategories[category.slug])}>
                        {category.title}<ChevronDown className={openCategories[category.slug] ? "rotate" : ""} size={18} />
                      </button>
                      <div className={`mobile-category-links ${openCategories[category.slug] ? "open" : ""}`}>
                        {category.services.map((service) => <Link onClick={closeMenu} key={service.slug} href={`/services/${service.slug}`}>{service.title}</Link>)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : <Link onClick={closeMenu} href={link.href} key={link.label}>{link.label}</Link>
          )}
          <Link onClick={closeMenu} href="/contact" className="button mobile-drawer-cta">{pages.navigation.contactButton}<ArrowUpRight size={16} /></Link>
          <div className="mobile-drawer-contact">
            <a href={`mailto:${company.email}`}>{company.email}</a>
            <p>{company.address}</p>
          </div>
        </nav>
      </aside>
    </header>
  );
}
