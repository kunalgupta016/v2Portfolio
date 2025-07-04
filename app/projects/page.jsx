"use client"
import { motion } from "framer-motion"
import ProjectCard from "../components/ProjectCard"
const projects = [
  {
    title: "Bubble-game",
    description: "A unique bubble hit game just for fun",
    tech: ["HTML", "CSS", "Fonts","Js"],
    image: "/hubble-bubble.png",
    link: "https://github.com/kunalgupta016/Bubble-Game"
  },
  {
    title: "Quiz WebApp",
    description: "A website in which questions of bio, chemistry and physics are asked",
    tech: ["HTML", "CSS", "JavaScript" , "React" ,"Framer"],
    image: "/neet.png",
    link: "https://github.com/kunalgupta016/Neet"
  },
  {
    title: "Quote Generator",
    description: "A website that generates random quotes",
    tech: ["HTML", "CSS", "JavaScript" , "React" ,"Framer" ,"Axios"],
    image: "/quote.jfif",
    link: "https://github.com/kunalgupta016/Quote-Generator"
  },
  {
    title:"Fraud-Detection ",
    description: "A website that detects fraud using machine learning",
    tech: ["HTML", "CSS", "JavaScript" , "React" ,"Framer","Ml","Python"],
    image: "/fraud.jfif",
    link: "https://github.com/kunalgupta016/fraud_detection"
  },
  {
    title:"Product-Billing Mobile App",
    description: "A mobile app that generates bills for products",
    tech:["React-native"],
    image: "/product.jpg",
    link: "https://github.com/kunalgupta016/product-biiling-thok-"
  }

  // Add more as needed
]

export default function Projects() {
  return (
    <motion.section
      id="projects"
      className="min-h-screen px-6 py-24 bg-black text-white"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Projects
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </motion.section>
  )
}
