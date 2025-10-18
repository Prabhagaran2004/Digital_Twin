import { motion } from 'framer-motion'
import { Trophy, Dumbbell, TrendingUp, Zap, Heart, Music, Target } from 'lucide-react'

const ProfilePanel = ({ userXP, achievements, darkMode }) => {
  const stats = [
    { icon: Dumbbell, label: 'Workouts', value: '156', color: 'text-neon-blue', bgColor: 'bg-blue-500/20' },
    { icon: Target, label: 'Cricket Drills', value: '89', color: 'text-neon-green', bgColor: 'bg-green-500/20' },
    { icon: Music, label: '90s Tracks', value: '420', color: 'text-neon-yellow', bgColor: 'bg-yellow-500/20' },
    { icon: Zap, label: 'Streak Days', value: '42', color: 'text-neon-pink', bgColor: 'bg-pink-500/20' },
  ]


  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-3 h-full overflow-y-auto pr-2"
    >
      {/* Profile Card */}
      <motion.div
        className="glass-effect rounded-xl p-3"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-neon-blue/20 rounded-full flex items-center justify-center text-2xl">
            💪
          </div>
          <div className="flex-1">
            <h2 className="text-base font-bold text-neon-blue">
              Your Digital Twin
            </h2>
            <div className="flex gap-1 mt-1">
              <span className="text-xs">🏏</span>
              <span className="text-xs">💪</span>
              <span className="text-xs">💻</span>
              <span className="text-xs">🎵</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* XP Progress */}
      <motion.div
        className="glass-effect rounded-xl p-3"
      >
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-bold flex items-center gap-1">
            <TrendingUp className="text-neon-yellow" size={16} />
            XP Progress
          </h3>
          <span className="text-base font-bold text-neon-yellow">{userXP}</span>
        </div>
        
        <div className="relative w-full h-2 bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(userXP % 100)}%` }}
            className="h-full bg-neon-blue"
          />
        </div>
        
        <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
          {100 - (userXP % 100)} XP to level up
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        className="glass-effect rounded-xl p-3"
      >
        <h3 className="text-sm font-bold mb-2 flex items-center gap-1">
          <Trophy className="text-neon-yellow" size={16} />
          Your Stats
        </h3>
        
        <div className="grid grid-cols-2 gap-2">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`${stat.bgColor} rounded-lg p-2 backdrop-blur-sm`}
            >
              <stat.icon className={`${stat.color} mb-1`} size={16} />
              <p className="text-lg font-bold">{stat.value}</p>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Fun Facts */}
      <motion.div
        className="glass-effect rounded-xl p-3"
      >
        <h3 className="text-sm font-bold mb-2 flex items-center gap-1">
          <Heart className="text-red-400" size={16} />
          About Me
        </h3>
        
        <ul className="space-y-1 text-xs">
          <li className="flex items-start gap-1">
            <span>⚡</span>
            <span>Fast bowler, Dale Steyn inspired</span>
          </li>
          <li className="flex items-start gap-1">
            <span>💪</span>
            <span>Biceps curls + cricket drills</span>
          </li>
          <li className="flex items-start gap-1">
            <span>🎵</span>
            <span>90's music fan, love SPB</span>
          </li>
          <li className="flex items-start gap-1">
            <span>💻</span>
            <span>MERN stack developer</span>
          </li>
        </ul>
      </motion.div>
    </motion.div>
  )
}

export default ProfilePanel
