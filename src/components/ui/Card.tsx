import React from 'react';
import { useScrollAnimation } from '../../hooks/useIntersectionObserver';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  animated?: boolean;
  onClick?: () => void;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  role?: string;
  'aria-label'?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverable = false,
  animated = true,
  onClick,
  padding = 'md',
  role,
  'aria-label': ariaLabel,
}) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  
  const paddingClasses = {
    none: '',
    sm: 'p-3 sm:p-4',
    md: 'p-4 sm:p-6',
    lg: 'p-6 sm:p-8',
  };
  
  const baseClasses = `
    bg-[var(--bg-elevated)] 
    border border-[var(--border-color)] 
    rounded-[var(--radius-lg)] 
    shadow-sm 
    transition-all 
    duration-[var(--duration-base)]
    ${paddingClasses[padding]}
    ${hoverable ? 'hover:shadow-lg hover:scale-[1.02] cursor-pointer' : ''}
    ${animated && isVisible ? 'opacity-100 translate-y-0' : animated ? 'opacity-0 translate-y-4' : ''}
    ${className}
  `.trim();
  
  const Component = onClick ? 'button' : 'div';
  
  return (
    <Component
      ref={animated ? ref : undefined}
      className={baseClasses}
      onClick={onClick}
      role={role}
      aria-label={ariaLabel}
      style={{
        transition: animated ? 'opacity 600ms ease-out, transform 600ms ease-out, box-shadow 250ms ease-out' : undefined,
      }}
    >
      {children}
    </Component>
  );
};

export default Card;