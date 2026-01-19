"use client";

import { motion } from "framer-motion";
import { useMode } from "@/hooks/use-mode";
import { cn } from "@/lib/utils";

interface PillToggleProps {
  className?: string;
}

export function PillToggle({ className }: PillToggleProps) {
  const { mode, toggleMode } = useMode();
  const isRedMode = mode === "red";

  return (
    <div className="flex items-center gap-2">
      <span
        className={cn(
          "text-xs transition-all",
          !isRedMode ? "text-[var(--matrix-green)] text-glow-subtle" : "text-[var(--text-muted)]"
        )}
      >
        BLUE
      </span>
      <button
        onClick={toggleMode}
        className={cn(
          "relative w-12 h-6 rounded-none p-0.5 transition-all duration-300 focus:outline-none border",
          isRedMode
            ? "border-[var(--matrix-red)] box-glow-red"
            : "border-[var(--matrix-green)] box-glow",
          className
        )}
        aria-label={isRedMode ? "Switch to Work mode" : "Switch to About mode"}
        role="switch"
        aria-checked={isRedMode}
      >
        {/* Pill/knob */}
        <motion.div
          layout
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
          className={cn(
            "w-5 h-5 rounded-none",
            isRedMode
              ? "ml-auto bg-[var(--matrix-red)] shadow-[0_0_10px_var(--matrix-red)]"
              : "ml-0 bg-[var(--matrix-green)] shadow-[0_0_10px_var(--matrix-green)]"
          )}
        />
      </button>
      <span
        className={cn(
          "text-xs transition-all",
          isRedMode ? "text-[var(--matrix-red)] text-glow-red" : "text-[var(--text-muted)]"
        )}
      >
        RED
      </span>
    </div>
  );
}
