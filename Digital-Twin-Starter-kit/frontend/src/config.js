// Configuration file for easy customization
// Edit these values to customize your Digital Twin UI

export const config = {
  // App Information
  appName: "Cache Kutty",
  appTagline: "Your AI Fitness & Cricket Buddy",
  
  // Theme Colors (Neon theme by default)
  colors: {
    primary: "#00E5FF",      // Neon Blue
    secondary: "#00FF88",    // Neon Green
    accent: "#FFE500",       // Neon Yellow
    highlight: "#FF00E5",    // Neon Pink
  },
  
  // Profile Information
  profile: {
    name: "Cache Kutty",
    avatar: "💪",
    location: "Chennai 🌆",
    role: "Final Year Student",
    tags: [
      { icon: "🏏", text: "Cricket Pro" },
      { icon: "💪", text: "Fitness Freak" },
      { icon: "💻", text: "MERN Dev" }
    ],
    bio: "Final year student from Chennai | Fast bowler ⚡ | 90's music lover 🎵 | Building cool stuff! 🚀"
  },
  
  // Initial Stats (can be updated dynamically)
  stats: {
    workouts: 156,
    cricketDrills: 89,
    musicTracks: 420,
    streakDays: 42
  },
  
  // Skill Progress Levels (0-100)
  skills: {
    fitness: 85,
    cricket: 92,
    techStack: 78,
    motivation: 95
  },
  
  // Fun Facts List
  funFacts: [
    { icon: "⚡", text: "Right-arm fast bowler inspired by Dale Steyn" },
    { icon: "💪", text: "Favorite workout: Biceps curls with cricket drills" },
    { icon: "🎵", text: "Huge fan of 90's music, especially SPB songs" },
    { icon: "💻", text: "MERN stack developer building innovative projects" },
    { icon: "😎", text: "Funny, witty, loves making friends laugh!" }
  ],
  
  // Quick Action Buttons
  quickActions: [
    { icon: "💪", label: "Workout tip", category: "fitness" },
    { icon: "🏏", label: "Cricket tip", category: "cricket" },
    { icon: "😎", label: "Fun fact", category: "fun" },
    { icon: "🎵", label: "Music recommendation", category: "music" },
    { icon: "🔥", label: "Motivation boost", category: "motivation" }
  ],
  
  // Gamification Settings
  gamification: {
    xpForMessage: 10,
    xpForResponse: 5,
    xpForReaction: 2,
    xpPerLevel: 100
  },
  
  // Achievements Configuration
  achievements: [
    { 
      id: 1, 
      name: "Fast Bowler", 
      icon: "🏏", 
      description: "Master of pace", 
      unlockCondition: "messages >= 10"
    },
    { 
      id: 2, 
      name: "Biceps Beast", 
      icon: "💪", 
      description: "Pump king", 
      unlockCondition: "xp >= 100"
    },
    { 
      id: 3, 
      name: "SPB Fan", 
      icon: "🎵", 
      description: "Music lover", 
      unlockCondition: "messages >= 5"
    },
    { 
      id: 4, 
      name: "Hackathon Champ", 
      icon: "🏆", 
      description: "Code warrior", 
      unlockCondition: "xp >= 500"
    },
    { 
      id: 5, 
      name: "Consistency King", 
      icon: "🔥", 
      description: "30-day streak", 
      unlockCondition: "streak >= 30"
    },
    { 
      id: 6, 
      name: "Cricket Legend", 
      icon: "⚡", 
      description: "Century scored", 
      unlockCondition: "cricketMessages >= 50"
    }
  ],
  
  // API Configuration (for backend integration)
  api: {
    baseUrl: "http://localhost:3000",
    endpoints: {
      chat: "/chat",
      profile: "/profile",
      stats: "/stats"
    }
  },
  
  // Animation Settings
  animations: {
    enableAnimations: true,
    animationSpeed: "normal", // fast, normal, slow
    enableParticles: true
  },
  
  // Feature Flags
  features: {
    darkModeToggle: true,
    gamification: true,
    achievements: true,
    quickActions: true,
    reactions: true,
    voiceInput: false, // Coming soon
    imageUpload: false // Coming soon
  }
}

export default config
