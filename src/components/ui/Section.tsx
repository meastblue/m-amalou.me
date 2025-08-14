import React from 'react';
import Container from './Container';

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  containerSize?: 'sm' | 'base' | 'lg' | 'xl' | 'full';
  spacing?: 'none' | 'sm' | 'base' | 'lg' | 'xl';
  background?: 'transparent' | 'primary' | 'secondary' | 'surface';
  as?: keyof JSX.IntrinsicElements;
  'aria-labelledby'?: string;
}

/**
 * Mobile-first section component with consistent spacing and layout
 * Wraps content in responsive container with semantic markup
 */
const Section = ({ 
  children, 
  id,
  className = '',
  containerSize = 'base',
  spacing = 'base',
  background = 'transparent',
  as: Component = 'section',
  'aria-labelledby': ariaLabelledBy
}: SectionProps) => {
  const spacingClasses = {
    none: '',
    sm: 'py-12 sm:py-16 lg:py-20',
    base: 'py-16 sm:py-20 lg:py-24',
    lg: 'py-20 sm:py-24 lg:py-32',
    xl: 'py-24 sm:py-32 lg:py-40'
  };

  const backgroundClasses = {
    transparent: '',
    primary: 'bg-[var(--bg-primary)]',
    secondary: 'bg-[var(--bg-secondary)]',
    surface: 'bg-[var(--bg-surface)]'
  };

  return (
    <Component 
      id={id}
      className={`${spacingClasses[spacing]} ${backgroundClasses[background]} ${className} scroll-mt-20`}
      aria-labelledby={ariaLabelledBy}
    >
      <Container size={containerSize}>
        {children}
      </Container>
    </Component>
  );
};

export default Section;