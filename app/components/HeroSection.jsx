"use client";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { smoothScrollToHash } from "../../lib/smoothScrollTo";
import { usePrefersReducedMotion } from "../../lib/hooks/usePrefersReducedMotion";
import Magnetic from "./Magnetic";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

const roles = ["Full Stack Developer", "Game Creator", "Problem Solver"];
const NAME = "Kunal Gupta";

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const sectionRef = useRef(null);
  const glowRef = useRef(null);
  const nameRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Typewriter for the role line.
  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout;

    if (!isDeleting && text === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    } else {
      timeout = setTimeout(
        () => {
          setText(
            isDeleting
              ? currentRole.substring(0, text.length - 1)
              : currentRole.substring(0, text.length + 1)
          );
        },
        isDeleting ? 40 : 80
      );
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex]);

  // Kinetic name reveal — split into characters and stagger them in.
  useEffect(() => {
    if (!nameRef.current) return;
    const chars = nameRef.current.querySelectorAll(".hero-char");
    if (prefersReducedMotion) {
      gsap.set(chars, { opacity: 1, y: 0 });
      return;
    }
    gsap.fromTo(
      chars,
      { opacity: 0, y: 40, rotateX: -60 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
        stagger: 0.035,
        delay: 0.3,
      }
    );
  }, [prefersReducedMotion]);

  // Scroll parallax — background glow and 3D layer drift at different
  // speeds than the foreground text as the user scrolls past the hero.
  useEffect(() => {
    if (prefersReducedMotion) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.to(glowRef.current, {
        yPercent: 40,
        scale: 1.15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".hero-content", {
        yPercent: -25,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      id="home"
      ref={sectionRef}
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        padding: "0 24px",
      }}
    >
      {/* 3D / gradient background layer */}
      <HeroScene />

      {/* Soft radial glow (parallax layer) */}
      <div
        ref={glowRef}
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, var(--accent-dim) 0%, transparent 70%)",
          pointerEvents: "none",
          filter: "blur(60px)",
        }}
      />

      <div
        className="hero-content"
        style={{
          textAlign: "center",
          position: "relative",
          zIndex: 1,
          maxWidth: 700,
          margin: "0 auto",
        }}
      >
        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="eyebrow"
          style={{ justifyContent: "center", marginBottom: 20 }}
        >
          Portfolio / 2026
        </motion.div>

          {/* Kinetic Name */}
          <h1
            ref={nameRef}
            style={{
              fontFamily: "var(--font-serif), serif",
              fontSize: "clamp(2.75rem, 7vw, 5.5rem)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              marginBottom: 16,
              perspective: 400,
            }}
          >
            {NAME.split("").map((char, i) => (
              <span
                key={i}
                className="hero-char"
                style={{
                  display: "inline-block",
                  color: i >= 6 ? "var(--accent)" : "var(--text-primary)",
                  whiteSpace: "pre",
                }}
              >
                {char}
              </span>
            ))}
          </h1>

          {/* Typewriter */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            style={{
              fontSize: "1.25rem",
              color: "var(--text-secondary)",
              marginBottom: 40,
              minHeight: "1.8em",
            }}
          >
            {text}
            <span
              style={{
                display: "inline-block",
                width: 2,
                height: "1.2em",
                backgroundColor: "var(--accent)",
                marginLeft: 2,
                verticalAlign: "text-bottom",
                animation: "blink 1s step-end infinite",
              }}
            />
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{
              display: "flex",
              gap: 16,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Magnetic>
              <motion.a
                href="#projects"
                onClick={(e) => smoothScrollToHash(e, "#projects")}
                whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(255,90,54,0.3)" }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: "12px 28px",
                  borderRadius: "var(--radius-full)",
                  backgroundColor: "var(--accent)",
                  color: "#0A0A0B",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  display: "inline-block",
                }}
              >
                View Projects
              </motion.a>
            </Magnetic>
            <Magnetic>
              <motion.a
                href="#contact"
                onClick={(e) => smoothScrollToHash(e, "#contact")}
                whileHover={{ y: -2, borderColor: "var(--accent)", color: "var(--accent)" }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: "12px 28px",
                  borderRadius: "var(--radius-full)",
                  border: "1px solid var(--border)",
                  color: "var(--text-primary)",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  display: "inline-block",
                }}
              >
                Get in Touch
              </motion.a>
            </Magnetic>
          </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          zIndex: 1,
        }}
      >
        <span
          style={{
            fontSize: "0.75rem",
            color: "var(--text-muted)",
            letterSpacing: "0.1em",
          }}
        >
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          style={{
            width: 1,
            height: 24,
            backgroundColor: "var(--text-muted)",
          }}
        />
      </motion.div>

    </section>
  );
}
