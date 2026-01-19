"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronDown } from "lucide-react";
import { experiences } from "@/content/experience";
import { useTextScramble } from "@/hooks/use-text-scramble";

function ExperienceItem({ exp, index }: { exp: typeof experiences[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(index === 0);
  const { displayText, scramble } = useTextScramble(exp.company);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="border-l border-[var(--matrix-green-dark)] pl-4 py-3 hover:border-[var(--matrix-green)] transition-colors"
    >
      {/* Header row */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={scramble}
        className="w-full text-left group"
      >
        <div className="flex items-center gap-2">
          <span className="text-[var(--matrix-green-dim)]">{">"}</span>
          {isOpen ? (
            <ChevronDown className="w-4 h-4 text-[var(--matrix-green)]" />
          ) : (
            <ChevronRight className="w-4 h-4 text-[var(--matrix-green-dim)] group-hover:text-[var(--matrix-green)]" />
          )}
          <span className="text-[var(--matrix-green)] font-bold group-hover:text-glow-subtle transition-all">
            {displayText}
          </span>
          <span className="text-[var(--text-muted)] ml-auto text-sm">
            {exp.startDate} — {exp.endDate}
          </span>
        </div>
        <div className="ml-8 text-[var(--text-primary)] text-sm">
          {exp.title}
        </div>
      </button>

      {/* Expanded content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="ml-8 mt-3 space-y-2">
              {exp.team && (
                <p className="text-[var(--text-secondary)] text-sm">
                  <span className="text-[var(--matrix-green)]">[TEAM]</span> {exp.team}
                </p>
              )}
              {exp.description && (
                <p className="text-[var(--text-primary)] text-sm">
                  {exp.description}
                </p>
              )}
              {exp.bullets && exp.bullets.length > 0 && (
                <ul className="space-y-1">
                  {exp.bullets.map((bullet, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-[var(--text-primary)]"
                    >
                      <span className="text-[var(--matrix-green)]">$</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
              {exp.skills && exp.skills.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap pt-2">
                  <span className="text-xs text-[var(--matrix-green-dim)]">[SKILLS]</span>
                  {exp.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-0.5 border border-[var(--matrix-green-dark)] text-[var(--matrix-green)] hover:bg-[var(--matrix-green)] hover:text-black transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function Experience() {
  return (
    <section id="experience" className="py-6">
      <h2 className="text-lg font-bold text-[var(--matrix-green)] mb-4 text-glow-subtle flex items-center gap-2">
        <span className="text-[var(--matrix-green-dim)]">{"///"}</span>
        WORK_EXPERIENCE.exe
      </h2>

      <div className="space-y-1 border border-[var(--matrix-green)] p-4 bg-black">
        <div className="text-[var(--text-muted)] text-xs mb-4">
          {">"} Loading career data... [OK]
        </div>
        {experiences.map((exp, index) => (
          <ExperienceItem key={exp.id} exp={exp} index={index} />
        ))}
        <div className="text-[var(--text-muted)] text-xs mt-4 pt-2 border-t border-[var(--matrix-green-dark)]">
          {">"} {experiences.length} records found_
        </div>
      </div>
    </section>
  );
}
