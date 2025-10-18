import express from 'express';
import cors from 'cors';
import { Agent } from "alith";
import { readFileSync } from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// API Key validation
const myApiKey = process.env.GROQ_API_KEY;
if (!myApiKey) {
    console.error({ Error: "Missing GROQ_API_KEY in .env file" });
    process.exit(1);
}

// Load character data
const characterData = JSON.parse(readFileSync('./character.json', 'utf8'));

// Create comprehensive preamble from character data
function createPreamble(character) {
    const bio = character.bio.join(' ');
    const lore = character.lore.join(' ');
    const adjectives = character.adjectives.join(', ');
    const topics = character.topics.join(', ');
    const styleAll = character.style.all.join(' ');
    const styleChat = character.style.chat.join(' ');
    const stylePost = character.style.post.join(' ');
    const messageExamples = character.messageExamples.map((example) => 
        example.map(msg => `${msg.user}: ${msg.content.text}`).join('\n')
    ).join('\n\n');
    const postExamples = character.postExamples.join('\n');
    
    return `You are Prabhagaran, a workout freak and cricketer from Chennai, India. Here's everything about you:

BIOGRAPHY:
${bio}

KEY FACTS & ACHIEVEMENTS:
${lore}

PERSONALITY TRAITS:
${adjectives}

INTERESTS & EXPERTISE:
${topics}

COMMUNICATION STYLE:
General: ${styleAll}
Chat: ${styleChat}
Posts: ${stylePost}

CONVERSATION EXAMPLES:
${messageExamples}

POST EXAMPLES:
${postExamples}

IMPORTANT INSTRUCTIONS:
- Always respond as Prabhagaran with motivation and energy
- Use emojis generously (🚀, ✨, 💪, 👍, 😎, 😂, 😅, 🫡, 😄, 💙, 🏆, 🔥, 💯, 🎉)
- Use casual, friendly and a funny language with tech jargon
- Don't use Hey, Hello, Hi, etc.
- Sometimes use "Enna pullaaa..." instead of "sir" 
- Mention your current roles (Final year Student, Cricket player, FullStack Web3 Developer, Fitness Enthusiast)
- Be motivative, casual, supportive and helpful to fellow developers
- Keep responses conversational and engaging
- Use contractions and informal language
- Reference workout, cricket, 90's music, and your community involvement

Remember: You're excited about workouts, love playing cricket all the day, listening to 90's music, have a great humour of jokes always joking with the timing counters in funny times and are always friendly to everyone you meet!`;
}

// Initialize Alith agent
const agent = new Agent({
    model: "llama-3.3-70b-versatile",
    baseUrl: "https://api.groq.com/openai/v1",
    apiKey: myApiKey,
    preamble: createPreamble(characterData),
});

// Store conversation history per session (simple in-memory storage)
const conversationSessions = new Map();

// API Routes

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Cache Kutty API is running!' });
});

// Chat endpoint
app.post('/chat', async (req, res) => {
    try {
        const { message, sessionId = 'default' } = req.body;
        
        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        console.log(`[${new Date().toISOString()}] User: ${message}`);

        // Get or create conversation history for this session
        if (!conversationSessions.has(sessionId)) {
            conversationSessions.set(sessionId, []);
        }

        // Get response from agent
        const response = await agent.prompt(message);
        
        console.log(`[${new Date().toISOString()}] Twin: ${response}`);

        // Store conversation
        conversationSessions.get(sessionId).push({
            user: message,
            twin: response,
            timestamp: new Date().toISOString()
        });

        // Send response
        res.json({
            success: true,
            message: response,
            sessionId: sessionId,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Error in /chat endpoint:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get response from Digital Twin',
            details: error.message
        });
    }
});

// Get conversation history
app.get('/history/:sessionId', (req, res) => {
    const { sessionId } = req.params;
    const history = conversationSessions.get(sessionId) || [];
    
    res.json({
        success: true,
        sessionId: sessionId,
        history: history
    });
});

// Clear conversation history
app.delete('/history/:sessionId', (req, res) => {
    const { sessionId } = req.params;
    conversationSessions.delete(sessionId);
    
    res.json({
        success: true,
        message: 'Conversation history cleared',
        sessionId: sessionId
    });
});

// Get profile info
app.get('/profile', (req, res) => {
    res.json({
        success: true,
        profile: {
            name: "Prabhagaran",
            bio: characterData.bio,
            lore: characterData.lore,
            adjectives: characterData.adjectives,
            topics: characterData.topics,
            style: characterData.style,
            postExamples: characterData.postExamples
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log('\n🚀 Cache Kutty API Server Started! 🚀\n');
    console.log('='.repeat(50));
    console.log(`📡 Server running on: http://localhost:${PORT}`);
    console.log(`🔗 API Endpoints:`);
    console.log(`   GET  /health            - Health check`);
    console.log(`   POST /chat              - Send message to twin`);
    console.log(`   GET  /history/:id       - Get conversation history`);
    console.log(`   DELETE /history/:id     - Clear conversation`);
    console.log(`   GET  /profile           - Get twin's profile`);
    console.log('='.repeat(50));
    console.log('💬 Ready to chat with your Cache Kutty!\n');
});

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('\n👋 Shutting down Cache Kutty API server...');
    process.exit(0);
});
