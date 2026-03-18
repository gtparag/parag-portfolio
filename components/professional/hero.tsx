"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { personalInfo } from "@/content/personal";

export function ProfessionalHero() {
  return (
    <section id="about" className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row items-start gap-10"
      >
        {/* Profile Image */}
        <div className="shrink-0">
          <div className="w-28 h-28 rounded-full bg-[#F5F5F5] flex items-center justify-center">
            <span className="text-3xl font-semibold text-[#1A1A1A]">PA</span>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-3 tracking-tight">
            {personalInfo.name}
          </h1>
          <p className="text-lg text-[#8d8d83] font-medium mb-4">
            Software Engineer & ML Researcher
          </p>
          <p className="text-[#8d8d83] mb-3 flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4" />
            {personalInfo.location}
          </p>
          <p className="text-[#1A1A1A]/70 max-w-2xl mb-8 leading-relaxed text-[15px]">
            {personalInfo.bio}
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-[#1A1A1A] text-white rounded-full hover:bg-[#333] transition-colors text-sm"
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 border border-[#E5E5E5] text-[#1A1A1A] rounded-full hover:bg-[#F9F9F9] transition-colors text-sm"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="flex items-center gap-2 px-5 py-2.5 border border-[#E5E5E5] text-[#1A1A1A] rounded-full hover:bg-[#F9F9F9] transition-colors text-sm"
            >
              <Mail className="w-4 h-4" />
              Email
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
