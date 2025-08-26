// src/components/FloatingCTA.jsx
import React, { useEffect, useRef, useState } from "react";

export default function FloatingCTA() {
  const ref = useRef(null);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      if (!hover) return;
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [hover]);

  const goContact = (e) => {
    e.preventDefault();
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="
        fixed z-[80] pointer-events-none
        left-6 bottom-6
        md:left-8 md:bottom-8
      "
      /* keeps it clear of iOS safe areas */
      style={{
        left: "max(1.5rem, env(safe-area-inset-left))",
        bottom: "max(1.5rem, env(safe-area-inset-bottom))",
      }}
    >
      <a
        href="#contact"
        onClick={goContact}
        ref={ref}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => {
          setHover(false);
          if (ref.current) ref.current.style.transform = "translate(0,0)";
        }}
        className="
          pointer-events-auto inline-flex items-center gap-2
          px-5 py-3 rounded-full font-medium
          text-white shadow-lg
          ring-1 ring-white/50 border border-slate-300/60
          hover:opacity-95 focus:outline-none focus:ring-4
        "
        /* gradient with fallbacks so it never goes transparent */
        style={{
          backgroundImage:
            "linear-gradient(90deg, var(--brand, #2563eb), var(--accent, #7c3aed))",
          boxShadow: "0 14px 38px rgba(37,99,235,.35)",
        }}
      >
        <span>Book a Free Demo</span>
        <span aria-hidden>→</span>
      </a>
    </div>
  );
}
