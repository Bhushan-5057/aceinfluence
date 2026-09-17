import Image from "next/image";
import { Check, MoveUpRight } from "lucide-react";
import { CTA, Process, SectionHeading } from "../../components/ui";
import pages from "../../data/pages.json";
import { company } from "../../lib/company";

export const metadata = {
  title: "About",
  description: `Meet ${company.name}, a development, cybersecurity, and compliance partner serving organisations from Mississauga.`,
};

export default function AboutPage() {
  const page = pages.about;
  const homeProcess = pages.home.process;
  return (
    <>
      <section className="inner-hero image-hero" style={{ backgroundImage: `linear-gradient(90deg,rgba(4,14,34,.94),rgba(4,14,34,.28)),url("${page.hero.image}")` }}>
        <div className="container" data-aos="fade-up"><span className="eyebrow">{page.hero.eyebrow}</span><h1>{page.hero.title}</h1><p>{page.hero.text}</p></div>
      </section>

      <section className="section about-vision">
        <div className="container about-vision-grid">
          <SectionHeading {...page.vision} />
          <div className="goal-stack">
            {page.goals.map((goal, index) => <article key={goal.title} data-aos="fade-left"><span>0{index + 1}</span><div><h3>{goal.title}</h3><p>{goal.text}</p></div></article>)}
          </div>
        </div>
      </section>

      {page.story && (
        <section className="section story-section">
          <div className="container story-grid">
            <div className="story-image" data-aos="fade-right"><Image src={page.story.image} alt="Aceinfluence team collaborating" fill sizes="(max-width: 900px) 100vw, 50vw" /></div>
            <SectionHeading eyebrow={page.story.eyebrow} title={page.story.title} text={page.story.text} />
          </div>
        </section>
      )}

      <section className="section why-section">
        <div className="container">
          <SectionHeading eyebrow={page.why.eyebrow} title={page.why.title} light />
          <div className="why-grid">
            {page.why.items.map((item) => <article key={item.title} data-aos="fade-up"><Check /><h3>{item.title}</h3><p>{item.text}</p><MoveUpRight /></article>)}
          </div>
        </div>
      </section>

      {page.credentials?.items?.length > 0 && (
        <section className="section credentials-section">
          <div className="container">
            <SectionHeading eyebrow={page.credentials.eyebrow} title={page.credentials.title} text={page.credentials.text} />
            <div className="credentials-grid">{page.credentials.items.map((item) => (
              <article key={item.title} data-aos="fade-up">
                <div><Image src={item.image} alt="" fill sizes="(max-width: 600px) 100vw, 25vw" /></div>
                <h3>{item.title}</h3><p>{item.text}</p>
              </article>
            ))}</div>
          </div>
        </section>
      )}

      <Process content={{ ...homeProcess, eyebrow: page.process.eyebrow, title: page.process.title }} />
      {page.stats?.length > 0 && (
        <section className="section vision-section">
          <div className="container vision-grid">
            <div><span className="eyebrow">Measured by outcomes</span><h2>Practical expertise across the technology lifecycle.</h2><p>Our multidisciplinary delivery model connects product engineering, security assurance, governance, and operational resilience.</p></div>
            <div className="stat-grid">{page.stats.map((stat) => <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</div>
          </div>
        </section>
      )}
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
