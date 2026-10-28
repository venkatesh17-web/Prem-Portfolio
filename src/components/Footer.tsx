"use client";

import { portfolio } from "@/data/portfolio";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      style={{
        position: "relative",
        background: "var(--bg-secondary)",
        borderTop: "1px solid var(--border-subtle)",
        overflow: "hidden",
      }}
    >
      {/* Subtle top glow */}
      <div className="glow-line" />

      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "5rem 2rem 3rem",
        }}
      >
        <div
          className="footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr 1fr",
            gap: "4rem",
            marginBottom: "4rem",
          }}
        >
          {/* Brand & Mission Statement */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "36px",
                  height: "36px",
                  border: "1.5px solid var(--accent-primary)",
                  borderRadius: "10px",
                  fontFamily: "var(--font-display)",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  color: "var(--accent-primary)",
                  background: "rgba(0, 180, 255, 0.08)",
                }}
              >
                {portfolio.initials}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                }}
              >
                {portfolio.name}
              </span>
            </div>

            <p
              style={{
                fontSize: "0.95rem",
                color: "var(--text-secondary)",
                lineHeight: 1.7,
                maxWidth: "380px",
                marginBottom: "1.5rem",
              }}
            >
              {portfolio.tagline}
            </p>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.4rem 0.85rem",
                background: "rgba(0, 180, 255, 0.05)",
                border: "1px solid rgba(0, 180, 255, 0.15)",
                borderRadius: "var(--radius-md)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                color: "var(--accent-ice)",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "var(--accent-primary)",
                  boxShadow: "0 0 8px var(--accent-primary)",
                }}
              />
              {portfolio.education.degree} ({portfolio.education.year})
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                color: "var(--accent-primary)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: "1.25rem",
              }}
            >
              Navigation
            </div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {portfolio.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.9rem",
                      color: "var(--text-secondary)",
                      textDecoration: "none",
                      transition: "all 0.25s ease",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.4rem",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--accent-primary)";
                      e.currentTarget.style.transform = "translateX(4px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--text-secondary)";
                      e.currentTarget.style.transform = "translateX(0)";
                    }}
                  >
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", opacity: 0.5 }}>→</span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect & System Telemetry */}
          <div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                color: "var(--accent-primary)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: "1.25rem",
              }}
            >
              Direct Channels
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", marginBottom: "1.5rem" }}>
              <a
                href={`mailto:${portfolio.contact.email}`}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.8rem",
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                {portfolio.contact.email}
              </a>

              {portfolio.contact.linkedin && (
                <a
                  href={portfolio.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.8rem",
                    color: "var(--text-secondary)",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-primary)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                  LinkedIn Profile
                </a>
              )}
            </div>

            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                color: "var(--text-muted)",
                lineHeight: 1.6,
              }}
            >
              Institution: Vishwakarma Institute of Technology, Pune
              <br />
              Department: Artificial Intelligence &amp; Data Science
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div
          style={{
            paddingTop: "2.5rem",
            borderTop: "1px solid rgba(255, 255, 255, 0.05)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              color: "var(--text-muted)",
              letterSpacing: "0.05em",
            }}
          >
            © {new Date().getFullYear()} {portfolio.name}. Handcrafted with precision. All rights reserved.
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                color: "var(--text-muted)",
              }}
            >
              AI · Computer Vision · Robotics
            </span>

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.5rem 1rem",
                background: "rgba(0, 180, 255, 0.06)",
                border: "1px solid rgba(0, 180, 255, 0.2)",
                borderRadius: "var(--radius-md)",
                color: "var(--accent-primary)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                cursor: "pointer",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--accent-primary)";
                e.currentTarget.style.color = "var(--bg-primary)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(0, 180, 255, 0.06)";
                e.currentTarget.style.color = "var(--accent-primary)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <span>Back to Top</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="18 15 12 9 6 15" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 860px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </footer>
  );
}
