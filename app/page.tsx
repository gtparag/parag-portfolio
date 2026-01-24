"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Hero } from "@/components/sections/hero";
import { BluePillContent } from "@/components/sections/blue-pill-content";
import { RedPillContent } from "@/components/sections/red-pill-content";
import { MatrixRain } from "@/components/ui/matrix-rain";
import { VisitorSelection } from "@/components/ui/visitor-selection";
import { ModeProvider, useMode } from "@/hooks/use-mode";
import { VisitorTypeProvider, useVisitorType, VisitorType } from "@/hooks/use-visitor-type";
import { cn } from "@/lib/utils";

// Professional components
import { ProfessionalHeader } from "@/components/professional/header";
import { ProfessionalHero } from "@/components/professional/hero";
import { ProfessionalExperience } from "@/components/professional/experience";
import { ProfessionalEducation } from "@/components/professional/education";
import { ProfessionalProjects } from "@/components/professional/projects";
import { ProfessionalContact } from "@/components/professional/contact";

// Professional website for recruiters
function ProfessionalWebsite() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ProfessionalHeader />
      <main className="pt-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProfessionalHero />
          <ProfessionalExperience />
          <ProfessionalEducation />
          <ProfessionalProjects />
          <ProfessionalContact />
        </div>
      </main>
      <footer className="border-t border-gray-200 py-6 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Parag Ambildhuke. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

// Matrix-themed website content (after pill selection)
function MatrixWebsiteContent() {
  const { mode } = useMode();
  const isRedMode = mode === "red";

  return (
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
  );
}

// Matrix website - goes directly to blue pill content
function MatrixWebsite() {
  return <MatrixWebsiteContent />;
}

// Main content component that switches based on visitor type
function MainContent() {
  const { setVisitorType, isRecruiter } = useVisitorType();
  const [showSelection, setShowSelection] = useState(true);

  // Check if visitor type has been selected before in this session
  useEffect(() => {
    const savedVisitorType = sessionStorage.getItem("visitorType") as VisitorType;
    if (savedVisitorType) {
      setVisitorType(savedVisitorType);
      setShowSelection(false);
    }
  }, [setVisitorType]);

  const handleVisitorSelect = (type: VisitorType) => {
    sessionStorage.setItem("visitorType", type || "");
    setVisitorType(type);
    setShowSelection(false);
  };

  // Show visitor selection first
  if (showSelection) {
    return (
      <AnimatePresence>
        <VisitorSelection onSelect={handleVisitorSelect} />
      </AnimatePresence>
    );
  }

  // Show professional website for recruiters
  if (isRecruiter) {
    return <ProfessionalWebsite />;
  }

  // Show Matrix website for everyone else
  return (
    <ModeProvider>
      <MatrixWebsite />
    </ModeProvider>
  );
}

export default function Home() {
  return (
    <VisitorTypeProvider>
      <MainContent />
    </VisitorTypeProvider>
  );
}
