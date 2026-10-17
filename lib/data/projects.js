// "link" projects have a live demo. "download" projects ship as a
// downloadable executable (Python/CV projects with no web deployment) and
// should render a Download affordance instead of a Live Demo link.

export const webApps = [
  {
    slug: "music-adda",
    title: "Music Adda",
    description:
      "A real-time collaborative YouTube listening room where multiple users join a room and listen to songs together by dropping YouTube links. Features synchronized playback, host handoff, queue voting, live chat, reactions, and history replay — powered by Socket.io for low-latency state sync.",
    tech: ["React", "Vite", "Express", "Socket.io", "MongoDB"],
    type: "link",
    link: "https://kunalmusic.vercel.app/",
    github: "https://github.com/kunalgupta016/MusicAdda",
    caseStudy: true,
    architecture: [
      { label: "Room clients", detail: "React · Vite · YouTube IFrame API" },
      { label: "Live events", detail: "Socket.io room events and snapshots" },
      { label: "Room server", detail: "Express · authoritative in-memory state" },
      { label: "Persistence", detail: "MongoDB · optional background saves" },
    ],
    images: ["/projects/music-adda-1.png", "/projects/music-adda-2.png"],
  },
  {
    slug: "ai-resume-builder",
    title: "AI Resume Builder",
    description:
      "An intelligent resume builder that helps users craft professional resumes with AI-powered suggestions and formatting.",
    tech: ["React", "Node.js", "AI/ML"],
    type: "link",
    link: "https://cv-boost.vercel.app/",
    images: [
      "/projects/ai-resume-builder-1.png",
      "/projects/ai-resume-builder-2.png",
    ],
  },
  {
    slug: "vivamind",
    title: "AI Resume & Interview Assistant (VivaMind)",
    description:
      "A full-stack AI-powered platform that evaluates resumes and simulates real interview experiences using LLMs. Features include resume parsing, AI-driven scoring, personalized feedback, and dynamic role-based interview generation with real-time response evaluation.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "LLM APIs"],
    type: "link",
    link: "https://viva-mind-ai.vercel.app/",
    github: "https://github.com/kunalgupta016/ai-resume",
    caseStudy: true,
    architecture: [
      { label: "Product UI", detail: "React 18 · Vite · Tailwind CSS" },
      { label: "API layer", detail: "Node.js · Express · authenticated routes" },
      { label: "AI workflows", detail: "Gemini-powered resume and interview flows" },
      { label: "Persistence", detail: "MongoDB · user data and activity history" },
    ],
    images: ["/projects/vivamind-1.png", "/projects/vivamind-2.png"],
  },
  {
    slug: "multiplayer-sudoku",
    title: "Multiplayer Sudoku",
    description:
      "A browser-based Sudoku app playable together with friends in real time.",
    tech: ["React", "Socket.io", "Node.js"],
    type: "link",
    link: "https://sudokubykunal.vercel.app/",
    images: [
      "/projects/multiplayer-sudoku-1.png",
      "/projects/multiplayer-sudoku-2.png",
      "/projects/multiplayer-sudoku-3.png",
    ],
  },
];

export const cvProjects = [
  {
    slug: "fruit-ninja-hand",
    title: "Fruit Ninja (Hand-Tracking)",
    description:
      "A Python recreation of Fruit Ninja controlled entirely by hand gestures: the webcam opens, detects your hand, and you slice falling fruits (avoiding bombs) with easy/medium/hard difficulty levels.",
    tech: ["Python", "OpenCV", "MediaPipe", "Computer Vision"],
    type: "download",
    downloadUrl:
      "https://github.com/kunalgupta016/v2Portfolio/releases/download/v1.0.0/FruitNinja_Hand.exe",
    fileName: "FruitNinja_Hand.exe",
    fileSizeMB: 133,
    os: "Windows",
    images: ["/projects/fruit-ninja-1.png", "/projects/fruit-ninja-2.png"],
  },
  {
    slug: "archery-hand-tracking",
    title: "Hand-Tracking Archery Game",
    description:
      "A hand-gesture-controlled archery game: webcam-based hand tracking drives aiming and shooting mechanics in real time.",
    tech: ["Python", "OpenCV", "MediaPipe", "Computer Vision"],
    type: "download",
    downloadUrl:
      "https://github.com/kunalgupta016/v2Portfolio/releases/download/v1.0.0/archery_game.exe",
    fileName: "archery_game.exe",
    fileSizeMB: 162,
    os: "Windows",
  },
];
