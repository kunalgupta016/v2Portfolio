"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../../lib/hooks/usePrefersReducedMotion";

// Wraps a button/link so it gently pulls toward the cursor on hover, then
// springs back on leave — the "magnetic button" touch common on Awwwards
// sites. A no-op passthrough under prefers-reduced-motion.
export default function Magnetic({ children, strength = 0.35 }) {
  const ref = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) return children;

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    setOffset({ x: relX * strength, y: relY * strength });
  };

  const reset = () => setOffset({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 150, damping: 12, mass: 0.2 }}
      style={{ display: "inline-block" }}
    >
      {children}
    </motion.div>
  );
}
