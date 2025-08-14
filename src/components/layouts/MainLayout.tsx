import { useEffect, useRef, useState } from 'react';
import { useI18n } from '../../hooks/useI18n';
import ContactForm from '../forms/ContactForm';
import MobileNavigation from '../navigation/MobileNavigation';
import AboutSection from '../sections/AboutSection';
import CareerAndScholarship from '../sections/CareerAndScholarship';
import Projects from '../sections/Projects';
import Skills from '../sections/Skills';
import SocialLinks from '../ui/SocialLinks';
import CursorHalo from '../effects/CursorHalo';
import MobileHeader from './MobileHeader';
import Sidebar from './Sidebar';

const MainLayout = () => {
  const { t } = useI18n();
  const [activeSection, setActiveSection] = useState('about');
  const [scrollProgress, setScrollProgress] = useState<{ [key: string]: number }>({});
  const contentRef = useRef<HTMLDivElement>(null);

  const sections = [
    { id: 'about', label: t.sections_labels.about, number: t.numbers['01'] },
    { id: 'career', label: t.sections_labels.career, number: t.numbers['02'] },
    { id: 'projects', label: t.sections_labels.work, number: t.numbers['03'] },
    { id: 'skills', label: t.sections_labels.skills, number: t.numbers['04'] }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;

      const scrollContainer = contentRef.current;
      const scrollTop = scrollContainer.scrollTop;
      const scrollHeight = scrollContainer.scrollHeight - scrollContainer.clientHeight;

      const globalProgress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;

      let currentSection = sections[0].id;

      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 300) {
            currentSection = section.id;
          }
        }
      });

      setActiveSection(currentSection);

      const sectionProgress: { [key: string]: number } = {};
      sections.forEach((section, index) => {
        const sectionStart = (index / sections.length);
        const sectionEnd = ((index + 1) / sections.length);

        if (globalProgress >= sectionStart && globalProgress <= sectionEnd) {
          const localProgress = (globalProgress - sectionStart) / (sectionEnd - sectionStart);
          sectionProgress[section.id] = Math.min(localProgress * 100, 100);
        } else if (globalProgress > sectionEnd) {
          sectionProgress[section.id] = 100;
        } else {
          sectionProgress[section.id] = 0;
        }
      });

      setScrollProgress(sectionProgress);
    };

    if (contentRef.current) {
      contentRef.current.addEventListener('scroll', handleScroll);
      handleScroll();
      return () => contentRef.current?.removeEventListener('scroll', handleScroll);
    }
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element && contentRef.current) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex bg-[var(--bg-primary)] relative overflow-hidden">
      {/* Cursor halo effect */}
      <CursorHalo />
      
      <Sidebar
        sections={sections}
        activeSection={activeSection}
        scrollProgress={scrollProgress}
        onSectionClick={scrollToSection}
      />

      <MobileHeader />

      <MobileNavigation
        sections={sections}
        activeSection={activeSection}
        onSectionClick={scrollToSection}
      />

      <main
        ref={contentRef}
        className="w-full lg:w-1/2 lg:ml-[50%] p-4 lg:p-8 pt-24 pb-20 lg:pt-8 lg:pb-8 lg:h-screen lg:overflow-y-auto"
      >
        <div className="max-w-2xl mx-auto">
          <AboutSection />

          <div id="career" className="py-12">
            <CareerAndScholarship />
          </div>

          <div id="projects" className="py-12">
            <Projects />
          </div>

          <div id="skills" className="py-12">
            <Skills />
          </div>

          <ContactForm />

          <div className="lg:hidden pt-8 pb-6">
            <SocialLinks variant="mobile" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
