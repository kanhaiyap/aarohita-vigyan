// src/components/Hero.jsx
import React from "react";
import { Helmet } from "react-helmet-async";

export default function Hero() {
  const onNavClick = (e, id) => {
    e.preventDefault();
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Aarohita Vigyan Pvt. Ltd.",
    "url": "https://haritaahar.com/",
    "inLanguage": "en-IN",
    "publisher": {
      "@type": "Organization",
      "name": "Aarohita Vigyan Pvt. Ltd."
    }
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center pt-28 pb-20"
      role="banner"
      aria-labelledby="hero-heading"
    >
      {/* SEO head only (no visual changes) */}
      <Helmet>
        <title>Aarohita Vigyan — AI, IoT & Web Development | POS & CRM Systems in India</title>
        <meta
          name="description"
          content="Aarohita Vigyan delivers AI automation, React + Django websites, and IoT products (Bhojan Mitra). Expert POS & CRM development for restaurants and enterprises across India. Contact Kanhaiya Pandey for AI-driven solutions."
        />
        <link rel="canonical" href="https://haritaahar.com/" />

        {/* Open Graph */}
        <meta property="og:title" content="Aarohita Vigyan — AI & IoT Solutions" />
        <meta property="og:description" content="Reliable, scalable AI & IoT solutions for modern businesses." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://haritaahar.com/" />
        <meta property="og:image" content="https://haritaahar.com/images/logo.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Aarohita Vigyan — AI & IoT Solutions" />
        <meta name="twitter:description" content="AI/ML, Voice AI, IoT, Cloud and Computer Vision." />
        <meta name="twitter:image" content="https://haritaahar.com/images/logo.png" />

        {/* Structured Data */}
        <script type="application/ld+json">{JSON.stringify(websiteJsonLd)}</script>
      </Helmet>

      {/* Subtle glass scrim for readability */}
      <div
        className="
          absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2
          w-[min(92vw,1040px)] h-[min(62vh,460px)]
          rounded-3xl border border-slate-200
          bg-white/65 backdrop-blur-md
          shadow-[0_22px_70px_rgba(2,6,23,0.14)]
          pointer-events-none z-[1]
        "
        aria-hidden="true"
      />

      <div className="relative z-[2] text-center px-6 max-w-6xl mx-auto">
        {/* Eyebrow (unchanged) */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200 bg-white/80 backdrop-blur text-xs font-medium text-slate-600 mb-5">
          <span className="h-2 w-2 rounded-full bg-blue-500" />
          Aarohita Vigyan — AI • IoT • Cloud
        </div>

        {/* Title (unchanged) */}
        <h1 id="hero-heading" className="h1 text-5xl md:text-7xl mb-5 text-slate-900 tracking-tight leading-[1.05]">
          The Future of{" "}
          <span className="tech-accent romance-accent">
            AI &amp; IoT
            <span aria-hidden className="accent-bg" />
          </span>
        </h1>

        {/* Paragraph (unchanged) */}
        <p className="mb-9 max-w-3xl mx-auto text-slate-600 text-lg md:text-xl leading-relaxed">
          We craft reliable, scalable solutions—so your business can move faster
          with intelligence, not complexity.
        </p>

        {/* CTAs (unchanged) */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#services"
            onClick={(e) => onNavClick(e, "#services")}
            className="btn btn-primary text-base md:text-lg"
          >
            🚀 Explore Solutions
          </a>
          <a
            href="#projects"
            onClick={(e) => onNavClick(e, "#projects")}
            className="btn btn-ghost text-base md:text-lg"
          >
            🎥 Watch Demo
          </a>
        </div>

        {/* Tech badges (unchanged) */}
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {["AI/ML", "Voice AI", "IoT", "Cloud", "Computer Vision"].map((b) => (
            <span
              key={b}
              className="px-4 py-2 rounded-full text-sm border border-slate-200 bg-white/85 text-slate-600 backdrop-blur"
            >
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
