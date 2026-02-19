"use client";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedinIn,
  FaXTwitter,
  FaInstagram,
  FaEnvelope,
  FaLocationDot,
} from "react-icons/fa6";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

const socials = [
  {
    icon: <FaGithub size={20} />,
    link: "https://github.com/kunalgupta016",
    label: "GitHub",
  },
  {
    icon: <FaLinkedinIn size={20} />,
    link: "https://www.linkedin.com/in/kunal-gupta-1b6065291/",
    label: "LinkedIn",
  },
  {
    icon: <FaXTwitter size={20} />,
    link: "https://x.com/KunalGupta75260",
    label: "Twitter",
  },
  {
    icon: <FaInstagram size={20} />,
    link: "https://www.instagram.com/kunal_gupta016/",
    label: "Instagram",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="section-padding">
      <div
        className="container-main"
        style={{ maxWidth: 700, textAlign: "center" }}
      >
        {/* Title */}
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
            marginBottom: 16,
          }}
        >
          Get in <span className="gradient-text">Touch</span>
        </motion.h2>

        <motion.p
          variants={fadeUp}
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{
            fontSize: "1.05rem",
            color: "var(--text-secondary)",
            marginBottom: 48,
            lineHeight: 1.7,
          }}
        >
          Have a project in mind or just want to say hello? Feel free to reach
          out — I&apos;d love to hear from you.
        </motion.p>

        {/* Contact Cards */}
        <motion.div
          variants={fadeUp}
          custom={2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
            marginBottom: 40,
          }}
          className="contact-cards"
        >
          {/* Email Card */}
          <a
            href="mailto:kunalgupta55005@gmail.com"
            className="glass-card"
            style={{
              padding: 24,
              display: "flex",
              alignItems: "center",
              gap: 16,
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "var(--radius-md)",
                backgroundColor: "var(--accent-dim)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--accent)",
                flexShrink: 0,
              }}
            >
              <FaEnvelope size={18} />
            </div>
            <div style={{ textAlign: "left" }}>
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "var(--text-muted)",
                  marginBottom: 4,
                }}
              >
                Email
              </p>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "var(--text-primary)",
                  fontWeight: 500,
                }}
              >
                kunalgupta55005@gmail.com
              </p>
            </div>
          </a>

          {/* Location Card */}
          <div
            className="glass-card"
            style={{
              padding: 24,
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "var(--radius-md)",
                backgroundColor: "var(--accent-dim)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--accent)",
                flexShrink: 0,
              }}
            >
              <FaLocationDot size={18} />
            </div>
            <div style={{ textAlign: "left" }}>
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "var(--text-muted)",
                  marginBottom: 4,
                }}
              >
                Location
              </p>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "var(--text-primary)",
                  fontWeight: 500,
                }}
              >
                Jaipur, Rajasthan
              </p>
            </div>
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          variants={fadeUp}
          custom={3}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ display: "flex", justifyContent: "center", gap: 14 }}
        >
          {socials.map((item) => (
            <a
              key={item.label}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.label}
              style={{
                width: 48,
                height: 48,
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--text-muted)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--accent)";
                e.currentTarget.style.color = "var(--accent)";
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow =
                  "0 4px 16px var(--accent-dim)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.color = "var(--text-muted)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {item.icon}
            </a>
          ))}
        </motion.div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .contact-cards {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
