"use client"
import { motion } from "framer-motion"
import { useState } from "react"
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
  },
  {
    title:"Forest-Cover_Type",
    description: "A website that predicts forest cover type using machine learning",
    tech:["Ml","Python","Flask"],
    image: "/forest.jpeg",
    link: "https://github.com/kunalgupta016/forest_cover_type"
  },
  {
    title: "Vehicle Price Pridiction",
    description: "A website that predicts vehicle price using machine learning",
    tech: ["Ml","Python"],
    image: "/car.jpeg",
    link: "https://github.com/kunalgupta016/vehicle_price_prediction"
  }
]

export default function Projects() {
  const [showAll, setShowAll] = useState(false)
  const visibleProjects = showAll ? projects : projects.slice(0, 3)

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
          {visibleProjects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>

        {/* 🔘 Show more button */}
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:scale-105 transition-all duration-300"
          >
            {showAll ? "Show Less" : "All Projects"}
          </button>
        </div>
      </div>
    </motion.section>
  )
}
