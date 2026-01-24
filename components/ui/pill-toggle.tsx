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
    <div className={cn("flex items-center gap-3", className)}>
      <span
        className={cn(
          "text-xs font-mono tracking-wider transition-all duration-300",
          !isRedMode
            ? "text-[var(--matrix-green)] text-glow-subtle"
            : "text-[var(--matrix-green-dim)] opacity-50"
        )}
      >
        BLUE
      </span>
      <button
        onClick={toggleMode}
        className={cn(
          "relative w-16 h-7 rounded-full p-1 transition-all duration-300 focus:outline-none",
          "border-2 border-[var(--matrix-green)] overflow-hidden",
          "shadow-[0_0_10px_var(--matrix-green-dark),inset_0_0_20px_rgba(0,255,65,0.1)]"
        )}
        aria-label={isRedMode ? "Switch to Work mode" : "Switch to About mode"}
        role="switch"
        aria-checked={isRedMode}
      >
        {/* Scanline effect inside the track */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className="w-full h-px bg-[var(--matrix-green)]"
              style={{ marginTop: i === 0 ? '3px' : '3px' }}
            />
          ))}
        </div>

        {/* Sliding knob */}
        <motion.div
          layout
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
          className={cn(
            "relative w-5 h-5 rounded-sm z-10",
            isRedMode
              ? "ml-auto bg-[var(--matrix-red)] shadow-[0_0_12px_var(--matrix-red),0_0_20px_var(--matrix-red)]"
              : "ml-0 bg-[var(--matrix-green)] shadow-[0_0_12px_var(--matrix-green),0_0_20px_var(--matrix-green)]"
          )}
        />
      </button>
      <span
        className={cn(
          "text-xs font-mono tracking-wider transition-all duration-300",
          isRedMode
            ? "text-[var(--matrix-red)] text-glow-red"
            : "text-[var(--matrix-green-dim)] opacity-50"
        )}
      >
        RED
      </span>
    </div>
  );
}
