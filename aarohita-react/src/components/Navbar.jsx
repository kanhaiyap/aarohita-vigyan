// src/components/Navbar.jsx (compact height)
import React, { useEffect, useRef } from "react";

const items = [
  { id: "#about", label: "About" },
  { id: "#services", label: "Services" },
  { id: "#projects", label: "Projects" },
  { id: "#contact", label: "Contact" },
];

export default function Navbar({ open, setOpen }) {
  const logoRef = useRef(null);
  const ZOOM = 1.5;

  const onNavClick = (e, id) => {
    e.preventDefault();
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduce) return;
    let lastY = window.scrollY, angle = 0, vel = 0, raf = null;
    const step = () => {
      const y = window.scrollY, dy = y - lastY; lastY = y;
      vel += Math.max(-8, Math.min(8, dy * 0.25));
      vel *= 0.9; angle = Math.max(-12, Math.min(12, angle + vel));
      const bob = Math.sin(y / 40) * 2;
      if (logoRef.current) logoRef.current.style.transform = `translateY(${bob}px) rotate(${angle}deg)`;
      raf = null;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(step); };
    step();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); if (raf) cancelAnimationFrame(raf); if (logoRef.current) logoRef.current.style.transform = ""; };
  }, []);

  return (
    <header className="fixed top-0 w-full z-50 border-b border-slate-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      {/* ↓ py-2 instead of py-4 */}
      <nav className="max-w-7xl mx-auto px-6 py-2 md:py-3">
        <div className="flex items-center justify-between">
          {/* Brand + animated logo (no circle, smaller wrapper) */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              {/* ↓ shorter string */}
              <span aria-hidden className="absolute -top-9 left-1/2 -translate-x-1/2 w-px h-9 bg-slate-300" />
              {/* ↓ 72px wrapper instead of 96px */}
              <div
                ref={logoRef}
                className="relative w-[72px] h-[72px] origin-top rounded-full overflow-hidden will-change-transform"
                style={{ filter: "drop-shadow(0 6px 16px rgba(2,6,23,.18))" }}
                title="Aarohita Vigyan"
              >
                <img
                  src="/images/logo.png"
                  alt="Aarohita Vigyan Logo"
                  className="absolute left-1/2 top-1/2 w-full h-full object-cover rounded-full select-none pointer-events-none"
                  style={{ transform: `translate(-50%, -50%) scale(${ZOOM})` }}
                  draggable="false"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    const fb = e.currentTarget.nextElementSibling;
                    if (fb) fb.classList.remove("hidden");
                  }}
                />
                <span className="hidden absolute inset-0 flex items-center justify-center text-slate-900 text-lg font-semibold">AV</span>
              </div>
            </div>

            {/* ↓ slightly smaller brand text */}
            <span className="text-xl font-bold text-slate-900">Aarohita Vigyan</span>
          </div>

          {/* Desktop nav (tighter spacing) */}
          <div className="hidden md:flex space-x-6">
            {items.map((i) => (
              <a
                key={i.id}
                href={i.id}
                onClick={(e) => onNavClick(e, i.id)}
                className="text-slate-700 hover:text-slate-900 transition-colors"
              >
                {i.label}
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/80 border border-slate-200 text-slate-700"
            onClick={() => setOpen((v) => !v)}
            aria-label="Open menu"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile dropdown */}
        {open && (
          <div className="md:hidden mt-2 border-t border-slate-200 pt-2 space-y-1">
            {items.map((i) => (
              <a
                key={i.id}
                href={i.id}
                onClick={(e) => onNavClick(e, i.id)}
                className="block px-2 py-2 rounded-lg text-slate-700 hover:bg-slate-100"
              >
                {i.label}
              </a>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
