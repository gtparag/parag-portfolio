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
    gradient: "from-slate-700 to-slate-600",
    iconBg: "bg-slate-800",
  },
  {
    type: "other" as VisitorType,
    label: "Fellow Developer",
    description: "Just browsing",
    icon: Code,
    gradient: "from-slate-600 to-slate-500",
    iconBg: "bg-slate-700",
  },
  {
    type: "other" as VisitorType,
    label: "Curious Visitor",
    description: "Exploring the web",
    icon: Coffee,
    gradient: "from-stone-600 to-stone-500",
    iconBg: "bg-stone-700",
  },
  {
    type: "other" as VisitorType,
    label: "Someone Else",
    description: "None of the above",
    icon: User,
    gradient: "from-zinc-600 to-zinc-500",
    iconBg: "bg-zinc-700",
  },
];

// Animated gradient blob component
function GradientBlob({ className, delay = 0 }: { className: string; delay?: number }) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{
        scale: [0.8, 1.1, 0.9, 1.05, 0.8],
        opacity: [0.3, 0.5, 0.4, 0.45, 0.3],
        x: [0, 20, -15, 10, 0],
        y: [0, -15, 20, -10, 0],
      }}
      transition={{
        duration: 25,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
      className={`absolute rounded-full blur-3xl ${className}`}
    />
  );
}

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
      {/* Gradient mesh background - light professional */}
      <div className="absolute inset-0 bg-gradient-to-br from-stone-100 via-slate-50 to-zinc-100">
        <GradientBlob
          className="w-[600px] h-[600px] -top-48 -left-48 bg-gradient-to-br from-slate-300/50 to-stone-200/50"
          delay={0}
        />
        <GradientBlob
          className="w-[500px] h-[500px] top-1/4 -right-32 bg-gradient-to-br from-zinc-200/40 to-slate-300/40"
          delay={2}
        />
        <GradientBlob
          className="w-[400px] h-[400px] -bottom-32 left-1/4 bg-gradient-to-br from-stone-300/40 to-neutral-200/40"
          delay={4}
        />
        <GradientBlob
          className="w-[350px] h-[350px] bottom-1/4 right-1/4 bg-gradient-to-br from-gray-200/30 to-slate-200/30"
          delay={6}
        />
        {/* Subtle noise overlay for texture */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC4wMyIvPjwvc3ZnPg==')] opacity-30" />
      </div>

      <div className="relative max-w-2xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          className="text-center mb-10"
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" role="group" aria-label="Visitor type options">
          {visitorOptions.map((option, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5, ease: "easeOut" }}
              onClick={() => onSelect(option.type)}
              whileHover={{ scale: 1.02, y: -2, transition: { duration: 0.15 } }}
              whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
              aria-label={`${option.label}: ${option.description}`}
              className="group relative p-6 rounded-2xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white overflow-hidden"
            >
              {/* Card background */}
              <div className="absolute inset-0 bg-white/70 backdrop-blur-sm border border-slate-200/80 rounded-2xl transition-all duration-300 group-hover:bg-white group-hover:border-slate-300 group-hover:shadow-lg group-hover:shadow-slate-200/50" />

              <div className="relative flex items-start gap-4">
                <div className={`p-3 rounded-xl ${option.iconBg} shadow-md transition-transform duration-300 group-hover:scale-105`}>
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
          className="text-center text-slate-400 text-sm mt-10"
        >
          Don&apos;t worry, you can always change this later
        </motion.p>
      </div>
    </motion.div>
  );
}
