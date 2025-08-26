// src/components/Services.jsx
import React from "react";
import SectionHeader from "./SectionHeader";

const services = [
  {
    title: "Web & App Development",
    desc: "Modern, responsive websites and custom dashboards with AI integration tailored to your business goals.",
    g: "from-blue-500 to-cyan-500",
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"/>
      </svg>
    ),
  },
  {
    title: "CRM & POS Systems",
    desc: "Custom-built AI-powered solutions like Bhojan Mitra for restaurant and business automation.",
    g: "from-green-500 to-emerald-500",
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
      </svg>
    ),
  },
  {
    title: "AI/ML Solutions",
    desc: "Predictive models, NLP, computer vision, and decision intelligence pipelines for smart automation.",
    g: "from-purple-500 to-pink-500",
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707"/>
      </svg>
    ),
  },
  {
    title: "IoT Automation",
    desc: "From smart city monitoring to intelligent systems — where hardware meets AI innovation.",
    g: "from-orange-500 to-red-500",
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section id="services" className="relative z-[2] py-28">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          title="Our AI-Powered Services"
          subtitle="Cutting-edge solutions powered by artificial intelligence and IoT technology"
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <div
              key={s.title}
              className="
                group card-elevated bg-white border border-slate-200
                rounded-2xl p-8 hover-lift
              "
            >
              <div
                className={`w-16 h-16 bg-gradient-to-r ${s.g} rounded-xl flex items-center justify-center mb-6
                shadow-md shadow-slate-200/40 ring-1 ring-white/30`}
              >
                {s.icon}
              </div>

              <h3 className="h3 text-2xl md:text-3xl text-slate-900 mb-3">
                {s.title}
              </h3>
              <p className="text-slate-700 text-lg leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
