"use client";
import { motion } from "framer-motion";

const achievements = [
  {
    icon: "🥈",
    title: "1st Rank in Class — Silver Medal",
    description: "Secured 1st rank in my class during 1st year of college and was awarded the Silver Medal for academic excellence.",
  },
  {
    icon: "🏆",
    title: "600+ LeetCode Problems",
    description:
      "Solved 600+ DSA problems in C++, consistently improving problem-solving and algorithmic thinking.",
  },
  {
    icon: "⭐",
    title: "3-Star HackerRank",
    description:
      "Achieved 3-star rating on HackerRank in problem solving and C++ domains.",
  },
  {
    icon: "🧠",
    title: "ML Intern — Unified Mentor",
    description:
      "Built an ASL Detection Model using Python, Scikit-Learn, Flask & Pandas during a 3-month internship.",
  },
  {
    icon: "🔬",
    title: "ML Intern — SmartEd",
    description:
      "Developed a Disease Prediction Model with Flask backend and scikit-learn classification algorithms.",
  },
  {
    icon: "💻",
    title: "Frontend Developer — Internpe",
    description:
      "Built a Smart Calculator with Web Speech Recognition as part of a frontend development internship.",
  },
  {
    icon: "🎮",
    title: "Game Developer",
    description:
      "Designed and shipped multiple web games including multiplayer Bull Cows and Stickman Adventure.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.06, ease: "easeOut" },
  }),
};

export default function Achievements() {
  return (
    <section id="achievements" className="section-padding">
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
            marginBottom: 16,
          }}
        >
          Achievements & <span className="gradient-text">Certifications</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          style={{
            fontSize: "1rem",
            color: "var(--text-secondary)",
            marginBottom: 40,
            maxWidth: 500,
          }}
        >
          Milestones, certifications, and experiences that shaped my journey.
        </motion.p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
          }}
          className="achievements-grid"
        >
          {achievements.map((item, i) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="glass-card"
              style={{
                padding: 24,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <span style={{ fontSize: "1.75rem" }}>{item.icon}</span>
              <h3
                style={{
                  fontFamily: "var(--font-sora), sans-serif",
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.6,
                }}
              >
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 900px) {
          .achievements-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          .achievements-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
