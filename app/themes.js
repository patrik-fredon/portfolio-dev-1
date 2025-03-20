export const themes = {
  light: {
    name: 'Light',
    colors: {
      foreground: '31, 41, 55',  // tmavý text
      background: {
        start: '249, 250, 251',  // světlé pozadí
        end: '243, 244, 246'
      },
      accent: {
        primary: '59, 130, 246',  // modré akcenty
        secondary: '99, 102, 241'
      }
    }
  },
  dark: {
    name: 'Dark',
    colors: {
      foreground: '255, 255, 255',
      background: {
        start: '17, 24, 39',
        end: '11, 15, 25'
      },
      accent: {
        primary: '147, 197, 253',
        secondary: '167, 139, 250'
      }
    }
  },
  dracula: {
    name: 'Dracula',
    colors: {
      foreground: '248, 248, 242',
      background: {
        start: '40, 42, 54',
        end: '30, 31, 41'
      },
      accent: {
        primary: '255, 121, 198',
        secondary: '139, 233, 253'
      }
    }
  },
  synthwave: {
    name: 'Synthwave',
    colors: {
      foreground: '255, 255, 255',
      background: {
        start: '41, 15, 113',
        end: '19, 7, 52'
      },
      accent: {
        primary: '255, 83, 244',
        secondary: '0, 223, 255'
      }
    }
  },
  cyberpunk: {
    name: 'CyberPunk',
    colors: {
      foreground: '255, 255, 255',
      background: {
        start: '18, 21, 35',
        end: '9, 11, 19'
      },
      accent: {
        primary: '255, 231, 0',
        secondary: '0, 255, 166'
      }
    }
  }
};
