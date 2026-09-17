"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function HomeCarousel({ slides }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setActive((current) => (current + 1) % slides.length), 5600);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  const move = (direction) => setActive((current) => (current + direction + slides.length) % slides.length);

  return (
    <div className="hero-carousel" aria-roledescription="carousel" aria-label="Featured capabilities">
      {slides.map((slide, index) => (
        <div
          className={`hero-slide ${index === active ? "active" : ""}`}
          style={{ backgroundImage: `linear-gradient(90deg,rgba(4,14,34,.9),rgba(4,14,34,.12)),url("${slide.image}")` }}
          key={slide.number}
          aria-hidden={index !== active}
        />
      ))}
      <div className="carousel-meta">
        <div><span>{slides[active].number}</span><strong>{slides[active].label}</strong></div>
        <div className="carousel-controls">
          <button onClick={() => move(-1)} aria-label="Previous slide"><ArrowLeft /></button>
          <button onClick={() => move(1)} aria-label="Next slide"><ArrowRight /></button>
        </div>
      </div>
      <div className="carousel-dots">
        {slides.map((slide, index) => <button key={slide.number} className={index === active ? "active" : ""} onClick={() => setActive(index)} aria-label={`Go to slide ${index + 1}`} />)}
      </div>
    </div>
  );
}
