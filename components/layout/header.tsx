"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { PillToggle } from "@/components/ui/pill-toggle";
import { useMode } from "@/hooks/use-mode";
import { cn } from "@/lib/utils";

export function Header() {
  const { mode } = useMode();
  const isRedMode = mode === "red";

  const handleBackToMenu = () => {
    sessionStorage.removeItem("visitorType");
    sessionStorage.removeItem("pillChoice");
    window.location.reload();
  };

  return (
    <motion.header
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-[var(--matrix-green-dark)]"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBackToMenu}
              className={cn(
                "text-base font-mono tracking-wide transition-all hover:opacity-80 -ml-2",
                isRedMode
                  ? "text-[var(--matrix-red-dim)] hover:text-[var(--matrix-red)]"
                  : "text-[var(--matrix-green-dim)] hover:text-[var(--matrix-green)]"
              )}
              title="Back to menu"
            >
              <span className="text-xl mr-1">{"<"}</span> EXIT
            </button>
            <Link href="/" className="group">
              <span
                className={cn(
                  "text-sm font-bold transition-all",
                  isRedMode
                    ? "text-[var(--matrix-red)] text-glow-red"
                    : "text-[var(--matrix-green)] text-glow"
                )}
              >
                {">"} pa_
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-[var(--text-muted)]">
              [SELECT_REALITY]{" "}
              <span
                className={cn(
                  "transition-all",
                  isRedMode ? "text-[var(--matrix-red)]" : "text-[var(--matrix-green)]"
                )}
              >
                {isRedMode ? "truth" : "work"}
              </span>
            </span>
            <PillToggle />
          </div>
        </div>
      </div>
    </motion.header>
  );
}
