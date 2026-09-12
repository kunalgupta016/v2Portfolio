"use client";
import { motion } from "framer-motion";
import RevealHeading from "./RevealHeading";
import { achievements } from "../../lib/data/achievements";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.06, ease: "easeOut" },
  }),
};

export default function Achievements() {
  return (
    <section id="achievements" className="section-padding section-tone-a">
      <div className="container-main">
        <RevealHeading
          eyebrow="( 03 ) — Milestones"
          text="Achievements &"
          accent="Certifications"
          style={{
            fontFamily: "var(--font-serif), sans-serif",
            fontSize: "clamp(2rem, 4vw, 2.75rem)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            marginBottom: 16,
          }}
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          style={{
            fontSize: "1rem",
            color: "var(--text-secondary)",
            marginBottom: 40,
            maxWidth: 500,
          }}
        >
          Milestones, certifications, and experiences that shaped my journey.
        </motion.p>

        <div className="eyebrow" style={{ marginBottom: 0 }}>
          Scroll sideways →
        </div>

        <div
          style={{
            display: "flex",
            gap: 16,
            overflowX: "auto",
            padding: "24px 4px 24px",
            scrollSnapType: "x mandatory",
            marginTop: 12,
          }}
          className="achievements-strip"
        >
          {achievements.map((item, i) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="glass-card"
              style={{
                padding: 24,
                display: "flex",
                flexDirection: "column",
                gap: 12,
                minWidth: 260,
                maxWidth: 260,
                flexShrink: 0,
                scrollSnapAlign: "start",
              }}
            >
              <span style={{ fontSize: "1.75rem" }}>{item.icon}</span>
              <h3
                style={{
                  fontFamily: "var(--font-serif), sans-serif",
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.6,
                }}
              >
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .achievements-strip {
          scrollbar-width: thin;
          scrollbar-color: var(--border) transparent;
        }
        .achievements-strip::-webkit-scrollbar {
          height: 6px;
        }
        .achievements-strip::-webkit-scrollbar-thumb {
          background: var(--border);
          border-radius: var(--radius-full);
        }
      `}</style>
    </section>
  );
}
