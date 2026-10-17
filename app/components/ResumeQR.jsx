"use client";
import { motion } from "framer-motion";
import QRCode from "react-qr-code";
import { profile } from "../../lib/data/profile";

/**
 * ResumeQR — displays a scannable QR code that opens the Google Drive
 * resume preview directly in a mobile browser without forcing a download.
 *
 * URL strategy:
 *   - QR code  → /preview  (renders inline on phones, no sign-in needed)
 *   - "View Resume" button → original /view  link  (keeps the user's URL)
 *   - "Download Resume" button → /uc?export=download  (direct download)
 *
 * Both URLs use the same Drive file ID extracted from profile.resumeUrl,
 * so no URL is ever hard-coded here.
 */

// Derive the file ID from whatever Google Drive URL format is stored.
function driveFileId(url) {
  // Handles /file/d/<ID>/view  and  /file/d/<ID>/preview  formats
  const match = url.match(/\/file\/d\/([^/]+)/);
  return match ? match[1] : null;
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

export default function ResumeQR() {
  const fileId = driveFileId(profile.resumeUrl);

  // Fallback: if the URL format is unexpected, use the raw URL.
  const qrUrl = fileId
    ? `https://drive.google.com/file/d/${fileId}/preview`
    : profile.resumeUrl;

  const viewUrl = profile.resumeUrl;

  const downloadUrl = fileId
    ? `https://drive.google.com/uc?export=download&id=${fileId}`
    : profile.resumeUrl;

  return (
    <motion.div
      variants={fadeUp}
      custom={3}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      style={{ marginTop: 48 }}
    >
      {/* ── Section eyebrow ── */}
      <div
        style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: "0.72rem",
          fontWeight: 500,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--accent)",
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 20,
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: 28,
            height: 1,
            background: "var(--accent)",
          }}
        />
        ( 01-B ) — Quick Access
      </div>

      {/* ── Card ── */}
      <div
        className="glass-card qr-card"
        style={{
          padding: "36px 32px",
          borderRadius: "var(--radius-lg)",
          display: "flex",
          gap: 36,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {/* Left — QR block */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
            flexShrink: 0,
          }}
        >
          {/* QR frame */}
          <div
            style={{
              padding: 12,
              borderRadius: 12,
              background: "#ffffff",
              boxShadow: "0 0 0 1px rgba(255,90,54,0.25), 0 0 24px rgba(255,90,54,0.12)",
              display: "inline-flex",
              position: "relative",
            }}
          >
            {/* Corner accents */}
            {["tl", "tr", "bl", "br"].map((corner) => (
              <span
                key={corner}
                style={{
                  position: "absolute",
                  width: 12,
                  height: 12,
                  borderColor: "var(--accent)",
                  borderStyle: "solid",
                  borderWidth: 0,
                  ...(corner === "tl" && {
                    top: -1,
                    left: -1,
                    borderTopWidth: 2,
                    borderLeftWidth: 2,
                    borderTopLeftRadius: 12,
                  }),
                  ...(corner === "tr" && {
                    top: -1,
                    right: -1,
                    borderTopWidth: 2,
                    borderRightWidth: 2,
                    borderTopRightRadius: 12,
                  }),
                  ...(corner === "bl" && {
                    bottom: -1,
                    left: -1,
                    borderBottomWidth: 2,
                    borderLeftWidth: 2,
                    borderBottomLeftRadius: 12,
                  }),
                  ...(corner === "br" && {
                    bottom: -1,
                    right: -1,
                    borderBottomWidth: 2,
                    borderRightWidth: 2,
                    borderBottomRightRadius: 12,
                  }),
                }}
              />
            ))}

            <QRCode
              id="resume-qr-code"
              value={qrUrl}
              size={160}
              level="H"
              fgColor="#0d0c0a"
              bgColor="#ffffff"
            />
          </div>

          <span
            style={{
              fontSize: "0.72rem",
              color: "var(--text-muted)",
              fontFamily: "var(--font-mono), monospace",
              letterSpacing: "0.06em",
            }}
          >
            Point camera → scan
          </span>
        </div>

        {/* Right — Text + buttons */}
        <div style={{ flex: 1, minWidth: 200 }}>
          <h3
            style={{
              fontFamily: "var(--font-serif), sans-serif",
              fontSize: "clamp(1.2rem, 2.5vw, 1.5rem)",
              fontWeight: 700,
              color: "var(--text-primary)",
              lineHeight: 1.25,
              marginBottom: 10,
            }}
          >
            Scan to View My{" "}
            <span
              style={{
                background:
                  "linear-gradient(120deg, var(--accent) 0%, var(--accent-hover) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Resume
            </span>
          </h3>

          <p
            style={{
              fontSize: "0.95rem",
              lineHeight: 1.7,
              color: "var(--text-secondary)",
              marginBottom: 24,
              maxWidth: 380,
            }}
          >
            Scan the QR code to view my resume instantly on your phone.
            Opens directly in your browser — no app or sign-in required.
          </p>

          {/* Button row */}
          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            {/* View Resume */}
            <a
              id="resume-view-btn"
              href={viewUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                padding: "10px 22px",
                borderRadius: "var(--radius-full)",
                background: "var(--accent)",
                color: "#fff",
                fontWeight: 600,
                fontSize: "0.9rem",
                transition: "all 0.3s ease",
                border: "1px solid transparent",
                boxShadow: "0 4px 20px var(--accent-dim)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--accent-hover)";
                e.currentTarget.style.boxShadow =
                  "0 6px 28px rgba(255,90,54,0.35)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--accent)";
                e.currentTarget.style.boxShadow =
                  "0 4px 20px var(--accent-dim)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              📄 View Resume
            </a>

            {/* Download Resume */}
            <a
              id="resume-download-btn"
              href={downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                padding: "10px 22px",
                borderRadius: "var(--radius-full)",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
                fontWeight: 500,
                fontSize: "0.9rem",
                transition: "all 0.3s ease",
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--accent)";
                e.currentTarget.style.boxShadow =
                  "0 0 20px var(--accent-dim)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              ⬇️ Download Resume
            </a>
          </div>
        </div>
      </div>

      {/* Responsive styles scoped to this component */}
      <style jsx global>{`
        .qr-card {
          transition: border-color var(--transition), transform var(--transition);
        }
        @media (max-width: 600px) {
          .qr-card {
            flex-direction: column !important;
            align-items: flex-start !important;
            padding: 28px 20px !important;
          }
        }
      `}</style>
    </motion.div>
  );
}
