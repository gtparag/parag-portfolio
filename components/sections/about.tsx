"use client";

import { motion } from "framer-motion";
import { GraduationCap, MapPin, Briefcase } from "lucide-react";
import { personalInfo } from "@/content/personal";

export function About() {
  return (
    <section
      id="about"
      className="py-12 px-4 sm:px-6 lg:px-8 bg-[var(--surface-primary)]/60 backdrop-blur-sm"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4">
            About Me
          </h2>
          <div className="w-20 h-1 bg-[var(--accent-primary)] mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-[var(--accent-muted)] to-[var(--surface-tertiary)] flex items-center justify-center overflow-hidden">
              <div className="text-8xl font-bold text-[var(--accent-primary)] opacity-30">
                PA
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[var(--accent-primary)] rounded-2xl -z-10 opacity-10" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8">
              {personalInfo.bio}
            </p>

            {/* Info Cards */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-lg bg-[var(--surface-secondary)]">
                <div className="p-2 rounded-lg bg-[var(--accent-muted)]">
                  <GraduationCap className="w-5 h-5 text-[var(--accent-primary)]" />
                </div>
                <div>
                  <p className="text-sm text-[var(--text-muted)]">Education</p>
                  <p className="font-medium text-[var(--text-primary)]">
                    {personalInfo.education}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-lg bg-[var(--surface-secondary)]">
                <div className="p-2 rounded-lg bg-[var(--accent-muted)]">
                  <MapPin className="w-5 h-5 text-[var(--accent-primary)]" />
                </div>
                <div>
                  <p className="text-sm text-[var(--text-muted)]">Location</p>
                  <p className="font-medium text-[var(--text-primary)]">
                    {personalInfo.location}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-lg bg-[var(--surface-secondary)]">
                <div className="p-2 rounded-lg bg-[var(--accent-muted)]">
                  <Briefcase className="w-5 h-5 text-[var(--accent-primary)]" />
                </div>
                <div>
                  <p className="text-sm text-[var(--text-muted)]">Focus</p>
                  <p className="font-medium text-[var(--text-primary)]">
                    AI/ML Research & Software Engineering
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
