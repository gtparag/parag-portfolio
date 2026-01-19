export interface Experience {
  id: string;
  company: string;
  title: string;
  startDate: string;
  endDate: string;
  location?: string;
  team?: string;
  description?: string;
  bullets?: string[];
  skills?: string[];
}

export const experiences: Experience[] = [
  {
    id: "microsoft-swe",
    company: "Microsoft",
    title: "Software Engineer",
    startDate: "Jun 2025",
    endDate: "Present",
    location: "Greater Seattle Area",
    team: "Azure Networking Team",
    skills: ["Web Development", "C#"],
  },
  {
    id: "georgia-tech-vip",
    company: "Georgia Tech VIP Program",
    title: "Machine Learning & NLP Researcher",
    startDate: "Jan 2024",
    endDate: "Apr 2025",
    location: "Atlanta, Georgia",
    team: "Topic Modeling Team under Prof. Kartik Goyal",
    description: "Unlocking and Analyzing Historical Texts VIP (Vertically Integrated Project) team, pioneering effort in digital humanities.",
    bullets: [
      "Worked on unlocking and analyzing over 5,000 historical texts as part of a pioneering digital humanities effort.",
      "Spearheaded the creation of scraping techniques using ElementTree and analysis of data from EEBO TCP database and 50+ archives worldwide, developing algorithms for over 3,000 document layouts and formats.",
      "Worked on Topic Modeling of Early Modern English data using EEBO TCP database for feature extraction using Latent Dirichlet Allocation (LDA) and Moses tokenizer.",
    ],
    skills: ["Python", "Machine Learning", "NLP"],
  },
  {
    id: "microsoft-intern",
    company: "Microsoft",
    title: "Software Engineer Intern",
    startDate: "May 2024",
    endDate: "Aug 2024",
    location: "Greater Seattle Area",
    team: "Azure HyperScale Physical Networking (PhyNet) Team",
    bullets: [
      "Worked on developing/improving tools that detect anomalies and measure loss in Azure's entire network infrastructure.",
      "Developed tools to monitor datacenter networks keeping the foundation of Azure's infrastructure running smoothly, helping solve outages in the physical network infrastructure in real time.",
    ],
    skills: ["C++", "C#"],
  },
  {
    id: "georgia-tech-advising",
    company: "College of Computing at Georgia Tech",
    title: "College Advising Student Assistant",
    startDate: "May 2023",
    endDate: "May 2024",
    location: "Atlanta, Georgia",
    bullets: [
      "Served as the point of contact at the Front desk of College of Computing academic advising.",
      "Coordinated with Students and Advisors for meetings and academic information.",
      "Worked on projects facilitating the advising team at CoC Georgia Tech.",
      "Helped the advising team organize 10+ advising events with hundreds of students in each event.",
    ],
    skills: ["Project Management", "Event Planning"],
  },
  {
    id: "gsu-math-ta",
    company: "Georgia State University",
    title: "Undergraduate Mathematics Teaching & Lab Assistant",
    startDate: "Jan 2022",
    endDate: "Nov 2022",
    location: "Atlanta, Georgia",
    team: "Mathematics and Statistics, MILE (Mathematics Interactive Learning Environment) Lab",
    bullets: [
      "Conducted comprehensive test review sessions with over 20 students, contributing to more than a 25% increase in some students' grades.",
      "Specialized as an individual tutor by simplifying math concepts while coaching students to think critically, working with more than 250 students.",
      "Ensured that hardware and software are installed and properly functioning on over 70 computers in the Math lab.",
      "Instructed students on the proper use of mathematical software in the MILE lab.",
    ],
    skills: ["Applied Mathematics", "Communication"],
  },
  {
    id: "gsu-math-instructor",
    company: "Georgia State University",
    title: "Early College Summer Program Mathematics Instructor",
    startDate: "May 2022",
    endDate: "Jul 2022",
    location: "Atlanta, Georgia",
    team: "Early College Summer Program",
    bullets: [
      "Led 3 classes with over 25 students each for a cumulative of 15 lectures per week.",
      "Assigned and edited assignments on MyLab Math Pearson, made PowerPoint slides for each chapter, and managed the class on the university's course managing software iCollege.",
    ],
    skills: ["Applied Mathematics", "Communication"],
  },
];
