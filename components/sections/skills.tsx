"use client";

import { motion } from "framer-motion";
import { skills, skillCategories, type SkillCategory } from "@/content/skills";
import { cn } from "@/lib/utils";

export function Skills() {
  const categorizedSkills = Object.keys(skillCategories).reduce(
    (acc, category) => {
      acc[category as SkillCategory] = skills.filter(
        (skill) => skill.category === category
      );
      return acc;
    },
    {} as Record<SkillCategory, typeof skills>
  );

  return (
    <section
      id="skills"
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
            Skills & Technologies
          </h2>
          <div className="w-20 h-1 bg-[var(--accent-primary)] mx-auto rounded-full mb-4" />
          <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(Object.keys(skillCategories) as SkillCategory[]).map(
            (category, categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                className="p-6 rounded-xl bg-[var(--surface-secondary)] border border-[var(--border-color)]"
              >
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
                  {skillCategories[category]}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {categorizedSkills[category].map((skill) => (
                    <span
                      key={skill.name}
                      className={cn(
                        "px-3 py-1.5 text-sm rounded-lg transition-colors",
                        skill.proficiency === "expert" &&
                          "bg-[var(--accent-primary)] text-white",
                        skill.proficiency === "advanced" &&
                          "bg-[var(--accent-muted)] text-[var(--accent-primary)]",
                        skill.proficiency === "intermediate" &&
                          "bg-[var(--surface-tertiary)] text-[var(--text-secondary)]"
                      )}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          )}
        </div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex items-center justify-center gap-6 text-sm"
        >
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-[var(--accent-primary)]" />
            <span className="text-[var(--text-muted)]">Expert</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-[var(--accent-muted)]" />
            <span className="text-[var(--text-muted)]">Advanced</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-[var(--surface-tertiary)]" />
            <span className="text-[var(--text-muted)]">Intermediate</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
