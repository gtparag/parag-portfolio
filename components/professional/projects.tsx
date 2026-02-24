"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Code2 } from "lucide-react";
import { projects } from "@/content/projects";

export function ProfessionalProjects() {
  return (
    <section id="projects" className="py-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Projects</h2>

      <div className="grid gap-6">
        {projects.filter(p => p.featured).map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className="shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 flex items-center justify-center">
                <Code2 className="w-7 h-7 text-blue-600" />
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">
                      {project.title}
                    </h3>
                    {(project.date || project.association) && (
                      <div className="flex items-center gap-2 mt-0.5">
                        {project.date && (
                          <span className="text-sm text-gray-400">{project.date}</span>
                        )}
                        {project.association && (
                          <span className="text-sm text-blue-600">· {project.association}</span>
                        )}
                      </div>
                    )}
                    <p className="text-gray-600 mt-2">{project.description}</p>
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-2 ml-4">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                        title="View on GitHub"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                        title="View Live"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Technologies */}
                <div className="flex items-center gap-2 flex-wrap mt-4">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
