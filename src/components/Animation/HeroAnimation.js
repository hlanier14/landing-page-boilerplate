import { motion } from 'framer-motion';

/**
 * Hero Animation Component
 * 
 * PLACEHOLDER: Replace this with your custom hero animation
 * 
 * This component is displayed in the hero section. You can:
 * 1. Replace the entire component with your own animation
 * 2. Use a video, GIF, or static image
 * 3. Create a custom animation using framer-motion or other libraries
 */
export function HeroAnimation() {
  return (
    <div className="relative w-full h-full min-h-[400px] flex items-center justify-center">
      {/* Placeholder animation - replace with your own */}
      <div className="relative w-full max-w-4xl mx-auto">
        {/* Placeholder content */}
        <div className="p-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Your Hero Animation Here
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              Replace this component with your product demo, animation, or video
            </p>
          </motion.div>
          
          {/* Example: Animated elements */}
          <div className="mt-8 flex justify-center gap-4">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-16 h-16 rounded-lg bg-blue-500/30 dark:bg-blue-400/30"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
