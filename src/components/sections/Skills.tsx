import { FaCode, FaServer, FaPalette, FaRocket } from 'react-icons/fa';
import { useI18n } from '../../hooks/useI18n';

const Skills = () => {
  const { t } = useI18n();

  const getIconForSkill = (skillId: string) => {
    const icons: Record<string, JSX.Element> = {
      'architecture-solution': <FaRocket size={24} />,
      'technical-leadership': <FaRocket size={24} />,
      'frontend-expertise': <FaPalette size={24} />,
      'backend-api': <FaServer size={24} />,
      'default': <FaCode size={24} />
    };
    return icons[skillId] || icons['default'];
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold mb-8 flex items-center gap-3" style={{ color: 'var(--text-primary)' }}>
        <span className="font-mono text-lg opacity-80" style={{ color: 'var(--color-accent)' }}>05.</span>
        <span className="lowercase">skills</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {t.skills.map((skill) => (
          <article
            key={skill.id}
            className="group rounded-lg p-6 transition-all duration-300 hover:shadow-lg"
            style={{ 
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-color)'
            }}
          >
            {/* Header with icon and title */}
            <div className="flex items-start gap-4 mb-4">
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                style={{ 
                  backgroundColor: 'var(--color-accent-light)',
                  color: 'var(--color-accent)'
                }}
              >
                {getIconForSkill(skill.id)}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                  {skill.title}
                </h3>
              </div>
            </div>

            {/* Description */}
            <p 
              className="text-sm leading-relaxed mb-4" 
              style={{ color: 'var(--text-secondary)' }}
              dangerouslySetInnerHTML={{ __html: skill.description }}
            />

            {/* Skills tags */}
            <div className="flex flex-wrap gap-2">
              {skill.skills.map((tech) => (
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
          </article>
        ))}
      </div>
    </div>
  );
};

export default Skills;