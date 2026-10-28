"use client";

import { useState, useEffect } from "react";
import { portfolio } from "@/data/portfolio";

interface NavigationProps {
  activeSection: string;
}

export default function Navigation({ activeSection }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: scrolled ? "0.75rem 2rem" : "1.25rem 2rem",
          background: scrolled ? "rgba(5, 5, 16, 0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <a
            href="#"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.125rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
            aria-label="Back to top"
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "32px",
                height: "32px",
                border: "1.5px solid var(--accent-primary)",
                borderRadius: "8px",
                fontFamily: "var(--font-display)",
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "var(--accent-primary)",
              }}
            >
              PT
            </span>
            <span style={{ opacity: scrolled ? 0 : 1, transition: "opacity 0.3s", fontSize: "0.9rem" }}>
              Prem Thorat
            </span>
          </a>

          {/* Desktop Nav */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.25rem",
            }}
            className="desktop-nav"
          >
            {portfolio.nav.map((item) => {
              const sectionId = item.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.8rem",
                    fontWeight: 500,
                    color: isActive ? "var(--accent-primary)" : "var(--text-secondary)",
                    padding: "0.5rem 1rem",
                    borderRadius: "var(--radius-sm)",
                    transition: "all 0.3s",
                    position: "relative",
                    background: isActive ? "var(--accent-glow)" : "transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.color = "var(--text-primary)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.color = "var(--text-secondary)";
                  }}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            style={{
              display: "none",
              flexDirection: "column",
              gap: "5px",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px",
              zIndex: 110,
            }}
          >
            <span
              style={{
                display: "block",
                width: "24px",
                height: "2px",
                background: "var(--text-primary)",
                transition: "all 0.3s",
                transform: mobileOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
              }}
            />
            <span
              style={{
                display: "block",
                width: "24px",
                height: "2px",
                background: "var(--text-primary)",
                transition: "all 0.3s",
                opacity: mobileOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                display: "block",
                width: "24px",
                height: "2px",
                background: "var(--text-primary)",
                transition: "all 0.3s",
                transform: mobileOpen ? "rotate(-45deg) translate(5px, -5px)" : "none",
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99,
            background: "rgba(5, 5, 16, 0.95)",
            backdropFilter: "blur(30px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: "fadeIn 0.3s ease",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", textAlign: "center" }}>
            {portfolio.nav.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.5rem",
                  fontWeight: 600,
                  color: activeSection === item.href.replace("#", "") ? "var(--accent-primary)" : "var(--text-primary)",
                  opacity: 0,
                  animation: `fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.08}s forwards`,
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Responsive styles */}
      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-toggle {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
}
