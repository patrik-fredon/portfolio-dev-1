import portfolioData from '../data/portfolio.json';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';

export default function Home() {
  return (
    <>
      <Hero introduction={portfolioData.introduction} />
      <Skills skills={portfolioData.skills} />
      <Projects projects={portfolioData.projects} />
      <About about={portfolioData.about} />
      <Contact contact={portfolioData.contact} />
    </>
  );
}
