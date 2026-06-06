"use client";
import { useRef, useState } from "react";

/**
 * 3D Tilt Card — wraps children with a perspective-based tilt effect on mouse hover.
 * Props:
 *   - children: content inside the card
 *   - className: optional CSS class (e.g. "glass-card")
 *   - style: optional inline styles
 *   - tiltIntensity: max tilt degrees (default: 12)
 *   - glareEnabled: show glare overlay (default: true)
 *   - scale: hover scale factor (default: 1.02)
 */
export default function TiltCard({
  children,
  className = "",
  style = {},
  tiltIntensity = 12,
  glareEnabled = true,
  scale = 1.02,
  ...rest
}) {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState("");
  const [glareStyle, setGlareStyle] = useState({ opacity: 0 });

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -tiltIntensity;
    const rotateY = ((x - centerX) / centerX) * tiltIntensity;

    setTransform(
      `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`
    );

    if (glareEnabled) {
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;
      setGlareStyle({
        opacity: 0.15,
        background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.25) 0%, transparent 60%)`,
      });
    }
  };

  const handleMouseLeave = () => {
    setTransform(
      "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
    );
    setGlareStyle({ opacity: 0 });
  };

  return (
    <div
      ref={cardRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        transform,
        transition: "transform 0.15s ease-out",
        transformStyle: "preserve-3d",
        position: "relative",
        overflow: "hidden",
        willChange: "transform",
      }}
      {...rest}
    >
      {children}

      {/* Glare overlay */}
      {glareEnabled && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            pointerEvents: "none",
            transition: "opacity 0.2s ease",
            ...glareStyle,
          }}
        />
      )}
    </div>
  );
}
