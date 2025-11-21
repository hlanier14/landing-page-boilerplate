// Note: Tailwind config runs in Node.js, so we need to use require()
// The design tokens are defined in ES modules, so we'll use direct values here
// To change colors, edit src/theme/designTokens.js and update this file accordingly

module.exports = {
  darkMode: 'class',
  content: [
      './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
      extend: {
          colors: {
              // Primary colors - Update these to match designTokens.js
              primary: {
                  DEFAULT: '#171717',      // neutral-900
                  hover: '#404040',         // neutral-700
                  active: '#0a0a0a',        // neutral-950
                  text: '#ffffff',
              },
              // Secondary/Accent colors - Update these to match designTokens.js
              secondary: {
                  DEFAULT: '#2563eb',       // blue-600
                  hover: '#3b82f6',         // blue-500
                  active: '#1d4ed8',        // blue-700
                  text: '#ffffff',
              },
              // Status colors
              success: {
                  DEFAULT: '#16a34a',       // green-600
                  dark: '#22c55e',          // green-500
              },
              error: {
                  DEFAULT: '#dc2626',       // red-600
                  dark: '#ef4444',          // red-500
              },
              warning: {
                  DEFAULT: '#d97706',       // amber-600
                  dark: '#f59e0b',          // amber-500
              },
              info: {
                  DEFAULT: '#2563eb',       // blue-600
                  dark: '#3b82f6',          // blue-500
              },
          },
          boxShadow: {
              'notion': '0 1px 2px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.06)',
              'notion-dark': '0 1px 2px rgba(0,0,0,0.2), 0 2px 8px rgba(0,0,0,0.3)',
          },
          borderRadius: {
              'xl': '0.75rem',
              '2xl': '1rem',
          }
      }
  },
  plugins: []
}
