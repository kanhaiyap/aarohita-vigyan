import React, { useEffect, useRef, useState } from "react";

export default function CountUp({ start = 0, end = 100, duration = 1200, suffix = "" }) {
  const [val, setVal] = useState(start);
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let obs = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        obs.disconnect();
        const t0 = performance.now();
        const tick = (t) => {
          const p = Math.min(1, (t - t0) / duration);
          // easeOutCubic
          const e = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(start + (end - start) * e));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.35 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [start, end, duration]);

  return (
    <span ref={ref}>
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}
