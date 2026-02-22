"use client";

import { projects } from "@/content/projects";

export function ProjectsSidebar() {
  const featured = projects.filter((p) => p.featured);

  return (
    <div className="fixed right-0 top-0 bottom-0 z-40 hidden lg:flex flex-col items-center justify-center w-8 bg-black gap-8">
      {featured.map((project) => (
        <a
          key={project.id}
          href={project.githubUrl || project.liveUrl || "#projects"}
          target={project.githubUrl || project.liveUrl ? "_blank" : undefined}
          rel="noopener noreferrer"
          title={project.title}
          className="text-gray-400 hover:text-white transition-colors duration-200 text-[11px] font-medium tracking-widest whitespace-nowrap"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed", transform: "rotate(180deg)" }}
        >
          {project.title}
        </a>
      ))}
    </div>
  );
}
