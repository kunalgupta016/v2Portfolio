"use client";
import { useEffect, useRef, useState } from "react";

// Lightweight IntersectionObserver hook used to pause expensive render loops
// (Three.js, Matter.js) when their section is off-screen.
export function useInView(options = { threshold: 0, rootMargin: "200px" }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, options);
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [ref, inView];
}
