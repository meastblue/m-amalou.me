import { I18nProvider } from '../hooks/useI18n';
import About from './sections/About';
import CareerAndScholarship from './sections/CareerAndScholarship';
import Contact from './sections/Contact';
import Header from './sections/Header';
import Hero from './sections/Hero';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Socials from './sections/Socials';
import Navigation from './ui/Navigation';
import ScrollProgress from './ui/ScrollProgress';

export default function App() {
  return (
    <I18nProvider defaultLanguage="fr">
      <ScrollProgress />
      <Header />
      <Hero />
      <About />
      <CareerAndScholarship />
      <Projects />
      <Skills />
      <Contact />
      <Socials />
      <Navigation />
    </I18nProvider>
  );
}