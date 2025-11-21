import { motion } from 'framer-motion';

/**
 * Step One Animation Component
 * 
 * PLACEHOLDER: Replace this with your custom step one animation
 * 
 * This component is displayed in the "How It Works" section for step 1.
 * Replace with an animation that demonstrates your first step/feature.
 */
export function StepOneAnimation() {
  return (
    <div className="relative w-full h-full min-h-[240px] flex items-center justify-center overflow-hidden">
      {/* Animated geometric shapes */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            width: 30 + (i % 3) * 20,
            height: 30 + (i % 3) * 20,
            borderRadius: i % 2 === 0 ? '50%' : '12px',
            background: `rgba(59, 130, 246, ${0.15 + (i % 3) * 0.05})`,
          }}
          animate={{
            x: [
              Math.random() * 180 - 90,
              Math.random() * 180 - 90,
              Math.random() * 180 - 90,
            ],
            y: [
              Math.random() * 180 - 90,
              Math.random() * 180 - 90,
              Math.random() * 180 - 90,
            ],
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 4 + (i % 2) * 1,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.25,
          }}
        />
      ))}

      {/* Central animated element */}
      <motion.div
        className="relative z-10 w-16 h-16 rounded-lg bg-blue-500/30 dark:bg-blue-400/30 border-2 border-blue-500/50 dark:border-blue-400/50"
        animate={{
          rotate: [0, 90, 180, 270, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          rotate: {
            duration: 4,
            repeat: Infinity,
            ease: 'linear',
          },
          scale: {
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        }}
      >
        <motion.div
          className="absolute inset-2 rounded-lg bg-blue-500/50 dark:bg-blue-400/50"
          animate={{
            scale: [1, 0.8, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>
    </div>
  );
}
