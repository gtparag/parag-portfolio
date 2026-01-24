"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { PillToggle } from "@/components/ui/pill-toggle";
import { useMode } from "@/hooks/use-mode";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#about", label: "about" },
  { href: "#experience", label: "work" },
  { href: "#projects", label: "built" },
  { href: "#contact", label: "contact" },
];

export function Header() {
  const { mode } = useMode();
  const isRedMode = mode === "red";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleBackToMenu = () => {
    sessionStorage.removeItem("visitorType");
    sessionStorage.removeItem("pillChoice");
    window.location.reload();
  };

  return (
    <>
      {/* Skip to main content link */}
      <a href="#main" className="skip-link">
        Skip to main content
      </a>

      <motion.header
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-[var(--matrix-green-dark)]"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-4">
              <button
                onClick={handleBackToMenu}
                className={cn(
                  "text-base font-mono tracking-wide transition-all duration-200 hover:opacity-80 -ml-2 cursor-pointer p-2 -my-2 rounded-sm",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
                  isRedMode
                    ? "text-[var(--matrix-red-dim)] hover:text-[var(--matrix-red)] focus-visible:ring-[var(--matrix-red)]"
                    : "text-[var(--matrix-green-dim)] hover:text-[var(--matrix-green)] focus-visible:ring-[var(--matrix-green)]"
                )}
                title="Back to menu"
                aria-label="Exit to visitor selection"
              >
                <span className="text-xl mr-1">{"<"}</span> EXIT
              </button>
              <Link
                href="/"
                className={cn(
                  "group p-2 -my-2 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
                  isRedMode
                    ? "focus-visible:ring-[var(--matrix-red)]"
                    : "focus-visible:ring-[var(--matrix-green)]"
                )}
              >
                <span
                  className={cn(
                    "text-sm font-bold transition-all duration-200",
                    isRedMode
                      ? "text-[var(--matrix-red)] text-glow-red"
                      : "text-[var(--matrix-green)] text-glow"
                  )}
                >
                  {">"} pa_
                </span>
              </Link>
            </div>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-3">
              <span className="text-sm text-[var(--text-muted)]">
                [SELECT_REALITY]{" "}
                <span
                  className={cn(
                    "transition-all duration-200",
                    isRedMode ? "text-[var(--matrix-red)]" : "text-[var(--matrix-green)]"
                  )}
                >
                  {isRedMode ? "truth" : "work"}
                </span>
              </span>
              <PillToggle />
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn(
                "md:hidden p-2 -m-2 rounded-sm transition-colors duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
                isRedMode
                  ? "text-[var(--matrix-red)] focus-visible:ring-[var(--matrix-red)]"
                  : "text-[var(--matrix-green)] focus-visible:ring-[var(--matrix-green)]"
              )}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-[var(--matrix-green-dark)] bg-black/95"
            >
              <nav className="px-4 py-4 space-y-2" aria-label="Mobile navigation">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "block py-3 px-4 text-lg transition-all duration-200 rounded-sm",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset",
                      isRedMode
                        ? "text-[var(--matrix-red-dim)] hover:text-[var(--matrix-red)] hover:bg-[var(--matrix-red)]/10 focus-visible:ring-[var(--matrix-red)]"
                        : "text-[var(--matrix-green-dim)] hover:text-[var(--matrix-green)] hover:bg-[var(--matrix-green)]/10 focus-visible:ring-[var(--matrix-green)]"
                    )}
                  >
                    {">"} {link.label}
                  </a>
                ))}
                <div className="pt-4 border-t border-[var(--matrix-green-dark)]">
                  <div className="flex items-center justify-between px-4">
                    <span className="text-sm text-[var(--text-muted)]">
                      [REALITY]
                    </span>
                    <PillToggle />
                  </div>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
