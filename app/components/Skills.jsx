"use client";
import { motion } from "framer-motion";
import RevealHeading from "./RevealHeading";
import { skillCategories } from "../../lib/data/skills";

export default function Skills() {
  return (
    <section id="skills" className="section-padding section-tone-b">
      <div className="container-main">
        <RevealHeading
          eyebrow="( 02 ) — Capabilities"
          text="Skills &"
          accent="Tools"
          style={{
            fontFamily: "var(--font-serif), sans-serif",
            fontSize: "clamp(2rem, 4vw, 2.75rem)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            marginBottom: 48,
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
            >
              <h3
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: 16,
                }}
              >
                {category.title}
              </h3>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 12,
                }}
              >
                {category.skills.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.3,
                      delay: catIndex * 0.1 + i * 0.04,
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "10px 18px",
                      borderRadius: "var(--radius-full)",
                      backgroundColor: "var(--bg-surface)",
                      border: "1px solid var(--border)",
                      fontSize: "0.875rem",
                      color: "var(--text-secondary)",
                      fontWeight: 500,
                      cursor: "default",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--accent)";
                      e.currentTarget.style.color = "var(--text-primary)";
                      e.currentTarget.style.backgroundColor =
                        "var(--bg-elevated)";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "var(--border)";
                      e.currentTarget.style.color = "var(--text-secondary)";
                      e.currentTarget.style.backgroundColor =
                        "var(--bg-surface)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 20,
                        height: 20,
                        borderRadius: skill.iconBg ? "50%" : 0,
                        backgroundColor: skill.iconBg || "transparent",
                        padding: skill.iconBg ? 2 : 0,
                      }}
                    >
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        width={skill.iconBg ? 14 : 20}
                        height={skill.iconBg ? 14 : 20}
                        style={{ objectFit: "contain" }}
                        loading="lazy"
                      />
                    </span>
                    {skill.name}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
