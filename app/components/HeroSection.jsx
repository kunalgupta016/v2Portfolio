"use client"
import { motion } from 'framer-motion'

export default function HeroSection() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white"
    >
      <motion.div
        className="backdrop-blur-md bg-white/5 p-8 rounded-2xl shadow-xl max-w-2xl w-full text-center border border-white/10"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Hi, I'm <span className="text-blue-400">Kunal Gupta</span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-gray-300 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          A Web Developer crafting clean & modern digital experiences.
        </motion.p>

        <motion.a
          href="#projects"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-full transition-all duration-300 shadow-md hover:shadow-xl"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          View My Work
        </motion.a>
      </motion.div>
    </section>
  )
}
