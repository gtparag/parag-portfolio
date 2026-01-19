"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronDown } from "lucide-react";
import { useTextScramble } from "@/hooks/use-text-scramble";

interface TimelineSection {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
  defaultOpen?: boolean;
  bullets?: string[];
}

const timelineSections: TimelineSection[] = [
  {
    id: "now",
    emoji: ">>",
    title: "CURRENT_STATUS",
    subtitle: "real-time system state",
    defaultOpen: true,
    bullets: [
      "Building intelligent systems at Georgia Tech.",
      "Researching NLP and deep learning applications.",
      "Creating tools that augment human capabilities.",
    ],
  },
  {
    id: "ml-research",
    emoji: ":::",
    title: "ML_RESEARCH_PROTOCOL",
    subtitle: "diving deep into the intelligence frontier",
    defaultOpen: false,
    bullets: [
      "Fascinated by how neural networks learn representations of the world.",
      "Working on projects that bridge research and real-world applications.",
      "Exploring the boundaries of what's possible with modern AI.",
    ],
  },
  {
    id: "georgia-tech",
    emoji: "[#]",
    title: "GEORGIA_TECH.node",
    subtitle: "where curiosity meets rigor",
    defaultOpen: false,
    bullets: [
      "Pursuing Computer Science with a focus on Machine Learning.",
      "Surrounded by brilliant minds pushing the boundaries of technology.",
      "Learning to think systematically about complex problems.",
      "Building projects that matter, not just for grades.",
    ],
  },
  {
    id: "journey",
    emoji: ">>>",
    title: "ORIGIN_STORY.log",
    subtitle: "from taking things apart to building the future",
    defaultOpen: false,
    bullets: [
      "Started by taking apart electronics to see how they worked.",
      "Discovered programming and never looked back.",
      "Fell in love with the elegance of well-designed systems.",
      "Now focused on creating AI that amplifies human potential.",
    ],
  },
];

function TimelineItem({ section }: { section: TimelineSection }) {
  const [isOpen, setIsOpen] = useState(section.defaultOpen ?? false);
  const { displayText, scramble } = useTextScramble(section.title);

  return (
    <div className="border-l border-[var(--matrix-red-dim)]/30 pl-4 py-2 hover:border-[var(--matrix-red)] transition-colors">
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={scramble}
        className="w-full text-left group"
      >
        <div className="flex items-center gap-2">
          <span className="text-[var(--matrix-red-dim)] text-xs font-bold">{section.emoji}</span>
          {isOpen ? (
            <ChevronDown className="w-4 h-4 text-[var(--matrix-red)]" />
          ) : (
            <ChevronRight className="w-4 h-4 text-[var(--matrix-red-dim)] group-hover:text-[var(--matrix-red)]" />
          )}
          <span className="text-[var(--matrix-red)] font-bold group-hover:text-glow-red transition-all">
            {displayText}
          </span>
        </div>
        {section.subtitle && (
          <p className="text-sm text-[var(--text-secondary)] ml-8 mt-0.5">
            {section.subtitle}
          </p>
        )}
      </button>

      <AnimatePresence>
        {isOpen && section.bullets && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <ul className="ml-8 mt-2 space-y-1">
              {section.bullets.map((bullet, index) => (
                <li
                  key={index}
                  className="text-sm text-[var(--text-primary)] flex items-start gap-2"
                >
                  <span className="text-[var(--matrix-red)]">$</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function RedPillContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-[var(--matrix-red)] text-glow-red flex items-center gap-2">
          <span className="text-[var(--matrix-red-dim)]">{"///"}</span>
          THE_TRUTH.exe
        </h2>
        <span className="text-sm text-[var(--matrix-red-dim)]">
          [CLASSIFIED]
        </span>
      </div>

      {/* Timeline Sections */}
      <div className="border border-[var(--matrix-red)] p-4 bg-black">
        <div className="text-[var(--text-muted)] text-xs mb-4">
          {">"} Decrypting personal data... [OK]
        </div>
        {timelineSections.map((section) => (
          <TimelineItem key={section.id} section={section} />
        ))}
        <div className="text-[var(--text-muted)] text-xs mt-4 pt-2 border-t border-[var(--matrix-red-dim)]/30">
          {">"} You have chosen to see how deep the rabbit hole goes_
        </div>
      </div>
    </motion.div>
  );
}
