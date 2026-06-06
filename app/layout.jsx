// app/layout.jsx
"use client"; // Ab is file me hum custom hook use karenge
import { Sora, Inter } from "next/font/google";
import { useState, useEffect } from "react"; // <-- Import karo
import Script from "next/script"; 
import LenisWrapper from "./components/LenisWrapper";
import SnakeGame from "./components/SnakeGame"; // <-- Import SnakeGame
import "./globals.css";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

// Metadata definition (Is file ke end me move karega kyunki ab ye file 'use client' hai)
const siteMetadata = {
  title: "Kunal Gupta | Developer Portfolio",
  description: "Full Stack Developer & Game Creator — building modern web apps and interactive games.",
  icons: { icon: "/icon.ico" },
};

export default function RootLayout({ children }) {
  // Easter Egg (Game Trigger) logic
  const [showGame, setShowGame] = useState(false);
  const [inputBuffer, setInputBuffer] = useState("");
  const secretCode = "game"; // Ye word type karna hai

  useEffect(() => {
    const handleKeyDetection = (e) => {
      // Input capture logic
      const newInputBuffer = (inputBuffer + e.key.toLowerCase()).slice(-secretCode.length);
      setInputBuffer(newInputBuffer);

      if (newInputBuffer === secretCode) {
        setShowGame(true);
        setInputBuffer(""); // Buffer reset
      }

      // Escape key to close
      if(e.key === "Escape"){
        setShowGame(false);
      }
    };

    window.addEventListener("keydown", handleKeyDetection);
    return () => window.removeEventListener("keydown", handleKeyDetection);
  }, [inputBuffer]);

  return (
    <html lang="en" className={`${sora.variable} ${inter.variable}`}>
      <head>
        <title>{siteMetadata.title}</title>
        <meta name="description" content={siteMetadata.description} />
        <link rel="icon" href={siteMetadata.icons.icon} />
      </head>
      <body style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", position: 'relative' }}>
        <LenisWrapper>{children}</LenisWrapper>

        {/* --- FLOATING GAME HINT BUTTON --- */}
        {!showGame && (
          <button
            onClick={() => setShowGame(true)}
            aria-label="Play Snake Game"
            style={{
              position: "fixed",
              bottom: 24,
              left: 24,
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #4ade80 0%, #22c55e 100%)",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.3rem",
              zIndex: 9998,
              boxShadow: "0 4px 20px rgba(74, 222, 128, 0.35)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              animation: "game-fab-pulse 2.5s ease-in-out infinite",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.15)";
              e.currentTarget.style.boxShadow = "0 6px 28px rgba(74, 222, 128, 0.5)";
              e.currentTarget.querySelector(".game-tooltip").style.opacity = "1";
              e.currentTarget.querySelector(".game-tooltip").style.transform = "translateX(0)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(74, 222, 128, 0.35)";
              e.currentTarget.querySelector(".game-tooltip").style.opacity = "0";
              e.currentTarget.querySelector(".game-tooltip").style.transform = "translateX(-8px)";
            }}
          >
            🎮
            <span
              className="game-tooltip"
              style={{
                position: "absolute",
                left: "calc(100% + 12px)",
                whiteSpace: "nowrap",
                backgroundColor: "rgba(30, 30, 30, 0.95)",
                color: "#fff",
                padding: "6px 14px",
                borderRadius: 8,
                fontSize: "0.8rem",
                fontWeight: 500,
                opacity: 0,
                transform: "translateX(-8px)",
                transition: "all 0.25s ease",
                pointerEvents: "none",
                border: "1px solid rgba(74, 222, 128, 0.3)",
                backdropFilter: "blur(8px)",
              }}
            >
              🐍 Play Snake Game!
            </span>
          </button>
        )}

        <style jsx global>{`
          @keyframes game-fab-pulse {
            0%, 100% { box-shadow: 0 4px 20px rgba(74, 222, 128, 0.35); }
            50% { box-shadow: 0 4px 28px rgba(74, 222, 128, 0.55); }
          }
        `}</style>

        {/* --- GAME MODAL START --- */}
        {showGame && (
          <div
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowGame(false);
            }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.92)",
              zIndex: 99999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 16,
            }}
          >
            {/* Modal Container */}
            <div
              style={{
                position: "relative",
                backgroundColor: "#1a1a2e",
                padding: "24px 20px",
                borderRadius: 16,
                border: "2px solid rgba(74, 222, 128, 0.4)",
                maxWidth: "95vw",
                maxHeight: "95vh",
                overflow: "auto",
                boxShadow: "0 0 40px rgba(74, 222, 128, 0.15)",
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowGame(false)}
                style={{
                  position: "absolute",
                  top: 8,
                  right: 12,
                  background: "none",
                  border: "none",
                  color: "#aaa",
                  fontSize: "1.4rem",
                  cursor: "pointer",
                  padding: 4,
                  lineHeight: 1,
                  transition: "color 0.2s",
                  zIndex: 1,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#aaa")}
              >
                ✕
              </button>

              <SnakeGame />

              <div
                style={{
                  textAlign: "center",
                  color: "#555",
                  marginTop: 8,
                  fontSize: "0.75rem",
                }}
              >
                Tap ✕ or press Esc to close
              </div>
            </div>
          </div>
        )}
        {/* --- GAME MODAL END --- */}

        {/* --- CHATBASE SCRIPT START --- */}
        {/* (Tumhara purana Chatbase code yahan rahega) */}
        <Script id="chatbase-script" strategy="lazyOnload">
          {`
            (function(){if(!window.chatbase||window.chatbase("getState")!=="initialized"){window.chatbase=(...arguments)=>{if(!window.chatbase.q){window.chatbase.q=[]}window.chatbase.q.push(arguments)};window.chatbase=new Proxy(window.chatbase,{get(target,prop){if(prop==="q"){return target.q}return(...args)=>target(prop,...args)}})}const onLoad=function(){const script=document.createElement("script");script.src="https://www.chatbase.co/embed.min.js";script.id="jYP_eJcjiQESniY7UCSCj";script.domain="www.chatbase.co";document.body.appendChild(script)};if(document.readyState==="complete"){onLoad()}else{window.addEventListener("load",onLoad)}})();
          `}
        </Script>
        {/* --- CHATBASE SCRIPT END --- */}
      </body>
    </html>
  );
}