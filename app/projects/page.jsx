"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import ProjectCard from "../components/ProjectCard";

const webApps = [
  {
    title: "Voice Calculator",
    description:
      "A smart calculator that listens to your voice commands and performs calculations hands-free using the Web Speech API.",
    tech: ["HTML", "CSS", "JavaScript", "Web Speech API"],
    category: "webapp",
    link: "https://voicecalc.vercel.app/",
  },
  {
    title: "AI Resume Builder",
    description:
      "An intelligent resume builder that helps users craft professional resumes with AI-powered suggestions and formatting.",
    tech: ["React", "Node.js", "AI/ML"],
    category: "webapp",
    link: "https://cv-boost.vercel.app/",
  },
  {
    title: "DSA Quest",
    description:
      "A gamified platform to learn Data Structures and Algorithms through interactive challenges and visual problem-solving.",
    tech: ["React", "Framer Motion", "Game Logic"],
    category: "webapp",
    link: "https://dsaquest.vercel.app/",
  },
];

const webGames = [
  {
    title: "Bull Cows Game",
    description:
      "A multiplayer number-guessing game where players compete in real-time to crack each other's secret codes.",
    tech: ["React", "Socket.io", "Node.js"],
    category: "game",
    link: "https://cowsbull.vercel.app/",
  },
  {
    title: "Stickman Adventure",
    description:
      "A side-scrolling adventure game featuring a stickman hero navigating through obstacles and enemies across multiple levels.",
    tech: ["HTML5 Canvas", "JavaScript", "Phaser.js"],
    category: "game",
    link: "https://stickman-adventure.vercel.app/",
  },
  {
    title: "Heads-Up Game",
    description:
      "A fun party game where players guess words from clues — inspired by the popular Ellen DeGeneres game show.",
    tech: ["React", "Framer Motion", "CSS Animations"],
    category: "game",
    link: "https://wgk.vercel.app/",
  },
];

const tabs = [
  { id: "webapps", label: "Web Apps" },
  { id: "webgames", label: "Web Games" },
];

export default function Projects() {
  const [activeTab, setActiveTab] = useState("webapps");
  const projects = activeTab === "webapps" ? webApps : webGames;

  return (
    <section id="projects" className="section-padding">
      <div className="container-main">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            fontFamily: "var(--font-sora), sans-serif",
            fontSize: "clamp(2rem, 4vw, 2.75rem)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            marginBottom: 40,
          }}
        >
          My <span className="gradient-text">Projects</span>
        </motion.h2>

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

        {/* Project Grid */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 20,
          }}
          className="projects-grid"
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </motion.div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .projects-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
