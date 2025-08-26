// src/components/Hero.jsx
import React from "react";

export default function Hero() {
  const onNavClick = (e, id) => {
    e.preventDefault();
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-20">
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
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200 bg-white/80 backdrop-blur text-xs font-medium text-slate-600 mb-5">
          <span className="h-2 w-2 rounded-full bg-blue-500" />
          Aarohita Vigyan — AI • IoT • Cloud
        </div>

        {/* Bigger, romanticised yet techy title */}
        <h1 className="h1 text-5xl md:text-7xl mb-5 text-slate-900 tracking-tight leading-[1.05]">
          The Future of{" "}
          <span className="tech-accent romance-accent">
            AI &amp; IoT
            <span aria-hidden className="accent-bg" />
          </span>
        </h1>

        <p className="mb-9 max-w-3xl mx-auto text-slate-600 text-lg md:text-xl leading-relaxed">
          We craft reliable, scalable solutions—so your business can move faster
          with intelligence, not complexity.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="#services" onClick={(e) => onNavClick(e, "#services")} className="btn btn-primary text-base md:text-lg">
            🚀 Explore Solutions
          </a>
          <a href="#projects" onClick={(e) => onNavClick(e, "#projects")} className="btn btn-ghost text-base md:text-lg">
            🎥 Watch Demo
          </a>
        </div>

        {/* Tech badges */}
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
