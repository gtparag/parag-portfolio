"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Hero } from "@/components/sections/hero";
import { BluePillContent } from "@/components/sections/blue-pill-content";
import { RedPillContent } from "@/components/sections/red-pill-content";
import { MatrixRain } from "@/components/ui/matrix-rain";
import { MatrixIntro } from "@/components/ui/matrix-intro";
import { ModeProvider, useMode } from "@/hooks/use-mode";
import { cn } from "@/lib/utils";

function MainContent() {
  const { mode } = useMode();
  const isRedMode = mode === "red";
  const [showIntro, setShowIntro] = useState(true);
  const [introComplete, setIntroComplete] = useState(false);

  // Check if intro has been shown before in this session
  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem("matrixIntroSeen");
    if (hasSeenIntro) {
      setShowIntro(false);
      setIntroComplete(true);
    }
  }, []);

  const handleIntroComplete = () => {
    sessionStorage.setItem("matrixIntroSeen", "true");
    setShowIntro(false);
    setTimeout(() => setIntroComplete(true), 500);
  };

  // Handle key press to skip intro
  useEffect(() => {
    if (!showIntro) return;
    const handleKeyPress = () => handleIntroComplete();
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [showIntro]);

  return (
    <>
      {/* Matrix Intro */}
      <AnimatePresence>
        {showIntro && <MatrixIntro onComplete={handleIntroComplete} />}
      </AnimatePresence>

      {/* Main Content - only render after intro */}
      {introComplete && (
        <>
          {/* Matrix Rain Background */}
          <MatrixRain />

          {/* CRT Effects */}
          <div className="crt-scanlines" />
          <div className="vignette" />

          {/* Main wrapper with flicker */}
          <div className="crt-flicker">
            <Header />

            <div className="min-h-screen bg-transparent relative z-10">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex">
                  {/* Left Navigation Sidebar */}
                  <aside className="hidden md:block w-36 flex-shrink-0 pt-24 pr-8">
                    <nav className="sticky top-24 space-y-8">
                      <a
                        href="#about"
                        className={cn(
                          "block text-xl transition-all hover:text-glow-subtle",
                          isRedMode
                            ? "text-[var(--matrix-red-dim)] hover:text-[var(--matrix-red)]"
                            : "text-[var(--matrix-green-dim)] hover:text-[var(--matrix-green)]"
                        )}
                      >
                        {">"} about
                      </a>
                      <a
                        href="#experience"
                        className={cn(
                          "block text-xl transition-all hover:text-glow-subtle",
                          isRedMode
                            ? "text-[var(--matrix-red-dim)] hover:text-[var(--matrix-red)]"
                            : "text-[var(--matrix-green-dim)] hover:text-[var(--matrix-green)]"
                        )}
                      >
                        {">"} work
                      </a>
                      <a
                        href="#projects"
                        className={cn(
                          "block text-xl transition-all hover:text-glow-subtle",
                          isRedMode
                            ? "text-[var(--matrix-red-dim)] hover:text-[var(--matrix-red)]"
                            : "text-[var(--matrix-green-dim)] hover:text-[var(--matrix-green)]"
                        )}
                      >
                        {">"} built
                      </a>
                      <a
                        href="#contact"
                        className={cn(
                          "block text-xl transition-all hover:text-glow-subtle",
                          isRedMode
                            ? "text-[var(--matrix-red-dim)] hover:text-[var(--matrix-red)]"
                            : "text-[var(--matrix-green-dim)] hover:text-[var(--matrix-green)]"
                        )}
                      >
                        {">"} contact
                      </a>
                    </nav>
                  </aside>

                  {/* Main Content */}
                  <main className="flex-1 pt-16 pb-20 md:pl-8 md:border-l md:border-[var(--matrix-green-dark)]">
                    {/* Hero stays persistent */}
                    <Hero />

                    {/* Content switches based on mode */}
                    <AnimatePresence mode="wait">
                      {isRedMode ? (
                        <RedPillContent key="red" />
                      ) : (
                        <BluePillContent key="blue" />
                      )}
                    </AnimatePresence>
                  </main>
                </div>
              </div>
            </div>

            {/* Footer */}
            <footer className="border-t border-[var(--matrix-green-dark)] py-6 relative z-10">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <p className="text-center text-[var(--text-muted)] text-sm">
                  {">"} SYSTEM.COPYRIGHT © {new Date().getFullYear()} | parag ambildhuke | all_rights_reserved_
                </p>
              </div>
            </footer>
          </div>
        </>
      )}
    </>
  );
}

export default function Home() {
  return (
    <ModeProvider>
      <MainContent />
    </ModeProvider>
  );
}
