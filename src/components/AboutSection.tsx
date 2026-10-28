"use client";

import { portfolio } from "@/data/portfolio";

export default function AboutSection() {
  return (
    <section id="about" style={{ position: "relative", overflow: "hidden" }}>
      {/* Section divider */}
      <div className="glow-line" style={{ marginBottom: "6rem" }} />

      <div className="section-container">
        <div data-animate style={{ opacity: 0 }}>
          <div className="section-number">// 01</div>
          <h2 className="text-display-md" style={{ marginBottom: "3rem" }}>
            About <span style={{ color: "var(--accent-primary)" }}>Me</span>
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "start",
          }}
          className="about-grid"
        >
          {/* Left: Editorial text */}
          <div data-animate style={{ opacity: 0 }}>
            <p
              style={{
                fontSize: "clamp(1.05rem, 1.8vw, 1.25rem)",
                lineHeight: 1.8,
                color: "var(--text-secondary)",
                marginBottom: "2rem",
              }}
            >
              {portfolio.about}
            </p>

            <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
              <div>
                <div style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "2.5rem",
                  fontWeight: 800,
                  color: "var(--accent-primary)",
                  lineHeight: 1,
                }}>
                  2<sup style={{ fontSize: "1rem", verticalAlign: "super" }}>nd</sup>
                </div>
                <div style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  color: "var(--text-muted)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginTop: "0.25rem",
                }}>
                  Year Student
                </div>
              </div>
              <div>
                <div style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "2.5rem",
                  fontWeight: 800,
                  color: "var(--accent-primary)",
                  lineHeight: 1,
                }}>
                  5+
                </div>
                <div style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  color: "var(--text-muted)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginTop: "0.25rem",
                }}>
                  Technologies
                </div>
              </div>
              <div>
                <div style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "2.5rem",
                  fontWeight: 800,
                  color: "var(--accent-primary)",
                  lineHeight: 1,
                }}>
                  2
                </div>
                <div style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  color: "var(--text-muted)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginTop: "0.25rem",
                }}>
                  Projects
                </div>
              </div>
            </div>
          </div>

          {/* Right: Interest tags */}
          <div data-animate style={{ opacity: 0 }}>
            <div style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              color: "var(--accent-primary)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: "1.5rem",
            }}>
              Areas of Interest
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
              {[
                "Programming & Development",
                "Problem-Solving",
                "Artificial Intelligence",
                "Machine Learning",
                "Computer Vision",
                "Robotics",
                "New Technologies",
              ].map((interest) => (
                <span
                  key={interest}
                  style={{
                    padding: "0.5rem 1.25rem",
                    background: "rgba(0, 180, 255, 0.06)",
                    border: "1px solid rgba(0, 180, 255, 0.15)",
                    borderRadius: "var(--radius-md)",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.85rem",
                    color: "var(--text-secondary)",
                    transition: "all 0.3s",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--accent-primary)";
                    e.currentTarget.style.background = "rgba(0, 180, 255, 0.12)";
                    e.currentTarget.style.color = "var(--text-primary)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(0, 180, 255, 0.15)";
                    e.currentTarget.style.background = "rgba(0, 180, 255, 0.06)";
                    e.currentTarget.style.color = "var(--text-secondary)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {interest}
                </span>
              ))}
            </div>

            <div style={{
              marginTop: "2.5rem",
              padding: "1.5rem",
              borderLeft: "2px solid var(--accent-primary)",
              background: "rgba(0, 180, 255, 0.03)",
              borderRadius: "0 var(--radius-md) var(--radius-md) 0",
            }}>
              <p style={{
                fontSize: "0.9rem",
                fontStyle: "italic",
                color: "var(--text-secondary)",
                lineHeight: 1.7,
              }}>
                &ldquo;I believe in learning by building. Every project is an opportunity to understand
                something deeper and push the boundaries of what I can create.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
