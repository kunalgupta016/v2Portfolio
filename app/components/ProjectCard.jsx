"use client"
import { motion } from "framer-motion"

export default function ProjectCard({ project }) {
  return (
    <motion.div
      className="bg-gradient-to-br from-[#1f1f1f] to-[#2d2d2d] border border-white/10 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Image */}
      <div className="overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-48 object-cover transform transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-semibold mb-2 text-white">{project.title}</h3>
        <p className="text-sm text-gray-400 mb-3">{project.description}</p>

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech, i) => (
            <span
              key={i}
              className="bg-white/10 text-xs text-gray-200 px-2 py-1 rounded-full backdrop-blur-sm"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Link */}
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 text-sm font-medium hover:underline"
        >
          View Project →
        </a>
      </div>
    </motion.div>
  )
}
