"use client";

import { motion } from "framer-motion";
import { GraduationCap, Calendar, MapPin } from "lucide-react";

export function ProfessionalEducation() {
  return (
    <section id="education" className="py-16">
      <h2 className="text-3xl font-bold text-[#1A1A1A] mb-8 tracking-tight">Education</h2>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-start gap-4">
          {/* Logo */}
          <div className="shrink-0 w-12 h-12 rounded-xl bg-[#B3A369] flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3 className="font-semibold text-[#1A1A1A] text-lg">
              Georgia Institute of Technology
            </h3>
            <p className="text-[#1A1A1A]/60 font-medium">
              Bachelor&apos;s degree, Computer Science
            </p>
            <div className="flex flex-wrap gap-4 mt-2 text-sm text-[#8d8d83]">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Aug 2021 - May 2025
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                Atlanta, GA
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
