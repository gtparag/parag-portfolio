"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { personalInfo } from "@/content/personal";

export function ProfessionalHero() {
  return (
    <section id="about" className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row items-start gap-8"
      >
        {/* Profile Image */}
        <div className="flex-shrink-0">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#eef0ff] to-[#e0e4ff] flex items-center justify-center border-4 border-white shadow-md">
            <span className="text-4xl font-bold text-[#4d65ff]">PA</span>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-2">
            {personalInfo.name}
          </h1>
          <p className="text-xl text-[#4d65ff] font-medium mb-3">
            Software Engineer & ML Researcher
          </p>
          <p className="text-[#8d8d83] mb-4 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            {personalInfo.location}
          </p>
          <p className="text-[#3A3A35] max-w-2xl mb-6 leading-relaxed">
            {personalInfo.bio}
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-[#4d65ff] text-white rounded-lg hover:bg-[#3d55ef] transition-colors"
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 border border-[#E8E8E0] text-[#3A3A35] rounded-lg hover:bg-[#F0F0EA] transition-colors"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="flex items-center gap-2 px-4 py-2 border border-[#E8E8E0] text-[#3A3A35] rounded-lg hover:bg-[#F0F0EA] transition-colors"
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
