"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, MapPin } from "lucide-react";
import { experiences } from "@/content/experience";

// Microsoft logo component
const MicrosoftLogo = () => (
  <svg viewBox="0 0 23 23" className="w-8 h-8">
    <rect x="1" y="1" width="10" height="10" fill="#F25022" />
    <rect x="12" y="1" width="10" height="10" fill="#7FBA00" />
    <rect x="1" y="12" width="10" height="10" fill="#00A4EF" />
    <rect x="12" y="12" width="10" height="10" fill="#FFB900" />
  </svg>
);

// Georgia Tech logo component
const GeorgiaTechLogo = () => (
  <div className="w-8 h-8 bg-[#B3A369] rounded flex items-center justify-center">
    <span className="text-white text-xs font-bold">GT</span>
  </div>
);

// Georgia State University logo component
const GSULogo = () => (
  <div className="w-8 h-8 bg-[#0039A6] rounded flex items-center justify-center">
    <span className="text-white text-[10px] font-bold">GSU</span>
  </div>
);

const companyLogos: Record<string, React.ReactNode> = {
  "microsoft-swe": <MicrosoftLogo />,
  "microsoft-intern": <MicrosoftLogo />,
  "georgia-tech-vip": <GeorgiaTechLogo />,
  "georgia-tech-advising": <GeorgiaTechLogo />,
  "gsu-math-ta": <GSULogo />,
  "gsu-math-instructor": <GSULogo />,
};

function ExperienceItem({ exp, index }: { exp: typeof experiences[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(index === 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="border-b border-[#F0F0F0] last:border-0 py-6"
    >
      <div className="flex items-start gap-4">
        {/* Logo */}
        <div className="shrink-0 w-12 h-12 rounded-xl bg-[#F5F5F5] flex items-center justify-center">
          {companyLogos[exp.id] || <div className="w-8 h-8 bg-[#E5E5E5] rounded" />}
        </div>

        {/* Content */}
        <div className="flex-1">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full text-left"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-[#1A1A1A]">{exp.company}</h3>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#C0C0C0]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#C0C0C0]" />
                  )}
                </div>
                <p className="text-[#1A1A1A]/60 text-sm font-medium">{exp.title}</p>
                {exp.location && (
                  <p className="text-[#8d8d83] text-sm flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3" />
                    {exp.location}
                  </p>
                )}
              </div>
              <span className="text-[#8d8d83] text-sm whitespace-nowrap">
                {exp.startDate} — {exp.endDate}
              </span>
            </div>
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-4 space-y-3">
                  {exp.team && (
                    <p className="text-[#1A1A1A]/60 text-sm">
                      <span className="font-medium text-[#1A1A1A]/80">Team:</span> {exp.team}
                    </p>
                  )}
                  {exp.description && (
                    <p className="text-[#1A1A1A]/60 text-sm">{exp.description}</p>
                  )}
                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul className="space-y-2">
                      {exp.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-[#1A1A1A]/60">
                          <span className="w-1 h-1 rounded-full bg-[#1A1A1A]/30 mt-2 shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {exp.skills && exp.skills.length > 0 && (
                    <div className="flex items-center gap-2 flex-wrap pt-1">
                      {exp.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="text-xs px-2.5 py-1 bg-[#F5F5F5] text-[#1A1A1A]/60 rounded-full"
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
        </div>
      </div>
    </motion.div>
  );
}

export function ProfessionalExperience() {
  return (
    <section id="experience" className="py-16">
      <h2 className="text-3xl font-bold text-[#1A1A1A] mb-8 tracking-tight">Work Experience</h2>
      <div className="divide-y-0">
        {experiences.map((exp, index) => (
          <ExperienceItem key={exp.id} exp={exp} index={index} />
        ))}
      </div>
    </section>
  );
}
