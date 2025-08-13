import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  size?: 'sm' | 'base' | 'lg' | 'xl' | 'full';
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  centerContent?: boolean;
}

/**
 * Mobile-first responsive container component
 * Provides consistent spacing and max-widths across breakpoints
 */
const Container = ({ 
  children, 
  size = 'base', 
  className = '',
  as: Component = 'div',
  centerContent = false
}: ContainerProps) => {
  const sizeClasses = {
    sm: 'max-w-2xl',      // 672px
    base: 'max-w-4xl',    // 896px
    lg: 'max-w-6xl',      // 1152px
    xl: 'max-w-7xl',      // 1280px
    full: 'max-w-none'    // Full width
  };

  const baseClasses = 'w-full mx-auto px-4 sm:px-6 lg:px-8';
  const centerClasses = centerContent ? 'flex flex-col items-center' : '';
  
  return (
    <Component 
      className={`${baseClasses} ${sizeClasses[size]} ${centerClasses} ${className}`}
    >
      {children}
    </Component>
  );
};

export default Container;