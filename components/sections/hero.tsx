"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { personalInfo } from "@/content/personal";
import { useTextScramble } from "@/hooks/use-text-scramble";

export function Hero() {
  const { displayText: nameText, scramble: scrambleName } = useTextScramble(
    personalInfo.name.toLowerCase(),
    true
  );
  const { displayText: bioText, scramble: scrambleBio } = useTextScramble(
    "software engineer & ml researcher",
    true
  );

  return (
    <section className="py-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-start gap-6"
      >
        {/* Profile Image - Matrix style */}
        <div className="flex-shrink-0">
          <div
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-none overflow-hidden border border-[var(--matrix-green)] box-glow flex items-center justify-center bg-black relative"
            onMouseEnter={scrambleName}
          >
            <span className="text-2xl sm:text-3xl font-bold text-[var(--matrix-green)] text-glow">
              PA
            </span>
            {/* Scan line effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--matrix-green)]/5 to-transparent animate-pulse" />
          </div>
        </div>

        {/* Name, Title, Links */}
        <div className="flex-1">
          <h1
            className="text-2xl sm:text-3xl font-bold text-[var(--matrix-green)] mb-1 text-glow cursor-pointer"
            onMouseEnter={scrambleName}
          >
            {nameText}
            <span className="cursor-blink ml-1">_</span>
          </h1>
          <p
            className="text-[var(--text-primary)] mb-3 cursor-pointer"
            onMouseEnter={scrambleBio}
          >
            <span className="text-[var(--matrix-green)]">{">"}</span> {bioText}
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-muted)] hover:text-[var(--matrix-green)] hover:text-glow-subtle transition-all duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-muted)] hover:text-[var(--matrix-green)] hover:text-glow-subtle transition-all duration-300"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="text-[var(--text-muted)] hover:text-[var(--matrix-green)] hover:text-glow-subtle transition-all duration-300"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
