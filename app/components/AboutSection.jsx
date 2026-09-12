"use client";
import { motion } from "framer-motion";
import TiltCard from "./TiltCard";
import RevealHeading from "./RevealHeading";
import { profile } from "../../lib/data/profile";
import { experience as timeline } from "../../lib/data/experience";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

export default function About() {
  return (
    <section id="about" className="section-padding section-tone-a">
      <div className="container-main">
        {/* Section Title */}
        <RevealHeading
          eyebrow="( 01 ) — Introduction"
          text="About"
          accent="Me"
          style={{
            fontFamily: "var(--font-serif), sans-serif",
            fontSize: "clamp(2rem, 4vw, 2.75rem)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            marginBottom: 48,
          }}
        />

        {/* Two column layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 48,
          }}
          className="about-grid"
        >
          {/* Left - Bio */}
          <motion.div
  variants={fadeUp}
  custom={1}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
  <TiltCard
    className="glass-card"
    tiltIntensity={8}
    scale={1.015}
    style={{
      padding: 32,
      borderRadius: "var(--radius-lg)",
    }}
  >
  {profile.bio.map((paragraph, i) => (
    <p
      key={i}
      style={{
        fontSize: "1.05rem",
        lineHeight: 1.8,
        color: "var(--text-secondary)",
        marginBottom: i === profile.bio.length - 1 ? 32 : 24,
      }}
    >
      {paragraph}
    </p>
  ))}

  {/* Resume Button */}
  <a
    href={profile.resumeUrl}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      padding: "10px 24px",
      borderRadius: "var(--radius-full)",
      border: "1px solid var(--border)",
      color: "var(--text-primary)",
      fontWeight: 500,
      fontSize: "0.9rem",
      transition: "all 0.3s ease",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = "var(--accent)";
      e.currentTarget.style.boxShadow = "0 0 20px var(--accent-dim)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = "var(--border)";
      e.currentTarget.style.boxShadow = "none";
    }}
  >
    📄 View Resume
  </a>
  </TiltCard>
</motion.div>


          {/* Right - Timeline */}
          <motion.div
            variants={fadeUp}
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <TiltCard
              className="glass-card"
              tiltIntensity={6}
              scale={1.01}
              style={{
                padding: 32,
                borderRadius: "var(--radius-lg)",
              }}
            >
            <h3
              style={{
                fontFamily: "var(--font-serif), sans-serif",
                fontSize: "1.25rem",
                fontWeight: 600,
                marginBottom: 24,
                color: "var(--text-primary)",
              }}
            >
              My Journey
            </h3>
            <div style={{ position: "relative", paddingLeft: 24 }}>
              {/* Vertical Line */}
              <div
                style={{
                  position: "absolute",
                  left: 5,
                  top: 8,
                  bottom: 8,
                  width: 1,
                  backgroundColor: "var(--border)",
                }}
              />

              <div
                style={{ display: "flex", flexDirection: "column", gap: 32 }}
              >
                {timeline.map((item, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    custom={i + 3}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    style={{ position: "relative" }}
                  >
                    {/* Dot */}
                    <div
                      style={{
                        position: "absolute",
                        left: -20,
                        top: 6,
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        backgroundColor: "var(--accent)",
                        boxShadow: "0 0 8px var(--accent-glow)",
                      }}
                    />
                    <span
                      style={{
                        fontSize: "0.8rem",
                        color: "var(--accent)",
                        fontWeight: 500,
                        letterSpacing: "0.02em",
                      }}
                    >
                      {item.period}
                    </span>
                    <h4
                      style={{
                        fontSize: "1rem",
                        fontWeight: 600,
                        color: "var(--text-primary)",
                        marginTop: 4,
                      }}
                    >
                      {item.title}{" "}
                      <span
                        style={{ color: "var(--text-muted)", fontWeight: 400 }}
                      >
                        @ {item.org}
                      </span>
                    </h4>
                    <p
                      style={{
                        fontSize: "0.9rem",
                        color: "var(--text-secondary)",
                        marginTop: 4,
                        lineHeight: 1.5,
                      }}
                    >
                      {item.detail}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </section>
  );
}
