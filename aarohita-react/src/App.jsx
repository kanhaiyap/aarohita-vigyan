// src/App.jsx
import React, { useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import GeometricBackground from "./components/GeometricBackground";
import ScrollStringLogo from "./components/ScrollStringLogo";

// NEW (engagement widgets)
import ScrollProgressBar from "./components/ScrollProgressBar";
import BackToTop from "./components/BackToTop";
import FloatingCTA from "./components/FloatingCTA";
import CursorGlow from "./components/CursorGlow";
import LogosMarquee from "./components/LogosMarquee";

export default function App() {
  const year = useMemo(() => new Date().getFullYear(), []);
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-app-light text-strong font-sans relative">
      {/* Global chrome */}
      <ScrollProgressBar />
      <CursorGlow />
      <GeometricBackground />
      <ScrollStringLogo />

      {/* Site UI */}
      <Navbar open={open} setOpen={setOpen} />
      <main>
        <Hero />
        <About />
        <Services />

        {/* Engaging marquee between sections */}
        <LogosMarquee />

        <Projects />
        <Contact />
      </main>
      <Footer year={year} />

      {/* Sticky CTAs */}
      <FloatingCTA />
      <BackToTop />
    </div>
  );
}
