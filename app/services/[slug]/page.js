import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { CTA, SectionHeading, ServiceCard } from "../../../components/ui";
import { getService, services } from "../../../lib/services";
import pages from "../../../data/pages.json";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.summary,
    keywords: [service.title, service.categoryTitle, "Aceinfluence", "Mississauga"],
    openGraph: {
      title: `${service.title} | Aceinfluence`,
      description: service.summary,
      images: [{ url: service.heroImage, alt: service.title }],
    },
  };
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const labels = pages.service;
  const related = service.relatedServices
    .map((relatedSlug) => services.find((item) => item.slug === relatedSlug))
    .filter(Boolean);

  return (
    <>
      <section className="service-hero" style={{ backgroundImage: `linear-gradient(90deg,rgba(4,14,34,.96),rgba(4,14,34,.35)),url("${service.heroImage}")` }}>
        <div className="container">
          <Link href="/services" className="back-link"><ArrowLeft size={16} />{labels.allCapabilities}</Link>
          <div data-aos="fade-up"><span className="eyebrow">{service.eyebrow}</span><h1>{service.title}</h1><p>{service.summary}</p><Link href="/contact" className="button">{labels.heroButton}<ArrowRight size={18} /></Link></div>
        </div>
      </section>

      <section className="section service-overview">
        <div className="container overview-grid">
          <div><SectionHeading eyebrow={labels.overviewEyebrow} title={labels.overviewTitle} /><p className="lead-copy" data-aos="fade-up">{service.description}</p></div>
          <div className="deliverable-list" data-aos="fade-left">
            {service.deliverables.map((item) => <div key={item}><Check size={18} /><span>{item}</span></div>)}
          </div>
        </div>
      </section>

      <section className="section dark-section">
        <div className="container">
          <SectionHeading eyebrow={labels.processEyebrow} title={labels.processTitle} light />
          <div className="service-process">
            {service.process.map((item) => <article key={item.step} data-aos="fade-up"><span>{item.step}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="section benefits-section">
        <div className="container benefits-grid">
          <SectionHeading eyebrow={labels.benefitsEyebrow} title={labels.benefitsTitle} />
          <div>{service.benefits.map((benefit, index) => <article key={benefit} data-aos="fade-left"><span>0{index + 1}</span><h3>{benefit}</h3></article>)}</div>
        </div>
      </section>

      {(service.outcomes?.length > 0 || service.idealFor?.length > 0) && (
        <section className="section scope-section">
          <div className="container scope-grid">
            <SectionHeading
              eyebrow={service.outcomes?.length ? "Engagement outcomes" : "Who it is for"}
              title={service.outcomes?.length ? "Evidence your team can use after delivery." : "Built for teams facing meaningful change or risk."}
              text="Every engagement is scoped around the systems, stakeholders, and assurance evidence that matter to your organisation."
            />
            <div className="scope-cards">
              {(service.outcomes || service.idealFor).map((item, index) => (
                <article key={typeof item === "string" ? item : item.title} data-aos="fade-up">
                  <span>0{index + 1}</span>
                  <h3>{typeof item === "string" ? item : item.title}</h3>
                  {typeof item !== "string" && <p>{item.text}</p>}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {service.faqs?.length > 0 && (
        <section className="section faq-section">
          <div className="container faq-grid">
            <SectionHeading eyebrow="Frequently asked questions" title={`What to know about ${service.title}.`} />
            <div>{service.faqs.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div>
          </div>
        </section>
      )}

      <section className="section related-section">
        <div className="container">
          <SectionHeading eyebrow={labels.relatedEyebrow} title={labels.relatedTitle} />
          <div className="service-grid related-grid">{related.map((item, index) => <ServiceCard service={item} index={index} key={item.slug} />)}</div>
        </div>
      </section>
      <CTA content={labels.cta} />
    </>
  );
}
