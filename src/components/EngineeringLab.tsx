"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export default function EngineeringLab() {
  const [activeExperiment, setActiveExperiment] = useState(0);
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);

  const experiments = [
    { id: "particles", label: "Neural Network", icon: "⟁" },
    { id: "vision", label: "Vision Sim", icon: "◎" },
    { id: "path", label: "Path Trace", icon: "↝" },
  ];

  // Particle network canvas
  useEffect(() => {
    if (activeExperiment !== 0) return;
    const canvas = particleCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const w = (canvas.width = parent.clientWidth);
    const h = (canvas.height = 400);

    const mouse = { x: w / 2, y: h / 2 };

    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      connections: number[];
      layer: number;
    }

    const nodes: Node[] = [];
    const layers = 4;
    const nodesPerLayer = 6;

    for (let l = 0; l < layers; l++) {
      for (let n = 0; n < nodesPerLayer; n++) {
        const x = (w / (layers + 1)) * (l + 1) + (Math.random() - 0.5) * 30;
        const y = (h / (nodesPerLayer + 1)) * (n + 1) + (Math.random() - 0.5) * 20;
        const connections: number[] = [];

        if (l > 0) {
          for (let prev = 0; prev < nodesPerLayer; prev++) {
            if (Math.random() > 0.4) {
              connections.push((l - 1) * nodesPerLayer + prev);
            }
          }
        }

        nodes.push({ x, y, vx: 0, vy: 0, connections, layer: l });
      }
    }

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    canvas.addEventListener("mousemove", handleMouse);

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // Draw connections
      nodes.forEach((node) => {
        node.connections.forEach((connIdx) => {
          const target = nodes[connIdx];
          const dx = mouse.x - (node.x + target.x) / 2;
          const dy = mouse.y - (node.y + target.y) / 2;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const brightness = Math.max(0.03, Math.min(0.3, 1 - dist / 300));

          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(target.x, target.y);
          ctx.strokeStyle = `rgba(0, 180, 255, ${brightness})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();

          // Traveling signal
          const time = Date.now() / 2000;
          const t = ((time + connIdx * 0.1) % 1);
          const sx = node.x + (target.x - node.x) * t;
          const sy = node.y + (target.y - node.y) * t;

          ctx.beginPath();
          ctx.arc(sx, sy, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 180, 255, ${brightness * 2})`;
          ctx.fill();
        });
      });

      // Draw nodes
      nodes.forEach((node) => {
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const repel = Math.max(0, 1 - dist / 100);

        node.x -= dx * repel * 0.01;
        node.y -= dy * repel * 0.01;

        const brightness = Math.max(0.3, Math.min(1, 1 - dist / 200));

        // Outer glow
        ctx.beginPath();
        ctx.arc(node.x, node.y, 12, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 180, 255, ${brightness * 0.05})`;
        ctx.fill();

        // Node
        ctx.beginPath();
        ctx.arc(node.x, node.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 180, 255, ${brightness})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener("mousemove", handleMouse);
    };
  }, [activeExperiment]);

  return (
    <section id="lab" style={{ position: "relative" }}>
      <div className="glow-line" style={{ marginBottom: "6rem" }} />

      <div className="section-container">
        <div data-animate style={{ opacity: 0 }}>
          <div className="section-number">// 05</div>
          <h2 className="text-display-md" style={{ marginBottom: "1rem" }}>
            Engineering <span style={{ color: "var(--accent-primary)" }}>Lab</span>
          </h2>
          <p className="text-body-lg" style={{ maxWidth: "600px", marginBottom: "2rem" }}>
            Interactive visualizations inspired by AI, neural networks, and robotics.
          </p>
        </div>

        {/* Experiment selector */}
        <div data-animate style={{ opacity: 0, display: "flex", gap: "0.75rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
          {experiments.map((exp, i) => (
            <button
              key={exp.id}
              onClick={() => setActiveExperiment(i)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.6rem 1.25rem",
                background: activeExperiment === i ? "rgba(0,180,255,0.12)" : "rgba(255,255,255,0.02)",
                border: `1px solid ${activeExperiment === i ? "var(--accent-primary)" : "var(--border-subtle)"}`,
                borderRadius: "var(--radius-md)",
                color: activeExperiment === i ? "var(--accent-primary)" : "var(--text-muted)",
                fontFamily: "var(--font-body)",
                fontSize: "0.8rem",
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              <span style={{ fontSize: "1rem" }}>{exp.icon}</span>
              {exp.label}
            </button>
          ))}
        </div>

        {/* Visualization container */}
        <div
          data-animate
          style={{
            opacity: 0,
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--border-subtle)",
            background: "rgba(5, 5, 16, 0.6)",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* Neural Network */}
          {activeExperiment === 0 && (
            <div style={{ position: "relative" }}>
              <canvas ref={particleCanvasRef} style={{ display: "block", width: "100%", height: "400px" }} />
              <div style={{
                position: "absolute",
                top: "1rem",
                left: "1.5rem",
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                color: "var(--text-muted)",
                letterSpacing: "0.1em",
              }}>
                INTERACTIVE NEURAL NETWORK · MOVE YOUR CURSOR
              </div>
            </div>
          )}

          {/* Computer Vision Simulation */}
          {activeExperiment === 1 && (
            <div style={{ padding: "2rem", minHeight: "400px", position: "relative" }}>
              <div style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                color: "var(--text-muted)",
                letterSpacing: "0.1em",
                marginBottom: "1.5rem",
              }}>
                COMPUTER VISION SIMULATION · ILLUSTRATIVE DEMO
              </div>

              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1.5rem",
                maxWidth: "700px",
                margin: "0 auto",
              }}
                className="vision-grid"
              >
                {/* Feed 1 */}
                <div style={{
                  background: "rgba(0,0,0,0.3)",
                  borderRadius: "var(--radius-md)",
                  padding: "1rem",
                  border: "1px solid var(--border-subtle)",
                }}>
                  <div style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6rem",
                    color: "var(--accent-primary)",
                    marginBottom: "0.75rem",
                  }}>
                    CAM_01 · FRAME ANALYSIS
                  </div>
                  <svg width="100%" viewBox="0 0 200 140" style={{ display: "block" }}>
                    <rect width="200" height="140" fill="#0a0a14" rx="4" />
                    <rect x="20" y="20" width="60" height="80" rx="3" fill="none" stroke="#00b4ff" strokeWidth="1" opacity="0.6">
                      <animate attributeName="opacity" values="0.6;0.3;0.6" dur="2s" repeatCount="indefinite" />
                    </rect>
                    <rect x="100" y="40" width="40" height="50" rx="3" fill="none" stroke="#4ade80" strokeWidth="1" opacity="0.5">
                      <animate attributeName="opacity" values="0.5;0.2;0.5" dur="3s" repeatCount="indefinite" />
                    </rect>
                    <text x="22" y="16" fontSize="6" fill="#00b4ff" fontFamily="'JetBrains Mono'">OBJ_01</text>
                    <text x="102" y="36" fontSize="6" fill="#4ade80" fontFamily="'JetBrains Mono'">OBJ_02</text>
                    <text x="10" y="135" fontSize="5" fill="#6a6a80" fontFamily="'JetBrains Mono'">RESOLUTION: 640x480</text>
                  </svg>
                </div>

                {/* Feed 2 */}
                <div style={{
                  background: "rgba(0,0,0,0.3)",
                  borderRadius: "var(--radius-md)",
                  padding: "1rem",
                  border: "1px solid var(--border-subtle)",
                }}>
                  <div style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6rem",
                    color: "#06b6d4",
                    marginBottom: "0.75rem",
                  }}>
                    PROCESSING · EDGE DETECTION
                  </div>
                  <svg width="100%" viewBox="0 0 200 140" style={{ display: "block" }}>
                    <rect width="200" height="140" fill="#0a0a14" rx="4" />
                    {/* Edge detection lines */}
                    {Array.from({ length: 12 }).map((_, i) => (
                      <line key={i}
                        x1={20 + Math.random() * 160}
                        y1={20 + Math.random() * 100}
                        x2={20 + Math.random() * 160}
                        y2={20 + Math.random() * 100}
                        stroke={`rgba(6, 182, 212, ${0.2 + Math.random() * 0.4})`}
                        strokeWidth="0.5"
                      />
                    ))}
                    {Array.from({ length: 8 }).map((_, i) => (
                      <circle key={`c${i}`}
                        cx={30 + Math.random() * 140}
                        cy={20 + Math.random() * 100}
                        r="1.5"
                        fill="#06b6d4"
                        opacity={0.3 + Math.random() * 0.5}
                      />
                    ))}
                    <text x="10" y="135" fontSize="5" fill="#6a6a80" fontFamily="'JetBrains Mono'">FILTER: CANNY_EDGE</text>
                  </svg>
                </div>
              </div>

              <div style={{
                textAlign: "center",
                marginTop: "1.5rem",
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                color: "var(--text-muted)",
                opacity: 0.6,
              }}>
                Note: This is an illustrative simulation, not actual project output.
              </div>
            </div>
          )}

          {/* Path Following Simulation */}
          {activeExperiment === 2 && (
            <div style={{ padding: "2rem", minHeight: "400px" }}>
              <div style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                color: "var(--text-muted)",
                letterSpacing: "0.1em",
                marginBottom: "1.5rem",
              }}>
                PATH FOLLOWING SIMULATION · ILLUSTRATIVE DEMO
              </div>

              <svg width="100%" viewBox="0 0 600 300" style={{ display: "block", maxWidth: "100%" }}>
                <rect width="600" height="300" fill="#060612" rx="8" />

                {/* Grid */}
                {Array.from({ length: 16 }).map((_, i) => (
                  <line key={`g${i}`} x1={i * 40} y1="0" x2={i * 40} y2="300" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
                ))}
                {Array.from({ length: 8 }).map((_, i) => (
                  <line key={`h${i}`} x1="0" y1={i * 40} x2="600" y2={i * 40} stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
                ))}

                {/* Track */}
                <path
                  d="M 50 150 Q 100 50 200 80 Q 300 110 350 180 Q 400 250 480 200 Q 560 150 550 100"
                  fill="none"
                  stroke="rgba(129, 140, 248, 0.2)"
                  strokeWidth="30"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Center line */}
                <path
                  d="M 50 150 Q 100 50 200 80 Q 300 110 350 180 Q 400 250 480 200 Q 560 150 550 100"
                  fill="none"
                  stroke="rgba(129, 140, 248, 0.5)"
                  strokeWidth="2"
                  strokeDasharray="10 5"
                >
                  <animate attributeName="stroke-dashoffset" values="0;-30" dur="2s" repeatCount="indefinite" />
                </path>

                {/* Vehicle */}
                <circle r="6" fill="#818cf8">
                  <animateMotion
                    path="M 50 150 Q 100 50 200 80 Q 300 110 350 180 Q 400 250 480 200 Q 560 150 550 100"
                    dur="6s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle r="12" fill="none" stroke="rgba(129,140,248,0.2)" strokeWidth="1">
                  <animateMotion
                    path="M 50 150 Q 100 50 200 80 Q 300 110 350 180 Q 400 250 480 200 Q 560 150 550 100"
                    dur="6s"
                    repeatCount="indefinite"
                  />
                </circle>

                {/* Waypoints */}
                {[
                  { x: 50, y: 150 },
                  { x: 200, y: 80 },
                  { x: 350, y: 180 },
                  { x: 480, y: 200 },
                  { x: 550, y: 100 },
                ].map((wp, i) => (
                  <g key={i}>
                    <circle cx={wp.x} cy={wp.y} r="3" fill="none" stroke="rgba(129,140,248,0.3)" strokeWidth="1" />
                    <text x={wp.x + 8} y={wp.y + 4} fontSize="7" fill="#6a6a80" fontFamily="'JetBrains Mono'">
                      WP{i + 1}
                    </text>
                  </g>
                ))}

                {/* HUD */}
                <text x="20" y="25" fontSize="8" fill="#818cf8" fontFamily="'JetBrains Mono'">
                  MODE: AUTONOMOUS
                </text>
                <text x="20" y="40" fontSize="8" fill="#4ade80" fontFamily="'JetBrains Mono'">
                  TRACK: FOLLOWING
                </text>
                <text x="20" y="285" fontSize="7" fill="#6a6a80" fontFamily="'JetBrains Mono'">
                  ILLUSTRATIVE SIMULATION
                </text>
              </svg>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 640px) {
          .vision-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
