/**
 * Central theme configuration for the entire application
 * All color definitions should come from this file or be referenced in tailwind.config.mjs
 */

// Base theme definitions with RGB values for CSS variables
export const themes = {
  light: {
    name: 'Light',
    colors: {
      foreground: '34, 34, 34',  // Dark text on light background
      background: {
        start: '255, 255, 255',  // Pure white background
        end: '255, 255, 255'
      },
      accent: {
        primary: '0, 123, 255',  // Blue accents
        secondary: '0, 123, 255'
      }
    }
  },
  dark: {
    name: 'Dark',
    colors: {
      foreground: '245, 245, 245',  // Light text on dark background
      background: {
        start: '0, 0, 0',  // Pure black background
        end: '0, 0, 0'
      },
      accent: {
        primary: '147, 197, 253',  // Light blue
        secondary: '167, 139, 250'  // Light purple
      }
    }
  },
  dracula: {
    name: 'Dracula',
    colors: {
      foreground: '230, 230, 230',  // Light text
      background: {
        start: '40, 42, 54',  // Dracula background
        end: '30, 31, 41'
      },
      accent: {
        primary: '255, 121, 198',  // Pink
        secondary: '139, 233, 253'  // Cyan
      }
    }
  },
  synthwave: {
    name: 'Synthwave',
    colors: {
      foreground: '240, 240, 240',  // Light text
      background: {
        start: '41, 15, 113',  // Deep purple
        end: '19, 7, 52'  // Dark purple
      },
      accent: {
        primary: '255, 83, 244',  // Bright pink
        secondary: '0, 223, 255'  // Bright cyan
      }
    }
  },
  cyberpunk: {
    name: 'CyberPunk',
    colors: {
      foreground: '240, 240, 240',  // Light text
      background: {
        start: '18, 21, 35',  // Dark blue-gray
        end: '9, 11, 19'  // Almost black
      },
      accent: {
        primary: '255, 231, 0',  // Bright yellow
        secondary: '0, 255, 166'  // Bright green
      }
    }
  }
};

// Helper functions to use theme values in JavaScript
export const getThemeColor = (theme, colorPath) => {
  const parts = colorPath.split('.');
  let value = themes[theme];
  
  for (const part of parts) {
    if (!value[part]) return null;
    value = value[part];
  }
  
  return value;
};

// Convert RGB string to hex (useful for some libraries that require hex)
export const rgbToHex = (rgb) => {
  const [r, g, b] = rgb.split(',').map(Number);
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};

export default themes;
