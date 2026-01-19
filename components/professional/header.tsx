"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function ProfessionalHeader() {
  return (
    <motion.header
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="group">
            <span className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              Parag Ambildhuke
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#about"
              className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
            >
              About
            </a>
            <a
              href="#experience"
              className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
            >
              Experience
            </a>
            <a
              href="#education"
              className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
            >
              Education
            </a>
            <a
              href="#projects"
              className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
            >
              Projects
            </a>
            <a
              href="#contact"
              className="text-sm px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Contact
            </a>
          </nav>
        </div>
      </div>
    </motion.header>
  );
}
