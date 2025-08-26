import React, { useEffect, useState } from "react";

export default function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 360);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-[60] w-12 h-12 rounded-full bg-slate-900 text-white shadow-lg hover:opacity-90 focus:outline-none focus:ring-4"
      style={{ boxShadow: "0 12px 30px rgba(2,6,23,0.25)" }}
      aria-label="Back to top"
      title="Back to top"
    >
      ↑
    </button>
  );
}
