"use client";

import { motion } from "framer-motion";
import { Briefcase, User, Code, Coffee } from "lucide-react";
import { VisitorType } from "@/hooks/use-visitor-type";

interface VisitorSelectionProps {
  onSelect: (type: VisitorType) => void;
}

const visitorOptions = [
  {
    type: "recruiter" as VisitorType,
    label: "Recruiter / Hiring Manager",
    description: "Looking for talent",
    icon: Briefcase,
  },
  {
    type: "other" as VisitorType,
    label: "Fellow Developer",
    description: "Just browsing",
    icon: Code,
  },
  {
    type: "other" as VisitorType,
    label: "Curious Visitor",
    description: "Exploring the web",
    icon: Coffee,
  },
  {
    type: "other" as VisitorType,
    label: "Someone Else",
    description: "None of the above",
    icon: User,
  },
];

export function VisitorSelection({ onSelect }: VisitorSelectionProps) {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      role="dialog"
      aria-labelledby="visitor-title"
      aria-describedby="visitor-description"
    >
      <div className="max-w-2xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 id="visitor-title" className="text-3xl md:text-4xl font-bold text-white mb-4">
            Welcome
          </h1>
          <p id="visitor-description" className="text-gray-400 text-lg">
            Who are you? This helps me show you the right experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" role="group" aria-label="Visitor type options">
          {visitorOptions.map((option, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
              onClick={() => onSelect(option.type)}
              aria-label={`${option.label}: ${option.description}`}
              className="group p-6 border border-gray-700 rounded-lg bg-gray-900/50 hover:bg-gray-800/80 hover:border-gray-500 transition-all duration-300 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black active:scale-[0.98]"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-gray-800 group-hover:bg-gray-700 transition-colors duration-200">
                  <option.icon className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors duration-200" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-1 group-hover:text-blue-400 transition-colors duration-200">
                    {option.label}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {option.description}
                  </p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center text-gray-600 text-sm mt-8"
        >
          You can change this anytime by clicking EXIT
        </motion.p>
      </div>
    </motion.div>
  );
}
