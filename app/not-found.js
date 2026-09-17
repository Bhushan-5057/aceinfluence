import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import pages from "../data/pages.json";

export default function NotFound() {
  const content = pages.notFound;
  return (
    <section className="not-found">
      <div className="noise" />
      <div className="container">
        <span className="eyebrow">{content.eyebrow}</span>
        <h1>{content.title}</h1>
        <p>{content.text}</p>
        <Link href="/" className="button button-light"><ArrowLeft size={18} />{content.button}</Link>
      </div>
    </section>
  );
}
