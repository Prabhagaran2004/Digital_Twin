import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import ChatPanel from './components/ChatPanel'
import ProfilePanel from './components/ProfilePanel'
import QuickActions from './components/QuickActions'

function App() {
  const [darkMode, setDarkMode] = useState(true)
  const [userXP, setUserXP] = useState(0)
  const [achievements, setAchievements] = useState([])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const addXP = (amount) => {
    setUserXP(prev => prev + amount)
  }

  const unlockAchievement = (achievement) => {
    if (!achievements.find(a => a.id === achievement.id)) {
      setAchievements(prev => [...prev, achievement])
    }
  }

  return (
    <div className={`h-screen overflow-hidden ${darkMode ? 'dark bg-gray-900' : 'bg-gray-200'} transition-all duration-500`}>
      {/* Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="glass-effect fixed top-0 left-0 right-0 z-50 px-4 py-2"
      >
        <div className="max-w-[1800px] mx-auto flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-2xl">💪</div>
            <div>
              <h1 className="text-lg font-bold text-neon-blue">
                Digital Twin
              </h1>
              <p className="text-xs text-gray-400">Your AI Fitness & Cricket Buddy</p>
            </div>
          </motion.div>

          <div className="flex items-center gap-4">
            {/* XP Display */}
            <motion.div 
              className="glass-effect px-3 py-1 rounded-full"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-neon-yellow font-bold text-sm">⚡ {userXP} XP</span>
            </motion.div>

            {/* Dark Mode Toggle */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setDarkMode(!darkMode)}
              className="glass-effect p-2 rounded-full hover:neon-glow transition-all"
            >
              {darkMode ? <Sun className="text-neon-yellow" size={20} /> : <Moon className="text-blue-600" size={20} />}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="px-4 pb-4 h-screen pt-16">
        <div className="max-w-[1800px] mx-auto h-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4" style={{ height: 'calc(100vh - 80px)' }}>
            {/* Profile & Stats Panel - Takes 1 column - LEFT */}
            <div className="lg:col-span-1 h-full overflow-hidden">
              <ProfilePanel userXP={userXP} achievements={achievements} darkMode={darkMode} />
            </div>

            {/* Chat Panel - Takes 2 columns - RIGHT */}
            <div className="lg:col-span-2 h-full overflow-hidden">
              <ChatPanel addXP={addXP} unlockAchievement={unlockAchievement} darkMode={darkMode} />
            </div>
          </div>
        </div>
      </main>

      {/* Quick Actions - Floating Buttons */}
      <QuickActions darkMode={darkMode} />

      {/* Achievement Notification */}
      <AnimatePresence>
        {achievements.length > 0 && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            className="fixed bottom-6 right-6 glass-effect p-4 rounded-lg neon-glow max-w-sm"
          >
            <div className="flex items-center gap-3">
              <span className="text-4xl">{achievements[achievements.length - 1].icon}</span>
              <div>
                <h3 className="font-bold text-neon-green">Achievement Unlocked! 🎉</h3>
                <p className="text-sm text-gray-300">{achievements[achievements.length - 1].name}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
