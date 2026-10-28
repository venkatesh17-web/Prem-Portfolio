"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { portfolio } from "@/data/portfolio";
import Navigation from "@/components/Navigation";
import CinematicIntro from "@/components/CinematicIntro";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import EducationSection from "@/components/EducationSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import EngineeringLab from "@/components/EngineeringLab";
import LearningSection from "@/components/LearningSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const mainRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for active section tracking
  useEffect(() => {
    if (!introComplete) return;

    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-80px 0px -40% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [introComplete]);

  // Scroll-triggered animations
  useEffect(() => {
    if (!introComplete) return;

    const animateElements = document.querySelectorAll("[data-animate]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );

    animateElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [introComplete]);

  if (!introComplete) {
    return <CinematicIntro onComplete={() => setIntroComplete(true)} />;
  }

  return (
    <div ref={mainRef}>
      <Navigation activeSection={activeSection} />
      <main>
        <HeroSection />
        <AboutSection />
        <EducationSection />
        <SkillsSection />
        <ProjectsSection />
        <EngineeringLab />
        <LearningSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
