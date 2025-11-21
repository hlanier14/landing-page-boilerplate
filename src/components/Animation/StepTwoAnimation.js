import { motion } from 'framer-motion';

/**
 * Step Two Animation Component
 * 
 * PLACEHOLDER: Replace this with your custom step two animation
 * 
 * This component is displayed in the "How It Works" section for step 2.
 * Replace with an animation that demonstrates your second step/feature.
 */
export function StepTwoAnimation() {
  return (
    <div className="relative w-full max-w-sm h-[300px] flex items-center justify-center overflow-hidden">
      {/* Animated floating shapes */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 40 + i * 15,
            height: 40 + i * 15,
            background: `rgba(59, 130, 246, ${0.2 - i * 0.03})`,
          }}
          animate={{
            x: [
              Math.random() * 200 - 100,
              Math.random() * 200 - 100,
              Math.random() * 200 - 100,
            ],
            y: [
              Math.random() * 200 - 100,
              Math.random() * 200 - 100,
              Math.random() * 200 - 100,
            ],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.3,
          }}
        />
      ))}

      {/* Central pulsing element */}
      <motion.div
        className="relative z-10 w-20 h-20 rounded-full bg-blue-500/30 dark:bg-blue-400/30"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-blue-500 dark:border-blue-400"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.8, 0, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      </motion.div>
    </div>
  );
}
