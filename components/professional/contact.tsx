"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Github, MapPin } from "lucide-react";
import { personalInfo } from "@/content/personal";

export function ProfessionalContact() {
  return (
    <section id="contact" className="py-16">
      <h2 className="text-3xl font-bold text-[#1A1A1A] mb-8 tracking-tight">Get in Touch</h2>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <p className="text-[#8d8d83] mb-8 text-[15px]">Feel free to reach out!</p>

        <div className="grid sm:grid-cols-2 gap-4">
          <a
            href={`mailto:${personalInfo.email}`}
            className="flex items-center gap-4 p-5 rounded-2xl hover:bg-[#F9F9F9] transition-colors group"
          >
            <div className="p-2.5 bg-[#F5F5F5] rounded-xl group-hover:bg-[#EBEBEB] transition-colors">
              <Mail className="w-5 h-5 text-[#1A1A1A]/40" />
            </div>
            <div>
              <p className="text-xs text-[#8d8d83] uppercase tracking-wide">Email</p>
              <p className="text-[#1A1A1A] font-medium text-sm">{personalInfo.email}</p>
            </div>
          </a>

          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-5 rounded-2xl hover:bg-[#F9F9F9] transition-colors group"
          >
            <div className="p-2.5 bg-[#F5F5F5] rounded-xl group-hover:bg-[#EBEBEB] transition-colors">
              <Linkedin className="w-5 h-5 text-[#1A1A1A]/40" />
            </div>
            <div>
              <p className="text-xs text-[#8d8d83] uppercase tracking-wide">LinkedIn</p>
              <p className="text-[#1A1A1A] font-medium text-sm">
                linkedin.com/in/parag-am
              </p>
            </div>
          </a>

          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-5 rounded-2xl hover:bg-[#F9F9F9] transition-colors group"
          >
            <div className="p-2.5 bg-[#F5F5F5] rounded-xl group-hover:bg-[#EBEBEB] transition-colors">
              <Github className="w-5 h-5 text-[#1A1A1A]/40" />
            </div>
            <div>
              <p className="text-xs text-[#8d8d83] uppercase tracking-wide">GitHub</p>
              <p className="text-[#1A1A1A] font-medium text-sm">github.com/gtparag</p>
            </div>
          </a>

          <div className="flex items-center gap-4 p-5 rounded-2xl">
            <div className="p-2.5 bg-[#F5F5F5] rounded-xl">
              <MapPin className="w-5 h-5 text-[#1A1A1A]/40" />
            </div>
            <div>
              <p className="text-xs text-[#8d8d83] uppercase tracking-wide">Location</p>
              <p className="text-[#1A1A1A] font-medium text-sm">
                {personalInfo.location}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
