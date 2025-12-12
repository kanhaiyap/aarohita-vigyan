// src/components/Projects.jsx
import React from "react";
import { Helmet } from "react-helmet-async";
import SectionHeader from "./SectionHeader";
import { mainProjects, iotProject, smallTiles } from "../data/projects";

export default function Projects() {
  // Build JSON-LD safely from your data
  const itemListElements = mainProjects.map((p, idx) => ({
    "@type": "ListItem",
    position: idx + 1,
    name: p.title,
    url: p.link,
    description: p.desc,
  }));

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Aarohita Vigyan Showcase Projects",
    itemListElement: itemListElements,
  };

  const iotProjectJsonLd = {
    "@context": "https://schema.org",
    "@type": "Project",
    name: iotProject.title,
    description: iotProject.desc,
    keywords: Array.isArray(iotProject.tags) ? iotProject.tags.join(", ") : undefined,
  };

  return (
    <section
      id="projects"
      className="relative z-[2] py-28"
      role="region"
      aria-labelledby="projects-heading"
    >
      {/* SEO head only (no visual changes) */}
      <Helmet>
        <title>AI & IoT Case Studies — Bhojan Mitra, POS, Computer Vision | Aarohita Vigyan</title>
        <meta
          name="description"
          content="Explore Aarohita Vigyan's real-world projects: Bhojan Mitra voice-ordering device, cloud POS & CRM, computer vision healthcare models, and IoT smart city systems. Learn how we build AI + IoT solutions in India."
        />
  <link rel="canonical" href="https://haritaahar.com/#projects" />

        {/* Open Graph */}
        <meta property="og:title" content="AI & IoT Case Studies | Aarohita Vigyan" />
        <meta
          property="og:description"
          content="Explore showcase projects: healthcare computer vision, voice AI POS (Bhojan Mitra), IoT smart city monitoring, and more."
        />
        <meta property="og:type" content="website" />
  <meta property="og:url" content="https://haritaahar.com/#projects" />
  <meta property="og:image" content="https://haritaahar.com/images/logo.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="AI & IoT Case Studies | Aarohita Vigyan" />
        <meta
          name="twitter:description"
          content="Showcase projects including healthcare AI, IoT, voice AI POS and custom web platforms."
        />
  <meta name="twitter:image" content="https://haritaahar.com/images/logo.png" />

        {/* Structured Data */}
        <script type="application/ld+json">{JSON.stringify(itemListJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(iotProjectJsonLd)}</script>
      </Helmet>

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          title="Showcase Projects"
          subtitle="Real-world AI solutions making a difference across industries"
        />

        {/* Main Projects */}
        <div className="grid gap-8 md:grid-cols-2 mb-12" aria-label="Main projects">
          {mainProjects.map((p) => (
            <div
              key={p.title}
              className="card-elevated bg-white border border-slate-200 p-8 rounded-2xl hover-lift"
            >
              <div className="flex items-center mb-6">
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${p.color} rounded-lg flex items-center justify-center mr-4 shadow-md shadow-slate-200/50 ring-1 ring-white/40`}
                  aria-hidden="true"
                >
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <h4 id="projects-heading" className="h3 text-2xl md:text-3xl text-slate-900">
                  {p.title}
                </h4>
              </div>

              <p className="text-slate-700 mb-6 text-lg leading-relaxed">{p.desc}</p>

              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-slate-100 text-slate-700">
                  {p.badge}
                </span>
                <a
                  className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-2 underline-offset-4 hover:underline"
                  href={p.link}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`View ${p.title} on GitHub`}
                  title={`View ${p.title} on GitHub`}
                >
                  View on GitHub
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* IoT Project Feature */}
        <div className="card-elevated bg-white border border-slate-200 p-8 rounded-2xl hover-lift mb-12">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mr-4 shadow-md shadow-slate-200/50 ring-1 ring-white/40" aria-hidden="true">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                />
              </svg>
            </div>
            <h4 className="h3 text-2xl md:text-3xl text-slate-900">{iotProject.title}</h4>
          </div>

          <p className="text-slate-700 mb-6 text-lg leading-relaxed">{iotProject.desc}</p>

          <div className="flex flex-wrap gap-3" aria-label="Project tags">
            {iotProject.tags.map((t) => (
              <span
                key={t}
                className="px-3 py-1 rounded-full text-sm font-medium bg-slate-100 text-slate-700"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Additional Solutions */}
        <h3 className="h3 text-2xl md:text-3xl text-slate-900 mb-8 text-center">
          Additional Solutions We’ve Built
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" aria-label="Additional solutions">
          {smallTiles.map((tile) => (
            <div
              key={tile.title}
              className="card-elevated bg-white border border-slate-200 p-6 rounded-xl text-center hover-lift"
            >
              <div className="text-4xl mb-3" aria-hidden="true">{tile.icon}</div>
              <h4 className="text-slate-900 font-semibold text-xl mb-2">{tile.title}</h4>
              <p className="text-slate-600 text-base leading-relaxed">{tile.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
