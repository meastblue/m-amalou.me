import React from 'react';

interface PillProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'neutral' | 'custom';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  customColor?: string; // Hex color like "61DAFB"
  style?: React.CSSProperties;
}

const Pill = ({ 
  children, 
  variant = 'neutral', 
  size = 'md', 
  className = '',
  onClick,
  disabled = false,
  customColor,
  style
}: PillProps) => {
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 hover:scale-105 whitespace-nowrap";
  
  const sizeClasses = {
    sm: "px-2 py-1 text-fluid-xs",
    md: "px-3 py-1.5 text-fluid-sm",
    lg: "px-4 py-2 text-fluid-base"
  };

  const variantStyles = {
    primary: {
      backgroundColor: 'var(--color-primary)',
      color: 'white'
    },
    secondary: {
      backgroundColor: 'var(--bg-secondary)',
      color: 'var(--text-primary)',
      border: '1px solid var(--border-color)'
    },
    accent: {
      backgroundColor: 'var(--color-accent)',
      color: 'white'
    },
    neutral: {
      backgroundColor: 'var(--bg-surface)',
      color: 'var(--text-secondary)',
      border: '1px solid var(--border-color)'
    },
    custom: {}
  };

  // Custom color styling with 20% opacity background and solid text
  const getCustomStyle = () => {
    if (variant === 'custom' && customColor) {
      const cleanColor = customColor.replace('#', '');
      return {
        backgroundColor: `#${cleanColor}33`, // 33 is 20% opacity in hex
        color: `#${cleanColor}`,
        border: 'none'
      };
    }
    return variantStyles[variant];
  };

  const Component = onClick ? 'button' : 'span';
  
  return (
    <Component
      className={`${baseClasses} ${sizeClasses[size]} ${className} ${
        onClick ? 'cursor-pointer' : ''
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      style={{ ...getCustomStyle(), ...style }}
      onClick={onClick && !disabled ? onClick : undefined}
      disabled={disabled}
    >
      {children}
    </Component>
  );
};

export default Pill;