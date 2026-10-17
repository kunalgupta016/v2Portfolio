"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!project) return null;

  const images = project.images ?? [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      data-lenis-prevent
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.85)",
        zIndex: 99999,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "48px 20px",
        overflowY: "auto",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        data-lenis-prevent
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 860,
          backgroundColor: "var(--bg-surface)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)",
          padding: 40,
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close project details"
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            width: 36,
            height: 36,
            borderRadius: "50%",
            border: "1px solid var(--border)",
            background: "var(--bg-elevated)",
            color: "var(--text-secondary)",
            cursor: "pointer",
            fontSize: "1.1rem",
          }}
        >
          ✕
        </button>

        <div className="eyebrow">
          {project.type === "download" ? "Case Study — Downloadable" : "Case Study"}
        </div>

        <h3
          style={{
            fontFamily: "var(--font-serif), serif",
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            fontWeight: 600,
            letterSpacing: "-0.01em",
            marginBottom: 20,
            color: "var(--text-primary)",
          }}
        >
          {project.title}
        </h3>

        {images.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: images.length > 1 ? "1fr 1fr" : "1fr",
              gap: 12,
              marginBottom: 28,
            }}
            className="project-modal-gallery"
          >
            {images.map((src, i) => (
              <div
                key={src}
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "16 / 10",
                  borderRadius: "var(--radius-md)",
                  overflow: "hidden",
                  border: "1px solid var(--border)",
                  gridColumn: images.length > 1 && i === 0 && images.length % 2 !== 0 ? "1 / -1" : "auto",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`${project.title} screenshot ${i + 1}`}
                  loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            ))}
          </div>
        )}

        <p
          style={{
            fontSize: "1rem",
            lineHeight: 1.75,
            color: "var(--text-secondary)",
            marginBottom: 24,
          }}
        >
          {project.description}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
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

        {project.type === "download" ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <a
              href={project.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 22px",
                borderRadius: "var(--radius-full)",
                backgroundColor: "var(--accent)",
                color: "#0A0A0B",
                fontWeight: 600,
                fontSize: "0.9rem",
                width: "fit-content",
              }}
            >
              ⬇ Download for {project.os}
            </a>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
              {project.fileName} · ~{project.fileSizeMB}MB · no live demo, runs locally
            </span>
          </div>
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {project.caseStudy && (
              <Link
                href={`/projects/${project.slug}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 22px",
                  borderRadius: "var(--radius-full)",
                  border: "1px solid var(--border)",
                  color: "var(--text-primary)",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  width: "fit-content",
                }}
              >
                Read Case Study →
              </Link>
            )}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 22px",
                  borderRadius: "var(--radius-full)",
                  backgroundColor: "var(--accent)",
                  color: "#0A0A0B",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  width: "fit-content",
                }}
              >
                Visit Live Site →
              </a>
            )}
          </div>
        )}
      </motion.div>

      <style jsx global>{`
        @media (max-width: 640px) {
          .project-modal-gallery {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </motion.div>
  );
}
