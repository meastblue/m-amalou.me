import { usePortfolio } from '../../hooks/usePortfolio';
import Section from '../ui/Section';

const About = () => {
  const { sections } = usePortfolio();

  // Keywords to highlight with 100% opacity
  const highlightKeywords = [
    'pilotage technique',
    'gouvernance d\'api',
    'urbanisation de systèmes',
    'architectures applicatives',
    'api',
    'accompagnement produit',
    'robustesse',
    'scalabilité',
    'développement'
  ];

  const highlightText = (text: string) => {
    let highlightedText = text;
    
    highlightKeywords.forEach((keyword, index) => {
      const regex = new RegExp(`(${keyword})`, 'gi');
      highlightedText = highlightedText.replace(
        regex,
        `<span key="${index}" style="color: #1D1D1B; font-weight: 600;">$1</span>`
      );
    });
    
    return highlightedText;
  };

  return (
    <Section id="about" spacing="base" containerSize="lg" aria-labelledby="about-heading">
      <div className="space-fluid-lg">
        <h2
          id="about-heading"
          className="text-fluid-2xl font-bold text-left lowercase pb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {sections.about.title}
        </h2>
        <p
          className="text-fluid-base leading-relaxed text-left"
          style={{ 
            color: 'rgba(29, 29, 27, 0.3)'
          }}
          dangerouslySetInnerHTML={{
            __html: highlightText(sections.about.content || '')
          }}
        />
      </div>
    </Section>
  );
};

export default About;
