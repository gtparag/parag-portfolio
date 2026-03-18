"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Github, MapPin } from "lucide-react";
import { personalInfo } from "@/content/personal";

export function ProfessionalContact() {
  return (
    <section id="contact" className="py-8">
      <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">Get in Touch</h2>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-2xl border border-[#E8E8E0] shadow-sm p-6"
      >
        <p className="text-[#6B6B63] mb-6">Feel free to reach out!</p>

        <div className="grid sm:grid-cols-2 gap-4">
          <a
            href={`mailto:${personalInfo.email}`}
            className="flex items-center gap-3 p-4 border border-[#E8E8E0] rounded-xl hover:border-[#4d65ff]/40 hover:bg-[#eef0ff] transition-colors group"
          >
            <div className="p-2 bg-[#eef0ff] rounded-lg group-hover:bg-[#e0e4ff] transition-colors">
              <Mail className="w-5 h-5 text-[#4d65ff]" />
            </div>
            <div>
              <p className="text-sm text-[#8d8d83]">Email</p>
              <p className="text-[#1A1A1A] font-medium">{personalInfo.email}</p>
            </div>
          </a>

          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 border border-[#E8E8E0] rounded-xl hover:border-[#4d65ff]/40 hover:bg-[#eef0ff] transition-colors group"
          >
            <div className="p-2 bg-[#eef0ff] rounded-lg group-hover:bg-[#e0e4ff] transition-colors">
              <Linkedin className="w-5 h-5 text-[#4d65ff]" />
            </div>
            <div>
              <p className="text-sm text-[#8d8d83]">LinkedIn</p>
              <p className="text-[#1A1A1A] font-medium">
                linkedin.com/in/parag-am
              </p>
            </div>
          </a>

          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 border border-[#E8E8E0] rounded-xl hover:border-[#E8E8E0] hover:bg-[#F5F5F0] transition-colors group"
          >
            <div className="p-2 bg-[#F5F5F0] rounded-lg group-hover:bg-[#EBEBЕ3] transition-colors">
              <Github className="w-5 h-5 text-[#3A3A35]" />
            </div>
            <div>
              <p className="text-sm text-[#8d8d83]">GitHub</p>
              <p className="text-[#1A1A1A] font-medium">github.com/gtparag</p>
            </div>
          </a>

          <div className="flex items-center gap-3 p-4 border border-[#E8E8E0] rounded-xl">
            <div className="p-2 bg-[#F0FAF5] rounded-lg">
              <MapPin className="w-5 h-5 text-[#2D8A5E]" />
            </div>
            <div>
              <p className="text-sm text-[#8d8d83]">Location</p>
              <p className="text-[#1A1A1A] font-medium">
                {personalInfo.location}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
