import { MdRemove, MdAdd } from 'react-icons/md';
import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { usePortfolio } from '../../hooks/usePortfolio';
import Pill from '../ui/Pill';
import Section from '../ui/Section';

// Constants for better maintainability
const ANIMATION_CONFIG = {
  DURATION: 600,
  STAGGER_DELAY: 100,
  INITIAL_DELAY: 200,
} as const;

const DEFAULT_EXPANDED = ['frontend-expertise'];

interface SkillCategory {
  id: string;
  title: string;
  description: string;
  skills: string[];
}

interface CategoryHeaderProps {
  category: SkillCategory;
  isExpanded: boolean;
  onToggle: () => void;
}

interface CategoryContentProps {
  category: SkillCategory;
  isClosing: boolean;
  getTechColor: (skill: string) => string | undefined;
}

// Memoized category header component for performance
const CategoryHeader = ({ category, isExpanded, onToggle }: CategoryHeaderProps) => (
  <button
    onClick={onToggle}
    className="w-full flex items-center justify-between py-[var(--space-base)] text-left transition-all duration-[var(--duration-base)] rounded-lg px-2 group"
    style={{ backgroundColor: 'transparent' }}
    onMouseEnter={(e) => {
      e.currentTarget.style.backgroundColor = 'var(--bg-surface)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.backgroundColor = 'transparent';
    }}
    aria-expanded={isExpanded}
    aria-controls={`skills-${category.id}`}
    aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${category.title} skills`}
  >
    <h3 
      className="text-fluid-lg font-bold group-hover:scale-[1.02] transition-transform duration-[var(--duration-fast)]"
      style={{ color: 'var(--text-primary)' }}
    >
      {category.title}
    </h3>
    <div className="flex-shrink-0 ml-[var(--space-base)]">
      <div 
        className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 flex items-center justify-center transition-all duration-[var(--duration-base)] group-hover:scale-110 group-hover:rotate-180"
        style={{ borderColor: 'var(--text-secondary)' }}
      >
        {isExpanded ? (
          <MdRemove 
            size={16} 
            style={{ color: 'var(--text-secondary)' }}
          />
        ) : (
          <MdAdd 
            size={16} 
            style={{ color: 'var(--text-secondary)' }}
          />
        )}
      </div>
    </div>
  </button>
);

// Memoized category content component
const CategoryContent = ({ category, isClosing, getTechColor }: CategoryContentProps) => {
  // Memoize pills to prevent unnecessary re-renders
  const skillPills = useMemo(() => 
    category.skills.map((skill: string, index: number) => {
      const techColor = getTechColor(skill);
      return (
        <Pill 
          key={skill}
          variant={techColor ? "custom" : "neutral"}
          size="sm"
          customColor={techColor}
          className={!isClosing ? "animate-fadeInUp" : ""}
          style={{ 
            animationDelay: !isClosing ? `${ANIMATION_CONFIG.INITIAL_DELAY + (index * ANIMATION_CONFIG.STAGGER_DELAY)}ms` : 'none',
            animationFillMode: !isClosing ? 'both' : 'none'
          }}
        >
          {skill}
        </Pill>
      );
    }), [category.skills, getTechColor, isClosing]);

  return (
    <div 
      id={`skills-${category.id}`}
      className={`mt-[var(--space-base)] space-y-[var(--space-base)] px-2 ${
        isClosing ? 'animate-collapse' : 'animate-expand'
      }`}
      role="region"
      aria-labelledby={`skills-header-${category.id}`}
    >
      <p 
        className={`text-fluid-sm leading-relaxed ${!isClosing ? 'animate-fadeInUp' : ''}`}
        style={{ 
          color: 'var(--text-secondary)',
          animationDelay: !isClosing ? '0ms' : 'none',
          animationFillMode: !isClosing ? 'both' : 'none'
        }}
        dangerouslySetInnerHTML={{ __html: category.description }}
      />

      <div 
        className="flex flex-wrap gap-[var(--space-xs)] mt-[var(--space-lg)]"
        role="list"
        aria-label={`${category.title} technologies`}
      >
        {skillPills}
      </div>
    </div>
  );
};

const Skills = () => {
  const { skills, sections, getTechColor } = usePortfolio();
  
  // State management with better type safety
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(DEFAULT_EXPANDED)
  );
  const [closingCategories, setClosingCategories] = useState<Set<string>>(new Set());
  
  // Refs for cleanup and performance
  const timeoutRefs = useRef<Map<string, NodeJS.Timeout>>(new Map());

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach(timeout => clearTimeout(timeout));
      timeoutRefs.current.clear();
    };
  }, []);

  // Optimized toggle function with cleanup
  const toggleCategory = useCallback((categoryId: string): void => {
    // Clear any existing timeout for this category
    const existingTimeout = timeoutRefs.current.get(categoryId);
    if (existingTimeout) {
      clearTimeout(existingTimeout);
      timeoutRefs.current.delete(categoryId);
    }

    if (expandedCategories.has(categoryId)) {
      // Start closing animation
      setClosingCategories(prev => new Set(prev).add(categoryId));
      
      // Complete closure after animation
      const timeout = setTimeout(() => {
        setExpandedCategories(prev => {
          const next = new Set(prev);
          next.delete(categoryId);
          return next;
        });
        setClosingCategories(prev => {
          const next = new Set(prev);
          next.delete(categoryId);
          return next;
        });
        timeoutRefs.current.delete(categoryId);
      }, ANIMATION_CONFIG.DURATION);
      
      timeoutRefs.current.set(categoryId, timeout);
    } else {
      // Expand immediately
      setExpandedCategories(prev => new Set(prev).add(categoryId));
    }
  }, [expandedCategories]);

  // Memoized state checkers for performance
  const isExpanded = useCallback((categoryId: string): boolean => 
    expandedCategories.has(categoryId), [expandedCategories]);
  
  const isClosing = useCallback((categoryId: string): boolean => 
    closingCategories.has(categoryId), [closingCategories]);

  // Memoize categories to prevent unnecessary re-renders
  const skillCategories = useMemo(() => 
    skills.map((category: SkillCategory) => ({
      ...category,
      toggleHandler: () => toggleCategory(category.id),
      expanded: isExpanded(category.id),
      closing: isClosing(category.id)
    })), [skills, toggleCategory, isExpanded, isClosing]);

  return (
    <Section id="skills" spacing="base" containerSize="lg" aria-labelledby="skills-heading">
      <div className="space-fluid-xl">
        <h2 
          id="skills-heading"
          className="text-fluid-2xl font-bold text-left lowercase pb-2 flex items-center gap-4"
          style={{ color: 'var(--text-primary)' }}
        >
          <span className="font-mono text-lg lg:text-xl" style={{ color: 'var(--color-accent)' }}>04.</span>
          {sections.skills.title}
          <span className="hidden sm:block h-[1px] flex-1 max-w-xs" style={{ backgroundColor: 'var(--border-color)' }}></span>
        </h2>

        <div className="space-fluid-lg" role="list">
          {skillCategories.map((category) => (
            <article 
              key={category.id}
              className="card overflow-hidden focus-within:ring-2 focus-within:ring-opacity-50"
              style={{ 
                '--tw-ring-color': 'var(--color-primary)'
              } as React.CSSProperties}
              role="listitem"
            >
              <CategoryHeader
                category={category}
                isExpanded={category.expanded}
                onToggle={category.toggleHandler}
              />

              {category.expanded && (
                <CategoryContent
                  category={category}
                  isClosing={category.closing}
                  getTechColor={getTechColor}
                />
              )}
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Skills;