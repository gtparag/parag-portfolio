"use client";

import { motion } from "framer-motion";
import { useTextScramble } from "@/hooks/use-text-scramble";

export function Education() {
  const { displayText, scramble } = useTextScramble("Georgia Institute of Technology");

  return (
    <section id="education" className="py-6">
      <h2 className="text-lg font-bold text-[var(--matrix-green)] mb-4 text-glow-subtle flex items-center gap-2">
        <span className="text-[var(--matrix-green-dim)]">{"///"}</span>
        EDUCATION.dat
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="border border-[var(--matrix-green)] p-4 bg-black"
      >
        <div className="text-[var(--text-muted)] text-xs mb-3">
          {">"} Accessing academic records... [OK]
        </div>

        <div
          className="flex items-start gap-4 cursor-pointer"
          onMouseEnter={scramble}
        >
          {/* Georgia Tech Logo - Matrix style */}
          <div className="flex-shrink-0 w-12 h-12 border border-[var(--matrix-green)] flex items-center justify-center bg-black box-glow">
            <span className="text-[var(--matrix-green)] text-lg font-bold">GT</span>
          </div>

          {/* Education Details */}
          <div className="flex-1">
            <h3 className="font-bold text-[var(--matrix-green)] text-glow-subtle">
              {displayText}
            </h3>
            <p className="text-sm text-[var(--text-primary)]">
              <span className="text-[var(--matrix-green)]">[DEGREE]</span> Bachelor&apos;s degree, Computer Science
            </p>
            <p className="text-sm text-[var(--text-secondary)]">
              <span className="text-[var(--matrix-green)]">[DATE]</span> Aug 2021 - May 2025
            </p>
          </div>
        </div>

        <div className="text-[var(--text-muted)] text-xs mt-3 pt-2 border-t border-[var(--matrix-green-dark)]">
          {">"} Education data loaded successfully_
        </div>
      </motion.div>
    </section>
  );
}
