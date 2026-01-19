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
}

export const projects: Project[] = [
  {
    id: "emotion-detection",
    title: "Emotion Detection in Text",
    description:
      "ML project classifying Twitter messages into 6 distinct emotions using NLP techniques and various classification models.",
    longDescription:
      "Developed a comprehensive emotion detection system that analyzes Twitter messages and classifies them into six emotional categories: joy, sadness, anger, fear, love, and surprise. Implemented multiple classification approaches including BERT-based transformers, SVMs, and Naive Bayes, achieving strong accuracy through ensemble methods.",
    technologies: ["Python", "BERT", "SVM", "Naive Bayes", "NLP", "Scikit-learn"],
    githubUrl: "https://github.com/gtparag/CS4641-Project",
    featured: true,
  },
  {
    id: "platformer-game",
    title: "Platformer Jump Game",
    description:
      "Interactive browser-based platformer game with physics simulation, procedural level generation, and smooth animations.",
    longDescription:
      "Built a fully-featured platformer game from scratch using vanilla JavaScript and HTML5 Canvas. Features include realistic physics simulation for jumping and collision detection, procedural level generation, sprite animations, and a scoring system. Optimized for smooth 60fps gameplay.",
    technologies: ["JavaScript", "HTML5 Canvas", "Game Physics", "CSS3"],
    githubUrl: "https://github.com/gtparag/Platformer-Jump-Game",
    featured: true,
  },
  {
    id: "neural-style-transfer",
    title: "Neural Style Transfer App",
    description:
      "Deep learning application for artistic image transformation using convolutional neural networks.",
    longDescription:
      "A web application that applies artistic styles from famous paintings to user-uploaded photos using neural style transfer. Leverages pre-trained VGG networks and custom style loss functions to create stunning artistic transformations in real-time.",
    technologies: ["Python", "PyTorch", "CNN", "FastAPI", "React"],
    featured: true,
  },
  {
    id: "llm-code-assistant",
    title: "LLM-Powered Code Assistant",
    description:
      "AI coding assistant with context-aware suggestions using retrieval-augmented generation.",
    longDescription:
      "An intelligent coding assistant that understands your codebase through vector embeddings and provides context-aware suggestions using large language models. Features include semantic code search, automatic documentation generation, and intelligent code completion.",
    technologies: ["TypeScript", "OpenAI API", "Pinecone", "RAG", "LangChain"],
    featured: true,
  },
];
