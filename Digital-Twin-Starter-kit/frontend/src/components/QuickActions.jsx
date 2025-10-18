import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Dumbbell, Target, Music, Flame, Zap, X } from 'lucide-react'

const QuickActions = ({ darkMode }) => {
  const [isOpen, setIsOpen] = useState(false)

  const actions = [
    { icon: Dumbbell, label: 'Workout Tips', color: 'from-blue-500 to-blue-700', emoji: '💪' },
    { icon: Target, label: 'Cricket Drills', color: 'from-green-500 to-green-700', emoji: '🏏' },
    { icon: Music, label: '90s Playlist', color: 'from-yellow-500 to-yellow-700', emoji: '🎵' },
    { icon: Flame, label: 'Motivation', color: 'from-red-500 to-red-700', emoji: '🔥' },
    { icon: Zap, label: 'Fun Fact', color: 'from-purple-500 to-purple-700', emoji: '⚡' },
  ]

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {/* Action Buttons */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute bottom-14 left-0 space-y-2"
          >
            {actions.map((action, index) => (
              <motion.button
                key={index}
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`glass-effect px-3 py-2 rounded-full flex items-center gap-2 group`}
              >
                <span className="text-lg">{action.emoji}</span>
                <span className="text-xs font-medium whitespace-nowrap">{action.label}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-12 h-12 rounded-full bg-neon-blue flex items-center justify-center shadow-lg`}
        animate={{
          rotate: isOpen ? 135 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        {isOpen ? (
          <X size={20} className="text-white" />
        ) : (
          <MessageCircle size={20} className="text-white" />
        )}
      </motion.button>

      {/* Pulse Effect - Removed for cleaner look */}
    </div>
  )
}

export default QuickActions
