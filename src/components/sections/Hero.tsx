import { usePortfolio } from '../../hooks/usePortfolio';
import Section from '../ui/Section';

const Hero = () => {
  const { sections } = usePortfolio();

  return (
    <Section id="hero" spacing="lg" containerSize="lg">
      <div className="pt-6">
        <p 
          className="text-fluid-base leading-relaxed font-semibold text-left lowercase"
          style={{ color: 'var(--text-secondary)' }}
        >
          {sections.hero.content}
        </p>
      </div>
    </Section>
  );
};

export default Hero;
