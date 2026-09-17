import { ArrowRight, Clock3, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import ContactForm from "../../components/forms/ContactForm";
import { SectionHeading } from "../../components/ui";
import { company } from "../../lib/company";
import pages from "../../data/pages.json";
import { services } from "../../lib/services";

const CONTACT_FORM_ENABLED = process.env.NEXT_PUBLIC_CONTACT_FORM_ENABLED === "true";

export const metadata = {
  title: "Contact",
  description: `Contact ${company.name} at ${company.address} for software development, penetration testing, compliance, and cybersecurity services.`,
};

export default function ContactPage() {
  const page = pages.contact;
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(company.address)}&output=embed`;
  return (
    <>
      <section className="inner-hero image-hero contact-hero" style={{ backgroundImage: `linear-gradient(90deg,rgba(4,14,34,.95),rgba(4,14,34,.28)),url("${page.hero.image}")` }}>
        <div className="container" data-aos="fade-up"><span className="eyebrow">{page.hero.eyebrow}</span><h1>{page.hero.title}</h1><p>{page.hero.text}</p></div>
      </section>

      <section className="section specialties-section">
        <div className="container specialties-grid">
          <SectionHeading eyebrow={page.specialties.eyebrow} title={page.specialties.title} />
          <div>{page.specialties.items.map((item, index) => <span key={item} data-aos="fade-up"><b>0{index + 1}</b>{item}</span>)}</div>
        </div>
      </section>

      {CONTACT_FORM_ENABLED ? (
        <section className="contact-form-section">
          <div className="contact-image" style={{ backgroundImage: `url("${page.form.image}")` }} aria-hidden="true" />
          <div className="contact-form-wrap">
            <span className="eyebrow">{page.form.eyebrow}</span><h2>{page.form.title}</h2><p>{page.form.text}</p>
            <ContactForm content={page.form} services={services} />
          </div>
        </section>
      ) : (
        <section className="section contact-direct-section">
          <div className="container">
            <SectionHeading eyebrow="Get in touch" title="Start with the channel that works for you." text="Our online enquiry form is temporarily unavailable while we complete secure email delivery. Call or email us directly and a specialist will respond within one business day." />
            <div className="direct-contact-grid">
              <a href={`tel:${company.phone.replace(/\D/g, "")}`}><Phone /><span>Call our team</span><strong>{company.phone}</strong><p>Speak with us about an active issue, upcoming project, or assurance need.</p></a>
              <a href={`mailto:${company.email}`}><Mail /><span>Email us</span><strong>{company.email}</strong><p>Share context, timelines, or documents and we will route your request securely.</p></a>
              <article><MapPin /><span>Visit by appointment</span><strong>{company.address}</strong><p>Meet with our team at our Mississauga office by prior arrangement.</p></article>
              <article><Clock3 /><span>Business hours</span><strong>Monday–Friday</strong><p>{company.hours.join(" · ")}</p></article>
            </div>
          </div>
        </section>
      )}

      <section className="questions-cta">
        <div className="container"><div><span className="eyebrow">{page.questions.eyebrow}</span><h2>{page.questions.title}</h2></div><Link className="button button-light" href={page.questions.href}>{page.questions.button}<ArrowRight size={18} /></Link></div>
      </section>

      <section className="section visit-section">
        <div className="container">
          <SectionHeading eyebrow={page.visit.eyebrow} title={page.visit.title} text={page.visit.text} />
          <div className="visit-grid">
            <div className="map-frame"><iframe src={mapSrc} title={`${company.name} location`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
            <div className="contact-cards">
              <article><MapPin /><div><h3>{company.address}</h3><p>{page.visit.text}</p></div></article>
              <article><Mail /><div><h3>{page.detailsTitle}</h3><a href={`mailto:${company.email}`}>{company.email}</a><a href={`tel:${company.phone.replace(/\s/g, "")}`}><Phone size={15} />{company.phone}</a></div></article>
              <article><Clock3 /><div><h3>{page.hoursTitle}</h3>{company.hours.map((hours) => <p key={hours}>{hours}</p>)}</div></article>
            </div>
          </div>
        </div>
      </section>

      <section className="section how-section">
        <div className="container">
          <SectionHeading eyebrow={page.how.eyebrow} title={page.how.title} />
          <div className="service-process">{page.how.items.map((item) => <article key={item.number} data-aos="fade-up"><span>{item.number}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
        </div>
      </section>

      {page.faqs?.items?.length > 0 && (
        <section className="section faq-section">
          <div className="container faq-grid">
            <SectionHeading eyebrow={page.faqs.eyebrow} title={page.faqs.title} text={page.faqs.text} />
            <div>{page.faqs.items.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div>
          </div>
        </section>
      )}
    </>
  );
}
