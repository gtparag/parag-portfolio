"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Github, MapPin } from "lucide-react";
import { personalInfo } from "@/content/personal";

export function ProfessionalContact() {
  return (
    <section id="contact" className="py-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-xl border border-gray-200 p-6"
      >
        <p className="text-gray-600 mb-6">Feel free to reach out!</p>

        <div className="grid sm:grid-cols-2 gap-4">
          <a
            href={`mailto:${personalInfo.email}`}
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors group"
          >
            <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
              <Mail className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-gray-900 font-medium">{personalInfo.email}</p>
            </div>
          </a>

          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors group"
          >
            <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
              <Linkedin className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">LinkedIn</p>
              <p className="text-gray-900 font-medium">
                linkedin.com/in/parag-am
              </p>
            </div>
          </a>

          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors group"
          >
            <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-gray-200 transition-colors">
              <Github className="w-5 h-5 text-gray-700" />
            </div>
            <div>
              <p className="text-sm text-gray-500">GitHub</p>
              <p className="text-gray-900 font-medium">github.com/gtparag</p>
            </div>
          </a>

          <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg">
            <div className="p-2 bg-green-100 rounded-lg">
              <MapPin className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="text-gray-900 font-medium">
                {personalInfo.location}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
