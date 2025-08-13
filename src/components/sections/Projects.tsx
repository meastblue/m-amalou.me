import { ExternalLink, Star } from 'lucide-react';
import { usePortfolio } from '../../hooks/usePortfolio';
import Pill from '../ui/Pill';
import Section from '../ui/Section';
import Card from '../ui/Card';
import Typography from '../ui/Typography';

const Projects = () => {
  const { projects, sections, getTechColor } = usePortfolio();

  return (
    <Section id="projects" spacing="base" containerSize="lg" aria-labelledby="projects-heading">
      <div className="space-fluid-xl">
        <h2
          id="projects-heading"
          className="text-fluid-2xl font-bold text-left lowercase pb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {sections.projects?.title || 'Projets'}
        </h2>

        <div className="grid-responsive gap-6 sm:gap-8">
          {projects.map((project) => (
            <article
              key={project.title}
              className="card group animate-mobile-scale"
            >
              <div
                className="aspect-video overflow-hidden rounded-t-[var(--radius-lg)]"
                style={{ backgroundColor: 'var(--bg-surface)' }}
              >
                <img
                  src={project.image}
                  alt={`${project.title} project screenshot`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[var(--duration-slow)]"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="p-4 sm:p-6 space-fluid-base">
                <header className="flex items-center gap-2 mb-2 md:mb-3">
                  <h3
                    className="text-fluid-lg font-bold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {project.title}
                  </h3>
                  {project.link && (
                    <ExternalLink
                      size={14}
                      className="md:w-4 md:h-4"
                      style={{ color: 'var(--text-secondary)' }}
                      aria-label="External link"
                    />
                  )}
                </header>

                <p
                  className="text-fluid-sm leading-relaxed mb-3 md:mb-4"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {project.description}
                </p>

                <div className="flex items-center gap-1.5 md:gap-2 mb-3 md:mb-4">
                  <Star size={14} className="text-amber-500 fill-current md:w-4 md:h-4" aria-hidden="true" />
                  <span
                    className="text-fluid-sm font-semibold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {project.stars}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5 md:gap-2">
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
