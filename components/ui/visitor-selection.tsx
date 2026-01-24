"use client";

import { motion } from "framer-motion";
import { Briefcase, Coffee } from "lucide-react";
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
    iconBg: "bg-gradient-to-br from-violet-500 to-purple-600",
  },
  {
    type: "other" as VisitorType,
    label: "Just Visiting",
    description: "Browsing around",
    icon: Coffee,
    iconBg: "bg-gradient-to-br from-blue-500 to-cyan-500",
  },
];

// Animated gradient orb component
function GradientOrb({
  className,
  color,
  size = "600px",
  duration = 20,
  delay = 0
}: {
  className: string;
  color: string;
  size?: string;
  duration?: number;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: [0.4, 0.6, 0.5, 0.7, 0.4],
        scale: [1, 1.1, 0.95, 1.05, 1],
        x: [0, 30, -20, 25, 0],
        y: [0, -25, 30, -15, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
      className={`absolute rounded-full blur-[100px] ${className}`}
      style={{
        width: size,
        height: size,
        background: color,
      }}
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
      {/* Background - Animated Gradient Mesh */}
      <div className="absolute inset-0 bg-[#fafafa] overflow-hidden">
        {/* Gradient orbs */}
        <GradientOrb
          className="-top-[200px] -left-[200px]"
          color="linear-gradient(135deg, #a78bfa 0%, #818cf8 100%)"
          size="700px"
          duration={25}
          delay={0}
        />
        <GradientOrb
          className="top-[10%] -right-[150px]"
          color="linear-gradient(135deg, #38bdf8 0%, #22d3ee 100%)"
          size="600px"
          duration={22}
          delay={2}
        />
        <GradientOrb
          className="-bottom-[200px] left-[20%]"
          color="linear-gradient(135deg, #fb7185 0%, #f472b6 100%)"
          size="650px"
          duration={28}
          delay={4}
        />
        <GradientOrb
          className="bottom-[20%] right-[10%]"
          color="linear-gradient(135deg, #fbbf24 0%, #fb923c 100%)"
          size="450px"
          duration={24}
          delay={6}
        />

        {/* Subtle noise texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
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
          <h1 id="visitor-title" className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 tracking-tight">
            Welcome
          </h1>
          <p id="visitor-description" className="text-slate-500 text-lg max-w-md mx-auto">
            Who are you? This helps me show you the right experience.
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
