"use client";
import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "../../lib/hooks/usePrefersReducedMotion";

// WebGL RGB-shift / ripple distortion on hover, scoped to a single project
// thumbnail. This is the one place Curtains.js is used, per the brief — a
// contained hover effect, not a general animation engine. Falls back to a
// plain <img> under prefers-reduced-motion or if WebGL/Curtains fails to
// initialize (the underlying <img> is never removed, so the fallback is
// automatic even without the failed-state branch below).
const vertexShader = `
  #ifdef GL_ES
  precision mediump float;
  #endif

  attribute vec3 aVertexPosition;
  attribute vec2 aTextureCoord;

  uniform mat4 uMVMatrix;
  uniform mat4 uPMatrix;

  uniform mat4 planeTextureMatrix;
  varying vec2 vPlaneTextureCoord;

  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uHover;

  void main() {
    vec3 vertexPosition = aVertexPosition;
    float dist = distance(vertexPosition.xy, uMouse);
    vertexPosition.z += uHover * (0.06 * sin(dist * 6.0 - uTime * 0.05));

    gl_Position = uPMatrix * uMVMatrix * vec4(vertexPosition, 1.0);
    vPlaneTextureCoord = (planeTextureMatrix * vec4(aTextureCoord, 0.0, 1.0)).xy;
  }
`;

const fragmentShader = `
  #ifdef GL_ES
  precision mediump float;
  #endif

  varying vec2 vPlaneTextureCoord;
  uniform sampler2D planeTexture;
  uniform float uHover;

  void main() {
    vec2 uv = vPlaneTextureCoord;
    float shift = 0.008 * uHover;
    vec4 colorR = texture2D(planeTexture, uv + vec2(shift, 0.0));
    vec4 colorG = texture2D(planeTexture, uv);
    vec4 colorB = texture2D(planeTexture, uv - vec2(shift, 0.0));
    gl_FragColor = vec4(colorR.r, colorG.g, colorB.b, colorG.a);
  }
`;

function tweenHoverUniform(plane, target) {
  const start = plane.uniforms.hover.value;
  const duration = 280;
  const startTime = performance.now();
  function step(now) {
    const t = Math.min(1, (now - startTime) / duration);
    plane.uniforms.hover.value = start + (target - start) * t;
    if (t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

export default function CurtainsThumbnail({ src, alt }) {
  const wrapperRef = useRef(null);
  const planeElRef = useRef(null);
  const curtainsRef = useRef(null);
  const planeRef = useRef(null);
  const [failed, setFailed] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    let disposed = false;

    import("curtainsjs")
      .then(({ Curtains, Plane }) => {
        if (disposed || !wrapperRef.current || !planeElRef.current) return;

        const curtains = new Curtains({
          container: wrapperRef.current,
          pixelRatio: Math.min(1.5, window.devicePixelRatio || 1),
          watchScroll: false,
        });
        curtains.onError(() => setFailed(true));
        curtainsRef.current = curtains;

        const plane = new Plane(curtains, planeElRef.current, {
          vertexShader,
          fragmentShader,
          uniforms: {
            time: { name: "uTime", type: "1f", value: 0 },
            mouse: { name: "uMouse", type: "2f", value: [0, 0] },
            hover: { name: "uHover", type: "1f", value: 0 },
          },
        });
        plane.onRender(() => {
          plane.uniforms.time.value++;
        });
        planeRef.current = plane;
      })
      .catch(() => setFailed(true));

    return () => {
      disposed = true;
      curtainsRef.current?.dispose();
    };
  }, [prefersReducedMotion]);

  const handleMouseMove = (e) => {
    const plane = planeRef.current;
    if (!plane || !wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    plane.uniforms.mouse.value = [x, y];
  };

  const handleMouseEnter = () => {
    if (planeRef.current) tweenHoverUniform(planeRef.current, 1);
  };
  const handleMouseLeave = () => {
    if (planeRef.current) tweenHoverUniform(planeRef.current, 0);
  };

  if (prefersReducedMotion || failed) {
    return (
      <img
        src={src}
        alt={alt}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        loading="lazy"
      />
    );
  }

  return (
    <div
      ref={wrapperRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ position: "relative", width: "100%", height: "100%" }}
    >
      <div ref={planeElRef} style={{ width: "100%", height: "100%" }}>
        <img
          src={src}
          alt={alt}
          crossOrigin="anonymous"
          loading="lazy"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    </div>
  );
}
