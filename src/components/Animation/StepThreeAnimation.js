import { motion } from 'framer-motion';

/**
 * Step Three Animation Component
 * 
 * PLACEHOLDER: Replace this with your custom step three animation
 * 
 * This component is displayed in the "How It Works" section for step 3.
 * Replace with an animation that demonstrates your third step/feature.
 */
export function StepThreeAnimation() {
  return (
    <div className="w-full flex justify-center">
      <div className="relative w-full max-w-[620px] sm:w-[460px] lg:w-[560px] h-[300px] overflow-hidden">
        {/* Animated connecting lines */}
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.line
              key={i}
              x1="0"
              y1={`${20 + i * 20}%`}
              x2="100%"
              y2={`${30 + i * 15}%`}
              stroke="rgba(59, 130, 246, 0.3)"
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: [0, 1, 0],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: 'easeInOut',
              }}
            />
          ))}
        </svg>

        {/* Moving particles */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-500/40 dark:bg-blue-400/40"
            style={{
              width: 12 + (i % 3) * 4,
              height: 12 + (i % 3) * 4,
            }}
            animate={{
              x: [
                Math.random() * 400,
                Math.random() * 400,
                Math.random() * 400,
              ],
              y: [
                Math.random() * 250,
                Math.random() * 250,
                Math.random() * 250,
              ],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 4 + (i % 2) * 1,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.4,
            }}
          />
        ))}

        {/* Central animated element */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <div className="w-16 h-16 rounded-lg bg-blue-500/20 dark:bg-blue-400/20 border-2 border-blue-500/50 dark:border-blue-400/50 flex items-center justify-center">
            <motion.div
              className="w-8 h-8 rounded-full bg-blue-500 dark:bg-blue-400"
              animate={{
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
