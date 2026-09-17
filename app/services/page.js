import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { CTA, SectionHeading, ServiceCard } from "../../components/ui";
import pages from "../../data/pages.json";
import { serviceCategories, services } from "../../lib/services";

export const metadata = {
  title: "Services",
  description: "Explore Aceinfluence software development, penetration testing, governance, compliance, cybersecurity operations, and security training services.",
};

export default function ServicesPage() {
  const labels = pages.service;

  return (
    <>
      <section className="inner-hero services-index-hero">
        <div className="container" data-aos="fade-up">
          <span className="eyebrow">Development & cybersecurity services</span>
          <h1>One partner from product build to security assurance.</h1>
          <p>Explore {services.length} focused capabilities spanning secure software delivery, offensive testing, compliance readiness, operational hardening, and human risk.</p>
          <Link className="button" href="/contact">Discuss your priorities<ArrowRight size={18} /></Link>
        </div>
      </section>

      <section className="section services-directory">
        <div className="container">
          <SectionHeading eyebrow="Capability directory" title="Specialists where you need them. Connected where it matters." text="Start with a targeted assessment or combine services into a coordinated programme with one accountable delivery team." />
          <div className="category-stack">
            {serviceCategories.map((category) => (
              <section className="service-category-block" id={category.slug} key={category.slug}>
                <div className="category-heading" data-aos="fade-up">
                  <span>{category.title}</span>
                  <p>{category.description}</p>
                </div>
                <div className="service-grid">
                  {category.services.map((service, index) => <ServiceCard service={service} index={index} key={service.slug} />)}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="section dark-section">
        <div className="container">
          <SectionHeading eyebrow="How capabilities connect" title="Build securely, validate independently, and improve continuously." text="Our teams share context across engineering, offensive security, governance, and operations so findings become practical improvements rather than isolated reports." light />
          <div className="service-process">
            {[
              ["01", "Build", "Design and deliver resilient applications, platforms, integrations, and cloud foundations."],
              ["02", "Test", "Challenge applications, APIs, mobile products, networks, and cloud environments."],
              ["03", "Assure", "Map controls and evidence to regulatory, contractual, and certification requirements."],
              ["04", "Strengthen", "Embed hardening, monitoring, response readiness, and security-aware behaviour."],
            ].map(([step, title, text]) => <article key={step}><span>{step}</span><h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </div>
      </section>

      <CTA content={labels.cta} />
    </>
  );
}
