"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { portfolio } from "@/data/portfolio";

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Neural network particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    interface Particle {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      pulse: number;
      pulseSpeed: number;
    }

    const particles: Particle[] = [];
    const count = Math.min(80, Math.floor(w / 20));

    for (let i = 0; i < count; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      particles.push({
        x,
        y,
        baseX: x,
        baseY: y,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.4 + 0.1,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.005,
      });
    }

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      particles.forEach((p) => {
        p.pulse += p.pulseSpeed;
        const pulseFactor = 0.5 + Math.sin(p.pulse) * 0.5;

        // Subtle mouse interaction
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          p.x -= dx * 0.003;
          p.y -= dy * 0.003;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Gentle drift back
        p.x += (p.baseX - p.x) * 0.001;
        p.y += (p.baseY - p.y) * 0.001;

        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (0.8 + pulseFactor * 0.4), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 180, 255, ${p.alpha * pulseFactor})`;
        ctx.fill();
      });

      // Connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 180, 255, ${0.06 * (1 - dist / 180)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
        }}
      />

      {/* Radial gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(0, 180, 255, 0.05) 0%, transparent 60%), " +
            "radial-gradient(ellipse at 70% 80%, rgba(0, 100, 200, 0.03) 0%, transparent 50%)",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "8rem 2rem 4rem",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "3rem",
          width: "100%",
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}
          className="hero-grid"
        >
          {/* Left: Text */}
          <div>
            <div
              className="animate-fade-in-up"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                color: "var(--accent-primary)",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginBottom: "1.5rem",
              }}
            >
              ASPIRING AI ENGINEER
            </div>

            <h1
              className="animate-fade-in-up delay-100"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
                fontWeight: 800,
                lineHeight: 0.95,
                letterSpacing: "-0.04em",
                marginBottom: "1rem",
                color: "var(--text-primary)",
              }}
            >
              PREM
              <br />
              <span style={{ color: "var(--accent-primary)" }}>THORAT</span>
            </h1>

            <div
              className="animate-fade-in-up delay-200"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                color: "var(--text-muted)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: "2rem",
              }}
            >
              B.TECH CSE — AI &amp; ML &nbsp;·&nbsp; VIT PUNE &nbsp;·&nbsp; INDIA
            </div>

            <p
              className="animate-fade-in-up delay-300"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
                fontWeight: 500,
                lineHeight: 1.4,
                color: "var(--text-secondary)",
                marginBottom: "1rem",
                maxWidth: "520px",
              }}
            >
              {portfolio.tagline}
            </p>

            <p
              className="animate-fade-in-up delay-400"
              style={{
                fontSize: "0.95rem",
                lineHeight: 1.7,
                color: "var(--text-muted)",
                marginBottom: "2.5rem",
                maxWidth: "480px",
              }}
            >
              {portfolio.description}
            </p>

            <div className="animate-fade-in-up delay-500" style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <a href="#projects" className="btn-primary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 3v12" /><circle cx="18" cy="6" r="3" /><circle cx="6" cy="18" r="3" />
                  <path d="M18 9a9 9 0 0 1-9 9" />
                </svg>
                Explore My Work
              </a>
              <a href="#contact" className="btn-secondary">
                Let&apos;s Connect
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right: Portrait */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div
              className="portrait-container animate-fade-in-up delay-300"
              style={{
                position: "relative",
                width: "clamp(260px, 28vw, 380px)",
                aspectRatio: "1 / 1",
              }}
            >
              {/* Ambient circular glow */}
              <div
                style={{
                  position: "absolute",
                  inset: "-12px",
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(0, 180, 255, 0.35) 0%, rgba(0, 100, 220, 0.15) 50%, transparent 75%)",
                  filter: "blur(24px)",
                  zIndex: 0,
                  animation: "glow-pulse 4s ease-in-out infinite",
                }}
              />

              {/* Cyber Radar / AI Vision Reticle HUD Frame */}
              <svg
                style={{
                  position: "absolute",
                  inset: "-22px",
                  width: "calc(100% + 44px)",
                  height: "calc(100% + 44px)",
                  zIndex: 1,
                  pointerEvents: "none",
                }}
                viewBox="0 0 200 200"
              >
                {/* Outer Rotating Dashed Orbit Ring */}
                <circle
                  cx="100"
                  cy="100"
                  r="94"
                  fill="none"
                  stroke="rgba(0, 180, 255, 0.35)"
                  strokeWidth="1.2"
                  strokeDasharray="6 8"
                  style={{
                    transformOrigin: "center",
                    animation: "spin 35s linear infinite",
                  }}
                />
                {/* Secondary Arc Segments */}
                <circle
                  cx="100"
                  cy="100"
                  r="89"
                  fill="none"
                  stroke="rgba(0, 180, 255, 0.6)"
                  strokeWidth="1"
                  strokeDasharray="40 180"
                  style={{
                    transformOrigin: "center",
                    animation: "spin-reverse 20s linear infinite",
                  }}
                />
                <circle
                  cx="100"
                  cy="100"
                  r="84"
                  fill="none"
                  stroke="rgba(0, 180, 255, 0.2)"
                  strokeWidth="0.8"
                />

                {/* 4 Cardinal Crosshairs */}
                <line x1="100" y1="2" x2="100" y2="12" stroke="var(--accent-primary)" strokeWidth="2" />
                <line x1="100" y1="188" x2="100" y2="198" stroke="var(--accent-primary)" strokeWidth="2" />
                <line x1="2" y1="100" x2="12" y2="100" stroke="var(--accent-primary)" strokeWidth="2" />
                <line x1="188" y1="100" x2="198" y2="100" stroke="var(--accent-primary)" strokeWidth="2" />

                {/* Corner Tech Corner Marks */}
                <path d="M 15 30 L 15 15 L 30 15" fill="none" stroke="rgba(0, 180, 255, 0.5)" strokeWidth="1" />
                <path d="M 185 30 L 185 15 L 170 15" fill="none" stroke="rgba(0, 180, 255, 0.5)" strokeWidth="1" />
                <path d="M 15 170 L 15 185 L 30 185" fill="none" stroke="rgba(0, 180, 255, 0.5)" strokeWidth="1" />
                <path d="M 185 170 L 185 185 L 170 185" fill="none" stroke="rgba(0, 180, 255, 0.5)" strokeWidth="1" />
              </svg>

              {/* Scan line effect over circular frame */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  overflow: "hidden",
                  zIndex: 3,
                  pointerEvents: "none",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "3px",
                    background: "linear-gradient(90deg, transparent, rgba(0, 180, 255, 0.6), transparent)",
                    animation: "scan-line 3.5s linear infinite",
                    opacity: 0.7,
                  }}
                />
              </div>

              {/* Portrait image container */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  overflow: "hidden",
                  background: "radial-gradient(circle, #0e122b 0%, #050510 100%)",
                  border: "2px solid rgba(0, 180, 255, 0.4)",
                  boxShadow: "0 0 35px rgba(0, 180, 255, 0.25), inset 0 0 20px rgba(0, 0, 0, 0.7)",
                  zIndex: 2,
                }}
              >
                {!imageError ? (
                  <img
                    src={portfolio.portrait}
                    alt={portfolio.portraitAlt}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center center",
                      opacity: imageLoaded ? 1 : 0,
                      transition: "opacity 0.8s ease",
                    }}
                    onLoad={() => setImageLoaded(true)}
                    onError={() => setImageError(true)}
                  />
                ) : null}

                {/* Placeholder if image not loaded */}
                {(imageError || !imageLoaded) && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "linear-gradient(135deg, var(--bg-card), var(--bg-elevated))",
                      gap: "0.75rem",
                    }}
                  >
                    <div
                      style={{
                        width: "70px",
                        height: "70px",
                        borderRadius: "50%",
                        border: "2px solid var(--accent-primary)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "var(--font-display)",
                        fontSize: "1.75rem",
                        fontWeight: 700,
                        color: "var(--accent-primary)",
                      }}
                    >
                      PT
                    </div>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.65rem",
                        color: "var(--text-muted)",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {imageError ? "Photo not found" : "Loading..."}
                    </span>
                  </div>
                )}
              </div>

              {/* Status pill tag below portrait */}
              <div
                style={{
                  position: "absolute",
                  bottom: "-14px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  zIndex: 4,
                  padding: "0.3rem 0.85rem",
                  background: "rgba(5, 5, 16, 0.9)",
                  border: "1px solid rgba(0, 180, 255, 0.35)",
                  borderRadius: "20px",
                  backdropFilter: "blur(10px)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.45rem",
                  whiteSpace: "nowrap",
                  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.5)",
                }}
              >
                <span
                  style={{
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    background: "#10b981",
                    boxShadow: "0 0 8px #10b981",
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    color: "var(--text-primary)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  Prem Thorat // VIT Pune
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="animate-fade-in delay-700"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
            paddingTop: "2rem",
          }}
        >
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            color: "var(--text-muted)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}>
            Scroll to explore
          </span>
          <div style={{
            width: "1px",
            height: "40px",
            background: "linear-gradient(180deg, var(--accent-primary), transparent)",
            animation: "glow-pulse 2s ease-in-out infinite",
          }} />
        </div>
      </div>

      {/* Responsive styles */}
      <style jsx>{`
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
}
