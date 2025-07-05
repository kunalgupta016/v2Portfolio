"use client";
import { motion } from "framer-motion";

export default function About() {
  return (
    <motion.section
      id="about"
      className="min-h-screen px-6 py-24 bg-black text-white"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          About Me
        </motion.h2>

        {/* Description */}
        <motion.span
          className="text-lg md:text-xl text-gray-300 text-center max-w-3xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Hi! I'm Kunal Gupta, a Computer Science student passionate about
          coding, design, and development. I code in <strong>C, C++,</strong>{" "}
          and <strong>Python</strong>, and I'm actively solving DSA problems on
          <strong> LeetCode</strong> and <strong>Coding Ninjas</strong> (3⭐ on
          HackerRank).
          <br />
          <br />I build modern web apps using{" "}
          <strong>HTML, CSS, JavaScript, React</strong>, and love adding life to
          UI with
          <strong> GSAP, Framer Motion</strong>, and{" "}
          <strong>Locomotive.js</strong>. I'm also exploring{" "}
          <strong>Machine Learning</strong> and{" "}
          <strong>Backend Development</strong>, and enjoy working with
          <strong> Numpy, Pandas</strong>, and <strong>Matplotlib</strong> for
          data handling and visualization.
          <br />
          <br />
          Always learning. Always building. Let's connect and create something
          awesome!
        </motion.span>

        {/* Resume Button */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <a
            href="https://drive.google.com/file/d/19xAap-jPCxEi7yd3KNMRLl7_PFHx6tW3/view"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
          >
            View My Resume
          </a>
        </motion.div>

        {/* Timeline */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-2xl font-semibold mb-6 text-center">
            My Journey
          </h3>
          <div className="relative border-l border-gray-600 pl-6 space-y-10">
            <div className="absolute left-[-7px] top-[8px] w-4 h-4 bg-blue-500 rounded-full"></div>
            <div>
              <h4 className="text-lg font-bold">May 2025 - Present</h4>
              <p className="text-gray-400">
                Machine Learning Internship @ Unified Mentor – Fraud-Detection
                Model
              </p>
            </div>

            <div className="absolute left-[-7px] top-[88px] w-4 h-4 bg-pink-500 rounded-full"></div>
            <div>
              <h4 className="text-lg font-bold">June 2024 - June 2024</h4>
              <p className="text-gray-400">
                Frontend Internship @ Bussibees – Flipkart Clone
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
