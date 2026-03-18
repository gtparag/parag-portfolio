"use client";

import { motion } from "framer-motion";
import { GraduationCap, Calendar, MapPin } from "lucide-react";

export function ProfessionalEducation() {
  return (
    <section id="education" className="py-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Education</h2>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-xl border border-gray-200 p-6"
      >
        <div className="flex items-start gap-4">
          {/* Logo */}
          <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-[#B3A369] flex items-center justify-center">
            <GraduationCap className="w-7 h-7 text-white" />
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 text-lg">
              Georgia Institute of Technology
            </h3>
            <p className="text-blue-600 font-medium">
              Bachelor&apos;s degree, Computer Science
            </p>
            <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
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
