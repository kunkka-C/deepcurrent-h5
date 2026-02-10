"use client";

import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  driftX: number;
  driftY: number;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef(0);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isTouchDevice =
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(hover: none), (pointer: coarse)").matches;
    const isMobileViewport = window.innerWidth < 768;

    // Mobile keeps 30 particles. Touch desktop/tablet gets a reduced count.
    const particleCount = isMobileViewport ? 30 : isTouchDevice ? 45 : 60;
    const colors = ["#00D4FF", "#7C3AED"];
    const targetFps = isTouchDevice ? 24 : 30;
    const frameInterval = 1000 / targetFps;
    const movementDamping = isTouchDevice ? 0.988 : 0.985;
    const randomForce = isTouchDevice ? 0.0009 : 0.0016;

    const resetParticles = (width: number, height: number) => {
      particlesRef.current = Array.from({ length: particleCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        size: Math.random() * 2 + 2, // 2-4px
        color: colors[Math.floor(Math.random() * colors.length)],
        driftX: (Math.random() - 0.5) * 0.03,
        driftY: (Math.random() - 0.5) * 0.03,
      }));
    };

    const resizeCanvas = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (particlesRef.current.length === 0) {
        resetParticles(width, height);
        return;
      }

      particlesRef.current.forEach((particle) => {
        particle.x = Math.min(width, Math.max(0, particle.x));
        particle.y = Math.min(height, Math.max(0, particle.y));
      });
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      mouseRef.current = { x: event.clientX, y: event.clientY };
    };

    const handlePointerOut = (event: PointerEvent) => {
      if (event.relatedTarget !== null) return;
      mouseRef.current = { x: -9999, y: -9999 };
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerout", handlePointerOut, { passive: true });

    const render = (now: number) => {
      if (document.hidden) {
        animationFrameRef.current = null;
        return;
      }

      const elapsed = now - lastFrameTimeRef.current;
      if (elapsed < frameInterval) {
        animationFrameRef.current = requestAnimationFrame(render);
        return;
      }
      lastFrameTimeRef.current = now;

      const width = window.innerWidth;
      const height = window.innerHeight;
      ctx.clearRect(0, 0, width, height);

      const particles = particlesRef.current;

      particles.forEach((particle) => {
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 100 && dist > 0.001) {
          const avoidForce = ((100 - dist) / 100) * (isTouchDevice ? 0.008 : 0.014);
          particle.vx -= (dx / dist) * avoidForce;
          particle.vy -= (dy / dist) * avoidForce;
        }

        // Slow floating with lightweight random drift.
        particle.vx += particle.driftX * (isTouchDevice ? 0.35 : 0.45);
        particle.vy += particle.driftY * (isTouchDevice ? 0.35 : 0.45);

        if (!isTouchDevice) {
          particle.vx += (Math.random() - 0.5) * randomForce;
          particle.vy += (Math.random() - 0.5) * randomForce;
        }

        particle.vx *= movementDamping;
        particle.vy *= movementDamping;
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > width) {
          particle.vx *= -1;
          particle.x = Math.min(width, Math.max(0, particle.x));
        }
        if (particle.y < 0 || particle.y > height) {
          particle.vy *= -1;
          particle.y = Math.min(height, Math.max(0, particle.y));
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });

      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle =
              particles[(i + j) % particles.length].color === "#7C3AED"
                ? "rgba(124, 58, 237, 0.2)"
                : "rgba(0, 212, 255, 0.2)";
            ctx.stroke();
          }
        }
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    const startAnimation = () => {
      if (animationFrameRef.current !== null) return;
      lastFrameTimeRef.current = performance.now();
      animationFrameRef.current = requestAnimationFrame(render);
    };

    const stopAnimation = () => {
      if (animationFrameRef.current === null) return;
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopAnimation();
      } else {
        startAnimation();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    startAnimation();
    setIsVisible(true);

    return () => {
      stopAnimation();
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerout", handlePointerOut);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: "opacity 2000ms ease",
      }}
    />
  );
}
