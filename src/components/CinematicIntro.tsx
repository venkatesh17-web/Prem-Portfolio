"use client";

import { useEffect, useState, useRef } from "react";

interface CinematicIntroProps {
  onComplete: () => void;
}

export default function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const [phase, setPhase] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Particle animation for intro
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
    }> = [];

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
      });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 180, 255, ${p.alpha})`;
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 180, 255, ${0.05 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animId);
  }, []);

  // Phase timing
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      onComplete();
      return;
    }

    const t1 = setTimeout(() => setPhase(1), 200);
    const t2 = setTimeout(() => setPhase(2), 1000);
    const t3 = setTimeout(() => setPhase(3), 2200);
    const t4 = setTimeout(() => onComplete(), 3000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#050510",
        transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        opacity: phase >= 3 ? 0 : 1,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, opacity: 0.5 }}
      />

      <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
        {/* PT Monogram */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "1.5rem",
            opacity: phase >= 1 ? 1 : 0,
            transform: phase >= 1 ? "scale(1)" : "scale(0.8)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <rect
              x="2"
              y="2"
              width="76"
              height="76"
              rx="16"
              stroke="#00b4ff"
              strokeWidth="1.5"
              style={{
                strokeDasharray: 300,
                strokeDashoffset: phase >= 1 ? 0 : 300,
                transition: "stroke-dashoffset 1s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            />
            <text
              x="40"
              y="50"
              textAnchor="middle"
              fontFamily="'Space Grotesk', sans-serif"
              fontSize="28"
              fontWeight="700"
              fill="#00b4ff"
              style={{
                opacity: phase >= 1 ? 1 : 0,
                transition: "opacity 0.6s ease 0.3s",
              }}
            >
              PT
            </text>
          </svg>
        </div>

        {/* Light sweep line */}
        <div
          style={{
            width: "120px",
            height: "1px",
            margin: "0 auto 1rem",
            background: "linear-gradient(90deg, transparent, #00b4ff, transparent)",
            opacity: phase >= 2 ? 0.8 : 0,
            transform: phase >= 2 ? "scaleX(1)" : "scaleX(0)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />

        {/* Name reveal */}
        <div
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "0.75rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#a0a0b8",
            opacity: phase >= 2 ? 1 : 0,
            transform: phase >= 2 ? "translateY(0)" : "translateY(10px)",
            transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          PREM THORAT
        </div>
      </div>
    </div>
  );
}
