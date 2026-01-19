"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function AnimatedBackground() {
  const pathname = usePathname();
  const isRedMode = pathname === "/why";

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient */}
      <div
        className={cn(
          "absolute inset-0 transition-colors duration-700",
          isRedMode
            ? "bg-gradient-to-br from-rose-100/50 via-gray-100 to-orange-100/50"
            : "bg-gradient-to-br from-blue-100/50 via-gray-100 to-indigo-100/50"
        )}
      />

      {/* Animated gradient orbs */}
      <motion.div
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={cn(
          "absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl opacity-30 transition-colors duration-700",
          isRedMode ? "bg-red-300" : "bg-blue-300"
        )}
      />

      <motion.div
        animate={{
          x: [0, -20, 0],
          y: [0, 30, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={cn(
          "absolute top-1/3 -left-20 w-72 h-72 rounded-full blur-3xl opacity-25 transition-colors duration-700",
          isRedMode ? "bg-orange-300" : "bg-indigo-300"
        )}
      />

      <motion.div
        animate={{
          x: [0, 25, 0],
          y: [0, -15, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={cn(
          "absolute bottom-20 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-20 transition-colors duration-700",
          isRedMode ? "bg-rose-400" : "bg-cyan-300"
        )}
      />

      <motion.div
        animate={{
          x: [0, -15, 0],
          y: [0, 20, 0],
          scale: [1, 1.12, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={cn(
          "absolute -bottom-20 left-1/3 w-64 h-64 rounded-full blur-3xl opacity-25 transition-colors duration-700",
          isRedMode ? "bg-amber-300" : "bg-violet-300"
        )}
      />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.sin(i) * 20, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
          className={cn(
            "absolute w-2 h-2 rounded-full transition-colors duration-700",
            isRedMode ? "bg-red-400/40" : "bg-blue-400/40"
          )}
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
        />
      ))}
    </div>
  );
}
