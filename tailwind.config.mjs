/** @type {import('tailwindcss').Config} */

// Import colors from the central theme configuration
import { themes } from './app/themes.js';

// Helper to convert RGB string to object format Tailwind expects
const rgbToTailwind = (rgb) => {
  if (!rgb) return 'rgb(0, 0, 0)'; // Default to black if RGB is not provided
  
  try {
    const [r, g, b] = rgb.split(',').map(str => parseInt(str.trim(), 10));
    // Validate that r, g, b are valid numbers
    if (isNaN(r) || isNaN(g) || isNaN(b)) {
      return 'rgb(0, 0, 0)'; // Default to black for invalid values
    }
    return `rgb(${r}, ${g}, ${b})`;
  } catch (error) {
    console.error('Error parsing RGB value:', error);
    return 'rgb(0, 0, 0)'; // Default to black if there's an error
  }
};

// Extract theme colors for Tailwind
const getThemeColors = () => {
  const colors = {};
  
  Object.entries(themes).forEach(([themeName, theme]) => {
    // Add null checks to handle potential undefined values
    if (theme && theme.colors) {
      colors[themeName] = {
        primary: theme.colors.accent?.primary ? rgbToTailwind(theme.colors.accent.primary) : undefined,
        secondary: theme.colors.accent?.secondary ? rgbToTailwind(theme.colors.accent.secondary) : undefined,
        foreground: theme.colors.foreground ? rgbToTailwind(theme.colors.foreground) : undefined,
        background: {
          start: theme.colors.background?.start ? rgbToTailwind(theme.colors.background.start) : undefined,
          end: theme.colors.background?.end ? rgbToTailwind(theme.colors.background.end) : undefined,
        }
      };
    }
  });
  
  return colors;
};

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom color for the root theme variables
        'theme': {
          'foreground': 'rgb(var(--foreground-rgb))',
          'background': {
            'start': 'rgb(var(--background-start-rgb))',
            'end': 'rgb(var(--background-end-rgb))',
          },
          'accent': {
            'primary': 'rgb(var(--accent-primary))',
            'secondary': 'rgb(var(--accent-secondary))',
          },
        },
        // Theme-specific colors
        ...getThemeColors(),
      },
      animation: {
        gradientRotate: "gradient-rotate 10s linear infinite",
        gradientPulse: "gradient-pulse 6s ease-in-out infinite",
      },
      keyframes: {
        gradientRotate: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        gradientPulse: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.7 },
        },
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        md: "1.5rem",
        lg: "2rem",
      },
    },
  },
  plugins: [],
};
