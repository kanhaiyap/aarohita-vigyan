import React from "react";
import { Helmet } from "react-helmet-async";
import SectionHeader from "./SectionHeader";
import CountUp from "../components/CountUp";

export default function About() {
  const stats = [
    { end: 50, suffix: "+", label: "Projects Delivered", color: "text-blue-700" },
    { end: 25, suffix: "+", label: "Happy Clients", color: "text-emerald-700" },
    { end: 5,  suffix: "+", label: "Industries", color: "text-violet-700" },
    { end: 99, suffix: "%", label: "Success Rate", color: "text-orange-700" },
  ];

  // --- JSON-LD: Organization + Product + FAQ ---
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Aarohita Vigyan Pvt. Ltd.",
    "url": "https://haritaahar.com/",
    "logo": "https://haritaahar.com/images/logo.png",
    "founder": "Kunwar Kanhaiya Pandey",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Garhwa",
      "addressRegion": "Jharkhand",
      "addressCountry": "IN"
    },
    "contactPoint": [{
      "@type": "ContactPoint",
      "contactType": "sales",
      "email": "pkanhaiya372@gmail.com",
      "telephone": "+919731615178",
      "areaServed": "IN"
    }],
    "sameAs": [
      "https://x.com/Kanhaiyapandey6",
      "https://www.linkedin.com/in/kunwar-kanhaiya-pandey-72711811a/",
      "https://github.com/kanhaiyap"
    ]
  };

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Bhojan Mitra",
    "brand": "Aarohita Vigyan",
    "category": "Restaurant POS / Voice AI / IoT",
    "description": "Flower-vase-shaped voice-enabled self-ordering POS device with multilingual support, kitchen display integration and inventory for Indian restaurants.",
    "isAccessoryOrSparePartFor": "Point of Sale systems",
    "areaServed": "IN",
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": "INR"
    }
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Do you provide AI & IoT solutions in Bhilai and across India?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Aarohita Vigyan delivers AI/ML, Voice AI and IoT automation projects across Bhilai, Jharkhand, Chhattisgarh and pan-India, with remote delivery worldwide."
        }
      },
      {
        "@type": "Question",
        "name": "What industries do you serve?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Retail, Restaurants, Insurance, Healthcare and Smart Cities, with custom web apps, CRM/POS systems and computer vision solutions."
        }
      },
      {
        "@type": "Question",
        "name": "How can we contact you for a project?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Use the Contact section to email pkanhaiya372@gmail.com or chat on WhatsApp at +91 9731615178."
        }
      }
    ]
  };

  return (
    <section
      id="about"
      className="relative z-[2] py-28"
      role="region"
      aria-labelledby="about-heading"
    >
      {/* --- SEO Head --- */}
      <Helmet>
        <title>About Aarohita Vigyan | AI & IoT Solutions in Bhilai, Jharkhand, India</title>
        <meta
          name="description"
          content="Aarohita Vigyan Pvt. Ltd. builds AI & IoT solutions in Bhilai, Jharkhand and across India—voice AI, computer vision, CRM/POS (Bhojan Mitra) and smart city automation."
        />
        <meta
          name="keywords"
          content="AI company in Bhilai, IoT solutions India, Voice AI POS, Bhojan Mitra, AI/ML services Jharkhand, restaurant POS India, computer vision Bhilai"
        />
        <link rel="canonical" href="https://haritaahar.com/#about" />

        {/* Open Graph */}
        <meta property="og:title" content="About Aarohita Vigyan | AI & IoT Solutions in India" />
        <meta property="og:description" content="We deliver AI/ML, Voice AI, IoT automation and POS/CRM systems for Indian businesses." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://haritaahar.com/#about" />
        <meta property="og:image" content="https://haritaahar.com/images/logo.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="About Aarohita Vigyan | AI & IoT Solutions" />
        <meta name="twitter:description" content="AI/ML, Voice AI, IoT automation and POS/CRM systems for Indian businesses." />
        <meta name="twitter:image" content="https://haritaahar.com/images/logo.png" />

        {/* Structured Data */}
        <script type="application/ld+json">{JSON.stringify(orgJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(productJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          title="About Aarohita Vigyan"
          subtitle="AI & IoT solutions in Bhilai and across India • Voice AI, Computer Vision, CRM/POS and Smart City automation"
        />

        {/* Main blocks */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Who We Are */}
          <article className="card-elevated bg-white rounded-2xl p-8 hover-lift border border-slate-200">
            <header className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mr-4 bg-blue-50 ring-1 ring-blue-100" aria-hidden="true">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 id="about-heading" className="h3 text-2xl md:text-3xl text-slate-900">
                Who We Are
              </h3>
            </header>

            <div className="space-y-4 text-slate-700 text-lg leading-relaxed">
              <p>
                <strong>Aarohita Vigyan Pvt. Ltd.</strong> is a
                <span className="font-semibold text-blue-700"> next-generation AI &amp; IoT solutions company</span> based near
                <strong> Bhilai, Chhattisgarh</strong> and <strong>Garhwa, Jharkhand</strong>, serving clients pan-India and globally.
                We specialize in <em>Voice AI, Computer Vision, IoT automation, and custom CRM/POS software</em>.
              </p>

              <div className="p-4 rounded-lg border border-blue-100 bg-blue-50">
                <p className="font-medium text-slate-800">
                  Industries: Retail • Restaurants • Insurance • Healthcare • Smart Cities
                </p>
              </div>

              <p>
                Our solutions blend <span className="font-semibold text-blue-700">technology and usability</span>—helping
                businesses grow faster with automation, better data, and intelligent systems. If you’re searching for an
                <strong> AI company in Bhilai</strong> or <strong>IoT development in India</strong>, we’re built for speed and outcomes.
              </p>

              <nav aria-label="Quick links" className="mt-4">
                <ul className="list-disc list-inside text-base">
                  <li><a href="#projects" className="text-blue-700 underline underline-offset-4">See our AI projects</a></li>
                  <li><a href="#contact" className="text-blue-700 underline underline-offset-4">Get a free consultation</a></li>
                </ul>
              </nav>
            </div>
          </article>

          {/* Our Vision */}
          <article className="card-elevated bg-white rounded-2xl p-8 hover-lift border border-slate-200">
            <header className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mr-4 bg-violet-50 ring-1 ring-violet-100" aria-hidden="true">
                <svg className="w-6 h-6 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="h3 text-2xl md:text-3xl text-slate-900">Our Vision</h3>
            </header>

            <div className="space-y-4 text-slate-700 text-lg leading-relaxed">
              <p>
                To be a catalyst in the digital transformation of everyday operations—bringing
                <span className="font-semibold text-violet-700"> affordable intelligence</span> to every corner of business and society.
              </p>

              <section aria-labelledby="bhojan-mitra-heading" className="p-6 rounded-lg border border-violet-100 bg-violet-50">
                <div className="flex items-center mb-3">
                  <span className="text-2xl mr-3" aria-hidden="true">🌸</span>
                  <h4 id="bhojan-mitra-heading" className="font-bold text-violet-800 text-xl">Bhojan Mitra</h4>
                </div>
                <p className="text-slate-800">
                  Our flagship product revolutionizes restaurant billing with a
                  <span className="font-semibold"> flower-vase-shaped, voice-enabled self-ordering POS</span>—multilingual Indian
                  language support, integrated kitchen display, and inventory management.
                </p>
                <div className="mt-3">
                  <a href="#contact" className="text-violet-700 underline underline-offset-4">Request a live demo</a>
                </div>
              </section>
            </div>
          </article>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-8" role="list" aria-label="Company stats">
          {stats.map((s) => (
            <div
              key={s.label}
              role="listitem"
              className="text-center p-6 card-elevated bg-white rounded-xl hover-lift border border-slate-200"
            >
              <div className={`mb-2 text-5xl md:text-6xl font-extrabold ${s.color}`} aria-label={s.label}>
                <CountUp end={s.end} suffix={s.suffix} />
              </div>
              <div className="text-slate-700 text-lg">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Mini FAQ (visible + schema above) */}
        <section className="mt-16 bg-white border border-slate-200 rounded-2xl p-8" aria-labelledby="about-faq">
          <h3 id="about-faq" className="text-2xl font-semibold text-slate-900 mb-4">
            Frequently Asked Questions
          </h3>
          <div className="space-y-4 text-slate-700">
            <details className="group">
              <summary className="cursor-pointer font-medium text-slate-900">
                Do you provide AI & IoT solutions in Bhilai and across India?
              </summary>
              <p className="mt-2">
                Yes. We deliver AI/ML, Voice AI and IoT automation projects across Bhilai, Jharkhand,
                Chhattisgarh and pan-India, with remote delivery worldwide.
              </p>
            </details>
            <details className="group">
              <summary className="cursor-pointer font-medium text-slate-900">
                What industries do you serve?
              </summary>
              <p className="mt-2">Retail, Restaurants, Insurance, Healthcare and Smart Cities.</p>
            </details>
            <details className="group">
              <summary className="cursor-pointer font-medium text-slate-900">
                How can we contact you for a project?
              </summary>
              <p className="mt-2">
                Email <a href="mailto:pkanhaiya372@gmail.com" className="underline">pkanhaiya372@gmail.com</a> or
                chat on WhatsApp at <a href="https://wa.me/919731615178" target="_blank" rel="noreferrer" className="underline">+91 9731615178</a>.
              </p>
            </details>
          </div>
        </section>

        {/* CTA */}
        <div className="mt-10 text-center">
          <a href="#contact" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl px-6 py-3 shadow">
            Get a free consultation
          </a>
        </div>
      </div>
    </section>
  );
}
