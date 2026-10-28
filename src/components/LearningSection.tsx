"use client";

import { useState, type ReactNode } from "react";
import { portfolio } from "@/data/portfolio";

export default function LearningSection() {
  const [activeInterest, setActiveInterest] = useState<number | null>(null);

  const iconMap: Record<string, ReactNode> = {
    code: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    brain: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z" />
        <line x1="9" y1="22" x2="15" y2="22" /><line x1="10" y1="19" x2="14" y2="19" />
      </svg>
    ),
    eye: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
      </svg>
    ),
    cpu: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" />
        <line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" />
        <line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" />
        <line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" />
        <line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" />
      </svg>
    ),
    bot: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="10" rx="2" /><circle cx="12" cy="5" r="2" />
        <line x1="12" y1="7" x2="12" y2="11" />
        <line x1="8" y1="16" x2="8" y2="16" /><line x1="16" y1="16" x2="16" y2="16" />
      </svg>
    ),
    flask: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 3h6v6l5 8H4l5-8V3z" /><line x1="8" y1="3" x2="16" y2="3" />
      </svg>
    ),
  };

  return (
    <section id="learning" style={{ position: "relative" }}>
      <div className="glow-line" style={{ marginBottom: "6rem" }} />

      <div className="section-container">
        <div data-animate style={{ opacity: 0 }}>
          <div className="section-number">// 06</div>
          <h2 className="text-display-md" style={{ marginBottom: "1rem" }}>
            Learning &amp; <span style={{ color: "var(--accent-primary)" }}>Exploration</span>
          </h2>
          <p className="text-body-lg" style={{ maxWidth: "600px", marginBottom: "3rem" }}>
            Areas I&apos;m actively exploring and building expertise in.
          </p>
        </div>

        <div
          data-animate
          style={{
            opacity: 0,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {portfolio.interests.map((interest, index) => {
            const isActive = activeInterest === index;
            return (
              <div
                key={interest.name}
                className="card-glass"
                style={{
                  padding: "2rem",
                  cursor: "pointer",
                  transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  transform: isActive ? "translateY(-4px)" : "translateY(0)",
                  borderColor: isActive ? "var(--border-accent)" : "var(--border-subtle)",
                }}
                onMouseEnter={() => setActiveInterest(index)}
                onMouseLeave={() => setActiveInterest(null)}
                onFocus={() => setActiveInterest(index)}
                onBlur={() => setActiveInterest(null)}
                tabIndex={0}
                role="article"
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "var(--radius-md)",
                    background: isActive ? "rgba(0,180,255,0.12)" : "rgba(0,180,255,0.05)",
                    border: `1px solid ${isActive ? "rgba(0,180,255,0.3)" : "rgba(0,180,255,0.1)"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1.25rem",
                    color: "var(--accent-primary)",
                    transition: "all 0.3s ease",
                  }}
                >
                  {iconMap[interest.icon] || iconMap.code}
                </div>

                <h3 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                  marginBottom: "0.5rem",
                  transition: "color 0.3s",
                }}>
                  {interest.name}
                </h3>

                <p style={{
                  fontSize: "0.85rem",
                  color: "var(--text-muted)",
                  lineHeight: 1.6,
                }}>
                  {interest.description}
                </p>

                {/* Progress indicator (visual only, no fake percentages) */}
                <div style={{
                  marginTop: "1.25rem",
                  height: "2px",
                  background: "var(--border-subtle)",
                  borderRadius: "1px",
                  overflow: "hidden",
                }}>
                  <div style={{
                    height: "100%",
                    background: "var(--accent-primary)",
                    borderRadius: "1px",
                    width: isActive ? "100%" : "0%",
                    transition: "width 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                  }} />
                </div>
              </div>
            );
          })}
        </div>

        <div data-animate style={{
          opacity: 0,
          textAlign: "center",
          marginTop: "3rem",
          padding: "1.5rem",
          fontFamily: "var(--font-mono)",
          fontSize: "0.7rem",
          color: "var(--text-muted)",
          letterSpacing: "0.1em",
        }}>
          More learning experiences and achievements will be added as the journey continues.
        </div>
      </div>
    </section>
  );
}
