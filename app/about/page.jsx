"use client";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

const timeline = [
  {
    period: "Dec 2025 - Dec 2025",
    title: "Frontend Developer",
    org: "Internpe",
    detail:
      "Built a Smart Calculator with Web Speech Recognition.",
  },
  {
    period: "July 2025 - Aug 2025",
    title: "Machine Learning Intern",
    org: "SmartEd",
    detail:
      "Built a Disease Prediction Model using Python, Scikit-Learn , Flask & Pandas.",
  },
  {
    period: "May 2025 - July 2025",
    title: "Machine Learning Intern",
    org: "Unified Mentor",
    detail:
      "Built a ASL Detection Model using Python, Scikit-Learn , Flask & Pandas.",
  },
  {
    period: "June 2024",
    title: "Frontend Intern",
    org: "Bussibees",
    detail:
      "Developed a Flipkart Clone with responsive UI and modern web practices.",
  },
];

export default function About() {
  return (
    <section id="about" className="section-padding">
      <div className="container-main">
        {/* Section Title */}
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{
            fontFamily: "var(--font-sora), sans-serif",
            fontSize: "clamp(2rem, 4vw, 2.75rem)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            marginBottom: 48,
          }}
        >
          About <span className="gradient-text">Me</span>
        </motion.h2>

        {/* Two column layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 48,
          }}
          className="about-grid"
        >
          {/* Left - Bio */}
          <motion.div
  variants={fadeUp}
  custom={1}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
  <p
    style={{
      fontSize: "1.05rem",
      lineHeight: 1.8,
      color: "var(--text-secondary)",
      marginBottom: 24,
    }}
  >
    Hi! I'm{" "}
    <strong style={{ color: "var(--text-primary)" }}>
      Kunal Gupta
    </strong>
    , a 3rd year Computer Science student focused on mastering{" "}
    <strong style={{ color: "var(--text-primary)" }}>
      Data Structures & Algorithms
    </strong>{" "}
    and building impactful{" "}
    <strong style={{ color: "var(--text-primary)" }}>
      Full-Stack Applications
    </strong>
    . I have solved{" "}
    <strong style={{ color: "var(--text-primary)" }}>
      600+ problems on LeetCode
    </strong>{" "}
    using <strong style={{ color: "var(--text-primary)" }}>C++</strong>,
    continuously sharpening my problem-solving skills and interview readiness.
  </p>

  <p
    style={{
      fontSize: "1.05rem",
      lineHeight: 1.8,
      color: "var(--text-secondary)",
      marginBottom: 24,
    }}
  >
    I develop scalable and modern web applications using{" "}
    <strong style={{ color: "var(--text-primary)" }}>
      HTML, CSS, JavaScript, and React
    </strong>
    , and I’m expanding my expertise across the full stack by working on{" "}
    <strong style={{ color: "var(--text-primary)" }}>
      Backend Development
    </strong>{" "}
    and real-world system design concepts. I enjoy crafting smooth user
    experiences with{" "}
    <strong style={{ color: "var(--text-primary)" }}>
      Framer Motion & GSAP
    </strong>
    .
  </p>

  <p
    style={{
      fontSize: "1.05rem",
      lineHeight: 1.8,
      color: "var(--text-secondary)",
      marginBottom: 32,
    }}
  >
    I believe in building fewer but meaningful projects that solve real
    problems. My goal is to grow into a high-impact software engineer who
    designs scalable systems and delivers production-ready solutions.
  </p>

  {/* Resume Button */}
  <a
    href="https://drive.google.com/file/d/1S0xWB3SeR61SDl1eDWINiq4CwGLaN6dK/view"
    target="_blank"
    rel="noopener noreferrer"
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      padding: "10px 24px",
      borderRadius: "var(--radius-full)",
      border: "1px solid var(--border)",
      color: "var(--text-primary)",
      fontWeight: 500,
      fontSize: "0.9rem",
      transition: "all 0.3s ease",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = "var(--accent)";
      e.currentTarget.style.boxShadow = "0 0 20px var(--accent-dim)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = "var(--border)";
      e.currentTarget.style.boxShadow = "none";
    }}
  >
    📄 View Resume
  </a>
</motion.div>


          {/* Right - Timeline */}
          <motion.div
            variants={fadeUp}
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3
              style={{
                fontFamily: "var(--font-sora), sans-serif",
                fontSize: "1.25rem",
                fontWeight: 600,
                marginBottom: 24,
                color: "var(--text-primary)",
              }}
            >
              My Journey
            </h3>
            <div style={{ position: "relative", paddingLeft: 24 }}>
              {/* Vertical Line */}
              <div
                style={{
                  position: "absolute",
                  left: 5,
                  top: 8,
                  bottom: 8,
                  width: 1,
                  backgroundColor: "var(--border)",
                }}
              />

              <div
                style={{ display: "flex", flexDirection: "column", gap: 32 }}
              >
                {timeline.map((item, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    custom={i + 3}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    style={{ position: "relative" }}
                  >
                    {/* Dot */}
                    <div
                      style={{
                        position: "absolute",
                        left: -20,
                        top: 6,
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        backgroundColor: "var(--accent)",
                        boxShadow: "0 0 8px var(--accent-glow)",
                      }}
                    />
                    <span
                      style={{
                        fontSize: "0.8rem",
                        color: "var(--accent)",
                        fontWeight: 500,
                        letterSpacing: "0.02em",
                      }}
                    >
                      {item.period}
                    </span>
                    <h4
                      style={{
                        fontSize: "1rem",
                        fontWeight: 600,
                        color: "var(--text-primary)",
                        marginTop: 4,
                      }}
                    >
                      {item.title}{" "}
                      <span
                        style={{ color: "var(--text-muted)", fontWeight: 400 }}
                      >
                        @ {item.org}
                      </span>
                    </h4>
                    <p
                      style={{
                        fontSize: "0.9rem",
                        color: "var(--text-secondary)",
                        marginTop: 4,
                        lineHeight: 1.5,
                      }}
                    >
                      {item.detail}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </section>
  );
}
