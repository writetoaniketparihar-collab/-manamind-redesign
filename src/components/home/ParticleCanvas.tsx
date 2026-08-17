"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

const FRAME_INTERVAL = 33;

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    let animationId: number;
    let idleCallbackId: ReturnType<typeof setTimeout> | number | undefined;
    let particles: Particle[] = [];
    let time = 0;
    let lastFrameTime = 0;

    let isMounted = true;
    let hasStarted = false;
    let isRunning = false;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      const count = window.innerWidth < 768 ? 35 : 80;
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        radius: Math.random() * 1.5 + 0.5,
      }));
    };

    const draw = (timestamp: number) => {
      if (!isRunning) return;

      const elapsed = timestamp - lastFrameTime;
      if (elapsed >= FRAME_INTERVAL) {
        lastFrameTime = timestamp - (elapsed % FRAME_INTERVAL);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        time += 0.002;
        const connectionRadius = 140;

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          p.vx += Math.sin(time + i * 0.1) * 0.001;
          p.vy += Math.cos(time + i * 0.13) * 0.001;

          const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
          if (speed > 0.2) {
            p.vx = (p.vx / speed) * 0.2;
            p.vy = (p.vy / speed) * 0.2;
          }

          p.vx *= 0.998;
          p.vy *= 0.998;

          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = canvas.width;
          if (p.x > canvas.width) p.x = 0;
          if (p.y < 0) p.y = canvas.height;
          if (p.y > canvas.height) p.y = 0;

          const glow = 0.4 + Math.sin(time * 1.5 + i) * 0.1;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 255, 150, ${glow})`;
          ctx.fill();

          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < connectionRadius) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(0, 255, 150, ${0.12 * (1 - dist / connectionRadius)})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }

      if (isRunning) {
        animationId = requestAnimationFrame(draw);
      }
    };

    const stopLoop = () => {
      isRunning = false;
      cancelAnimationFrame(animationId);
    };

    const startLoop = () => {
      if (!isMounted || !hasStarted || isRunning || document.hidden) return;
      lastFrameTime = performance.now();
      isRunning = true;
      animationId = requestAnimationFrame(draw);
    };

    const onResize = () => {
      resize();
      createParticles();
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        stopLoop();
      } else {
        startLoop();
      }
    };

    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibilityChange);

    resize();
    createParticles();

    const start = () => {
      if (!isMounted) return;
      hasStarted = true;
      startLoop();
    };

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      idleCallbackId = window.requestIdleCallback(start, { timeout: 1000 });
    } else {
      idleCallbackId = setTimeout(start, 200);
    }

    return () => {
      isMounted = false;

      if (typeof idleCallbackId === "number") {
        if (typeof window !== "undefined" && "cancelIdleCallback" in window) {
          window.cancelIdleCallback(idleCallbackId);
        } else {
          clearTimeout(idleCallbackId);
        }
      }

      stopLoop();

      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
