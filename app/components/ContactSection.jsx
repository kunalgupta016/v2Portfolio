"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  FaGithub,
  FaLinkedinIn,
  FaXTwitter,
  FaInstagram,
} from "react-icons/fa6";
import { profile, socials as socialsData } from "../../lib/data/profile";
import RevealHeading from "./RevealHeading";
import Magnetic from "./Magnetic";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

const socialIcons = {
  github: <FaGithub size={14} />,
  linkedin: <FaLinkedinIn size={14} />,
  twitter: <FaXTwitter size={14} />,
  instagram: <FaInstagram size={14} />,
};

const socials = socialsData.map((s) => ({
  icon: socialIcons[s.icon],
  link: s.href,
  label: s.label,
}));

export default function Contact() {
  const [copied, setCopied] = useState(false);

  // Old-school textarea+execCommand fallback for browsers/contexts that
  // deny the async Clipboard API (denied permission, non-HTTPS, older
  // Safari, etc.) — copying still needs to work even when that happens.
  const fallbackCopy = (text) => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand("copy");
    } catch {
      // Best effort — nothing more we can do here.
    }
    document.body.removeChild(textarea);
  };

  const handleEmailClick = () => {
    // Show feedback immediately so the click always feels like it did
    // something, regardless of whether the copy or the mailto: open
    // actually succeeds (mailto: silently no-ops with no mail client
    // configured, and Clipboard API can be permission-denied).
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);

    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(profile.email).catch(() => fallbackCopy(profile.email));
    } else {
      fallbackCopy(profile.email);
    }
  };

  return (
    <section id="contact" className="section-padding section-tone-a">
      <div className="container-main">
        <RevealHeading
          eyebrow="( 05 ) — Say Hello"
          text="Let's build"
          accent="something"
          style={{
            fontFamily: "var(--font-serif), serif",
            fontSize: "clamp(2.25rem, 5.5vw, 3.75rem)",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            marginBottom: 40,
            maxWidth: 640,
          }}
        />

        {/* Giant email CTA — the primary contact affordance. Clicking both
            attempts to open a mail client (mailto:) and copies the address,
            since many browsers/OSes have no default mail app configured and
            the mailto: click otherwise appears to do nothing. */}
        <motion.div
          variants={fadeUp}
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ marginBottom: 12, position: "relative", display: "inline-block" }}
        >
          <a
            href={`mailto:${profile.email}`}
            onClick={handleEmailClick}
            className="contact-email-link"
            style={{
              display: "inline-flex",
              alignItems: "baseline",
              gap: 16,
              fontFamily: "var(--font-serif), serif",
              fontStyle: "italic",
              fontWeight: 500,
              fontSize: "clamp(1.4rem, 4.5vw, 2.75rem)",
              color: "var(--text-primary)",
              borderBottom: "2px solid var(--border)",
              paddingBottom: 12,
              transition: "color 0.3s ease, border-color 0.3s ease",
            }}
          >
            {profile.email}
            <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "1.2rem" }}>
              ↗
            </span>
          </a>

          <AnimatePresence>
            {copied && (
              <motion.span
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{
                  position: "absolute",
                  left: 0,
                  bottom: -28,
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: "0.75rem",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                }}
              >
                ✓ Copied to clipboard
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>

        <div style={{ marginBottom: 44 }} />

        {/* Meta row: location / availability, spec-sheet style */}
        <motion.div
          variants={fadeUp}
          custom={2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{
            display: "flex",
            gap: 64,
            flexWrap: "wrap",
            paddingTop: 32,
            borderTop: "1px solid var(--border)",
            marginBottom: 40,
          }}
        >
          <div>
            <p className="eyebrow" style={{ marginBottom: 8 }}>
              Location
            </p>
            <p style={{ fontSize: "1rem", color: "var(--text-secondary)" }}>
              {profile.location}
            </p>
          </div>
          <div>
            <p className="eyebrow" style={{ marginBottom: 8 }}>
              Availability
            </p>
            <p style={{ fontSize: "1rem", color: "var(--text-secondary)" }}>
              Open to opportunities
            </p>
          </div>
        </motion.div>

        {/* Social links — plain mono list, not boxed icons */}
        <motion.div
          variants={fadeUp}
          custom={3}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ display: "flex", flexWrap: "wrap", gap: 24 }}
        >
          {socials.map((item) => (
            <Magnetic key={item.label} strength={0.4}>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: "0.8rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
              >
                {item.icon}
                {item.label}
              </a>
            </Magnetic>
          ))}
        </motion.div>
      </div>

      <style jsx global>{`
        .contact-email-link:hover {
          color: var(--accent) !important;
          border-color: var(--accent) !important;
        }
        @media (max-width: 640px) {
          .contact-email-link {
            font-size: 1.4rem !important;
            word-break: break-all;
          }
        }
      `}</style>
    </section>
  );
}
