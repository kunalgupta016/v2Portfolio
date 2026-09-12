"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "../../lib/hooks/usePrefersReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function splitWords(str) {
  return str.split(" ").filter(Boolean);
}

// Staged, word-by-word GSAP reveal for section headings — masked words slide
// up into place as the heading scrolls into view. Falls back to a static,
// fully-visible heading under prefers-reduced-motion.
export default function RevealHeading({
  text,
  accent,
  style,
  as: Tag = "h2",
  eyebrow,
}) {
  const ref = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!ref.current) return;
    const words = ref.current.querySelectorAll(".reveal-word-inner");

    if (prefersReducedMotion) {
      gsap.set(words, { yPercent: 0, opacity: 1 });
      return;
    }

    const anim = gsap.fromTo(
      words,
      { yPercent: 110, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.05,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
        },
      }
    );

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, [prefersReducedMotion]);

  const textWords = splitWords(text);
  const accentWords = accent ? splitWords(accent) : [];

  return (
    <>
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <Tag ref={ref} style={style}>
        {textWords.map((w, i) => (
        <span
          key={`t-${i}`}
          style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}
        >
          <span className="reveal-word-inner" style={{ display: "inline-block" }}>
            {w}&nbsp;
          </span>
        </span>
      ))}
      {accentWords.length > 0 && (
        <span className="gradient-text">
          {accentWords.map((w, i) => (
            <span
              key={`a-${i}`}
              style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}
            >
              <span className="reveal-word-inner" style={{ display: "inline-block" }}>
                {w}
                {i < accentWords.length - 1 ? " " : ""}
              </span>
            </span>
          ))}
        </span>
        )}
      </Tag>
    </>
  );
}
