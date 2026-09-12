"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { usePrefersReducedMotion } from "../../lib/hooks/usePrefersReducedMotion";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const timer = setTimeout(
      () => setIsLoading(false),
      prefersReducedMotion ? 0 : 1800
    );

    const skip = (e) => {
      if (e.type === "keydown" && e.key !== "Enter" && e.key !== " ") return;
      setIsLoading(false);
    };
    window.addEventListener("keydown", skip);
    window.addEventListener("click", skip);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("click", skip);
    };
  }, [prefersReducedMotion]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9998,
            backgroundColor: "var(--bg)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
            cursor: "pointer",
          }}
        >
          {/* Name reveal */}
          <motion.h1
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            style={{
              fontFamily: "var(--font-serif), sans-serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "var(--text-primary)",
            }}
          >
            Kunal<span style={{ color: "var(--accent)" }}>.</span>
          </motion.h1>

          {/* Loading bar */}
          <div
            style={{
              width: 120,
              height: 2,
              backgroundColor: "var(--border)",
              borderRadius: "var(--radius-full)",
              overflow: "hidden",
            }}
          >
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.3, delay: 0.35, ease: "easeInOut" }}
              style={{
                height: "100%",
                backgroundColor: "var(--accent)",
                borderRadius: "var(--radius-full)",
              }}
            />
          </div>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            style={{
              fontSize: "0.7rem",
              color: "var(--text-muted)",
              letterSpacing: "0.05em",
            }}
          >
            click, tap, or press enter to skip
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
