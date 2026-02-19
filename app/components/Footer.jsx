"use client";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

const footerLinks = [
  {
    icon: <FaGithub size={16} />,
    href: "https://github.com/kunalgupta016",
    label: "GitHub",
  },
  {
    icon: <FaLinkedinIn size={16} />,
    href: "https://www.linkedin.com/in/kunal-gupta-1b6065291/",
    label: "LinkedIn",
  },
  {
    icon: <FaXTwitter size={16} />,
    href: "https://x.com/KunalGupta75260",
    label: "Twitter",
  },
];

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
          © {new Date().getFullYear()} Kunal Gupta. Built with ❤️
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
