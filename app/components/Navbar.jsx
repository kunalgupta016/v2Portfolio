"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { smoothScrollToHash } from "../../lib/smoothScrollTo";
import { profile } from "../../lib/data/profile";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "DSA", href: "#leetcode" },
  { label: "Projects", href: "#projects" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact", href: "#contact" },
  { label: "Resume", href: profile.resumeUrl, external: true },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const links = navLinks.map((link) => ({
    ...link,
    href:
      pathname !== "/" && link.href.startsWith("#")
        ? `/${link.href}`
        : link.href,
  }));
  const homeHref = pathname === "/" ? "#home" : "/#home";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 100,
        backdropFilter: scrolled ? "blur(16px)" : "blur(6px)",
        backgroundColor: scrolled
          ? "rgba(13,12,10,0.9)"
          : "rgba(13,12,10,0.25)",
        borderBottom: scrolled
          ? "1px solid var(--border)"
          : "1px solid transparent",
        transition: "all 0.3s ease",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 24px",
        }}
      >
        {/* Logo */}
        <a
          href={homeHref}
          onClick={(e) => smoothScrollToHash(e, homeHref)}
          style={{ textDecoration: "none" }}
        >
          <span
            style={{
              fontFamily: "var(--font-serif), serif",
              fontStyle: "italic",
              fontSize: "1.4rem",
              fontWeight: 600,
              color: "var(--text-primary)",
              letterSpacing: "-0.01em",
            }}
          >
            Kunal
          </span>
        </a>

        {/* Desktop Links */}
        <div
          style={{
            display: "flex",
            gap: 32,
            alignItems: "center",
          }}
          className="desktop-nav"
        >
          {links.map((link) => (
            <NavLink
              key={link.label}
              href={link.href}
              label={link.label}
              external={link.external}
            />
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="mobile-toggle"
          aria-label="Toggle Menu"
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 8,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <motion.span
              animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              style={{
                width: 22,
                height: 2,
                background: "var(--text-primary)",
                borderRadius: 2,
                display: "block",
              }}
            />
            <motion.span
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              style={{
                width: 22,
                height: 2,
                background: "var(--text-primary)",
                borderRadius: 2,
                display: "block",
              }}
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              style={{
                width: 22,
                height: 2,
                background: "var(--text-primary)",
                borderRadius: 2,
                display: "block",
              }}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{
              overflow: "hidden",
              borderTop: "1px solid var(--border)",
              backgroundColor: "rgba(10,10,11,0.95)",
            }}
            className="mobile-menu"
          >
            <div
              style={{
                padding: "16px 24px",
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              {links.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  onClick={(e) => {
                    setIsOpen(false);
                    smoothScrollToHash(e, link.href);
                  }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "1rem",
                    textDecoration: "none",
                    padding: "8px 0",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.color = "var(--text-primary)")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.color = "var(--text-secondary)")
                  }
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
        }
      `}</style>
    </motion.nav>
  );
}

function NavLink({ href, label, external }) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onClick={(e) => smoothScrollToHash(e, href)}
      style={{
        color: "var(--text-secondary)",
        fontFamily: "var(--font-mono), monospace",
        fontSize: "0.75rem",
        fontWeight: 500,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        textDecoration: "none",
        position: "relative",
        padding: "4px 0",
        transition: "color 0.2s",
      }}
      onMouseEnter={(e) => {
        e.target.style.color = "var(--text-primary)";
        e.target.querySelector("span").style.width = "100%";
      }}
      onMouseLeave={(e) => {
        e.target.style.color = "var(--text-secondary)";
        e.target.querySelector("span").style.width = "0%";
      }}
    >
      {label}
      <span
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "0%",
          height: 1,
          backgroundColor: "var(--accent)",
          transition: "width 0.3s ease",
        }}
      />
    </a>
  );
}
