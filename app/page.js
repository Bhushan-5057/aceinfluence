import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Quote, Star } from "lucide-react";
import HomeCarousel from "../components/sections/HomeCarousel";
import { CTA, Process, SectionHeading, ServiceCard } from "../components/ui";
import pages from "../data/pages.json";
import testimonials from "../data/testimonials.json";
import { serviceCategories } from "../lib/services";

export default function HomePage() {
  const page = pages.home;
  return (
    <>
      <section className="home-hero">
        <HomeCarousel slides={page.hero.slides} />
        <div className="container hero-copy">
          <span className="eyebrow">{page.hero.eyebrow}</span>
          <h1>{page.hero.title}</h1>
          <p>{page.hero.text}</p>
          <div className="hero-actions">
            <Link className="button" href="/contact">{page.hero.primaryCta}<ArrowRight size={18} /></Link>
            <Link className="text-link" href="#services">{page.hero.secondaryCta}<ArrowRight size={18} /></Link>
          </div>
        </div>
      </section>

      <section className="section intro-section">
        <div className="container intro-grid">
          <span className="eyebrow" data-aos="fade-up">{page.intro.eyebrow}</span>
          <div data-aos="fade-up"><h2>{page.intro.title}</h2><p>{page.intro.text}</p></div>
        </div>
      </section>

      <section className="section services-section" id="services">
        <div className="container">
          <SectionHeading {...page.services} />
          <div className="category-stack">
            {serviceCategories.map((category) => (
              <section className="service-category-block" key={category.slug}>
                <div className="category-heading" data-aos="fade-up">
                  <span>{category.title}</span>
                  <p>{category.description}</p>
                </div>
                <div className="service-grid">{category.services.map((service, index) => <ServiceCard key={service.slug} service={service} index={index} />)}</div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="section vision-section">
        <div className="container vision-grid">
          <div data-aos="fade-right"><span className="eyebrow">{page.vision.eyebrow}</span><h2>{page.vision.title}</h2><p>{page.vision.text}</p></div>
          <div className="stat-grid">
            {page.vision.stats.map((stat) => <div key={stat.label} data-aos="zoom-in"><strong>{stat.value}</strong><span>{stat.label}</span></div>)}
          </div>
        </div>
      </section>

      <Process content={page.process} />

      {page.proof?.items?.length > 0 && (
        <section className="section why-section">
          <div className="container">
            <SectionHeading eyebrow={page.proof.eyebrow} title={page.proof.title} light />
            <div className="why-grid">{page.proof.items.map((item) => <article key={item.title}><CheckCircle2 /><h3>{item.title}</h3><p>{item.text}</p><ArrowRight /></article>)}</div>
          </div>
        </section>
      )}

      {page.industries?.items?.length > 0 && (
        <section className="section industries-section">
          <div className="container">
            <SectionHeading eyebrow={page.industries.eyebrow} title={page.industries.title} />
            <div className="industries-grid">{page.industries.items.map((item) => (
              <article key={item.title} data-aos="fade-up">
                <Image src={item.image} alt="" fill sizes="(max-width: 600px) 100vw, 25vw" />
                <div><h3>{item.title}</h3><p>{item.text}</p></div>
              </article>
            ))}</div>
          </div>
        </section>
      )}

      <section className="section testimonial-section">
        <div className="container">
          <SectionHeading {...page.testimonials} />
          <div className="testimonial-grid">
            {testimonials.map((item, index) => (
              <article key={item.name} data-aos="fade-up" data-aos-delay={index * 80}>
                <Quote size={32} />
                <div className="rating" aria-label={`${item.rating} out of 5 stars`}>
                  {Array.from({ length: item.rating }, (_, star) => <Star key={star} size={16} fill="currentColor" aria-hidden="true" />)}
                </div>
                <blockquote>{item.quote}</blockquote><div><strong>{item.name}</strong><span>{item.role}{item.industry ? ` · ${item.industry}` : ""}</span></div>
              </article>
            ))}
          </div>
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
      <CTA content={page.cta} />
    </>
  );
}
