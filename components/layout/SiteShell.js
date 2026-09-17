"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import AOS from "aos";
import { ChevronUp } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function SiteShell({ children }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 750, easing: "ease-out-cubic", once: true, offset: 40 });
  }, []);

  useEffect(() => {
    const updateScrollButton = () => setShowScrollTop(window.scrollY > 500);
    updateScrollButton();
    window.addEventListener("scroll", updateScrollButton, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollButton);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = window.setTimeout(() => {
      setLoading(false);
      AOS.refresh();
    }, 520);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    const beginTransition = (event) => {
      const link = event.target.closest("a");
      if (!link || link.target === "_blank" || event.metaKey || event.ctrlKey) return;
      const url = new URL(link.href, window.location.href);
      if (url.origin === window.location.origin && url.pathname !== window.location.pathname) setLoading(true);
    };
    document.addEventListener("click", beginTransition);
    return () => document.removeEventListener("click", beginTransition);
  }, []);

  return (
    <>
      <div className={`site-loader ${loading ? "is-visible" : ""}`} aria-hidden={!loading}>
        <div className="loader-mark"><span>ACE</span><i /></div>
      </div>
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer />
      <button className={`scroll-top ${showScrollTop ? "is-visible" : ""}`} aria-label="Scroll to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        <ChevronUp aria-hidden="true" />
      </button>
    </>
  );
}
