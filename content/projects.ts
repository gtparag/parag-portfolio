export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
  featured: boolean;
  date?: string;
  association?: string;
}

export const projects: Project[] = [
  {
    id: "secure-usb",
    title: "Secure USB with Gesture Authentication",
    description:
      "Physical working prototype of a secure USB device that authenticates users via gestures & specific touch detection and hides sensitive data with a decoy file system.",
    longDescription:
      "Created a physical working prototype of a secure USB device that authenticates users via gestures & specific touch detection and hides sensitive data with a decoy file system.",
    technologies: ["C++", "ESP32", "Microcontrollers", "3D Printing", "Computer Hardware", "Prototyping"],
    liveUrl: "https://docs.google.com/presentation/d/1nbkbmD-gurJd2xQznhdY9opFqbysF7rnZlQgjZqUMJg/edit?pli=1&slide=id.p#slide=id.p",
    date: "Feb 2025 – Present",
    featured: true,
  },
  {
    id: "emotion-detection",
    title: "In-text Emotion Detection using NLP",
    description:
      "NLP project classifying text into 6 fundamental human emotions using deep learning techniques including LSTM, BERT, SVM, and Naive Bayes.",
    longDescription:
      "The project is based around using NLP for a more nuanced understanding of emotional context in text using 6 fundamental human emotions: sadness, joy, love, anger, fear, and surprise. Implements text normalization, tokenization and negation handling using Deep Learning techniques like LSTM, BERT, SVM, and Naive Bayes.",
    technologies: ["Python", "BERT", "LSTM", "SVM", "Naive Bayes", "NLP", "Scikit-learn"],
    githubUrl: "https://github.com/gtparag/CS4641-Project",
    date: "Feb 2024 – Present",
    association: "Georgia Institute of Technology",
    featured: true,
  },
  {
    id: "investing-yellow",
    title: "Investing Yellow",
    description:
      "Fin-tech application enabling users to gain insights into their financial status through an intuitive interface and AI-generated analysis reports. Built in 48 hours at HackGT X.",
    longDescription:
      "A fin-tech application built in 48 hours at HackGT X with a team of 4 people. Built using TypeScript, React, and Tailwind CSS for the user interface. Used Node.js and Express.js on AWS for secure backend operations. Integrated Plaid API for smooth transactions and balance checks. Established a robust infrastructure on AWS for scalability, utilizing Route 53, CloudFront, load balancing, and a secure SSL setup.",
    technologies: ["TypeScript", "React", "Tailwind CSS", "Node.js", "Express.js", "AWS", "Plaid API"],
    date: "Feb 2024",
    featured: true,
  },
  {
    id: "platformer-game",
    title: "Platformer Jump Game",
    description:
      "2D platformer game with a character that navigates through levels, featuring physics simulation and smooth animations.",
    longDescription:
      "Designed and developed a 2D platformer game with a character that can move left and right to navigate through the levels.",
    technologies: ["JavaScript", "HTML5", "CSS3", "Java", "Game Design"],
    githubUrl: "https://github.com/gtparag/Platformer-Jump-Game",
    liveUrl: "https://gtparag.github.io/Platformer-Jump-Game/",
    date: "Apr 2023 – Present",
    featured: true,
  },
  {
    id: "dungeon-royale",
    title: "Dungeon Royale",
    description:
      "2D dungeon crawler game where the player navigates through dungeon rooms with different layouts and enemies, built in Java on Android Studio.",
    longDescription:
      "Created a 2D Dungeon Crawler game where the user controls a player character and navigates through dungeon rooms with different layouts and enemies using Java in Android Studio. The player can attack and destroy enemies, collect powerups, and reach exits to advance. Enemies attack the player, depleting health — if health runs out, the game ends. Players earn a high score displayed on a leaderboard.",
    technologies: ["Java", "Android Studio", "Mobile Development", "HTML"],
    date: "Jan 2023 – Present",
    featured: true,
  },
  {
    id: "netflix-rating",
    title: "Movie Rating Generator for Netflix",
    description:
      "Devised overall and individual movie rating averages on the Netflix database with 17,770 files and over 7 million customer IDs.",
    longDescription:
      "Devised the overall and individual movie rating average on Netflix Database with 17770 files with over 7 million customer IDs, movie ratings, and names.",
    technologies: ["Python", "SQL", "Java"],
    date: "Oct 2022 – Dec 2022",
    featured: true,
  },
];
