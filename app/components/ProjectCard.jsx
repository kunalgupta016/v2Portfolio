"use client";
import { motion } from "framer-motion";

export default function ProjectCard({ project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="glass-card"
      style={{
        padding: 24,
        display: "flex",
        flexDirection: "column",
        gap: 16,
        cursor: "default",
      }}
    >
      {/* Header: Category + Title */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span
          style={{
            fontSize: "1.25rem",
          }}
        >
          {project.category === "webapp" ? "🌐" : "🎮"}
        </span>
        <h3
          style={{
            fontFamily: "var(--font-sora), sans-serif",
            fontSize: "1.15rem",
            fontWeight: 600,
            color: "var(--text-primary)",
          }}
        >
          {project.title}
        </h3>
      </div>

      {/* Description */}
      <p
        style={{
          fontSize: "0.9rem",
          color: "var(--text-secondary)",
          lineHeight: 1.6,
          flex: 1,
        }}
      >
        {project.description}
      </p>

      {/* Tech Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {project.tech.map((tech) => (
          <span
            key={tech}
            style={{
              fontSize: "0.75rem",
              padding: "4px 12px",
              borderRadius: "var(--radius-full)",
              backgroundColor: "var(--accent-dim)",
              color: "var(--accent)",
              fontWeight: 500,
            }}
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Link */}
      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: "0.85rem",
            color: "var(--text-muted)",
            fontWeight: 500,
            transition: "color 0.2s, gap 0.2s",
            width: "fit-content",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--accent)";
            e.currentTarget.style.gap = "10px";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--text-muted)";
            e.currentTarget.style.gap = "6px";
          }}
        >
          View Project <span>→</span>
        </a>
      )}
    </motion.div>
  );
}
