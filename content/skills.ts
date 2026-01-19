export interface Skill {
  name: string;
  category: SkillCategory;
  proficiency: "expert" | "advanced" | "intermediate";
}

export type SkillCategory =
  | "languages"
  | "ml-ai"
  | "frameworks"
  | "tools"
  | "databases";

export const skills: Skill[] = [
  // Languages
  { name: "Python", category: "languages", proficiency: "expert" },
  { name: "TypeScript", category: "languages", proficiency: "advanced" },
  { name: "JavaScript", category: "languages", proficiency: "advanced" },
  { name: "Java", category: "languages", proficiency: "advanced" },
  { name: "C++", category: "languages", proficiency: "intermediate" },
  { name: "SQL", category: "languages", proficiency: "advanced" },

  // ML/AI
  { name: "PyTorch", category: "ml-ai", proficiency: "advanced" },
  { name: "TensorFlow", category: "ml-ai", proficiency: "advanced" },
  { name: "Scikit-learn", category: "ml-ai", proficiency: "expert" },
  { name: "NLP", category: "ml-ai", proficiency: "advanced" },
  { name: "Computer Vision", category: "ml-ai", proficiency: "intermediate" },
  { name: "Transformers", category: "ml-ai", proficiency: "advanced" },
  { name: "LLMs", category: "ml-ai", proficiency: "advanced" },

  // Frameworks
  { name: "React", category: "frameworks", proficiency: "advanced" },
  { name: "Next.js", category: "frameworks", proficiency: "advanced" },
  { name: "Node.js", category: "frameworks", proficiency: "advanced" },
  { name: "FastAPI", category: "frameworks", proficiency: "advanced" },
  { name: "Flask", category: "frameworks", proficiency: "intermediate" },

  // Tools
  { name: "Git", category: "tools", proficiency: "expert" },
  { name: "Docker", category: "tools", proficiency: "advanced" },
  { name: "AWS", category: "tools", proficiency: "intermediate" },
  { name: "Linux", category: "tools", proficiency: "advanced" },

  // Databases
  { name: "PostgreSQL", category: "databases", proficiency: "advanced" },
  { name: "MongoDB", category: "databases", proficiency: "intermediate" },
  { name: "Redis", category: "databases", proficiency: "intermediate" },
];

export const skillCategories: Record<SkillCategory, string> = {
  languages: "Languages",
  "ml-ai": "ML & AI",
  frameworks: "Frameworks",
  tools: "Tools & Platforms",
  databases: "Databases",
};
