import './globals.css';
import { LanguageProvider } from './contexts/LanguageContext';
import Navbar from './components/Navbar';
import ThemeSelector from './components/ThemeSelector';
import { themes } from './themes';
import portfolioData from '../data/portfolio.json';

export const metadata = {
  title: 'Professional Portfolio',
  description: 'A showcase of my work, skills, and experience in software development',
  keywords: ['portfolio', 'developer', 'software engineer', 'web development', 'full stack'],
};

export default function RootLayout({ children }) {
  const initialTheme = portfolioData.settings.theme;
  const selectedTheme = themes[initialTheme] || themes.default;
  const { colors } = selectedTheme;

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <style>
          {`
            :root {
              --foreground-rgb: ${colors.foreground};
              --background-start-rgb: ${colors.background.start};
              --background-end-rgb: ${colors.background.end};
              --accent-primary: ${colors.accent.primary};
              --accent-secondary: ${colors.accent.secondary};
            }
          `}
        </style>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const savedTheme = localStorage.getItem('portfolio-theme');
                  if (savedTheme && themes[savedTheme]) {
                    const theme = themes[savedTheme];
                    document.documentElement.style.setProperty('--foreground-rgb', theme.colors.foreground);
                    document.documentElement.style.setProperty('--background-start-rgb', theme.colors.background.start);
                    document.documentElement.style.setProperty('--background-end-rgb', theme.colors.background.end);
                    document.documentElement.style.setProperty('--accent-primary', theme.colors.accent.primary);
                    document.documentElement.style.setProperty('--accent-secondary', theme.colors.accent.secondary);
                    document.body.dataset.theme = savedTheme;
                  }
                } catch (e) {
                  console.warn('Error applying saved theme:', e);
                }
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased" data-theme={initialTheme}>
        <LanguageProvider>
          <Navbar />
          <main className="pt-16">
            {children}
          </main>
          <ThemeSelector currentTheme={initialTheme} />
        </LanguageProvider>
      </body>
    </html>
  );
}
