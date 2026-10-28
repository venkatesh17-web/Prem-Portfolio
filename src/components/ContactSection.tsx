"use client";

import { useState, useEffect } from "react";
import { portfolio } from "@/data/portfolio";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    topic: "AI / Machine Learning",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Live IST Clock (VIT Pune, India - UTC+5:30)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setCurrentTime(now.toLocaleTimeString("en-US", options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(portfolio.contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setIsSubmitting(true);
    // Simulate high-tech transmission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);

      // Also trigger a mailto fallback in case the visitor wants to send directly via client
      const mailtoUrl = `mailto:${portfolio.contact.email}?subject=${encodeURIComponent(
        `[Portfolio] ${formState.topic} from ${formState.name}`
      )}&body=${encodeURIComponent(
        `Hi Prem,\n\n${formState.message}\n\nFrom: ${formState.name}\nEmail: ${formState.email}`
      )}`;

      window.open(mailtoUrl, "_blank");
    }, 900);
  };

  return (
    <section id="contact" style={{ position: "relative", overflow: "hidden" }}>
      <div className="glow-line" style={{ marginBottom: "6rem" }} />

      <div className="section-container">
        {/* Section Header */}
        <div data-animate style={{ opacity: 0 }}>
          <div className="section-number">// 06</div>
          <h2 className="text-display-md" style={{ marginBottom: "1rem" }}>
            Let&apos;s <span style={{ color: "var(--accent-primary)" }}>Connect</span>
          </h2>
          <p className="text-body-lg" style={{ maxWidth: "640px", marginBottom: "3.5rem" }}>
            {portfolio.contact.headline} {portfolio.contact.description}
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div
          className="contact-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.25fr",
            gap: "3rem",
            alignItems: "start",
          }}
        >
          {/* Left Column: Direct Channels & Telemetry */}
          <div data-animate style={{ opacity: 0, display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* Status Beacon Card */}
            <div
              className="card-glass"
              style={{
                padding: "1.75rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
                background: "rgba(13, 13, 32, 0.7)",
                border: "1px solid rgba(0, 180, 255, 0.15)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "140px",
                  height: "140px",
                  background: "radial-gradient(circle, rgba(0, 180, 255, 0.08) 0%, transparent 70%)",
                  pointerEvents: "none",
                }}
              />

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: "#10b981",
                      boxShadow: "0 0 12px #10b981",
                      display: "inline-block",
                      animation: "glow-pulse 2s infinite ease-in-out",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.75rem",
                      color: "#10b981",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                    }}
                  >
                    Open to Collaboration
                  </span>
                </div>

                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.7rem",
                    color: "var(--text-muted)",
                    padding: "0.2rem 0.6rem",
                    borderRadius: "4px",
                    background: "rgba(255, 255, 255, 0.04)",
                  }}
                >
                  IST (UTC+5:30)
                </span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "0.5rem" }}>
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.65rem",
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      marginBottom: "0.25rem",
                    }}
                  >
                    Base Station
                  </div>
                  <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text-primary)" }}>
                    VIT Pune, India
                  </div>
                </div>

                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.65rem",
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      marginBottom: "0.25rem",
                    }}
                  >
                    Local Time
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.95rem",
                      fontWeight: 600,
                      color: "var(--accent-primary)",
                    }}
                  >
                    {currentTime || "11:30:00 PM"}
                  </div>
                </div>
              </div>
            </div>

            {/* Email Channel Card */}
            <div
              className="card-glass"
              style={{
                padding: "1.75rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                background: "rgba(13, 13, 32, 0.7)",
                border: "1px solid var(--border-subtle)",
                transition: "all 0.3s ease",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    background: "rgba(0, 180, 255, 0.1)",
                    border: "1px solid rgba(0, 180, 255, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--accent-primary)",
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                    Direct Inbox
                  </div>
                  <div style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text-primary)" }}>
                    {portfolio.contact.email}
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  style={{
                    flex: 1,
                    padding: "0.65rem 1rem",
                    background: copied ? "rgba(16, 185, 129, 0.15)" : "rgba(0, 180, 255, 0.08)",
                    border: `1px solid ${copied ? "#10b981" : "rgba(0, 180, 255, 0.25)"}`,
                    borderRadius: "var(--radius-md)",
                    color: copied ? "#10b981" : "var(--accent-primary)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    letterSpacing: "0.05em",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    transition: "all 0.25s ease",
                  }}
                >
                  {copied ? (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Copied to Clipboard!
                    </>
                  ) : (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                      </svg>
                      Copy Email
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${portfolio.contact.email}`}
                  style={{
                    padding: "0.65rem 1.25rem",
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "var(--radius-md)",
                    color: "var(--text-secondary)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    transition: "all 0.25s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--border-accent)";
                    e.currentTarget.style.color = "var(--text-primary)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border-subtle)";
                    e.currentTarget.style.color = "var(--text-secondary)";
                  }}
                >
                  Open Mailer
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              </div>
            </div>

            {/* LinkedIn Network Card */}
            {portfolio.contact.linkedin && (
              <a
                href={portfolio.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="card-glass"
                style={{
                  padding: "1.5rem 1.75rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  textDecoration: "none",
                  background: "rgba(13, 13, 32, 0.7)",
                  border: "1px solid var(--border-subtle)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(0, 180, 255, 0.4)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-subtle)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "8px",
                      background: "rgba(0, 119, 181, 0.15)",
                      border: "1px solid rgba(0, 119, 181, 0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#0a66c2",
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2M7.86 18.5V10.1H5.06v8.4h2.8z" />
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                      Professional Network
                    </div>
                    <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text-primary)" }}>
                      linkedin.com/in/prem-thorat
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    color: "var(--accent-primary)",
                    fontSize: "0.8rem",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  <span>Connect</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </div>
              </a>
            )}
          </div>

          {/* Right Column: High-Tech Interactive Terminal Form */}
          <div data-animate style={{ opacity: 0 }}>
            <div
              className="card-glass"
              style={{
                padding: "2.5rem",
                background: "rgba(13, 13, 32, 0.8)",
                border: "1px solid var(--border-accent)",
                borderRadius: "var(--radius-xl)",
                boxShadow: "0 10px 40px rgba(0, 0, 0, 0.5), 0 0 30px rgba(0, 180, 255, 0.05)",
                position: "relative",
              }}
            >
              {/* Terminal Title Bar */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingBottom: "1.25rem",
                  marginBottom: "1.75rem",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ff5f56" }} />
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ffbd2e" }} />
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#27c93f" }} />
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.75rem",
                      color: "var(--text-muted)",
                      marginLeft: "0.5rem",
                    }}
                  >
                    message_dispatcher.sh
                  </span>
                </div>

                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    color: "var(--accent-primary)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  SECURE CHANNEL // ENCRYPTED
                </span>
              </div>

              {submitted ? (
                <div
                  style={{
                    padding: "3rem 1.5rem",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "1.25rem",
                  }}
                >
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                      background: "rgba(16, 185, 129, 0.15)",
                      border: "1px solid #10b981",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#10b981",
                      animation: "fadeIn 0.5s ease",
                    }}
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>

                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "var(--text-primary)" }}>
                    Transmission Initiated!
                  </h3>

                  <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", maxWidth: "380px", lineHeight: 1.6 }}>
                    Thank you, <strong style={{ color: "var(--text-primary)" }}>{formState.name}</strong>. Your message draft has been prepared and your email client has opened. I will respond to you at <span style={{ color: "var(--accent-primary)" }}>{formState.email}</span> shortly.
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormState({ name: "", email: "", topic: "AI / Machine Learning", message: "" });
                    }}
                    className="btn-secondary"
                    style={{ marginTop: "1rem", fontSize: "0.8rem", padding: "0.6rem 1.5rem" }}
                  >
                    Send Another Transmission
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  {/* Name and Email row */}
                  <div
                    className="form-row"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "1.25rem",
                    }}
                  >
                    <div>
                      <label
                        htmlFor="sender-name"
                        style={{
                          display: "block",
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.7rem",
                          color: "var(--text-secondary)",
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          marginBottom: "0.5rem",
                        }}
                      >
                        Your Name *
                      </label>
                      <input
                        id="sender-name"
                        type="text"
                        required
                        placeholder="Ada Lovelace"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "0.85rem 1rem",
                          background: "rgba(5, 5, 16, 0.6)",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                          borderRadius: "var(--radius-md)",
                          color: "var(--text-primary)",
                          fontFamily: "var(--font-body)",
                          fontSize: "0.9rem",
                          outline: "none",
                          transition: "border-color 0.25s ease, box-shadow 0.25s ease",
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = "var(--accent-primary)";
                          e.currentTarget.style.boxShadow = "0 0 12px rgba(0, 180, 255, 0.2)";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="sender-email"
                        style={{
                          display: "block",
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.7rem",
                          color: "var(--text-secondary)",
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          marginBottom: "0.5rem",
                        }}
                      >
                        Your Email *
                      </label>
                      <input
                        id="sender-email"
                        type="email"
                        required
                        placeholder="ada@example.com"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "0.85rem 1rem",
                          background: "rgba(5, 5, 16, 0.6)",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                          borderRadius: "var(--radius-md)",
                          color: "var(--text-primary)",
                          fontFamily: "var(--font-body)",
                          fontSize: "0.9rem",
                          outline: "none",
                          transition: "border-color 0.25s ease, box-shadow 0.25s ease",
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = "var(--accent-primary)";
                          e.currentTarget.style.boxShadow = "0 0 12px rgba(0, 180, 255, 0.2)";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      />
                    </div>
                  </div>

                  {/* Topic Select */}
                  <div>
                    <label
                      htmlFor="message-topic"
                      style={{
                        display: "block",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.7rem",
                        color: "var(--text-secondary)",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        marginBottom: "0.5rem",
                      }}
                    >
                      Collaboration Domain
                    </label>
                    <select
                      id="message-topic"
                      value={formState.topic}
                      onChange={(e) => setFormState({ ...formState, topic: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "0.85rem 1rem",
                        background: "#0a0a1a",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        borderRadius: "var(--radius-md)",
                        color: "var(--text-primary)",
                        fontFamily: "var(--font-body)",
                        fontSize: "0.9rem",
                        outline: "none",
                        cursor: "pointer",
                      }}
                    >
                      <option value="AI / Machine Learning">AI &amp; Machine Learning Engineering</option>
                      <option value="Computer Vision">Computer Vision &amp; OpenCV Projects</option>
                      <option value="Robotics">Robotics &amp; Autonomous Systems</option>
                      <option value="Engineering Research">Academic / Engineering Research</option>
                      <option value="General Inquiry">General Technical Discussion</option>
                    </select>
                  </div>

                  {/* Message textarea */}
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                      <label
                        htmlFor="sender-message"
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.7rem",
                          color: "var(--text-secondary)",
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                        }}
                      >
                        Message Payload *
                      </label>
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.65rem",
                          color: formState.message.length > 500 ? "#ff5f56" : "var(--text-muted)",
                        }}
                      >
                        {formState.message.length} chars
                      </span>
                    </div>
                    <textarea
                      id="sender-message"
                      required
                      rows={4}
                      placeholder="Describe your idea, project, or research opportunity..."
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "0.85rem 1rem",
                        background: "rgba(5, 5, 16, 0.6)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        borderRadius: "var(--radius-md)",
                        color: "var(--text-primary)",
                        fontFamily: "var(--font-body)",
                        fontSize: "0.9rem",
                        lineHeight: 1.6,
                        outline: "none",
                        resize: "vertical",
                        transition: "border-color 0.25s ease, box-shadow 0.25s ease",
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = "var(--accent-primary)";
                        e.currentTarget.style.boxShadow = "0 0 12px rgba(0, 180, 255, 0.2)";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary"
                    style={{
                      width: "100%",
                      justifyContent: "center",
                      padding: "1rem",
                      marginTop: "0.5rem",
                      opacity: isSubmitting ? 0.7 : 1,
                    }}
                  >
                    {isSubmitting ? (
                      <span style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                        <span
                          style={{
                            width: "16px",
                            height: "16px",
                            border: "2px solid rgba(0, 0, 0, 0.2)",
                            borderTopColor: "currentColor",
                            borderRadius: "50%",
                            animation: "spin 0.8s linear infinite",
                            display: "inline-block",
                          }}
                        />
                        Transmitting Packet...
                      </span>
                    ) : (
                      <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        Transmit Message
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="22" y1="2" x2="11" y2="13" />
                          <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                      </span>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @media (max-width: 860px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
          .form-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
