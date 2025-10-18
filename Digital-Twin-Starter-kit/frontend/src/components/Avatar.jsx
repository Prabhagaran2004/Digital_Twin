import { motion } from 'framer-motion'

const Avatar = ({ size = 'medium', isActive = false }) => {
  const sizes = {
    small: 'w-10 h-10 text-2xl',
    medium: 'w-16 h-16 text-4xl',
    large: 'w-24 h-24 text-6xl'
  }

  const animations = isActive ? {
    scale: [1, 1.1, 1],
    rotate: [0, -10, 10, -10, 0],
  } : {
    y: [0, -5, 0],
  }

  return (
    <motion.div
      animate={animations}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className={`${sizes[size]} bg-gradient-to-br from-neon-blue via-neon-green to-neon-yellow rounded-full flex items-center justify-center shadow-lg relative`}
      style={{
        boxShadow: isActive 
          ? '0 0 30px rgba(0, 229, 255, 0.8), 0 0 60px rgba(0, 255, 136, 0.6)' 
          : '0 0 20px rgba(0, 229, 255, 0.5)'
      }}
    >
      {/* Avatar Icon - Can be replaced with actual image */}
      <motion.div
        animate={isActive ? { rotate: [0, 5, -5, 0] } : {}}
        transition={{ duration: 0.5, repeat: isActive ? Infinity : 0 }}
        className="relative"
      >
        💪
      </motion.div>

      {/* Active Indicator */}
      {isActive && (
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [1, 0, 1]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 border-4 border-neon-green rounded-full"
        />
      )}

      {/* Status Dot */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -bottom-1 -right-1 w-4 h-4 bg-neon-green rounded-full border-2 border-gray-900"
      />
    </motion.div>
  )
}

export default Avatar
