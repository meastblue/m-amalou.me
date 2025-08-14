import { useI18n } from '../../hooks/useI18n';
import Section from '../ui/Section';

const About = () => {
  const { t } = useI18n();

  // Keywords to highlight with 100% opacity
  const highlightKeywords = [
    'architecte logiciel senior',
    'pilotage technique',
    'gouvernance d\'api REST',
    'urbanisation de systèmes',
    'architectures applicatives',
    'cloud-native',
    'microservices',
    'développement fullstack',
    'React.js',
    'Angular',
    'Vue.js',
    'NestJS',
    'robustesse',
    'scalabilité',
    'performance',
    'Autodistribution',
    'Crédit Agricole CIB',
    'Société Générale',
    'transformations digitales'
  ];

  const highlightText = (text: string) => {
    let highlightedText = text;

    highlightKeywords.forEach((keyword, index) => {
      const regex = new RegExp(`(${keyword})`, 'gi');
      highlightedText = highlightedText.replace(
        regex,
        `<span key="${index}" class="text-dark dark:text-white font-semibold">$1</span>`
      );
    });

    return highlightedText;
  };

  return (
    <Section id="about" spacing="base" containerSize="lg" aria-labelledby="about-heading">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
        <div className="lg:col-span-7">
          <h2
            id="about-heading"
            className="text-fluid-2xl font-bold text-left lowercase pb-2 flex items-center gap-4"
            style={{ color: 'var(--text-primary)' }}
          >
            <span className="font-mono text-lg lg:text-xl" style={{ color: 'var(--color-accent)' }}>01.</span>
            {t.sections.about.title}
            <span className="hidden sm:block h-[1px] flex-1 max-w-xs" style={{ backgroundColor: 'var(--border-color)' }}></span>
          </h2>
          <div
            className="text-base lg:text-lg leading-relaxed space-y-4"
            style={{ color: 'var(--text-secondary)' }}
            dangerouslySetInnerHTML={{
              __html: highlightText(t.sections.about.content)
            }}
          />

          <div className="mt-8">
            <p className="text-sm font-mono mb-4" style={{ color: 'var(--text-tertiary)' }}>Technologies récentes:</p>
            <div className="grid grid-cols-2 gap-2">
              {['React / Next.js', 'TypeScript', 'Node.js / NestJS', 'MongoDB / PostgreSQL', 'Docker / K8s', 'AWS / GCP'].map((tech) => (
                <div key={tech} className="flex items-center gap-2 text-sm">
                  <span style={{ color: 'var(--color-accent)' }}>▹</span>
                  <span style={{ color: 'var(--text-secondary)' }}>{tech}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="relative group">
            <div className="absolute -inset-1 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-[var(--duration-slow)]"
                 style={{ backgroundColor: 'var(--color-accent)' }}></div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
                alt={t.personal.name}
                className="rounded-lg w-64 h-64 lg:w-80 lg:h-80 object-cover"
              />
              <div className="absolute inset-0 border-2 rounded-lg translate-x-4 translate-y-4 -z-10"
                   style={{ borderColor: 'var(--color-accent)' }}></div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default About;
