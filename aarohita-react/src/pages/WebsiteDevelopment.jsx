// src/pages/WebsiteDevelopment.jsx
import React, { useCallback } from "react";
import { Helmet } from "react-helmet-async";

export default function WebsiteDevelopment() {
  // Lightweight tracking hooks (safe even if no analytics present)
  const track = useCallback((action, label) => {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", action, { event_category: "lead", event_label: label });
    }
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: action, label });
    }
  }, []);

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Aarohita Vigyan",
    "url": "https://haritaahar.com/",
    "inLanguage": "en-IN",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://haritaahar.com/website-development/?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Aarohita Vigyan Pvt. Ltd.",
    "url": "https://haritaahar.com/",
    "logo": "https://haritaahar.com/images/logo.png",
    "sameAs": [
      "https://x.com/Kanhaiyapandey6",
      "https://www.linkedin.com/in/kunwar-kanhaiya-pandey-72711811a/",
      "https://github.com/kanhaiyap"
    ],
    "contactPoint": [{
      "@type": "ContactPoint",
      "contactType": "sales",
      "telephone": "+91-9731615178",
      "email": "pkanhaiya372@gmail.com",
      "areaServed": "IN",
      "availableLanguage": ["en", "hi"]
    }]
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Website & Web App Development",
    "serviceType": "Custom web development",
    "provider": {
      "@type": "Organization",
      "name": "Aarohita Vigyan Pvt. Ltd.",
      "url": "https://haritaahar.com/"
    },
    "areaServed": "IN",
    "url": "https://haritaahar.com/website-development/",
    "description": "Build your own website or web app with React, Django, and AI automation. Fast, SEO-friendly, scalable development for startups and SMEs.",
    "keywords": [
      "build my website", "web app development", "website designer", "hire web developer",
      "React Django developer India", "AI website", "website development India",
      "custom website India", "PWA development", "dashboard development", "ecommerce website India"
    ],
    "offers": {
      "@type": "Offer",
      "priceCurrency": "INR",
      "url": "https://haritaahar.com/website-development/"
    }
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://haritaahar.com/" },
      { "@type": "ListItem", "position": 2, "name": "Website Development", "item": "https://haritaahar.com/website-development/" }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Website & Web App Development in India | React + Django | Aarohita Vigyan</title>
        <meta
          name="description"
          content="Need your own website or web app? We build fast, SEO-friendly, AI-ready sites and dashboards using React, Django & cloud. Serving clients across India — WhatsApp for a quick quote."
        />
        <meta
          name="keywords"
          content="build my website, make a website, web app development, website design Bhilai, website developer India, hire web developer, AI website, React Django developer India, custom website India, Aarohita Vigyan, Kunwar Kanhaiya Pandey"
        />
        <link rel="canonical" href="https://haritaahar.com/website-development/" />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Website & Web App Development | Aarohita Vigyan" />
        <meta property="og:description" content="Custom websites & web apps with React, Django, and AI automation. Get a fast quote on WhatsApp." />
        <meta property="og:url" content="https://haritaahar.com/website-development/" />
        <meta property="og:image" content="https://haritaahar.com/images/logo.png" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Website & Web App Development | Aarohita Vigyan" />
        <meta name="twitter:description" content="Build your own website/web app. React + Django specialists. Chat on WhatsApp." />
        <meta name="twitter:image" content="https://haritaahar.com/images/logo.png" />
        {/* Hreflang */}
        <link rel="alternate" hrefLang="en-IN" href="https://haritaahar.com/website-development/" />
        <link rel="alternate" hrefLang="x-default" href="https://haritaahar.com/website-development/" />
        {/* Structured data */}
        <script type="application/ld+json">{JSON.stringify(websiteJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(orgJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(serviceJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      </Helmet>

      {/* Invisible, keyword-supporting headings (no visual change) */}
  <h2 className="sr-only">Website developer in India</h2>
      <h3 className="sr-only">Hire React and Django web app developers</h3>
      <h3 className="sr-only">Custom website design, SEO-friendly and mobile responsive</h3>

      <section className="relative z-[2] py-24 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-4">
            Want Your Own Website or Web App?
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-10">
            We design fast, scalable, and intelligent websites powered by{" "}
            <span className="font-semibold text-blue-700">React, Django, and AI automation</span>.{" "}
            From small business websites to full web apps — we handle everything end-to-end.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href="https://wa.me/919731615178"
              target="_blank"
              rel="noreferrer"
              onClick={() => track("lead_whatsapp_click", "website_development")}
              className="btn btn-primary text-lg px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl"
            >
              Chat on WhatsApp
            </a>
            <a
              href="mailto:pkanhaiya372@gmail.com"
              onClick={() => track("lead_email_click", "website_development")}
              className="btn btn-ghost text-lg px-8 py-3 border border-slate-300 hover:bg-slate-100 rounded-xl font-semibold text-slate-800"
            >
              Get a Quote
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-left mt-16">
            <div className="p-8 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold mb-3 text-blue-700">Custom Website Design</h3>
              <p className="text-slate-700">
                Unique, mobile-friendly designs with SEO optimization and branding
                that helps you stand out from competitors.
              </p>
            </div>
            <div className="p-8 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold mb-3 text-emerald-700">Web App Development</h3>
              <p className="text-slate-700">
                Build full-featured web applications with dashboards, authentication,
                and API integration using React and Django.
              </p>
            </div>
            <div className="p-8 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold mb-3 text-violet-700">AI-Powered Automation</h3>
              <p className="text-slate-700">
                Integrate chatbots, voice interfaces, or analytics into your site —
                bringing intelligence to your business workflow.
              </p>
            </div>
          </div>

          <div className="mt-20 bg-white/70 border border-slate-200 p-8 rounded-2xl max-w-4xl mx-auto shadow-lg">
            <h2 className="text-2xl font-bold mb-3 text-slate-900">Why Choose Aarohita Vigyan</h2>
            <ul className="text-slate-700 text-lg space-y-2 text-left list-disc list-inside">
              <li>100% Custom Development — No generic templates</li>
              <li>Built with React, Django, Tailwind, and Cloud services</li>
              <li>SEO-friendly and mobile responsive</li>
              <li>Fast delivery and ongoing support plans</li>
            </ul>
          </div>

          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-4 text-slate-900">Let's Build Your Website Today</h2>
            <p className="text-lg text-slate-600 mb-8">
              We’ve helped restaurants, startups, and service businesses go online
              with elegant, intelligent websites. Let’s make yours next.
            </p>

            <a
              href="https://wa.me/919731615178"
              className="inline-block bg-green-600 hover:bg-green-700 text-white text-lg font-semibold px-8 py-3 rounded-xl"
              target="_blank"
              rel="noreferrer"
              onClick={() => track("lead_whatsapp_click", "website_development_bottom")}
            >
              Start on WhatsApp
            </a>
          </div>

          {/* Invisible internal links to strengthen topical relevance without changing UI */}
          <nav aria-hidden="true" className="sr-only">
            <a href="/#services">Web Development Services</a>
            <a href="/#projects">Web App Projects</a>
            <a href="/kunwar-kanhaiya-pandey.html">Kunwar Kanhaiya Pandey</a>
          </nav>
        </div>
      </section>
    </>
  );
}
