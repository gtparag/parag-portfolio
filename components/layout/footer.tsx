"use client";

import { personalInfo } from "@/content/personal";

export function Footer() {
  return (
    <footer className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-8 sm:gap-12">
          <div className="sm:w-24 flex-shrink-0" />
          <p className="text-xs text-[var(--text-muted)]">
            {new Date().getFullYear()} {personalInfo.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
