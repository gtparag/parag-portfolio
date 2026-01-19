"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { projects } from "@/content/projects";
import { useTextScramble } from "@/hooks/use-text-scramble";

function ProjectItem({ project, index }: { project: typeof projects[0]; index: number }) {
  const { displayText, scramble } = useTextScramble(project.title);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="border-l border-[var(--matrix-green-dark)] pl-4 py-3 hover:border-[var(--matrix-green)] transition-colors"
      onMouseEnter={scramble}
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[var(--matrix-green-dim)]">[{String(index + 1).padStart(2, '0')}]</span>
        <h3 className="font-bold text-[var(--matrix-green)] hover:text-glow-subtle transition-all">
          {displayText}
        </h3>
        {project.githubUrl && project.githubUrl.startsWith("http") && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--text-muted)] hover:text-[var(--matrix-green)] transition-colors ml-auto"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
      <div className="ml-8">
        <p className="text-xs text-[var(--matrix-green)] mb-1">
          {"{"} {project.technologies.slice(0, 4).join(" | ")} {"}"}
        </p>
        <p className="text-sm text-[var(--text-primary)]">
          {project.description}
        </p>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <section id="projects" className="py-6">
      <h2 className="text-lg font-bold text-[var(--matrix-green)] mb-4 text-glow-subtle flex items-center gap-2">
        <span className="text-[var(--matrix-green-dim)]">{"///"}</span>
        PROJECTS.dir
      </h2>

      <div className="border border-[var(--matrix-green)] p-4 bg-black">
        <div className="text-[var(--text-muted)] text-xs mb-4">
          {">"} Scanning project directory... [OK]
        </div>
        <div className="space-y-1">
          {featuredProjects.map((project, index) => (
            <ProjectItem key={project.id} project={project} index={index} />
          ))}
        </div>
        <div className="text-[var(--text-muted)] text-xs mt-4 pt-2 border-t border-[var(--matrix-green-dark)]">
          {">"} {featuredProjects.length} featured projects loaded_
        </div>
      </div>
    </section>
  );
}
