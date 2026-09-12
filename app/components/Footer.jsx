"use client";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { socials } from "../../lib/data/profile";

const footerIcons = {
  github: <FaGithub size={16} />,
  linkedin: <FaLinkedinIn size={16} />,
  twitter: <FaXTwitter size={16} />,
};

const footerLinks = socials
  .filter((s) => footerIcons[s.icon])
  .map((s) => ({ icon: footerIcons[s.icon], href: s.href, label: s.label }));

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        padding: "32px 24px",
      }}
    >
      <div
        className="container-main"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <p
          style={{
            fontSize: "0.85rem",
            color: "var(--text-muted)",
          }}
        >
          © {new Date().getFullYear()} Kunal Gupta.
          <span
            style={{
              display: "block",
              marginTop: 4,
              fontSize: "0.75rem",
              color: "var(--text-muted)",
              opacity: 0.6,
            }}
          >
            💡 Psst… try typing <kbd style={{ 
              backgroundColor: "var(--bg-elevated)", 
              padding: "1px 6px", 
              borderRadius: 4, 
              border: "1px solid var(--border)",
              fontSize: "0.7rem",
              fontFamily: "monospace",
            }}>game</kbd> anywhere on the site
          </span>
        </p>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          {footerLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.label}
              style={{
                color: "var(--text-muted)",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--accent)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--text-muted)")
              }
            >
              {item.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
