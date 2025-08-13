import { Briefcase, GraduationCap, MapPin } from 'lucide-react';
import { useMemo, useState } from 'react';
import { usePortfolio, type CareerItem, type ScholarshipItem } from '../../hooks/usePortfolio';
import Section from '../ui/Section';

const CareerAndScholarship = () => {
  const { career, scholarship, sections } = usePortfolio();
  const [activeTab, setActiveTab] = useState<'career' | 'scholarship'>('career');

  const items = useMemo(() => 
    activeTab === 'career' ? career : scholarship, 
    [activeTab, career, scholarship]
  );

  return (
    <Section id="career" spacing="base" containerSize="lg" aria-labelledby="career-heading">
      <div className="space-y-8 md:space-y-12">
        <div className="flex items-baseline gap-6 md:gap-8 pb-4 md:pb-6">
          <button
            id={activeTab === 'career' ? 'career-heading' : undefined}
            className="text-fluid-2xl font-bold lowercase transition-all duration-[var(--duration-base)] focus:outline-none animate-mobile-scale focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{
              color: activeTab === 'career' ? 'var(--text-primary)' : 'var(--text-secondary)',
              focusVisibleRingColor: 'var(--color-primary)'
            }}
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
            aria-label={`Switch to ${sections.career.title} section`}
          >
            {sections.career.title}
          </button>
          <button
            id={activeTab === 'scholarship' ? 'career-heading' : undefined}
            className="text-fluid-2xl font-bold lowercase transition-all duration-[var(--duration-base)] focus:outline-none animate-mobile-scale focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{
              color: activeTab === 'scholarship' ? 'var(--text-primary)' : 'var(--text-secondary)',
              focusVisibleRingColor: 'var(--color-primary)'
            }}
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
            aria-label={`Switch to ${sections.scholarship.title} section`}
          >
            {sections.scholarship.title}
          </button>
        </div>

        <div className="space-y-8 md:space-y-10">
          {items.map((item, index) => (
            <article key={`${activeTab}-${index}`} className="flex gap-6 md:gap-8 animate-mobile-scale">
              <div className="flex items-start pt-2">
                <div 
                  className="w-12 h-12 md:w-14 md:h-14 bg-transparent border-2 rounded-full flex items-center justify-center transition-all duration-[var(--duration-base)] hover:scale-110 flex-shrink-0"
                  style={{ 
                    borderColor: 'var(--color-primary)', 
                    color: 'var(--color-primary)' 
                  }}
                  role="img"
                  aria-label={activeTab === 'career' ? 'Career experience' : 'Education experience'}
                >
                  {activeTab === 'career' ? (
                    <Briefcase size={20} className="md:w-6 md:h-6" />
                  ) : (
                    <GraduationCap size={20} className="md:w-6 md:h-6" />
                  )}
                </div>
              </div>

              <div className="flex-1 min-w-0 space-y-3 md:space-y-4">
                <header className="space-y-2">
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
                  <MapPin 
                    size={16} 
                    className="mr-2 flex-shrink-0" 
                    style={{ color: 'var(--text-secondary)' }}
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
