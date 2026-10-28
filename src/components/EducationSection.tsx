"use client";

import { portfolio } from "@/data/portfolio";

export default function EducationSection() {
  const edu = portfolio.education;

  return (
    <section id="education" style={{ position: "relative" }}>
      <div className="glow-line" style={{ marginBottom: "6rem" }} />

      <div className="section-container">
        <div data-animate style={{ opacity: 0 }}>
          <div className="section-number">// 02</div>
          <h2 className="text-display-md" style={{ marginBottom: "3rem" }}>
            Education
          </h2>
        </div>

        <div data-animate style={{ opacity: 0 }}>
          <div
            className="card-glass"
            style={{
              padding: "3rem",
              maxWidth: "800px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Timeline dot & line */}
            <div style={{
              position: "absolute",
              left: "2rem",
              top: 0,
              bottom: 0,
              width: "2px",
              background: "linear-gradient(180deg, var(--accent-primary), transparent)",
              opacity: 0.3,
            }} />
            <div style={{
              position: "absolute",
              left: "calc(2rem - 5px)",
              top: "2.75rem",
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: "var(--accent-primary)",
              boxShadow: "0 0 12px var(--accent-primary)",
            }} />

            <div style={{ paddingLeft: "2.5rem" }}>
              {/* Status badge */}
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.35rem 1rem",
                background: "rgba(0, 180, 255, 0.1)",
                border: "1px solid rgba(0, 180, 255, 0.2)",
                borderRadius: "999px",
                marginBottom: "1.5rem",
              }}>
                <div style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#4ade80",
                  boxShadow: "0 0 8px rgba(74, 222, 128, 0.5)",
                  animation: "glow-pulse 2s ease-in-out infinite",
                }} />
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  color: "var(--accent-ice)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}>
                  Currently Pursuing
                </span>
              </div>

              <h3 style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)",
                fontWeight: 700,
                color: "var(--text-primary)",
                marginBottom: "0.5rem",
              }}>
                {edu.institution}
              </h3>

              <p style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.85rem",
                color: "var(--accent-ice)",
                marginBottom: "0.25rem",
              }}>
                {edu.location}
              </p>

              <div style={{
                marginTop: "1.5rem",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "1.25rem",
              }}>
                {[
                  { label: "Degree", value: edu.degree },
                  { label: "Specialization", value: edu.specialization },
                  { label: "Current Year", value: edu.year },
                ].map((item) => (
                  <div
                    key={item.label}
                    style={{
                      padding: "1rem",
                      background: "rgba(255, 255, 255, 0.02)",
                      border: "1px solid var(--border-subtle)",
                      borderRadius: "var(--radius-md)",
                    }}
                  >
                    <div style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.65rem",
                      color: "var(--text-muted)",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      marginBottom: "0.5rem",
                    }}>
                      {item.label}
                    </div>
                    <div style={{
                      fontSize: "0.9rem",
                      fontWeight: 500,
                      color: "var(--text-primary)",
                      lineHeight: 1.4,
                    }}>
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
