import { FaCode, FaServer, FaPalette, FaRocket } from 'react-icons/fa';
import { useI18n } from '../../hooks/useI18n';
import Pill from '../ui/Pill';

const Skills = () => {
  const { t } = useI18n();

  const techColors: { [key: string]: string } = {
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
    'MongoDB': '47A248',
    'PostgreSQL': '336791',
    'MySQL': '4479A1',
    'Redis': 'DC382D',
    'Firebase': 'FFCA28',
    'Docker': '2496ED',
    'AWS': 'FF9900',
    'Azure': '0078D4',
    'Google Cloud': '4285F4',
    'Git': 'F05032',
    'GitHub': '181717',
    'GitLab': 'FCA326',
    'Jenkins': 'D24939',
    'Kubernetes': '326CE5',
    'React Native': '61DAFB',
    'Flutter': '02569B',
    'Swift': 'FA7343',
    'Kotlin': '7F52FF',
    'Android': '3DDC84',
    'iOS': '000000',
    'GraphQL': 'E10098',
    'REST API': '25D366',
    'Webpack': '8DD6F9',
    'Vite': '646CFF',
    'Electron': '47848F'
  };

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
      <h2 className="text-2xl font-semibold mb-8 flex items-center gap-3 text-[var(--text-primary)]">
        <span className="font-mono text-lg opacity-80 text-[var(--color-accent)]">{t.numbers['04']}</span>
        <span className="lowercase">{t.sections_labels.skills}</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {t.skills.map((skill) => (
          <article
            key={skill.id}
            className="group rounded-lg p-6 transition-all duration-300 hover:shadow-lg bg-[var(--bg-surface)] border border-[var(--border-color)]"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 bg-[var(--color-accent-light)] text-[var(--color-accent)]">
                {getIconForSkill(skill.id)}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-1 text-[var(--text-primary)]">
                  {skill.title}
                </h3>
              </div>
            </div>

            <p 
              className="text-sm leading-relaxed mb-4 text-[var(--text-secondary)]"
              dangerouslySetInnerHTML={{ __html: skill.description }}
            />

            <div className="flex flex-wrap gap-2">
              {skill.skills.map((tech) => (
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
          </article>
        ))}
      </div>
    </div>
  );
};

export default Skills;