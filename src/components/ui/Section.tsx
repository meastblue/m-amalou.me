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
    sm: 'pb-6',
    base: 'pb-12',
    lg: 'pb-16',
    xl: 'pb-20'
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
      className={`${spacingClasses[spacing]} ${backgroundClasses[background]} ${className}`}
      aria-labelledby={ariaLabelledBy}
    >
      <Container size={containerSize}>
        {children}
      </Container>
    </Component>
  );
};

export default Section;