"use client";
import { useEffect, useRef } from "react";

// A small, contained Matter.js easter egg — draggable shapes bouncing in a
// bounded box. Not used for any core layout or critical-path animation, per
// the brief's scoping for Matter.js.
const WIDTH = 320;
const HEIGHT = 380;
const COLORS = ["#A78BFA", "#4ade80", "#fbbf24", "#f87171", "#60a5fa"];

export default function PhysicsPlayground() {
  const containerRef = useRef(null);

  useEffect(() => {
    let engine, render, runner;
    let MatterRef;
    let disposed = false;

    import("matter-js").then((Matter) => {
      if (disposed || !containerRef.current) return;
      MatterRef = Matter;
      const { Engine, Render, Runner, World, Bodies, MouseConstraint, Mouse } =
        Matter;

      engine = Engine.create();
      engine.gravity.y = 0.6;

      render = Render.create({
        element: containerRef.current,
        engine,
        options: {
          width: WIDTH,
          height: HEIGHT,
          background: "transparent",
          wireframes: false,
        },
      });

      const wallOptions = { isStatic: true, render: { visible: false } };
      const walls = [
        Bodies.rectangle(WIDTH / 2, -10, WIDTH, 20, wallOptions),
        Bodies.rectangle(WIDTH / 2, HEIGHT + 10, WIDTH, 20, wallOptions),
        Bodies.rectangle(-10, HEIGHT / 2, 20, HEIGHT, wallOptions),
        Bodies.rectangle(WIDTH + 10, HEIGHT / 2, 20, HEIGHT, wallOptions),
      ];

      const shapes = Array.from({ length: 14 }, (_, i) => {
        const x = 40 + Math.random() * (WIDTH - 80);
        const y = 20 + Math.random() * 100;
        const color = COLORS[i % COLORS.length];
        return Math.random() > 0.5
          ? Bodies.circle(x, y, 12 + Math.random() * 10, {
              restitution: 0.6,
              friction: 0.15,
              render: { fillStyle: color },
            })
          : Bodies.rectangle(x, y, 24, 24, {
              restitution: 0.5,
              friction: 0.2,
              render: { fillStyle: color },
            });
      });

      World.add(engine.world, [...walls, ...shapes]);

      const mouse = Mouse.create(render.canvas);
      const mouseConstraint = MouseConstraint.create(engine, {
        mouse,
        constraint: { stiffness: 0.2, render: { visible: false } },
      });
      World.add(engine.world, mouseConstraint);
      render.mouse = mouse;

      runner = Runner.create();
      Runner.run(runner, engine);
      Render.run(render);
    });

    return () => {
      disposed = true;
      if (render) {
        MatterRef?.Render?.stop?.(render);
        render.canvas?.remove();
      }
      if (runner) MatterRef?.Runner?.stop?.(runner);
      if (engine) MatterRef?.Engine?.clear?.(engine);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <div
        ref={containerRef}
        style={{
          width: WIDTH,
          height: HEIGHT,
          borderRadius: 12,
          overflow: "hidden",
          border: "1px solid rgba(255, 90, 54, 0.3)",
        }}
      />
      <span style={{ fontSize: "0.75rem", color: "#888" }}>
        Drag the shapes around
      </span>
    </div>
  );
}
