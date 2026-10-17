"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import ProjectCard from "./ProjectCard";
import RevealHeading from "./RevealHeading";
import ProjectModal from "./ProjectModal";
import { webApps, cvProjects } from "../../lib/data/projects";

const tabs = [
  { id: "webapps", label: "Web Applications" },
  { id: "cv", label: "Computer Vision / Python" },
];

export default function Projects() {
  const [activeTab, setActiveTab] = useState("webapps");
  const [selectedProject, setSelectedProject] = useState(null);
  const projects = activeTab === "webapps" ? webApps : cvProjects;

  return (
    <section id="projects" className="section-padding section-tone-b">
      <div className="container-main">
        <RevealHeading
          eyebrow="( 05 ) — Selected Work"
          text="My Projects"
          accent="Projects"
          style={{
            fontFamily: "var(--font-serif), sans-serif",
            fontSize: "clamp(2rem, 4vw, 2.75rem)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            marginBottom: 40,
          }}
        />

        {/* Tab Switcher */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          style={{
            display: "inline-flex",
            borderRadius: "var(--radius-full)",
            backgroundColor: "var(--bg-surface)",
            border: "1px solid var(--border)",
            padding: 4,
            marginBottom: 40,
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: "8px 24px",
                borderRadius: "var(--radius-full)",
                border: "none",
                cursor: "pointer",
                fontSize: "0.875rem",
                fontWeight: 500,
                transition: "all 0.3s ease",
                backgroundColor:
                  activeTab === tab.id ? "var(--accent)" : "transparent",
                color:
                  activeTab === tab.id ? "#0A0A0B" : "var(--text-secondary)",
              }}
              onMouseEnter={(e) => {
                if (activeTab !== tab.id)
                  e.target.style.color = "var(--text-primary)";
              }}
              onMouseLeave={(e) => {
                if (activeTab !== tab.id)
                  e.target.style.color = "var(--text-secondary)";
              }}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Project list — editorial full-width rows, alternating sides */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 28,
            }}
          >
            {projects.map((project, i) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={i}
                onOpenDetails={() => setSelectedProject(project)}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
