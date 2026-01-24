"use client";

import { useEffect, useRef } from "react";
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
    iconBg: "bg-gradient-to-br from-blue-600 to-indigo-700",
  },
  {
    type: "other" as VisitorType,
    label: "Fellow Developer",
    description: "Just browsing",
    icon: Code,
    iconBg: "bg-gradient-to-br from-violet-600 to-purple-700",
  },
  {
    type: "other" as VisitorType,
    label: "Curious Visitor",
    description: "Exploring the web",
    icon: Coffee,
    iconBg: "bg-gradient-to-br from-amber-500 to-orange-600",
  },
  {
    type: "other" as VisitorType,
    label: "Someone Else",
    description: "None of the above",
    icon: User,
    iconBg: "bg-gradient-to-br from-emerald-500 to-teal-600",
  },
];

// Animated dot grid component
function DotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      time += 0.005;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const spacing = 40;
      const dotSize = 1.5;

      for (let x = 0; x < canvas.width; x += spacing) {
        for (let y = 0; y < canvas.height; y += spacing) {
          // Create wave effect
          const distX = x - canvas.width / 2;
          const distY = y - canvas.height / 2;
          const dist = Math.sqrt(distX * distX + distY * distY);
          const wave = Math.sin(dist * 0.008 - time * 2) * 0.5 + 0.5;

          const opacity = 0.15 + wave * 0.15;
          const size = dotSize + wave * 0.5;

          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(100, 116, 139, ${opacity})`;
          ctx.fill();
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
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
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
        {/* Animated dot grid */}
        <DotGrid />

        {/* Radial glow behind content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-[800px] h-[600px] bg-gradient-radial from-blue-200/40 via-violet-200/20 to-transparent blur-3xl"
            style={{
              background: "radial-gradient(ellipse at center, rgba(191, 219, 254, 0.4) 0%, rgba(221, 214, 254, 0.2) 40%, transparent 70%)",
            }}
          />
        </div>
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
