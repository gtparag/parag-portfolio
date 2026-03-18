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
      className="border-b border-gray-100 last:border-0 py-5"
    >
      <div className="flex items-start gap-4">
        {/* Logo */}
        <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center">
          {companyLogos[exp.id] || <div className="w-8 h-8 bg-gray-200 rounded" />}
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
                  <h3 className="font-semibold text-gray-900">{exp.company}</h3>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  )}
                </div>
                <p className="text-blue-600 text-sm font-medium">{exp.title}</p>
                {exp.location && (
                  <p className="text-gray-500 text-sm flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3" />
                    {exp.location}
                  </p>
                )}
              </div>
              <span className="text-gray-500 text-sm whitespace-nowrap">
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
                <div className="mt-3 space-y-3">
                  {exp.team && (
                    <p className="text-gray-600 text-sm">
                      <span className="font-medium">Team:</span> {exp.team}
                    </p>
                  )}
                  {exp.description && (
                    <p className="text-gray-600 text-sm">{exp.description}</p>
                  )}
                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul className="space-y-2">
                      {exp.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
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
                          className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full"
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
    <section id="experience" className="py-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Work Experience</h2>
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        {experiences.map((exp, index) => (
          <ExperienceItem key={exp.id} exp={exp} index={index} />
        ))}
      </div>
    </section>
  );
}
