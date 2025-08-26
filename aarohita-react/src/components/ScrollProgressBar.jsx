import React, { useEffect, useState, useRef } from "react";

export default function ScrollProgressBar() {
  const [w, setW] = useState(0);
  const raf = useRef(null);
  const reduce = typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const onScroll = () => {
      if (raf.current) return;
      raf.current = requestAnimationFrame(() => {
        const doc = document.documentElement;
        const max = doc.scrollHeight - window.innerHeight;
        const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
        setW(pct);
        raf.current = null;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1.5 bg-transparent z-[60]">
      <div
        className="h-full rounded-r-full"
        style={{
          width: `${w}%`,
          transition: reduce ? "none" : "width 120ms linear",
          backgroundImage: "linear-gradient(90deg, var(--brand), var(--accent))",
          boxShadow: "0 0 16px rgba(37, 99, 235, .25)",
        }}
        aria-hidden="true"
      />
    </div>
  );
}
