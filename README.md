# Cache Kutty - Digital Twin 💪🏏

An interactive AI-powered digital twin application featuring **Cache Kutty** (Prabhagaran's digital persona) - a fitness enthusiast, cricket player, and Full Stack Web3 developer from Chennai. This application combines a modern React frontend with an AI-powered backend to create engaging conversations.

## 🚀 Features

### Frontend (React UI)
- **Modern Chat Interface**: Beautiful, responsive chat panel with real-time messaging
- **Profile Dashboard**: Display stats, XP progress, and personal information
- **Dark Mode**: Pre-configured dark theme for comfortable viewing
- **Gamification System**: Earn XP for interactions and track progress
- **Quick Actions**: Pre-defined buttons for common queries (Workout tips, Cricket drills, etc.)
- **Emoji Reactions**: Interactive reactions on messages
- **Smooth Animations**: Framer Motion powered transitions and effects
- **Compact Design**: Everything fits on one screen without scrolling

### Backend (Express API)
- **AI-Powered Responses**: Groq API (llama-3.3-70b) for intelligent conversations
- **Character-Based Personality**: Responses based on Prabhagaran's profile and interests
- **RESTful API**: Clean API endpoints for chat, profile, and history
- **Session Management**: Conversation history tracking
- **CORS Enabled**: Frontend-backend communication ready

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (version 18 or higher)
- **npm** (comes with Node.js)
- **Groq API Key** (free at https://console.groq.com)
- **Two terminals** (one for backend, one for frontend)

## 🛠️ Installation

### 1. Clone the Repository
```bash
git clone https://github.com/Prabhagaran2004/Digital_Twin.git
cd Digital-Twin-Starter-kit
```

### 2. Install Backend Dependencies
```bash
npm install
```

### 3. Install Frontend Dependencies
```bash
cd frontend
npm install
cd ..
```

### 4. Set up Environment Variables
Create a `.env` file in the root directory:
```bash
GROQ_API_KEY=your_groq_api_key_here
```

Get your free Groq API key from: https://console.groq.com

## 🏃‍♂️ Running the Application

You need to run **TWO separate terminals** simultaneously:

### Terminal 1 - Backend Server (Port 3001)
```bash
# From the root directory
npm run server
```

You should see:
```
🚀 Digital Twin API Server Started! 🚀
📡 Server running on: http://localhost:3001
💬 Ready to chat with your Digital Twin!
```

### Terminal 2 - Frontend UI (Port 3000)
```bash
# Open a NEW terminal
cd frontend
npm run dev
```

You should see:
```
VITE v5.4.20  ready in 697 ms
➡️  Local:   http://localhost:3000/
```

### Access the Application
Open your browser and go to: **http://localhost:3000**

## 🎯 How to Use

1. **Open the Application**: Navigate to http://localhost:3000 in your browser
2. **Start Chatting**: Type your message in the input box at the bottom
3. **Use Quick Actions**: Click pre-defined buttons for instant queries:
   - Workout tip 💪
   - Cricket tip 🏏
   - Fun fact 😎
   - Music recommendation 🎵
   - Motivation boost 🔥
4. **Earn XP**: Gain experience points for:
   - Sending messages (+10 XP)
   - Receiving responses (+5 XP)
   - Adding reactions (+2 XP)
5. **React to Messages**: Click emoji reactions on Cache Kutty's messages

### Example Conversations
**You**: How do I get stronger?
**Cache Kutty**: Vaaya Thambi! 💪 Start slow, focus on form, and make it fun! Mix strength, cardio, and flexibility. What's your current routine like? 🏋️🏏

**You**: Tell me about cricket bowling
**Cache Kutty**: Bowling drills all the way! ⚡ As a right-arm fast bowler, hitting batsmen's nerves is way more fun than just stumps 😎💥

## 📁 Project Structure

```
Digital-Twin-Starter-kit/
├── frontend/                    # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatPanel.jsx      # Main chat interface
│   │   │   ├── ProfilePanel.jsx   # Profile and stats
│   │   │   ├── Avatar.jsx         # Animated avatar
│   │   │   └── QuickActions.jsx   # Floating action buttons
│   │   ├── App.jsx                # Main app component
│   │   ├── main.jsx               # Entry point
│   │   ├── index.css              # Global styles
│   │   └── config.js              # Configuration
│   ├── package.json
│   └── vite.config.js
├── server.js                   # Express API server
├── index.js                    # CLI version (optional)
├── character.json              # Prabhagaran's personality data
├── package.json                # Backend dependencies
├── .env                        # Environment variables
└── README.md                   # This file
```

## ⚙️ Configuration

### Character Customization
Edit `character.json` to customize Cache Kutty's personality:

```json
{
  "name": "Prabhagaran",
  "bio": ["Final year student...", "Cricket player..."],
  "lore": ["Fast bowler inspired by Dale Steyn", ...],
  "adjectives": ["Energetic", "Funny", "Motivational"],
  "topics": ["Workout", "Cricket", "Web3", "90's music"],
  "style": {
    "all": [...],
    "chat": ["Use emojis generously", "Casual language"],
    "post": [...]
  }
}
```

### Frontend Customization
Edit `frontend/src/config.js` to modify colors, stats, and settings:
- Theme colors (neon blue, green, yellow, pink)
- Stats values
- Quick action buttons
- Avatar settings

## 🔧 Available Scripts

### Backend Scripts
- `npm run server` - Start Express API server (port 3001)
- `npm run dev` - Run CLI version (terminal chat)
- `npm run build` - Compile TypeScript
- `npm start` - Run compiled code

### Frontend Scripts
- `npm run dev` - Start Vite dev server (port 3000)
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🐛 Troubleshooting

### Backend Issues

1. **"Missing GROQ_API_KEY"**
   - Make sure you have a `.env` file in the root directory
   - Add: `GROQ_API_KEY=your_key_here`
   - Get your key from: https://console.groq.com

2. **"Port 3001 already in use"**
   - Change port in `server.js` (line 10): `const PORT = 3002;`
   - Update frontend `ChatPanel.jsx` (line 8): `const API_URL = 'http://localhost:3002'`

3. **"Cannot find module 'express'"**
   ```bash
   npm install
   ```

### Frontend Issues

1. **"Network Error" or "Backend not connecting"**
   - Make sure backend is running on port 3001
   - Check backend terminal for errors
   - Try accessing http://localhost:3001/health in browser

2. **"White screen" or "Blank page"**
   ```bash
   cd frontend
   rm -rf node_modules package-lock.json
   npm install
   npm run dev
   ```

3. **"Axios not found"**
   ```bash
   cd frontend
   npm install axios
   ```

4. **Chat scrolling the whole page**
   - Already fixed in the code
   - Make sure you pulled the latest version

## 📚 Tech Stack

### Backend
- **Node.js & Express**: API server
- **Alith**: AI conversation framework
- **Groq API**: llama-3.3-70b-versatile model
- **CORS**: Cross-origin support
- **dotenv**: Environment variables

### Frontend
- **React 18**: UI framework
- **Vite**: Build tool & dev server
- **TailwindCSS**: Utility-first styling
- **Framer Motion**: Smooth animations
- **Axios**: HTTP client
- **Lucide React**: Icon library

### Key Features
- Real-time AI responses
- Responsive design
- Session management
- XP gamification system
- Emoji reactions
- Dark mode optimized

## 🔗 API Endpoints

The backend server provides these REST endpoints:

### `GET /health`
Health check for the API
```json
{ "status": "ok", "message": "Digital Twin API is running!" }
```

### `POST /chat`
Send a message to Cache Kutty
```json
{
  "message": "How do I get stronger?",
  "sessionId": "optional-session-id"
}
```

Response:
```json
{
  "success": true,
  "message": "Vaaya Thambi! 💪 Start slow...",
  "sessionId": "user-session-123",
  "timestamp": "2025-10-19T..."
}
```

### `GET /history/:sessionId`
Get conversation history for a session

### `DELETE /history/:sessionId`
Clear conversation history

### `GET /profile`
Get Cache Kutty's profile information

## 🎉 Features Showcase

- ✅ **Compact UI**: Everything visible on one screen
- ✅ **Internal Scrolling**: Chat scrolls inside container, page stays fixed
- ✅ **Light Mode Ready**: Proper text colors and contrast
- ✅ **Responsive**: Works on desktop, tablet, and mobile
- ✅ **Real AI**: Powered by Groq's llama-3.3-70b model
- ✅ **Gamified**: XP system with level progression
- ✅ **Personalized**: Based on Prabhagaran's real personality

## 👨‍💻 Author

**Prabhagaran** (Cache Kutty)
- Final Year Student from Chennai
- Full Stack Web3 Developer
- Fast Bowler (Cricket)
- Fitness Enthusiast
- 90's Music Lover

GitHub: [@Prabhagaran2004](https://github.com/Prabhagaran2004)

## 📄 License

ISC License - Open source and free to use

---

**Made with ❤️ by Prabhagaran**
