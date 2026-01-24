"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Briefcase, User, Code, Coffee } from "lucide-react";
import { VisitorType } from "@/hooks/use-visitor-type";

// Dynamically import the 3D blob to avoid SSR issues
const MorphingBlob = dynamic(
  () => import("./morphing-blob").then((mod) => mod.MorphingBlob),
  { ssr: false }
);

interface VisitorSelectionProps {
  onSelect: (type: VisitorType) => void;
}

const visitorOptions = [
  {
    type: "recruiter" as VisitorType,
    label: "Recruiter / Hiring Manager",
    description: "Looking for talent",
    icon: Briefcase,
    iconBg: "bg-gradient-to-br from-indigo-500 to-purple-600",
  },
  {
    type: "other" as VisitorType,
    label: "Fellow Developer",
    description: "Just browsing",
    icon: Code,
    iconBg: "bg-gradient-to-br from-violet-500 to-fuchsia-600",
  },
  {
    type: "other" as VisitorType,
    label: "Curious Visitor",
    description: "Exploring the web",
    icon: Coffee,
    iconBg: "bg-gradient-to-br from-pink-500 to-rose-600",
  },
  {
    type: "other" as VisitorType,
    label: "Someone Else",
    description: "None of the above",
    icon: User,
    iconBg: "bg-gradient-to-br from-cyan-500 to-blue-600",
  },
];

export function VisitorSelection({ onSelect }: VisitorSelectionProps) {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      role="dialog"
      aria-labelledby="visitor-title"
      aria-describedby="visitor-description"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-indigo-50/50 to-violet-100/50">
        {/* 3D Morphing Blob */}
        <MorphingBlob />

        {/* Subtle vignette */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-white/40" />
      </div>

      {/* Content with subtle glow backdrop */}
      <div className="relative max-w-2xl w-full">
        {/* Glow behind content */}
        <div className="absolute -inset-10 bg-white/60 blur-3xl rounded-full" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          className="relative text-center mb-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 15 }}
            className="inline-block mb-4"
          >
            <span className="text-5xl">👋</span>
          </motion.div>
          <h1 id="visitor-title" className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 tracking-tight">
            Hey there!
          </h1>
          <p id="visitor-description" className="text-slate-500 text-lg max-w-md mx-auto">
            I&apos;m <span className="text-slate-800 font-medium">Parag</span>. Tell me a bit about yourself so I can show you the right stuff.
          </p>
        </motion.div>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-4" role="group" aria-label="Visitor type options">
          {visitorOptions.map((option, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5, ease: "easeOut" }}
              onClick={() => onSelect(option.type)}
              whileHover={{ scale: 1.03, y: -4, transition: { duration: 0.15 } }}
              whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
              aria-label={`${option.label}: ${option.description}`}
              className="group relative p-6 rounded-2xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 overflow-hidden"
            >
              {/* Card background with gradient border effect */}
              <div className="absolute inset-0 bg-white rounded-2xl shadow-sm transition-all duration-200 group-hover:shadow-xl group-hover:shadow-slate-200/60" />

              {/* Gradient border on hover */}
              <div className="absolute inset-0 rounded-2xl border border-slate-200 group-hover:border-transparent transition-all duration-200" />
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ padding: "1px", background: "linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)", WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", WebkitMaskComposite: "xor", maskComposite: "exclude" }} />

              <div className="relative flex items-start gap-4">
                <div className={`p-3 rounded-xl ${option.iconBg} shadow-lg transition-all duration-200 group-hover:scale-110 group-hover:shadow-xl`}>
                  <option.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-slate-800 font-semibold text-lg mb-1 group-hover:text-slate-900 transition-colors duration-200">
                    {option.label}
                  </h3>
                  <p className="text-slate-500 text-sm group-hover:text-slate-600 transition-colors duration-200">
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
          transition={{ delay: 0.9, duration: 0.5 }}
          className="relative text-center text-slate-400 text-sm mt-10"
        >
          Don&apos;t worry, you can always change this later
        </motion.p>
      </div>
    </motion.div>
  );
}
