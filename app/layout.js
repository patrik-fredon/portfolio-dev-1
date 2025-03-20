import './globals.css';
import Navbar from './components/Navbar';

export const metadata = {
  title: 'Professional Portfolio',
  description: 'A showcase of my work, skills, and experience in software development',
  keywords: ['portfolio', 'developer', 'software engineer', 'web development', 'full stack'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        <Navbar />
        <main className="pt-16">
          {children}
        </main>
      </body>
    </html>
  );
}
