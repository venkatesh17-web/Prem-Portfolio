"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { portfolio } from "@/data/portfolio";

interface SkillNode {
  id: string;
  name: string;
  description: string;
  category: string;
  x: number;
  y: number;
  radius: number;
}

export default function SkillsSection() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 500 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Build skill nodes
  const allSkills: SkillNode[] = [];
  const categories = [
    { key: "programming", label: "Programming", color: "#00b4ff", skills: portfolio.skills.programming },
    { key: "web", label: "Web", color: "#7dd3fc", skills: portfolio.skills.web },
    { key: "computerVision", label: "Computer Vision", color: "#06b6d4", skills: portfolio.skills.computerVision },
    { key: "professional", label: "Professional", color: "#818cf8", skills: portfolio.skills.professional },
  ];

  // Position nodes in orbital layout
  const centerX = dimensions.width / 2;
  const centerY = dimensions.height / 2;

  categories.forEach((cat, catIndex) => {
    const angleOffset = (catIndex / categories.length) * Math.PI * 2 - Math.PI / 2;
    const orbitRadius = Math.min(dimensions.width, dimensions.height) * 0.32;

    cat.skills.forEach((skill, skillIndex) => {
      const angleSpread = 0.6;
      const angle = angleOffset + (skillIndex - (cat.skills.length - 1) / 2) * angleSpread * (1 / Math.max(cat.skills.length, 1));

      allSkills.push({
        id: `${cat.key}-${skillIndex}`,
        name: skill.name,
        description: skill.description,
        category: cat.label,
        x: centerX + Math.cos(angle) * orbitRadius,
        y: centerY + Math.sin(angle) * orbitRadius,
        radius: 28,
      });
    });
  });

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (svgRef.current) {
        const rect = svgRef.current.parentElement?.getBoundingClientRect();
        if (rect) {
          setDimensions({ width: rect.width, height: Math.max(400, rect.width * 0.6) });
        }
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getCategoryColor = (category: string) => {
    const cat = categories.find((c) => c.label === category);
    return cat?.color || "#00b4ff";
  };

  return (
    <section id="skills" style={{ position: "relative" }}>
      <div className="glow-line" style={{ marginBottom: "6rem" }} />

      <div className="section-container">
        <div data-animate style={{ opacity: 0 }}>
          <div className="section-number">// 03</div>
          <h2 className="text-display-md" style={{ marginBottom: "1rem" }}>
            Skills &amp; <span style={{ color: "var(--accent-primary)" }}>Capabilities</span>
          </h2>
          <p className="text-body-lg" style={{ maxWidth: "600px", marginBottom: "3rem" }}>
            Technologies and skills I&apos;m actively learning and building with.
          </p>
        </div>

        {/* Category legend */}
        <div data-animate style={{ opacity: 0, display: "flex", gap: "1.5rem", flexWrap: "wrap", marginBottom: "2rem" }}>
          {categories.map((cat) => (
            <div key={cat.key} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: cat.color,
                boxShadow: `0 0 8px ${cat.color}40`,
              }} />
              <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                color: "var(--text-muted)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}>
                {cat.label}
              </span>
            </div>
          ))}
        </div>

        {/* SVG Constellation */}
        <div
          data-animate
          style={{
            opacity: 0,
            position: "relative",
            width: "100%",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--border-subtle)",
            background: "rgba(5, 5, 16, 0.5)",
            overflow: "hidden",
          }}
        >
          <svg
            ref={svgRef}
            width={dimensions.width}
            height={dimensions.height}
            viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
            style={{ display: "block", width: "100%", height: "auto" }}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setMousePos({
                x: ((e.clientX - rect.left) / rect.width) * dimensions.width,
                y: ((e.clientY - rect.top) / rect.height) * dimensions.height,
              });
            }}
            role="img"
            aria-label="Interactive skill constellation map showing programming, web, computer vision, and professional skills"
          >
            {/* Background grid */}
            <defs>
              <pattern id="skill-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <line x1="40" y1="0" x2="40" y2="40" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
                <line x1="0" y1="40" x2="40" y2="40" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
              </pattern>
              <radialGradient id="center-glow">
                <stop offset="0%" stopColor="rgba(0,180,255,0.08)" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>
            <rect width={dimensions.width} height={dimensions.height} fill="url(#skill-grid)" />
            <circle cx={centerX} cy={centerY} r={120} fill="url(#center-glow)" />

            {/* Orbit rings */}
            <circle cx={centerX} cy={centerY} r={dimensions.width * 0.32}
              fill="none" stroke="rgba(0,180,255,0.05)" strokeWidth="0.5" strokeDasharray="4 8" />

            {/* Connection lines */}
            {allSkills.map((skill) => (
              <line
                key={`line-${skill.id}`}
                x1={centerX}
                y1={centerY}
                x2={skill.x}
                y2={skill.y}
                stroke={activeSkill === skill.id ? getCategoryColor(skill.category) : "rgba(0,180,255,0.08)"}
                strokeWidth={activeSkill === skill.id ? 1.5 : 0.5}
                style={{ transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)" }}
              />
            ))}

            {/* Inter-skill connections */}
            {allSkills.map((s1, i) =>
              allSkills.slice(i + 1).map((s2) => {
                const dx = s1.x - s2.x;
                const dy = s1.y - s2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 200 && s1.category === s2.category) {
                  return (
                    <line
                      key={`conn-${s1.id}-${s2.id}`}
                      x1={s1.x}
                      y1={s1.y}
                      x2={s2.x}
                      y2={s2.y}
                      stroke={
                        activeSkill === s1.id || activeSkill === s2.id
                          ? getCategoryColor(s1.category)
                          : "rgba(0,180,255,0.04)"
                      }
                      strokeWidth={0.5}
                      style={{ transition: "all 0.4s ease" }}
                    />
                  );
                }
                return null;
              })
            )}

            {/* Center node */}
            <circle cx={centerX} cy={centerY} r={20} fill="rgba(0,180,255,0.06)" stroke="rgba(0,180,255,0.2)" strokeWidth="1" />
            <text x={centerX} y={centerY + 4} textAnchor="middle" fill="#00b4ff" fontSize="10" fontFamily="'Space Grotesk'" fontWeight="600">
              PT
            </text>

            {/* Skill nodes */}
            {allSkills.map((skill) => {
              const isActive = activeSkill === skill.id;
              const color = getCategoryColor(skill.category);
              return (
                <g
                  key={skill.id}
                  style={{ cursor: "pointer", transition: "all 0.3s" }}
                  onMouseEnter={() => setActiveSkill(skill.id)}
                  onMouseLeave={() => setActiveSkill(null)}
                  onFocus={() => setActiveSkill(skill.id)}
                  onBlur={() => setActiveSkill(null)}
                  tabIndex={0}
                  role="button"
                  aria-label={`${skill.name}: ${skill.description}`}
                >
                  {/* Glow */}
                  {isActive && (
                    <circle cx={skill.x} cy={skill.y} r={skill.radius + 8}
                      fill="none" stroke={color} strokeWidth="1" opacity="0.3"
                      style={{ animation: "glow-pulse 1.5s ease-in-out infinite" }}
                    />
                  )}

                  {/* Node circle */}
                  <circle
                    cx={skill.x}
                    cy={skill.y}
                    r={skill.radius}
                    fill={isActive ? `${color}20` : "rgba(13,13,32,0.8)"}
                    stroke={isActive ? color : `${color}40`}
                    strokeWidth={isActive ? 1.5 : 1}
                  />

                  {/* Skill name */}
                  <text
                    x={skill.x}
                    y={skill.y + 4}
                    textAnchor="middle"
                    fill={isActive ? color : "var(--text-secondary)"}
                    fontSize="10"
                    fontFamily="'Inter'"
                    fontWeight={isActive ? 600 : 400}
                    style={{ transition: "fill 0.3s" }}
                  >
                    {skill.name}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Active skill tooltip */}
          {activeSkill && (() => {
            const skill = allSkills.find((s) => s.id === activeSkill);
            if (!skill) return null;
            return (
              <div
                style={{
                  position: "absolute",
                  bottom: "1.5rem",
                  left: "50%",
                  transform: "translateX(-50%)",
                  padding: "1rem 1.5rem",
                  background: "rgba(13, 13, 32, 0.9)",
                  border: `1px solid ${getCategoryColor(skill.category)}40`,
                  borderRadius: "var(--radius-md)",
                  backdropFilter: "blur(20px)",
                  textAlign: "center",
                  maxWidth: "320px",
                  animation: "fadeInUp 0.3s ease",
                }}
              >
                <div style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: getCategoryColor(skill.category),
                  marginBottom: "0.25rem",
                }}>
                  {skill.name}
                </div>
                <div style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  color: "var(--text-muted)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: "0.5rem",
                }}>
                  {skill.category}
                </div>
                <div style={{
                  fontSize: "0.8rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.5,
                }}>
                  {skill.description}
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </section>
  );
}
