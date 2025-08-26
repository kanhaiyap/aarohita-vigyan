import React, { useEffect, useRef } from "react";

export default function CursorGlow() {
  const dot = useRef(null);
  const reduce = typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (reduce) return;
    const el = dot.current;
    if (!el) return;
    let x = window.innerWidth / 2, y = window.innerHeight / 2;
    const onMove = (e) => {
      x = e.clientX; y = e.clientY;
      el.style.transform = `translate(${x - 150}px, ${y - 150}px)`; // center 300px blob
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduce]);

  if (reduce) return null;

  return (
    <div
      ref={dot}
      aria-hidden="true"
      className="fixed top-0 left-0 w-[300px] h-[300px] rounded-full pointer-events-none z-[1]"
      style={{
        background: "radial-gradient(120px 120px at center, rgba(37,99,235,0.22), transparent 60%)",
        filter: "blur(10px)",
        mixBlendMode: "multiply",
      }}
    />
  );
}
