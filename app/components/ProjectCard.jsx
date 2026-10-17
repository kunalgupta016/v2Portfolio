"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import CurtainsThumbnail from "./CurtainsThumbnail";

// Rendered as a full-width editorial row (image one side, details the
// other, alternating by index) rather than a grid tile — closer to a
// catalog/gallery listing than a generic card grid.
export default function ProjectCard({ project, index = 0, onOpenDetails }) {
  const thumbnail = project.images?.[0];
  const reversed = index % 2 === 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="glass-card project-row"
      style={{
        display: "flex",
        flexDirection: reversed ? "row-reverse" : "row",
        alignItems: "center",
        gap: 40,
        padding: 32,
      }}
    >
      {/* Media */}
      <div className="project-row-media" style={{ flex: "0 0 44%" }}>
        {thumbnail ? (
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "16 / 10",
              borderRadius: "var(--radius-md)",
              overflow: "hidden",
              border: "1px solid var(--border)",
            }}
          >
            <CurtainsThumbnail
              src={thumbnail}
              alt={`${project.title} screenshot`}
            />
            {onOpenDetails && (
              <button
                onClick={onOpenDetails}
                aria-label={`View details for ${project.title}`}
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  border: "1px solid rgba(244,239,228,0.25)",
                  background: "rgba(13,12,10,0.6)",
                  backdropFilter: "blur(4px)",
                  color: "var(--text-primary)",
                  cursor: "pointer",
                  fontSize: "1rem",
                  zIndex: 2,
                }}
              >
                ⤢
              </button>
            )}
          </div>
        ) : (
          <div
            style={{
              width: "100%",
              aspectRatio: "16 / 10",
              borderRadius: "var(--radius-md)",
              border: "1px dashed var(--border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "2rem",
            }}
          >
            🖥️
          </div>
        )}
      </div>

      {/* Details */}
      <div style={{ flex: 1, position: "relative", minWidth: 0 }}>
        <span
          aria-hidden
          style={{
            position: "absolute",
            top: -36,
            [reversed ? "right" : "left"]: 0,
            fontFamily: "var(--font-serif), serif",
            fontSize: "5rem",
            fontWeight: 600,
            color: "var(--border)",
            lineHeight: 1,
            userSelect: "none",
            zIndex: 0,
          }}
          className="project-row-index"
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <span style={{ fontSize: "1.1rem" }}>
              {project.type === "download" ? "🖥️" : "🌐"}
            </span>
            <h3
              style={{
                fontFamily: "var(--font-serif), serif",
                fontSize: "1.5rem",
                fontWeight: 600,
                color: "var(--text-primary)",
              }}
            >
              {project.title}
            </h3>
          </div>

          <p
            style={{
              fontSize: "0.95rem",
              color: "var(--text-secondary)",
              lineHeight: 1.7,
              marginBottom: 20,
            }}
          >
            {project.description}
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
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
                  padding: "8px 16px",
                  borderRadius: "var(--radius-full)",
                  border: "1px solid var(--border)",
                  fontSize: "0.85rem",
                  color: "var(--text-primary)",
                  fontWeight: 500,
                  transition: "border-color 0.2s, color 0.2s",
                  width: "fit-content",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent)";
                  e.currentTarget.style.color = "var(--accent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.color = "var(--text-primary)";
                }}
              >
                ⬇ Download for {project.os}
              </a>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                {project.fileName} · ~{project.fileSizeMB}MB · no live demo, runs locally
              </span>
            </div>
          ) : (
            project.link && (
              <div className="project-actions">
                {project.caseStudy && (
                  <Link
                    className="project-case-study-link"
                    href={`/projects/${project.slug}`}
                  >
                    Read case study <span aria-hidden="true">↗</span>
                  </Link>
                )}
                <a
                  className="project-live-link"
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View project <span aria-hidden="true">→</span>
                </a>
              </div>
            )
          )}
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 780px) {
          .project-row {
            flex-direction: column !important;
            padding: 20px !important;
            gap: 24px !important;
          }
          .project-row-media {
            flex: 1 1 auto !important;
            width: 100%;
          }
          .project-row-index {
            display: none;
          }
        }
      `}</style>
    </motion.div>
  );
}
