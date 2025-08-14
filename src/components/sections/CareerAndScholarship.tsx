import { MdWork, MdSchool, MdPlace } from 'react-icons/md';
import { useMemo, useState } from 'react';
import { useI18n } from '../../hooks/useI18n';
import Section from '../ui/Section';

export type CareerItem = {
  company: string;
  period: string;
  position: string;
  description: string;
  location: string;
};

export type ScholarshipItem = {
  institution: string;
  period: string;
  degree: string;
  description: string;
  location: string;
};

const CareerAndScholarship = () => {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<'career' | 'scholarship'>('career');

  const items = useMemo(() =>
    activeTab === 'career' ? t.career : t.scholarship,
    [activeTab, t.career, t.scholarship]
  );

  return (
    <Section id="career" spacing="base" containerSize="lg" aria-labelledby="career-heading">
      <div className="space-y-[var(--space-xl)]">
        <div className="pb-2">
          <div className="flex items-center gap-4 mb-[var(--space-base)]">
            <span className="font-mono text-lg lg:text-xl" style={{ color: 'var(--color-accent)' }}>02.</span>
            <span className="hidden sm:block h-[1px] flex-1 max-w-xs" style={{ backgroundColor: 'var(--border-color)' }}></span>
          </div>
          <div className="flex items-baseline gap-[var(--space-lg)]">
            <button
              id={activeTab === 'career' ? 'career-heading' : undefined}
              className="text-fluid-2xl font-bold lowercase transition-all duration-[var(--duration-base)] focus:outline-none animate-mobile-scale focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{
                color: activeTab === 'career' ? 'var(--text-primary)' : 'var(--text-secondary)',
                '--tw-ring-color': 'var(--color-accent)'
              } as React.CSSProperties}
              onMouseEnter={(e) => {
                if (activeTab !== 'career') {
                  e.currentTarget.style.color = 'var(--text-primary)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== 'career') {
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }
              }}
              onClick={() => setActiveTab('career')}
              aria-pressed={activeTab === 'career'}
              aria-label={`Switch to ${t.sections.career.title} section`}
            >
              {t.sections.career.title}
            </button>
            <span className="text-fluid-xl" style={{ color: 'var(--text-tertiary)' }}>/</span>
            <button
              id={activeTab === 'scholarship' ? 'career-heading' : undefined}
              className="text-fluid-2xl font-bold lowercase transition-all duration-[var(--duration-base)] focus:outline-none animate-mobile-scale focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{
                color: activeTab === 'scholarship' ? 'var(--text-primary)' : 'var(--text-secondary)',
                '--tw-ring-color': 'var(--color-accent)'
              } as React.CSSProperties}
              onMouseEnter={(e) => {
                if (activeTab !== 'scholarship') {
                  e.currentTarget.style.color = 'var(--text-primary)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== 'scholarship') {
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }
              }}
              onClick={() => setActiveTab('scholarship')}
              aria-pressed={activeTab === 'scholarship'}
              aria-label={`Switch to ${t.sections.scholarship.title} section`}
            >
              {t.sections.scholarship.title}
            </button>
          </div>
        </div>

        <div className="space-y-[var(--space-xl)]">
          {items.map((item, index) => (
            <article key={`${activeTab}-${index}`} className="flex gap-[var(--space-lg)] animate-mobile-scale">
              <div className="flex items-start pt-2">
                <div
                  className="w-12 h-12 md:w-14 md:h-14 bg-transparent border-2 rounded-full flex items-center justify-center transition-all duration-[var(--duration-base)] hover:scale-110 flex-shrink-0"
                  style={{
                    borderColor: 'var(--color-accent)',
                    color: 'var(--color-accent)'
                  }}
                  role="img"
                  aria-label={activeTab === 'career' ? t.accessibility.career_experience : t.accessibility.education_experience}
                >
                  {activeTab === 'career' ? (
                    <MdWork size={20} />
                  ) : (
                    <MdSchool size={20} />
                  )}
                </div>
              </div>

              <div className="flex-1 min-w-0 space-y-[var(--space-base)]">
                <header className="space-y-[var(--space-xs)]">
                  <h3
                    className="text-fluid-xl font-bold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {activeTab === 'career'
                      ? (item as CareerItem).company
                      : (item as ScholarshipItem).institution}
                  </h3>
                  <time
                    className="text-fluid-base font-medium"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {item.period}
                  </time>
                </header>

                <h4
                  className="text-fluid-base font-semibold"
                  style={{ color: 'var(--text-secondary)', opacity: 0.8 }}
                >
                  {activeTab === 'career'
                    ? (item as CareerItem).position
                    : (item as ScholarshipItem).degree}
                </h4>

                <p
                  className="text-fluid-base font-medium leading-relaxed"
                  style={{
                    color: 'var(--text-secondary)',
                    opacity: 0.8
                  }}
                >
                  {item.description}
                </p>

                <div
                  className="flex items-center text-fluid-sm"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <MdPlace
                    size={16}
                    className="mr-2 flex-shrink-0"
                    style={{ color: 'var(--color-accent)' }}
                    aria-hidden="true"
                  />
                  <span>{item.location}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default CareerAndScholarship;
