import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Network, icons } from "lucide-react";
import pages from "../../data/pages.json";

export function SectionHeading({ eyebrow, title, text, light = false }) {
  return (
    <div className={`section-heading ${light ? "light" : ""}`} data-aos="fade-up">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

export function ServiceCard({ service, index }) {
  const Icon = icons[service.icon] || Network;

  return (
    <Link href={`/services/${service.slug}`} className="service-card" data-aos="fade-up" data-aos-delay={(index % 3) * 80}>
      {service.heroImage && <Image className="service-card-image" src={service.heroImage} alt="" fill sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw" />}
      <div className="service-card-overlay" />
      <div className="service-card-content">
        <div className="service-card-top"><span>{String(index + 1).padStart(2, "0")}</span><Icon size={28} /></div>
        <div className="service-card-copy">
          <h3>{service.title}</h3>
          <p>{service.summary}</p>
        </div>
        <span className="card-link">{pages.service.cardLink} <ArrowRight size={17} /></span>
      </div>
    </Link>
  );
}

export function CTA({ content }) {
  return (
    <section className="cta-section">
      <div className="cta-glow" />
      <div className="container cta-inner" data-aos="fade-up">
        <span className="eyebrow">{content.eyebrow}</span>
        <h2>{content.title}</h2>
        <p>{content.text}</p>
        <Link href="/contact" className="button button-light">{content.button}<ArrowRight size={18} /></Link>
      </div>
    </section>
  );
}

export function Process({ content }) {
  return (
    <section className="section process-section">
      <div className="container">
        <SectionHeading eyebrow={content.eyebrow} title={content.title} />
        <div className="process-grid">
          {content.items.map((item) => (
            <article key={item.number} data-aos="fade-up">
              <span>{item.number}</span><h3>{item.title}</h3><p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
