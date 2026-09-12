"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useInView } from "../../lib/useInView";
import { usePrefersReducedMotion } from "../../lib/hooks/usePrefersReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Samples the pixels of a rendered word into a flat list of {x, y} points
// in a -1..1-ish normalized space, used as the "formed" target for the
// particle field below.
function sampleTextPoints(text, { width = 1000, height = 260, stride = 4 } = {}) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `bold ${Math.floor(height * 0.72)}px Georgia, serif`;
  ctx.fillText(text, width / 2, height / 2 + height * 0.03);

  const { data } = ctx.getImageData(0, 0, width, height);
  const points = [];
  for (let y = 0; y < height; y += stride) {
    for (let x = 0; x < width; x += stride) {
      const alpha = data[(y * width + x) * 4 + 3];
      if (alpha > 120) {
        points.push({
          x: (x - width / 2) / width,
          y: -(y - height / 2) / height,
        });
      }
    }
  }
  return points;
}

// The hero's single WebGL moment: a particle field that assembles into
// "KUNAL" on load, then disperses as the user scrolls past the hero —
// a scroll-driven exit transition rather than a static decoration. Paused
// off-screen, static (fully formed, no motion) under prefers-reduced-motion.
export default function HeroScene() {
  const mountRef = useRef(null);
  const [sectionRef, inView] = useInView({ threshold: 0, rootMargin: "0px" });
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;
    const isSmall = width < 640;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 5.5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    const rawPoints = sampleTextPoints("KUNAL", {
      width: 1000,
      height: 260,
      stride: isSmall ? 6 : 4,
    });
    // Cap the count for performance on any device.
    const maxPoints = isSmall ? 900 : 1600;
    const step = Math.max(1, Math.floor(rawPoints.length / maxPoints));
    const sampled = rawPoints.filter((_, i) => i % step === 0);
    const count = sampled.length;

    const SCALE_X = isSmall ? 4.2 : 6.4;
    // x and y were normalized against different canvas dimensions (width vs
    // height), so y needs its own scale to keep the letterforms undistorted.
    const SCALE_Y = SCALE_X * (260 / 1000);

    const formed = new Float32Array(count * 3);
    const scattered = new Float32Array(count * 3);
    const current = new Float32Array(count * 3);

    sampled.forEach((p, i) => {
      formed[i * 3] = p.x * SCALE_X;
      formed[i * 3 + 1] = p.y * SCALE_Y;
      formed[i * 3 + 2] = (Math.random() - 0.5) * 0.4;

      scattered[i * 3] = (Math.random() - 0.5) * 9;
      scattered[i * 3 + 1] = (Math.random() - 0.5) * 5.5;
      scattered[i * 3 + 2] = (Math.random() - 0.5) * 6;

      // Start scattered; the entrance tween assembles it.
      current[i * 3] = scattered[i * 3];
      current[i * 3 + 1] = scattered[i * 3 + 1];
      current[i * 3 + 2] = scattered[i * 3 + 2];
    });

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(current, 3));

    const material = new THREE.PointsMaterial({
      color: 0xff5a36,
      size: isSmall ? 0.035 : 0.03,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const posAttr = geometry.attributes.position;

    // Two independent 0..1 drivers, combined into one scatter amount:
    // - entranceAmount: 0 at mount -> 1 once the assemble-in tween finishes
    // - scrollAmount: 0 at the top of the hero -> 1 once scrolled past it
    // Displayed scatter = however scattered either driver wants it to be,
    // so the name stays formed until the entrance finishes, then scatters
    // again as the user scrolls down.
    const drivers = { entranceAmount: 0, scrollAmount: 0 };

    function applyScatter() {
      const scatterAmount = Math.max(
        1 - drivers.entranceAmount,
        drivers.scrollAmount
      );
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        posAttr.array[i3] = formed[i3] + (scattered[i3] - formed[i3]) * scatterAmount;
        posAttr.array[i3 + 1] =
          formed[i3 + 1] + (scattered[i3 + 1] - formed[i3 + 1]) * scatterAmount;
        posAttr.array[i3 + 2] =
          formed[i3 + 2] + (scattered[i3 + 2] - formed[i3 + 2]) * scatterAmount;
      }
      posAttr.needsUpdate = true;
    }
    applyScatter();

    // Entrance: assemble the name shortly after mount.
    const entrance = gsap.to(drivers, {
      entranceAmount: 1,
      duration: 1.8,
      delay: 0.4,
      ease: "power3.out",
      onUpdate: applyScatter,
    });

    // Exit: scroll past the hero scatters the particles back apart, tied to
    // the same section the rest of the hero's parallax scrubs against.
    const heroSectionEl = mount.closest("section");
    const scrollTrigger = ScrollTrigger.create({
      trigger: heroSectionEl,
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        drivers.scrollAmount = self.progress;
        applyScatter();
      },
    });

    let frameId;
    let paused = false;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      if (paused) return;
      const delta = clock.getDelta();
      points.rotation.y += delta * 0.04;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    mountRef.current._setPaused = (value) => {
      paused = value;
    };

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(frameId);
      entrance.kill();
      scrollTrigger.kill();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (mountRef.current?._setPaused) {
      mountRef.current._setPaused(!inView);
    }
  }, [inView]);

  if (prefersReducedMotion) {
    return (
      <div
        ref={sectionRef}
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 40%, var(--accent-dim) 0%, transparent 70%)",
        }}
      />
    );
  }

  return (
    <div
      ref={sectionRef}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      <div ref={mountRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}
