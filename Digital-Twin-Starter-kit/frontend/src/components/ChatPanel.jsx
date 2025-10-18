import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Smile, Heart, ThumbsUp, Zap } from 'lucide-react'
import axios from 'axios'
import Avatar from './Avatar'

// Backend API configuration
const API_URL = 'http://localhost:3001'

const quickQuestions = [
  { text: "Workout tip 💪", category: "fitness" },
  { text: "Cricket tip 🏏", category: "cricket" },
  { text: "Fun fact 😎", category: "fun" },
  { text: "Music recommendation 🎵", category: "music" },
  { text: "Motivation boost 🔥", category: "motivation" },
]

const twinResponses = {
  fitness: [
    "Vaaya Thambi! 💪 Start slow, focus on form, and make it fun! Mix strength, cardio, and flexibility. What's your current routine like? 🏋️🏏",
    "Gotta go with biceps curls! 💪 That pump feeling is unbeatable. I mix it with cricket sprints to keep everything balanced! 🏋️🏏😂",
    "After an intense session, I stretch, hydrate, maybe a few batting swings 🏋️🏏 Recovery is as important as the workout!"
  ],
  cricket: [
    "Bowling drills all the way! ⚡ As a right-arm fast bowler, hitting batsmen's nerves is way more fun than just stumps 😎💥",
    "Fitness = everything! 💪 I do sprints, core workouts, and strength training to stay explosive on the field 🏋️🏏😂",
    "Focus on speed, rhythm, and accuracy ⚡ Mix explosive leg workouts with bowling drills. Dale Steyn vibes help a ton!"
  ],
  fun: [
    "Did you know Dale Steyn's fastest delivery was 156.3 km/h? I'm working on matching that speed... in my dreams! 😂⚡",
    "Laughed through my workout today! Who said training can't be fun? 💪🏏",
    "My biceps are so pumped, they have their own fan club! 😎💪 Just kidding, but the gains are real!"
  ],
  music: [
    "SPB's voice is pure magic! 🎵 90's music hits different when you're grinding at the gym 💪",
    "Nothing beats working out to classic 90's Tamil songs! SPB's voice = instant motivation boost 🎵🔥",
    "Currently vibing to SPB classics while planning my next cricket match! 🎵🏏"
  ],
  motivation: [
    "Remember Dei Thambi, small steps every day lead to HUGE gains! 💪 Keep pushing, you got this! 🔥",
    "Feeling unstoppable? That's the spirit! 💥 Channel that energy into your next workout or cricket session! 🏋️🏏",
    "Every rep counts, every ball matters! 💪🏏 Stay consistent and the results will blow your mind! ⚡"
  ]
}

const ChatPanel = ({ addXP, unlockAchievement, darkMode }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'twin',
      text: "Enna pullaaa! 💪 Welcome to Cache Kutty! I'm here to talk fitness, cricket, music, and all things fun! What's on your mind today? 😎🏏",
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const [selectedReaction, setSelectedReaction] = useState(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (text = inputValue, isQuick = false) => {
    if (!text.trim()) return

    // Add user message
    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: text,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])
    setInputValue('')

    // Add XP for interaction
    addXP(10)

    // Show typing indicator
    setIsTyping(true)

    try {
      // Call backend API
      const response = await axios.post(`${API_URL}/chat`, {
        message: text,
        sessionId: 'user-session-' + Date.now() // You can use a persistent session ID
      })

      // Add twin's response
      const twinMessage = {
        id: Date.now() + 1,
        sender: 'twin',
        text: response.data.message,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, twinMessage])
      setIsTyping(false)

      // Add more XP for getting response
      addXP(5)

    } catch (error) {
      console.error('Error calling backend:', error)
      
      // Fallback to simulated response if backend is down
      let fallbackResponse
      if (isQuick) {
        const category = quickQuestions.find(q => q.text === text)?.category
        const responses = twinResponses[category] || twinResponses.fun
        fallbackResponse = responses[Math.floor(Math.random() * responses.length)]
      } else {
        fallbackResponse = "Oops! 😅 Seems like I'm having connection issues. Make sure the backend server is running! Try: npm run server"
      }

      const twinMessage = {
        id: Date.now() + 1,
        sender: 'twin',
        text: fallbackResponse,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, twinMessage])
      setIsTyping(false)
      addXP(5)
    }
  }

  const handleReaction = (messageId, reaction) => {
    setSelectedReaction(messageId)
    addXP(2)
    setTimeout(() => setSelectedReaction(null), 1000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass-effect rounded-2xl h-full flex flex-col overflow-hidden"
    >
      {/* Chat Header */}
      <div className="flex-shrink-0 p-3 border-b border-white/20">
        <div className="flex items-center gap-3">
          <Avatar isActive={isTyping} size="small" />
          <div className="flex-1">
            <h2 className="text-lg font-bold text-neon-blue">
              Cache Kutty
            </h2>
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} flex items-center gap-2`}>
              <span className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></span>
              Online
            </p>
          </div>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="flex-shrink-0 px-3 py-2 border-b border-white/20 overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          {quickQuestions.map((question, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSendMessage(question.text, true)}
              className="glass-effect px-3 py-1 rounded-full text-xs font-medium hover:bg-neon-blue/20 transition-all whitespace-nowrap"
            >
              {question.text}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 min-h-0">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} gap-3`}
            >
              {message.sender === 'twin' && (
                <div className="flex-shrink-0">
                  <Avatar size="small" />
                </div>
              )}
              
              <div className={`max-w-[70%] ${message.sender === 'user' ? 'order-1' : ''}`}>
                <motion.div
                  className={`p-3 rounded-xl ${
                    message.sender === 'user'
                      ? 'bg-neon-blue text-black'
                      : darkMode
                      ? 'bg-gray-700 text-white'
                      : 'bg-gray-100 text-gray-900'
                  } shadow-md`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </motion.div>
                
                {/* Reaction Buttons */}
                {message.sender === 'twin' && (
                  <div className="flex gap-1 mt-1 ml-2">
                    {[
                      { icon: Heart, color: 'text-red-400' },
                      { icon: ThumbsUp, color: 'text-blue-400' },
                      { icon: Smile, color: 'text-yellow-400' },
                      { icon: Zap, color: 'text-neon-green' }
                    ].map((reaction, idx) => (
                      <motion.button
                        key={idx}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleReaction(message.id, reaction.icon)}
                        className={`p-1 rounded-full hover:bg-white/10 ${reaction.color} transition-all`}
                      >
                        <reaction.icon size={14} />
                      </motion.button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2"
          >
            <Avatar size="small" />
            <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-xl px-4 py-2`}>
              <div className="flex gap-1">
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                  className="w-2 h-2 bg-neon-blue rounded-full"
                />
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                  className="w-2 h-2 bg-neon-green rounded-full"
                />
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                  className="w-2 h-2 bg-neon-yellow rounded-full"
                />
              </div>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex-shrink-0 p-3 border-t border-white/20">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message... 💪"
            className={`flex-1 ${
              darkMode ? 'bg-gray-700/50 text-white placeholder-gray-400' : 'bg-gray-100 text-gray-900 placeholder-gray-500'
            } rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neon-blue transition-all`}
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleSendMessage()}
            className="bg-neon-blue p-2 rounded-full hover:bg-blue-600 transition-colors"
          >
            <Send size={18} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default ChatPanel
