"use client";

import { useState } from "react";
import { portfolio } from "@/data/portfolio";

export default function ProjectsSection() {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  return (
    <section id="projects" style={{ position: "relative" }}>
      <div className="glow-line" style={{ marginBottom: "6rem" }} />

      <div className="section-container">
        <div data-animate style={{ opacity: 0 }}>
          <div className="section-number">// 04</div>
          <h2 className="text-display-md" style={{ marginBottom: "1rem" }}>
            Featured <span style={{ color: "var(--accent-primary)" }}>Projects</span>
          </h2>
          <p className="text-body-lg" style={{ maxWidth: "600px", marginBottom: "4rem" }}>
            Hands-on projects exploring computer vision, robotics, and intelligent systems.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
          {/* PROJECT 01: Smart Monitoring System */}
          <div data-animate style={{ opacity: 0 }}>
            <div
              className="project-card card-glass"
              style={{
                padding: 0,
                overflow: "hidden",
                cursor: "pointer",
              }}
              onClick={() => setExpandedProject(
                expandedProject === "smart-monitoring-system" ? null : "smart-monitoring-system"
              )}
              role="button"
              tabIndex={0}
              aria-expanded={expandedProject === "smart-monitoring-system"}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setExpandedProject(
                    expandedProject === "smart-monitoring-system" ? null : "smart-monitoring-system"
                  );
                }
              }}
            >
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                minHeight: "400px",
              }}
                className="project-grid"
              >
                {/* Visual */}
                <div style={{
                  position: "relative",
                  background: "linear-gradient(135deg, #080818, #0d1025)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  padding: "2rem",
                }}>
                  {/* Computer vision inspired visual */}
                  <svg width="280" height="220" viewBox="0 0 280 220" style={{ maxWidth: "100%" }}>
                    {/* Grid */}
                    {Array.from({ length: 8 }).map((_, i) => (
                      <line key={`h${i}`} x1="0" y1={i * 30 + 10} x2="280" y2={i * 30 + 10}
                        stroke="rgba(0,180,255,0.04)" strokeWidth="0.5" />
                    ))}
                    {Array.from({ length: 10 }).map((_, i) => (
                      <line key={`v${i}`} x1={i * 30 + 10} y1="0" x2={i * 30 + 10} y2="220"
                        stroke="rgba(0,180,255,0.04)" strokeWidth="0.5" />
                    ))}

                    {/* Detection frame 1 */}
                    <rect x="30" y="30" width="100" height="120" rx="4"
                      fill="none" stroke="#00b4ff" strokeWidth="1.5" opacity="0.6"
                      strokeDasharray="8 4">
                      <animate attributeName="stroke-dashoffset" values="0;24" dur="3s" repeatCount="indefinite" />
                    </rect>
                    <text x="35" y="25" fill="#00b4ff" fontSize="8" fontFamily="'JetBrains Mono'" opacity="0.7">
                      ZONE_A [ACTIVE]
                    </text>

                    {/* Detection frame 2 */}
                    <rect x="160" y="50" width="90" height="80" rx="4"
                      fill="none" stroke="#06b6d4" strokeWidth="1.5" opacity="0.5"
                      strokeDasharray="6 6">
                      <animate attributeName="stroke-dashoffset" values="0;24" dur="4s" repeatCount="indefinite" />
                    </rect>
                    <text x="165" y="45" fill="#06b6d4" fontSize="8" fontFamily="'JetBrains Mono'" opacity="0.7">
                      ZONE_B [SCAN]
                    </text>

                    {/* Status indicators */}
                    <circle cx="40" cy="180" r="4" fill="#4ade80">
                      <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <text x="50" y="183" fill="#a0a0b8" fontSize="7" fontFamily="'JetBrains Mono'">
                      SYSTEM: ONLINE
                    </text>

                    <circle cx="40" cy="200" r="4" fill="#00b4ff">
                      <animate attributeName="opacity" values="1;0.5;1" dur="3s" repeatCount="indefinite" />
                    </circle>
                    <text x="50" y="203" fill="#a0a0b8" fontSize="7" fontFamily="'JetBrains Mono'">
                      MONITORING: ACTIVE
                    </text>

                    {/* Scan line */}
                    <line x1="0" y1="0" x2="280" y2="0" stroke="rgba(0,180,255,0.3)" strokeWidth="1">
                      <animate attributeName="y1" values="0;220;0" dur="5s" repeatCount="indefinite" />
                      <animate attributeName="y2" values="0;220;0" dur="5s" repeatCount="indefinite" />
                    </line>
                  </svg>

                  <div style={{
                    position: "absolute",
                    bottom: "1rem",
                    right: "1rem",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6rem",
                    color: "var(--text-muted)",
                    opacity: 0.5,
                    letterSpacing: "0.1em",
                  }}>
                    ILLUSTRATIVE VISUAL
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: "2.5rem" }}>
                  <div style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.7rem",
                    color: "var(--accent-primary)",
                    letterSpacing: "0.2em",
                    marginBottom: "0.5rem",
                  }}>
                    PROJECT 01
                  </div>

                  <h3 style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.5rem, 3vw, 2rem)",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    marginBottom: "0.5rem",
                  }}>
                    Smart Monitoring System
                  </h3>

                  <div style={{
                    display: "inline-flex",
                    padding: "0.3rem 0.75rem",
                    background: "rgba(0,180,255,0.08)",
                    border: "1px solid rgba(0,180,255,0.15)",
                    borderRadius: "999px",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    color: "var(--accent-ice)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: "1.5rem",
                  }}>
                    Computer Vision
                  </div>

                  <p style={{
                    fontSize: "0.95rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.7,
                    marginBottom: "1.5rem",
                  }}>
                    {portfolio.projects[0].overview}
                  </p>

                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    color: "var(--accent-primary)",
                    fontSize: "0.8rem",
                    fontWeight: 500,
                  }}>
                    <span>{expandedProject === "smart-monitoring-system" ? "Hide details" : "View details"}</span>
                    <svg
                      width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                      style={{
                        transform: expandedProject === "smart-monitoring-system" ? "rotate(180deg)" : "rotate(0)",
                        transition: "transform 0.3s ease",
                      }}
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Expanded details */}
              {expandedProject === "smart-monitoring-system" && (
                <div style={{
                  padding: "2rem 2.5rem",
                  borderTop: "1px solid var(--border-subtle)",
                  background: "rgba(5,5,16,0.5)",
                  animation: "fadeInUp 0.4s ease",
                }}>
                  <p style={{
                    fontSize: "0.85rem",
                    color: "var(--text-muted)",
                    fontStyle: "italic",
                    lineHeight: 1.6,
                  }}>
                    Detailed project information including problem statement, solution approach,
                    technologies used, and implementation details will be added as the project develops.
                    Screenshots and demo links will be included when available.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* PROJECT 02: Line Following Vehicle */}
          <div data-animate style={{ opacity: 0 }}>
            <div
              className="project-card card-glass"
              style={{
                padding: 0,
                overflow: "hidden",
                cursor: "pointer",
              }}
              onClick={() => setExpandedProject(
                expandedProject === "line-following-vehicle" ? null : "line-following-vehicle"
              )}
              role="button"
              tabIndex={0}
              aria-expanded={expandedProject === "line-following-vehicle"}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setExpandedProject(
                    expandedProject === "line-following-vehicle" ? null : "line-following-vehicle"
                  );
                }
              }}
            >
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                minHeight: "400px",
              }}
                className="project-grid"
              >
                {/* Content (reversed order) */}
                <div style={{ padding: "2.5rem" }}>
                  <div style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.7rem",
                    color: "var(--accent-primary)",
                    letterSpacing: "0.2em",
                    marginBottom: "0.5rem",
                  }}>
                    PROJECT 02
                  </div>

                  <h3 style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.5rem, 3vw, 2rem)",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    marginBottom: "0.5rem",
                  }}>
                    Line Following Vehicle
                  </h3>

                  <div style={{
                    display: "inline-flex",
                    padding: "0.3rem 0.75rem",
                    background: "rgba(129, 140, 248, 0.08)",
                    border: "1px solid rgba(129, 140, 248, 0.15)",
                    borderRadius: "999px",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    color: "#a5b4fc",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: "1.5rem",
                  }}>
                    Robotics
                  </div>

                  <p style={{
                    fontSize: "0.95rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.7,
                    marginBottom: "1.5rem",
                  }}>
                    {portfolio.projects[1].overview}
                  </p>

                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    color: "var(--accent-primary)",
                    fontSize: "0.8rem",
                    fontWeight: 500,
                  }}>
                    <span>{expandedProject === "line-following-vehicle" ? "Hide details" : "View details"}</span>
                    <svg
                      width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                      style={{
                        transform: expandedProject === "line-following-vehicle" ? "rotate(180deg)" : "rotate(0)",
                        transition: "transform 0.3s ease",
                      }}
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </div>
                </div>

                {/* Visual */}
                <div style={{
                  position: "relative",
                  background: "linear-gradient(135deg, #080818, #0d1025)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  padding: "2rem",
                }}>
                  {/* Robotics / path following visual */}
                  <svg width="280" height="220" viewBox="0 0 280 220" style={{ maxWidth: "100%" }}>
                    {/* Track path */}
                    <path
                      d="M 40 110 Q 80 40 140 60 Q 200 80 220 140 Q 240 200 200 200 Q 160 200 140 160 Q 120 120 80 140 Q 40 160 40 110"
                      fill="none"
                      stroke="rgba(129, 140, 248, 0.3)"
                      strokeWidth="16"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 40 110 Q 80 40 140 60 Q 200 80 220 140 Q 240 200 200 200 Q 160 200 140 160 Q 120 120 80 140 Q 40 160 40 110"
                      fill="none"
                      stroke="rgba(129, 140, 248, 0.6)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeDasharray="8 4"
                    >
                      <animate attributeName="stroke-dashoffset" values="0;-24" dur="2s" repeatCount="indefinite" />
                    </path>

                    {/* Vehicle indicator */}
                    <circle r="8" fill="#818cf8">
                      <animateMotion
                        path="M 40 110 Q 80 40 140 60 Q 200 80 220 140 Q 240 200 200 200 Q 160 200 140 160 Q 120 120 80 140 Q 40 160 40 110"
                        dur="8s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle r="14" fill="none" stroke="rgba(129,140,248,0.3)" strokeWidth="1">
                      <animateMotion
                        path="M 40 110 Q 80 40 140 60 Q 200 80 220 140 Q 240 200 200 200 Q 160 200 140 160 Q 120 120 80 140 Q 40 160 40 110"
                        dur="8s"
                        repeatCount="indefinite"
                      />
                      <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
                    </circle>

                    {/* Sensor indicators */}
                    <text x="20" y="15" fill="#a0a0b8" fontSize="7" fontFamily="'JetBrains Mono'">
                      SENSOR: IR_ARRAY
                    </text>
                    <text x="20" y="27" fill="#4ade80" fontSize="7" fontFamily="'JetBrains Mono'">
                      STATUS: TRACKING
                    </text>

                    {/* Direction arrows on track */}
                    <text x="130" y="45" fill="rgba(129,140,248,0.4)" fontSize="8" fontFamily="'JetBrains Mono'">▸</text>
                    <text x="230" y="160" fill="rgba(129,140,248,0.4)" fontSize="8" fontFamily="'JetBrains Mono'">▸</text>
                    <text x="60" y="155" fill="rgba(129,140,248,0.4)" fontSize="8" fontFamily="'JetBrains Mono'">▸</text>
                  </svg>

                  <div style={{
                    position: "absolute",
                    bottom: "1rem",
                    right: "1rem",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6rem",
                    color: "var(--text-muted)",
                    opacity: 0.5,
                    letterSpacing: "0.1em",
                  }}>
                    ILLUSTRATIVE VISUAL
                  </div>
                </div>
              </div>

              {/* Expanded details */}
              {expandedProject === "line-following-vehicle" && (
                <div style={{
                  padding: "2rem 2.5rem",
                  borderTop: "1px solid var(--border-subtle)",
                  background: "rgba(5,5,16,0.5)",
                  animation: "fadeInUp 0.4s ease",
                }}>
                  <p style={{
                    fontSize: "0.85rem",
                    color: "var(--text-muted)",
                    fontStyle: "italic",
                    lineHeight: 1.6,
                  }}>
                    Detailed specifications including vehicle design, components, sensors, controller,
                    control algorithm, and demonstration media will be added as more information becomes available.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .project-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
