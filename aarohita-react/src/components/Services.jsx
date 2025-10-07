// src/components/Services.jsx
import React from "react";
import { Helmet } from "react-helmet-async";
import SectionHeader from "./SectionHeader";

const services = [
  {
    title: "Web & App Development",
    desc: "Modern, responsive websites and custom dashboards with AI integration tailored to your business goals.",
    g: "from-blue-500 to-cyan-500",
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"/>
      </svg>
    ),
  },
  {
    title: "CRM & POS Systems",
    desc: "Custom-built AI-powered solutions like Bhojan Mitra for restaurant and business automation.",
    g: "from-green-500 to-emerald-500",
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
      </svg>
    ),
  },
  {
    title: "AI/ML Solutions",
    desc: "Predictive models, NLP, computer vision, and decision intelligence pipelines for smart automation.",
    g: "from-purple-500 to-pink-500",
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707"/>
      </svg>
    ),
  },
  {
    title: "IoT Automation",
    desc: "From smart city monitoring to intelligent systems — where hardware meets AI innovation.",
    g: "from-orange-500 to-red-500",
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
      </svg>
    ),
  },
];

export default function Services() {
  // JSON-LD: ItemList + Service + Breadcrumbs
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Aarohita Vigyan Services",
    "itemListElement": services.map((s, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": s.title,
      "description": s.desc,
      "url": "https://haritaahar.com/#services"
    }))
  };

  const servicesJsonLd = services.map((s) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": s.title,
    "description": s.desc,
    "provider": {
      "@type": "Organization",
      "name": "Aarohita Vigyan Pvt. Ltd.",
      "url": "https://haritaahar.com/"
    },
    "areaServed": "IN",
    "serviceType": s.title
  }));

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://haritaahar.com/" },
      { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://haritaahar.com/#services" }
    ]
  };

  return (
    <section
      id="services"
      className="relative z-[2] py-28"
      role="region"
      aria-labelledby="services-heading"
    >
      {/* SEO head only (no visible changes) */}
      <Helmet>
        <title>AI, IoT, Web Development & POS Services | Aarohita Vigyan (India)</title>
        <meta
          name="description"
          content="Hire Aarohita Vigyan for AI/ML solutions, Voice AI POS (Bhojan Mitra), IoT automation, and modern web & app development in India."
        />
        <meta
          name="keywords"
          content="AI services India, IoT development India, Voice AI POS, Bhojan Mitra, CRM POS systems, web app development India, computer vision"
        />
        <link rel="canonical" href="https://haritaahar.com/#services" />

        {/* Open Graph */}
        <meta property="og:title" content="AI, IoT, Web Development & POS Services | Aarohita Vigyan" />
        <meta property="og:description" content="AI/ML, IoT automation, Voice AI POS, CRM/POS and modern web apps for Indian businesses." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://haritaahar.com/#services" />
        <meta property="og:image" content="https://haritaahar.com/images/logo.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Aarohita Vigyan — AI, IoT & Web Services" />
        <meta name="twitter:description" content="AI/ML, IoT, Voice AI POS (Bhojan Mitra), CRM/POS and web & app development." />
        <meta name="twitter:image" content="https://haritaahar.com/images/logo.png" />

        {/* Structured Data */}
        <script type="application/ld+json">{JSON.stringify(itemListJsonLd)}</script>
        {servicesJsonLd.map((node, idx) => (
          <script key={idx} type="application/ld+json">{JSON.stringify(node)}</script>
        ))}
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      </Helmet>

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          title="Our AI-Powered Services"
          subtitle="Cutting-edge solutions powered by artificial intelligence and IoT technology"
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4" aria-label="Service cards">
          {services.map((s) => (
            <article
              key={s.title}
              className="
                group card-elevated bg-white border border-slate-200
                rounded-2xl p-8 hover-lift
              "
              aria-labelledby={`${s.title.replace(/\s+/g, "-").toLowerCase()}-heading`}
            >
              <div
                className={`w-16 h-16 bg-gradient-to-r ${s.g} rounded-xl flex items-center justify-center mb-6
                shadow-md shadow-slate-200/40 ring-1 ring-white/30`}
                aria-hidden="true"
              >
                {s.icon}
              </div>

              <h3
                id={`${s.title.replace(/\s+/g, "-").toLowerCase()}-heading`}
                className="h3 text-2xl md:text-3xl text-slate-900 mb-3"
              >
                {s.title}
              </h3>
              <p className="text-slate-700 text-lg leading-relaxed">
                {s.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
