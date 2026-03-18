"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Code2, X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { projects } from "@/content/projects";

function ImageLightbox({
  images,
  startIndex,
  onClose,
}: {
  images: string[];
  startIndex: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(startIndex);

  const prev = () => setCurrent((i) => (i - 1 + images.length) % images.length);
  const next = () => setCurrent((i) => (i + 1) % images.length);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
      onClick={onClose}
    >
      <button
        className="absolute top-4 right-4 text-white/70 hover:text-white p-2"
        onClick={onClose}
      >
        <X className="w-6 h-6" />
      </button>

      {images.length > 1 && (
        <>
          <button
            className="absolute left-4 text-white/70 hover:text-white p-2"
            onClick={(e) => { e.stopPropagation(); prev(); }}
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            className="absolute right-4 text-white/70 hover:text-white p-2"
            onClick={(e) => { e.stopPropagation(); next(); }}
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </>
      )}

      <div className="max-w-4xl max-h-[85vh] px-16" onClick={(e) => e.stopPropagation()}>
        <Image
          src={images[current]}
          alt={`Project image ${current + 1}`}
          width={900}
          height={600}
          className="object-contain max-h-[85vh] rounded-lg"
        />
        {images.length > 1 && (
          <p className="text-center text-white/50 text-sm mt-2">
            {current + 1} / {images.length}
          </p>
        )}
      </div>
    </motion.div>
  );
}

export function ProfessionalProjects() {
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null);

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
              <div className="shrink-0 w-14 h-14 rounded-xl bg-linear-to-br from-blue-50 to-blue-100 border border-blue-200 flex items-center justify-center">
                <Code2 className="w-7 h-7 text-blue-600" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
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
                  <div className="flex items-center gap-2 ml-4 shrink-0">
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

                {/* Images */}
                {project.images && project.images.length > 0 && (
                  <div className="flex gap-3 mt-4 overflow-x-auto pb-1">
                    {project.images.map((src, i) => (
                      <button
                        key={i}
                        onClick={() => setLightbox({ images: project.images!, index: i })}
                        className="shrink-0 rounded-lg overflow-hidden border border-gray-200 hover:border-blue-400 transition-colors"
                      >
                        <Image
                          src={src}
                          alt={`${project.title} image ${i + 1}`}
                          width={160}
                          height={110}
                          className="object-cover w-40 h-28"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {lightbox && (
          <ImageLightbox
            images={lightbox.images}
            startIndex={lightbox.index}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
