import { Agent } from "alith";
import { readFileSync } from 'fs';
import { createInterface } from 'readline';
import dotenv from 'dotenv';
dotenv.config();
const myApiKey = process.env.GROQ_API_KEY || (() => {
    console.error({ Error: "Missing Api Key" });
    process.exit(1);
})();
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
    const messageExamples = character.messageExamples.map((example) => example.map(msg => `${msg.user}: ${msg.content.text}`).join('\n')).join('\n\n');
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
// Create readline interface for terminal interaction
const rl = createInterface({
    input: process.stdin,
    output: process.stdout
});
// Initialize Alith agent with Prabhagaran's character
const agent = new Agent({
    model: "llama-3.3-70b-versatile",
    baseUrl: "https://api.groq.com/openai/v1",
    apiKey: myApiKey,
    preamble: createPreamble(characterData),
});
// Digital Twin class using Alith
class PrabhagaranDigitalTwin {
    conversationHistory = [];
    // Start the conversation
    async startConversation() {
        console.log('\n🤖 Cache Kutty Activated! 🤖\n');
        console.log('='.repeat(50));
        console.log('👋 Hey! I\'m Cache Kutty, Prabhagaran\'s digital twin!');
        console.log('💬 Let\'s chat about workout, cricket, or anything!');
        console.log('📝 Type "exit" to end the conversation');
        console.log('='.repeat(50) + '\n');
        this.askQuestion();
    }
    async askQuestion() {
        rl.question('You: ', async (input) => {
            if (input.toLowerCase() === 'exit') {
                console.log('\n👋 Thanks for chatting! Keep building your physique and skills 🚀');
                rl.close();
                return;
            }
            try {
                const response = await agent.prompt(input);
                console.log(`\nCache Kutty: ${response}\n`);
                // Store conversation
                this.conversationHistory.push({ user: input, prabhagaran: response });
                this.askQuestion();
            }
            catch (error) {
                console.log('\n❌ Error: Failed to get response. Make sure you have set your API key.\n');
                console.log('Set your API key with: export OPENAI_API_KEY="your-api-key"\n');
                this.askQuestion();
            }
        });
    }
}
// Initialize and start the digital twin
const digitalTwin = new PrabhagaranDigitalTwin();
digitalTwin.startConversation();
//# sourceMappingURL=index.js.map