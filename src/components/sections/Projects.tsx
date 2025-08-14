import { MdOpenInNew, MdStar } from 'react-icons/md';
import { useI18n } from '../../hooks/useI18n';
import Pill from '../ui/Pill';
import Section from '../ui/Section';
import Card from '../ui/Card';
import Typography from '../ui/Typography';

const Projects = () => {
  const { t } = useI18n();
  
  // Harmonized tech color mapping using design system colors
  const getTechColor = (tech: string) => {
    const colors: Record<string, string> = {
      'React': 'bg-[var(--color-accent-light)] text-[var(--color-accent)] border border-[var(--border-color)]',
      'Angular': 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-color)]',
      'Vue': 'bg-[var(--color-accent-light)] text-[var(--color-accent)] border border-[var(--border-color)]',
      'NestJS': 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-color)]',
      'MongoDB': 'bg-[var(--color-accent-light)] text-[var(--color-accent)] border border-[var(--border-color)]',
      'PostgreSQL': 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-color)]',
      'TailwindCSS': 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-color)]',
      'TypeScript': 'bg-[var(--color-accent-light)] text-[var(--color-accent)] border border-[var(--border-color)]',
      'REST API': 'bg-[var(--color-accent-light)] text-[var(--color-accent)] border border-[var(--border-color)]'
    };
    return colors[tech] || 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-color)]';
  };

  return (
    <Section id="projects" spacing="base" containerSize="lg" aria-labelledby="projects-heading">
      <div className="space-fluid-xl">
        <h2
          id="projects-heading"
          className="text-fluid-2xl font-bold text-left lowercase pb-2 flex items-center gap-4"
          style={{ color: 'var(--text-primary)' }}
        >
          <span className="font-mono text-lg lg:text-xl" style={{ color: 'var(--color-accent)' }}>03.</span>
          {t.sections.projects.title}
          <span className="hidden sm:block h-[1px] flex-1 max-w-xs" style={{ backgroundColor: 'var(--border-color)' }}></span>
        </h2>

        <div className="grid-responsive">
          {t.projects.map((project) => (
            <article
              key={project.title}
              className="card group animate-mobile-scale hover:shadow-xl transition-all duration-[var(--duration-base)] hover:-translate-y-1"
            >
              <div
                className="aspect-video overflow-hidden rounded-t-[var(--radius-lg)] relative"
                style={{ backgroundColor: 'var(--bg-surface)' }}
              >
                <img
                  src={project.image}
                  alt={`${project.title} - ${project.description.substring(0, 50)}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[var(--duration-slow)]"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-[var(--duration-base)]" />
              </div>

              <div className="p-[var(--space-base)] sm:p-[var(--space-lg)] space-fluid-base">
                <header className="flex items-center gap-2 mb-[var(--space-sm)]">
                  <h3
                    className="text-fluid-lg font-bold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {project.title}
                  </h3>
                  {project.link && (
                    <MdOpenInNew
                      size={16}
                      style={{ color: 'var(--text-secondary)' }}
                      aria-label={t.accessibility.external_link}
                    />
                  )}
                </header>

                <p
                  className="text-fluid-sm leading-relaxed mb-[var(--space-base)]"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {project.description}
                </p>

                <div className="flex items-center gap-2 mb-[var(--space-base)]">
                  <MdStar size={16} className="text-amber-500 fill-current" aria-hidden="true" />
                  <span
                    className="text-fluid-sm font-semibold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {project.status}
                  </span>
                </div>

                <div className="flex flex-wrap gap-[var(--space-xs)]">
                  {project.technologies.map((tech: string) => {
                    const techColor = getTechColor(tech);
                    return (
                      <Pill
                        key={tech}
                        variant={techColor ? "custom" : "neutral"}
                        size="sm"
                        customColor={techColor}
                      >
                        {tech}
                      </Pill>
                    );
                  })}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Projects;
