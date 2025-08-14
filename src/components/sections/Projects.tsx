import { FaExternalLinkAlt, FaStar } from 'react-icons/fa';
import { useI18n } from '../../hooks/useI18n';
import Pill from '../ui/Pill';

const Projects = () => {
  const { t } = useI18n();

  // Mapping des couleurs des technologies
  const techColors: { [key: string]: string } = {
    // Frontend
    'React': '61DAFB',
    'Vue.js': '4FC08D', 
    'Angular': 'DD0031',
    'JavaScript': 'F7DF1E',
    'TypeScript': '3178C6',
    'HTML': 'E34F26',
    'CSS': '1572B6',
    'Sass': 'CC6699',
    'Tailwind CSS': '06B6D4',
    'Bootstrap': '7952B3',
    
    // Backend
    'Node.js': '339933',
    'Express': '000000',
    'Python': '3776AB',
    'Django': '092E20',
    'Flask': '000000',
    'PHP': '777BB4',
    'Laravel': 'FF2D20',
    'Java': 'ED8B00',
    'Spring': '6DB33F',
    'C#': '239120',
    '.NET': '512BD4',
    
    // Databases
    'MongoDB': '47A248',
    'PostgreSQL': '336791',
    'MySQL': '4479A1',
    'Redis': 'DC382D',
    'Firebase': 'FFCA28',
    
    // DevOps & Tools
    'Docker': '2496ED',
    'AWS': 'FF9900',
    'Azure': '0078D4',
    'Google Cloud': '4285F4',
    'Git': 'F05032',
    'GitHub': '181717',
    'GitLab': 'FCA326',
    'Jenkins': 'D24939',
    'Kubernetes': '326CE5',
    
    // Mobile
    'React Native': '61DAFB',
    'Flutter': '02569B',
    'Swift': 'FA7343',
    'Kotlin': '7F52FF',
    'Android': '3DDC84',
    'iOS': '000000',
    
    // Others
    'GraphQL': 'E10098',
    'REST API': '25D366',
    'Webpack': '8DD6F9',
    'Vite': '646CFF',
    'Electron': '47848F'
  };

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
                    <Pill
                      key={tech}
                      variant={techColors[tech] ? "custom" : "accent"}
                      customColor={techColors[tech]}
                      size="sm"
                    >
                      {tech}
                    </Pill>
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
