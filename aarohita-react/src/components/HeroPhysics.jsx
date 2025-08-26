// src/components/HeroPhysics.jsx
import React, { useEffect, useRef } from "react";
import Matter from "matter-js";

/**
 * A lightweight, gravity-driven background using Matter.js
 * - Bouncy circles drop and collide with walls
 * - Rendered on a transparent canvas behind your hero content
 * - Subtle colors for a professional light UI
 */
export default function HeroPhysics() {
  const containerRef = useRef(null);
  const engineRef = useRef(null);
  const renderRef = useRef(null);
  const runnerRef = useRef(null);
  const wallsRef = useRef({});

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Engine + Renderer
    const engine = Matter.Engine.create({ gravity: { y: 1 } });
    engineRef.current = engine;

    const render = Matter.Render.create({
      element: container,
      engine,
      options: {
        width,
        height,
        background: "transparent",
        wireframes: false,
        pixelRatio: window.devicePixelRatio || 1,
      },
    });
    renderRef.current = render;

    // Static boundaries (slightly outside)
    const wallThickness = 80;
    const walls = {
      left: Matter.Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height * 2, {
        isStatic: true,
        render: { fillStyle: "transparent" },
      }),
      right: Matter.Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height * 2, {
        isStatic: true,
        render: { fillStyle: "transparent" },
      }),
      bottom: Matter.Bodies.rectangle(width / 2, height + wallThickness / 2, width + wallThickness, wallThickness, {
        isStatic: true,
        render: { fillStyle: "transparent" },
      }),
      top: Matter.Bodies.rectangle(width / 2, -wallThickness / 2, width + wallThickness, wallThickness, {
        isStatic: true,
        render: { fillStyle: "transparent" },
      }),
    };
    wallsRef.current = walls;

    Matter.World.add(engine.world, [walls.left, walls.right, walls.bottom, walls.top]);

    // Palette (subtle, brand-friendly)
    const palette = [
      "rgba(37, 99, 235, 0.25)",   // brand blue
      "rgba(124, 58, 237, 0.20)",  // violet
      "rgba(6, 182, 212, 0.18)",   // cyan
      "rgba(59, 130, 246, 0.20)",  // blue-500
      "rgba(99, 102, 241, 0.18)",  // indigo-500
    ];

    // Spawn a circle
    const spawnBall = (x, y) => {
      const r = Math.floor(Math.random() * 16) + 14; // 14–30
      const color = palette[Math.floor(Math.random() * palette.length)];
      const ball = Matter.Bodies.circle(x, y, r, {
        restitution: 0.6,
        friction: 0.02,
        frictionAir: 0.02,
        render: { fillStyle: color },
      });
      Matter.World.add(engine.world, ball);
    };

    // Initial population (from random x positions)
    for (let i = 0; i < 18; i++) {
      spawnBall(Math.random() * width, (Math.random() * height) / 3);
    }

    // Periodically add a subtle trickle from the top
    const interval = setInterval(() => {
      spawnBall(Math.random() * width, -20);
    }, 1200);

    // Start engine
    const runner = Matter.Runner.create();
    runnerRef.current = runner;
    Matter.Render.run(render);
    Matter.Runner.run(runner, engine);

    // Handle resize
    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;

      render.canvas.width = w * (window.devicePixelRatio || 1);
      render.canvas.height = h * (window.devicePixelRatio || 1);
      render.options.width = w;
      render.options.height = h;

      // Move walls to new size
      Matter.Body.setPosition(walls.left, { x: -wallThickness / 2, y: h / 2 });
      Matter.Body.setPosition(walls.right, { x: w + wallThickness / 2, y: h / 2 });
      Matter.Body.setPosition(walls.bottom, { x: w / 2, y: h + wallThickness / 2 });
      Matter.Body.setPosition(walls.top, { x: w / 2, y: -wallThickness / 2 });
    };

    const ro = new ResizeObserver(onResize);
    ro.observe(container);

    // Clean up
    return () => {
      clearInterval(interval);
      ro.disconnect();
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      Matter.World.clear(engine.world, false);
      Matter.Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
    };
  }, []);

  return (
    // Pointer events off so buttons/links in hero remain clickable
    <div ref={containerRef} className="absolute inset-0 -z-10 pointer-events-none" />
  );
}
