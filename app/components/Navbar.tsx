"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Home, Rocket, Sparkles } from "lucide-react";

const navItems = [
  { label: "首页", href: "#hero", icon: Home },
  { label: "功能", href: "#features", icon: Sparkles },
  { label: "立即体验", href: "#cta", icon: Rocket },
] as const;

type SectionHref = (typeof navItems)[number]["href"];

const glassClassName =
  "border border-[rgba(255,255,255,0.1)] bg-[rgba(15,39,68,0.8)] backdrop-blur-xl";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<SectionHref>("#hero");
  const sectionRatiosRef = useRef<Record<SectionHref, number>>({
    "#hero": 0,
    "#features": 0,
    "#cta": 0,
  });

  const scrollToSection = useCallback((href: SectionHref) => {
    const section = document.querySelector<HTMLElement>(href);
    if (!section) {
      return;
    }

    const headerOffset = 88;
    const targetY =
      section.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top: Math.max(targetY, 0), behavior: "smooth" });
    setActiveSection(href);
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const href = `#${entry.target.id}` as SectionHref;
          if (!(href in sectionRatiosRef.current)) {
            return;
          }
          sectionRatiosRef.current[href] = entry.isIntersecting
            ? entry.intersectionRatio
            : 0;
        });

        const nextSection = (Object.keys(
          sectionRatiosRef.current
        ) as SectionHref[]).reduce((current, candidate) =>
          sectionRatiosRef.current[candidate] > sectionRatiosRef.current[current]
            ? candidate
            : current
        , "#hero");

        setActiveSection(nextSection);
      },
      {
        rootMargin: "-30% 0px -45% 0px",
        threshold: [0.15, 0.35, 0.6, 0.8],
      }
    );

    sections.forEach((section) => observer.observe(section));

    const handleNearBottom = () => {
      const viewportBottom = window.scrollY + window.innerHeight;
      if (viewportBottom >= document.documentElement.scrollHeight - 2) {
        setActiveSection("#cta");
      }
    };

    window.addEventListener("scroll", handleNearBottom, { passive: true });
    handleNearBottom();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleNearBottom);
    };
  }, []);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="pointer-events-none fixed inset-x-0 top-0 z-50"
      >
        <div
          className="mx-auto w-full max-w-md px-4"
          style={{ paddingTop: "calc(env(safe-area-inset-top) + 0.5rem)" }}
        >
          <motion.button
            type="button"
            onClick={() => scrollToSection("#hero")}
            whileTap={{ scale: 0.98 }}
            className={`pointer-events-auto flex h-12 w-full items-center rounded-2xl px-4 text-left ${glassClassName}`}
          >
            <span className="text-lg font-semibold tracking-wide text-white">
              深澜
            </span>
          </motion.button>
        </div>
      </motion.header>

      <motion.nav
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut", delay: 0.05 }}
        className="fixed inset-x-0 bottom-0 z-50"
      >
        <div
          className="mx-auto w-full max-w-md px-4"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          <div
            className={`grid h-16 grid-cols-3 gap-1 rounded-2xl p-1 ${glassClassName}`}
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.href;

              return (
                <motion.button
                  key={item.href}
                  type="button"
                  onClick={() => scrollToSection(item.href)}
                  whileTap={{ scale: 0.97 }}
                  className="relative flex h-full flex-col items-center justify-center gap-1 overflow-hidden rounded-xl text-xs font-medium"
                >
                  {isActive ? (
                    <motion.span
                      layoutId="active-nav-pill"
                      className="absolute inset-0 rounded-xl border border-[#00D4FF]/35 bg-gradient-to-r from-[#00D4FF]/18 to-[#7C3AED]/22"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  ) : null}

                  <Icon
                    className={`relative z-10 h-4 w-4 transition-colors ${
                      isActive ? "text-[#00D4FF]" : "text-white/70"
                    }`}
                  />
                  <span
                    className={`relative z-10 transition-colors ${
                      isActive ? "text-white" : "text-white/75"
                    }`}
                  >
                    {item.label}
                  </span>

                  {isActive ? (
                    <motion.span
                      layoutId="active-nav-dot"
                      className="absolute bottom-1.5 h-1 w-1 rounded-full bg-[#00D4FF]"
                    />
                  ) : null}
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.nav>
    </>
  );
}
