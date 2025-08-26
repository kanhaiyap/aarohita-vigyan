// src/components/About.jsx
import React from "react";
import SectionHeader from "./SectionHeader";
import CountUp from "../components/CountUp";

export default function About() {
  const stats = [
    { end: 50, suffix: "+", label: "Projects Delivered", color: "text-blue-700" },
    { end: 25, suffix: "+", label: "Happy Clients", color: "text-emerald-700" },
    { end: 5,  suffix: "+", label: "Industries", color: "text-violet-700" },
    { end: 99, suffix: "%", label: "Success Rate", color: "text-orange-700" },
  ];

  return (
    <section id="about" className="relative z-[2] py-28">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          title="About Aarohita Vigyan"
          subtitle="Driven by innovation • Built for impact • Committed to affordability"
        />

        {/* Main blocks */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Who We Are */}
          <div className="card-elevated bg-white rounded-2xl p-8 hover-lift border border-slate-200">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mr-4 bg-blue-50 ring-1 ring-blue-100">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="h3 text-2xl md:text-3xl text-slate-900">Who We Are</h3>
            </div>

            <div className="space-y-4 text-slate-700 text-lg leading-relaxed">
              <p>
                Aarohita Vigyan Pvt. Ltd. is a{" "}
                <span className="font-semibold text-blue-700">next-generation AI &amp; IoT solutions company</span>{" "}
                focused on solving real-world problems across industries.
              </p>

              <div className="p-4 rounded-lg border border-blue-100 bg-blue-50">
                <p className="font-medium text-slate-800">
                  Industries: Retail • Restaurants • Insurance • Healthcare • Smart Cities
                </p>
              </div>

              <p>
                Our solutions blend <span className="font-semibold text-blue-700">technology and usability</span>—helping
                businesses grow faster with automation and intelligent systems.
              </p>
            </div>
          </div>

          {/* Our Vision */}
          <div className="card-elevated bg-white rounded-2xl p-8 hover-lift border border-slate-200">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mr-4 bg-violet-50 ring-1 ring-violet-100">
                <svg className="w-6 h-6 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="h3 text-2xl md:text-3xl text-slate-900">Our Vision</h3>
            </div>

            <div className="space-y-4 text-slate-700 text-lg leading-relaxed">
              <p>
                To be a catalyst in the digital transformation of everyday operations—bringing{" "}
                <span className="font-semibold text-violet-700">affordable intelligence</span> to every corner of
                business and society.
              </p>

              <div className="p-6 rounded-lg border border-violet-100 bg-violet-50">
                <div className="flex items-center mb-3">
                  <span className="text-2xl mr-3" aria-hidden="true">🌸</span>
                  <h4 className="font-bold text-violet-800 text-xl">Bhojan Mitra</h4>
                </div>
                <p className="text-slate-800">
                  Our flagship product revolutionizes restaurant billing through a{" "}
                  <span className="font-semibold">flower-vase-shaped voice-enabled ordering system</span>—a beautiful
                  mix of form and function.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats (animated CountUp) */}
        <div className="grid md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div
              key={s.label}
              className="text-center p-6 card-elevated bg-white rounded-xl hover-lift border border-slate-200"
            >
              <div className={`mb-2 text-5xl md:text-6xl font-extrabold ${s.color}`}>
                <CountUp end={s.end} suffix={s.suffix} />
              </div>
              <div className="text-slate-700 text-lg">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
