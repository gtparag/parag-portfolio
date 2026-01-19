"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Terminal } from "lucide-react";
import { personalInfo } from "@/content/personal";

export function Contact() {
  return (
    <section id="contact" className="py-6">
      <h2 className="text-lg font-bold text-[var(--matrix-green)] mb-4 text-glow-subtle flex items-center gap-2">
        <span className="text-[var(--matrix-green-dim)]">{"///"}</span>
        ESTABLISH_CONNECTION.sh
      </h2>

      <div className="border border-[var(--matrix-green)] p-4 bg-black">
        <div className="text-[var(--text-muted)] text-xs mb-4">
          {">"} Initializing communication protocols... [OK]
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-[var(--text-primary)] mb-4 flex items-start gap-2">
            <Terminal className="w-4 h-4 mt-1 text-[var(--matrix-green)]" />
            <span>
              Ready to discuss opportunities, collaborations, or just chat about AI and tech.
              All channels open.
            </span>
          </p>

          <div className="flex flex-wrap gap-4 ml-6">
            <a
              href={`mailto:${personalInfo.email}`}
              className="matrix-btn inline-flex items-center gap-2 text-sm"
            >
              <Mail className="w-4 h-4" />
              EMAIL
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="matrix-btn inline-flex items-center gap-2 text-sm"
            >
              <Linkedin className="w-4 h-4" />
              LINKEDIN
            </a>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="matrix-btn inline-flex items-center gap-2 text-sm"
            >
              <Github className="w-4 h-4" />
              GITHUB
            </a>
          </div>
        </motion.div>

        <div className="text-[var(--text-muted)] text-xs mt-4 pt-2 border-t border-[var(--matrix-green-dark)]">
          {">"} Connection established. Awaiting transmission_
        </div>
      </div>
    </section>
  );
}
