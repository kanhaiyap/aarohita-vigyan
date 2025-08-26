// src/components/ScrollStringLogo.jsx
import React, { useEffect, useRef } from "react";

export default function ScrollStringLogo() {
  const wrapRef = useRef(null);   // moves the logo badge
  const stringRef = useRef(null); // stretches the vertical string

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduce) return;

    let minY = 80;                                   // top offset
    let maxY = Math.max(140, window.innerHeight - 140); // bottom limit inside viewport
    let targetY = minY;
    let currentY = minY;
    let raf = null;

    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

    const apply = () => {
      if (!wrapRef.current || !stringRef.current) return;
      wrapRef.current.style.transform = `translateY(${currentY}px)`;
      stringRef.current.style.height = `${currentY + 24}px`; // keep line connected
    };

    const tick = () => {
      // smooth lerp toward target
      currentY += (targetY - currentY) * 0.15;
      if (Math.abs(targetY - currentY) < 0.1) {
        currentY = targetY;
        raf = null;
      } else {
        raf = requestAnimationFrame(tick);
      }
      apply();
    };

    const onScroll = () => {
      // parallax feel: move ~15% of scroll amount, clamped to the rail
      targetY = clamp(minY + window.scrollY * 0.5, minY, maxY);
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onResize = () => {
      maxY = Math.max(140, window.innerHeight - 140);
      targetY = clamp(targetY, minY, maxY);
      currentY = clamp(currentY, minY, maxY);
      apply();
    };

    // init
    onResize();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      className="fixed left-6 top-0 h-screen z-[45] pointer-events-none select-none"
      style={{ left: "max(1.5rem, env(safe-area-inset-left))" }}
      aria-hidden="true"
    >
      {/* vertical string (height updated via JS) */}
      <div
        ref={stringRef}
        className="absolute left-7 top-0 w-px bg-gradient-to-b from-slate-300 to-slate-400"
        style={{ height: 120 }}
      />

      {/* logo badge wrapper (translated via JS) */}
      <div
        ref={wrapRef}
        className="absolute -left-1 will-change-transform"
        style={{ transform: "translateY(120px)" }}
      >
        <div className="relative pointer-events-auto">
          <div className="w-12 h-12 rounded-full bg-white shadow-lg ring-1 ring-slate-200 overflow-hidden flex items-center justify-center">
            <img src="/images/logo.png" alt="Aarohita Vigyan" className="w-10 h-10 object-cover" />
          </div>
          {/* small tail to connect to the string */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-4 h-4 w-px bg-slate-400" />
        </div>
      </div>
    </div>
  );
}
