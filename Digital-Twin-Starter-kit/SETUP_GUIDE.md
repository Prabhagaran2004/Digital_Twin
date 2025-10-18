# 🚀 Complete Setup Guide - Frontend + Backend

## What Changed?

✅ **Created HTTP Server** (`server.js`) - Your backend can now accept API calls  
✅ **Updated Frontend** - Now calls the real backend API instead of simulated responses  
✅ **Added Express & CORS** - Required dependencies for HTTP server  

## 🎯 Step-by-Step Setup

### Step 1: Install Backend Dependencies

```bash
cd c:\Users\p6292\OneDrive\Desktop\Digital_Twin\Digital-Twin-Starter-kit
npm install
```

This will install the new dependencies (express, cors).

### Step 2: Start the Backend Server (Terminal 1)

```bash
npm run server
```

You should see:
```
🚀 Digital Twin API Server Started! 🚀
==================================================
📡 Server running on: http://localhost:3001
🔗 API Endpoints:
   GET  /health            - Health check
   POST /chat              - Send message to twin
   GET  /history/:id       - Get conversation history
   DELETE /history/:id     - Clear conversation
   GET  /profile           - Get twin's profile
==================================================
💬 Ready to chat with your Digital Twin!
```

### Step 3: Start the Frontend (Terminal 2)

Open a **NEW terminal** and run:

```bash
cd c:\Users\p6292\OneDrive\Desktop\Digital_Twin\Digital-Twin-Starter-kit\frontend
npm install
npm run dev
```

You should see:
```
  VITE v5.0.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

### Step 4: Open in Browser

The frontend will automatically open at:
**http://localhost:3000**

## ✅ Testing the Connection

1. **Open the frontend** in your browser (http://localhost:3000)
2. **Type a message** in the chat, like "How do I get stronger?"
3. **Watch the backend terminal** - you should see:
   ```
   [2025-10-18T...] User: How do I get stronger?
   [2025-10-18T...] Twin: Vaaya Thambi! 💪 Start with...
   ```
4. **See the response** in the frontend UI

## 🔧 Architecture Overview

```
┌─────────────────────────────────────────┐
│  Frontend (React + Vite)                │
│  Port: 3000                             │
│  URL: http://localhost:3000             │
│                                         │
│  - Chat UI                              │
│  - Profile Panel                        │
│  - Gamification                         │
└───────────────┬─────────────────────────┘
                │
                │ HTTP POST /chat
                │ (axios request)
                ↓
┌─────────────────────────────────────────┐
│  Backend (Express Server)               │
│  Port: 3001                             │
│  URL: http://localhost:3001             │
│                                         │
│  - Express API                          │
│  - CORS enabled                         │
│  - Routes: /chat, /profile, etc.       │
└───────────────┬─────────────────────────┘
                │
                │ agent.prompt(message)
                ↓
┌─────────────────────────────────────────┐
│  Alith AI Agent                         │
│                                         │
│  - Groq API (llama-3.3-70b)            │
│  - Character data from character.json   │
│  - Generates responses                  │
└─────────────────────────────────────────┘
```

## 📝 What Each File Does

### Backend Files

- **`server.js`** - NEW! HTTP server with Express
  - Handles API requests from frontend
  - Routes: `/chat`, `/health`, `/profile`, `/history`
  - Uses Alith agent for AI responses

- **`index.js`** - Original CLI version (still works!)
  - Command-line chat interface
  - Run with: `npm run dev`

- **`character.json`** - Your twin's personality
  - Bio, lore, style, examples
  - Used by both server.js and index.js

### Frontend Files

- **`ChatPanel.jsx`** - UPDATED!
  - Now calls `http://localhost:3001/chat`
  - Fallback to simulated responses if backend is down
  - Shows error message if connection fails

## 🐛 Troubleshooting

### Backend Not Starting?

**Error: "Cannot find module 'express'"**
```bash
cd c:\Users\p6292\OneDrive\Desktop\Digital_Twin\Digital-Twin-Starter-kit
npm install
```

**Error: "Missing GROQ_API_KEY"**
- Make sure you have a `.env` file in the root directory
- Add your API key: `GROQ_API_KEY=your_key_here`

**Port 3001 already in use?**
- Edit `server.js` line 10: `const PORT = 3002;`
- Also update `frontend/src/components/ChatPanel.jsx` line 8: `const API_URL = 'http://localhost:3002'`

### Frontend Not Connecting?

**Error in console: "Network Error"**
- Make sure backend is running on port 3001
- Check backend terminal for errors
- Try accessing http://localhost:3001/health in browser

**Messages show fallback responses?**
- Backend is not running or not reachable
- Start backend with: `npm run server`
- Check for CORS errors in browser console

**Frontend won't install?**
- Delete `node_modules` folder
- Delete `package-lock.json`
- Run `npm install` again

## 🎯 Quick Commands Reference

### Start Everything (2 Terminals)

**Terminal 1 - Backend:**
```bash
cd c:\Users\p6292\OneDrive\Desktop\Digital_Twin\Digital-Twin-Starter-kit
npm run server
```

**Terminal 2 - Frontend:**
```bash
cd c:\Users\p6292\OneDrive\Desktop\Digital_Twin\Digital-Twin-Starter-kit\frontend
npm run dev
```

### Stop Everything
- Press `Ctrl + C` in each terminal

### Restart
- Stop both servers
- Start them again in order: Backend first, then Frontend

## 🔗 API Endpoints

### POST /chat
Send a message to your digital twin.

**Request:**
```json
{
  "message": "How do I get stronger?",
  "sessionId": "optional-session-id"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Vaaya Thambi! 💪 Start with...",
  "sessionId": "optional-session-id",
  "timestamp": "2025-10-18T..."
}
```

### GET /health
Check if the server is running.

**Response:**
```json
{
  "status": "ok",
  "message": "Digital Twin API is running!"
}
```

### GET /profile
Get the twin's profile information.

**Response:**
```json
{
  "success": true,
  "profile": {
    "name": "Prabhagaran",
    "bio": [...],
    "lore": [...],
    ...
  }
}
```

## 💡 Pro Tips

1. **Always start backend BEFORE frontend**
   - Backend takes a few seconds to load
   - Frontend needs backend to be ready

2. **Check both terminals**
   - Backend shows API logs
   - Frontend shows build logs

3. **Use the fallback**
   - If backend is down, frontend still works with simulated responses
   - Great for development and testing UI

4. **Session IDs**
   - Backend supports multiple chat sessions
   - Each user can have their own conversation history

5. **CORS is enabled**
   - Frontend (port 3000) can call Backend (port 3001)
   - No need to worry about cross-origin issues

## 🎉 Success Checklist

- [ ] Backend dependencies installed (`npm install` in root)
- [ ] Backend server running on port 3001
- [ ] Backend shows "Ready to chat" message
- [ ] Frontend dependencies installed (`npm install` in frontend/)
- [ ] Frontend running on port 3000
- [ ] Browser opens to http://localhost:3000
- [ ] Can send messages in UI
- [ ] Backend terminal shows user messages
- [ ] Frontend shows AI responses
- [ ] XP increases with interactions

## 🚀 You're Ready!

Once both servers are running:
1. Open http://localhost:3000
2. Start chatting with your Digital Twin!
3. Watch the magic happen in real-time! 💪⚡🏏

---

**Need Help?**
- Check backend terminal for errors
- Check browser console (F12) for frontend errors
- Make sure .env file has your GROQ_API_KEY
