import React from "react";

const items = ["React", "Python", "Node.js", "AWS", "GCP", "Azure", "TensorFlow", "PyTorch", "PostgreSQL", "Docker"];

export default function LogosMarquee() {
  return (
    <div className="relative z-[2] py-10 select-none">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-white via-transparent to-white [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]" />
      <div className="overflow-hidden">
        <ul className="flex gap-6 animate-[marquee_20s_linear_infinite] whitespace-nowrap will-change-transform">
          {[...items, ...items].map((t, i) => (
            <li key={i} className="inline-flex px-4 py-2 rounded-full border border-slate-200 bg-white text-slate-700 text-base">
              {t}
            </li>
          ))}
        </ul>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          ul { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
