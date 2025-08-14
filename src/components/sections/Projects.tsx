import { FaExternalLinkAlt, FaStar } from 'react-icons/fa';
import { useI18n } from '../../hooks/useI18n';

const Projects = () => {
  const { t } = useI18n();

  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold mb-8 flex items-center gap-3" style={{ color: 'var(--text-primary)' }}>
        <span className="font-mono text-lg opacity-80" style={{ color: 'var(--color-accent)' }}>03.</span>
        <span className="lowercase">work</span>
      </h2>

      <div className="space-y-6">
        {t.projects.map((project, index) => (
          <article
            key={project.title}
            className="group rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
            style={{ 
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-color)'
            }}
          >
            <div className="flex flex-col lg:flex-row">
              {/* Image Section */}
              <div className="lg:w-1/3 h-48 lg:h-auto relative overflow-hidden" 
                   style={{ backgroundColor: 'var(--bg-primary)' }}>
                <img
                  src={project.image || `/api/placeholder/400/250`}
                  alt={project.title}
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent lg:hidden" />
              </div>

              {/* Content Section */}
              <div className="flex-1 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2" 
                        style={{ color: 'var(--text-primary)' }}>
                      {project.title}
                      {project.link && (
                        <a href={project.link} 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className="opacity-60 hover:opacity-100 transition-opacity"
                           aria-label="View project">
                          <FaExternalLinkAlt size={14} />
                        </a>
                      )}
                    </h3>
                    <p className="text-sm leading-relaxed mb-4" 
                       style={{ color: 'var(--text-secondary)' }}>
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Stats */}
                {project.stats && (
                  <div className="flex items-center gap-4 mb-4 text-sm" 
                       style={{ color: 'var(--text-tertiary)' }}>
                    {project.stats.stars && (
                      <span className="flex items-center gap-1">
                        <FaStar size={12} className="text-yellow-500" />
                        {project.stats.stars}
                      </span>
                    )}
                    {project.stats.downloads && (
                      <span>{project.stats.downloads} downloads</span>
                    )}
                    {project.stats.installs && (
                      <span>{project.stats.installs} installs</span>
                    )}
                  </div>
                )}

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200"
                      style={{
                        backgroundColor: 'var(--color-accent-light)',
                        color: 'var(--color-accent)',
                        border: '1px solid transparent'
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Projects;
