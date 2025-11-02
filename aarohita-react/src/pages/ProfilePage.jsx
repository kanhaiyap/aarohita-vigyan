// src/pages/ProfilePage.jsx
import React, { useEffect, useMemo } from "react";

/** Small helper to upsert <meta> and <link rel="canonical"> without Helmet */
function useSEOTags({
  title,
  description,
  keywords,
  image = "/images/ceo.jpeg",
  canonical,
}) {
  useEffect(() => {
    if (typeof document === "undefined") return;

    // Title
    if (title) document.title = title;

    // description
    upsertMeta("name", "description", description);
    // keywords
    upsertMeta("name", "keywords", keywords);

    // Open Graph
    upsertMeta("property", "og:type", "profile");
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", canonical);
    upsertMeta("property", "og:image", image);
    upsertMeta("property", "og:locale", "en_IN");
    upsertMeta("property", "profile:first_name", "Kunwar");
    upsertMeta("property", "profile:last_name", "Pandey");

    // Twitter
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", image);

    // Canonical
    upsertCanonical(canonical);
  }, [title, description, keywords, image, canonical]);
}

function upsertMeta(key, keyValue, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[${key}="${keyValue}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(key, keyValue);
    document.head.appendChild(el);
  }
  el.setAttribute("content", String(content));
}

function upsertCanonical(href) {
  if (!href) return;
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export default function ProfilePage() {
  const canonical = useMemo(() => {
    if (typeof window === "undefined") return "https://example.com/kunwar-kanhaiya-pandey";
    // HashRouter safe canonical (strip the #)
    const origin = window.location.origin;
    return `${origin}/kunwar-kanhaiya-pandey`;
  }, []);

  // JSON-LD (kept simple; no library)
  const personJSONLD = useMemo(
    () =>
      ({
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Kunwar Kanhaiya Pandey",
        alternateName: ["Kanhaiya Pandey", "Kunwar Kanhaiya"],
        jobTitle: "Founder & CEO",
        image: "/images/ceo.jpeg",
        url: canonical,
        worksFor: {
          "@type": "Organization",
          name: "Aarohita Vigyan Private Limited",
          url: `${typeof window !== "undefined" ? window.location.origin : "https://example.com"}/`,
        },
        sameAs: [
          "https://x.com/Kanhaiyapandey6",
          "https://www.linkedin.com/in/kunwar-kanhaiya-pandey-72711811a/",
          "https://github.com/kanhaiyap",
        ],
        address: { "@type": "PostalAddress", addressCountry: "IN" },
        knowsAbout: [
          "Artificial Intelligence", "IoT", "Voice Interfaces", "Computer Vision",
          "Django", "React", "POS Systems", "CRM"
        ],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "business",
          telephone: "+91-9731615178",
          areaServed: "IN",
          availableLanguage: ["en", "hi"],
        },
      }),
    [canonical]
  );

  const breadcrumbJSONLD = useMemo(
    () =>
      ({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${typeof window !== "undefined" ? window.location.origin : "https://example.com"}/` },
          { "@type": "ListItem", position: 2, name: "Team", item: `${typeof window !== "undefined" ? window.location.origin : "https://example.com"}/team` },
          { "@type": "ListItem", position: 3, name: "Kunwar Kanhaiya Pandey", item: canonical },
        ],
      }),
    [canonical]
  );

  const faqJSONLD = useMemo(
    () =>
      ({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Who is Kunwar Kanhaiya Pandey?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "An AI & IoT entrepreneur, Founder & CEO at Aarohita Vigyan Private Limited. He builds voice-enabled restaurant tech (Bhojan Mitra), cloud POS/CRM systems, and supply-chain solutions for fresh produce brands.",
            },
          },
          {
            "@type": "Question",
            name: "How can I contact him for partnerships or projects?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Reach out on LinkedIn or call +91-9731615178 for business inquiries. Open to AI/ML development, POS/CRM deployments, and retail tech collaborations across India.",
            },
          },
          {
            "@type": "Question",
            name: "What projects is he working on?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Key projects include Bhojan Mitra (voice self-ordering device), a multi-tenant restaurant POS with Django + React, an insurance broker CRM, and HaritAahar.com for farm-fresh produce.",
            },
          },
        ],
      }),
    []
  );

  useSEOTags({
    title: "Kunwar Kanhaiya Pandey – Founder & CEO | Aarohita Vigyan",
    description:
      "Official profile of Kunwar Kanhaiya Pandey, Founder & CEO of Aarohita Vigyan. AI & IoT entrepreneur building Bhojan Mitra, POS & CRM systems, and Harit Aahar. Contact, projects, media, and speaking.",
    keywords:
      "Kunwar Kanhaiya Pandey, Kanhaiya Pandey, Aarohita Vigyan, Bhojan Mitra, Harit Aahar, AI entrepreneur, Vadodara, Bhilai, POS, CRM, voice recognition",
    image: "/images/ceo.jpeg",
    canonical,
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* JSON-LD scripts */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJSONLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJSONLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJSONLD) }} />

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-6 pt-24">
        <nav className="text-sm text-slate-600" aria-label="Breadcrumb">
          <ol className="flex gap-2">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li>/</li>
            <li><a href="/team" className="hover:underline">Team</a></li>
            <li>/</li>
            <li aria-current="page" className="text-slate-900 font-medium">Kunwar Kanhaiya Pandey</li>
          </ol>
        </nav>
      </div>

      {/* Hero */}
   {/* Hero */}
<section className="max-w-7xl mx-auto px-6 py-10">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
    {/* Image column */}
    <div className="md:col-span-1">
      <div className="relative w-56 h-56 md:w-full md:h-auto aspect-square rounded-2xl overflow-hidden shadow-xl border border-slate-200 mx-auto md:mx-0 shrink-0">
        <img
          src="/images/ceo.jpeg"
          alt="Portrait of Kunwar Kanhaiya Pandey"
          className="w-full h-full object-cover"
        />
      </div>
    </div>

    {/* Text column */}
    <div className="md:col-span-2">
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
        Kunwar Kanhaiya Pandey
      </h1>
      <p className="mt-3 text-slate-600 leading-relaxed">
        Founder & CEO, <strong>Aarohita Vigyan Private Limited</strong> • AI & IoT Entrepreneur •
        Builder of <em>Bhojan Mitra</em>, cloud POS/CRM & Harit Aahar
      </p>

      <div className="mt-4 flex flex-wrap gap-2" aria-label="Key focus areas">
        {["AI/ML", "IoT", "Voice UX", "Django + React", "Retail Tech"].map((t) => (
          <span
            key={t}
            className="px-3 py-1 rounded-full bg-blue-50 text-blue-900 border border-blue-200 text-xs"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href="https://www.linkedin.com/in/kunwar-kanhaiya-pandey-72711811a/"
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          Connect on LinkedIn
        </a>
        <a
          href="https://x.com/Kanhaiyapandey6"
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 hover:bg-slate-50"
        >
          Follow on X
        </a>
        <a
          href="mailto:pkanhaiya372@gmail.com"
          className="px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 hover:bg-slate-50"
        >
          Email
        </a>
      </div>
    </div>
  </div>
</section>


      {/* About */}
      <section id="about" className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid md:grid-cols-3 gap-6">
          <article className="md:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">About</h2>
            <p className="mt-2 text-slate-700">
              I’m an India-based entrepreneur working at the intersection of AI, voice interfaces, and retail technology.
              At Aarohita Vigyan, I lead the development of <strong>Bhojan Mitra</strong>—a multilingual, voice-enabled
              self-ordering device for restaurants—and a <strong>cloud POS/CRM</strong> suite used by hospitality and
              services businesses. I also operate <strong>Harit Aahar</strong>, bringing farm-fresh produce closer to
              urban consumers.
            </p>
            <ul className="mt-3 list-disc list-inside text-slate-700">
              <li><strong>Focus:</strong> AI/ML (speech, vision), IoT, Python, Django/DRF, React/Tailwind</li>
              <li><strong>Based in:</strong> India (Vadodara · Bhilai)</li>
              <li><strong>Open to:</strong> AI/ML projects, POS/CRM deployments, partnerships, and speaking</li>
            </ul>
          </article>
          <aside className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">At a glance</h3>
            <ul className="mt-2 space-y-2 text-slate-700">
              <li>Founder & CEO – Aarohita Vigyan Pvt Ltd</li>
              <li>Creator – Bhojan Mitra (voice self-ordering)</li>
              <li>Builder – Restaurant POS & Insurance CRM</li>
              <li>Operator – HaritAahar.com (fresh produce)</li>
            </ul>
          </aside>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="max-w-7xl mx-auto px-6 py-6">
        <h2 className="text-xl font-bold text-slate-900">Highlighted Projects</h2>
        <div className="mt-4 grid md:grid-cols-3 gap-6">
          {[
            { title: "Bhojan Mitra", body: "Flower-pot-shaped, multilingual voice self-ordering device with mic/speaker/display. Built for Indian restaurants with AI automation.", href: "/bhojan-mitra/" },
            { title: "Cloud POS & CRM", body: "React + Django multi-tenant POS for restaurants (tables, orders, inventory) and insurance CRM (leads, docs, reporting).", href: "/products/pos/" },
            { title: "Harit Aahar", body: "Farm-sourced vegetables & organic groceries platform for Vadodara with plans for broader distribution and cold-chain optimization.", href: "https://aarohitavigyan.com/" },
          ].map((p) => (
            <article key={p.title} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">{p.title}</h3>
              <p className="mt-2 text-slate-700">{p.body}</p>
              <p className="mt-3">
                <a
                  href={p.href}
                  className="text-blue-600 hover:text-blue-700"
                  target={p.href.startsWith("http") ? "_blank" : undefined}
                  rel={p.href.startsWith("http") ? "noreferrer" : undefined}
                >
                  Learn more →
                </a>
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid md:grid-cols-2 gap-6">
          <article className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Contact</h2>
            <div className="mt-2 text-slate-700 space-y-1">
              <p><strong>Business:</strong> <a href="mailto:pkanhaiya372@gmail.com" className="text-blue-600 hover:text-blue-700">pkanhaiya372@gmail.com</a></p>
              <p><strong>Phone:</strong> +91-9731615178</p>
              <p><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/kunwar-kanhaiya-pandey-72711811a/" target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-700">kunwar-kanhaiya-pandey</a></p>
            </div>
          </article>
          <aside className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Why work with me</h3>
            <ul className="mt-2 space-y-2 text-slate-700">
              <li>Hands-on founder who ships</li>
              <li>Strong across product, ML, and ops</li>
              <li>Obsessed with real-world impact</li>
            </ul>
          </aside>
        </div>
      </section>

      <footer className="max-w-7xl mx-auto px-6 py-10 text-slate-500 text-sm">
        <p>© {new Date().getFullYear()} Kunwar Kanhaiya Pandey · Aarohita Vigyan Private Limited</p>
      </footer>
    </div>
  );
}
