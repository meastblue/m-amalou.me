import React from 'react';
import { DESIGN_TOKENS } from '../../constants/design-tokens';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  icon,
  iconPosition = 'left',
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold transition-all duration-[var(--duration-base)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed animate-mobile-scale';
  
  const variantClasses = {
    primary: 'bg-[var(--color-accent)] text-white hover:shadow-lg hover:bg-[var(--color-accent-hover)] active:scale-95',
    secondary: 'bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:bg-[var(--bg-surface)] border border-[var(--border-color)]',
    ghost: 'bg-transparent text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]',
    danger: 'bg-[var(--color-error)] text-white hover:bg-[var(--color-error-hover)]',
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-fluid-xs rounded-md gap-1.5',
    md: 'px-4 py-2 text-fluid-sm rounded-lg gap-2',
    lg: 'px-6 py-3 text-fluid-base rounded-lg gap-3',
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`;
  
  return (
    <button
      className={combinedClasses}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <AiOutlineLoading3Quarters className="animate-spin h-4 w-4" />
          <span>Loading...</span>
        </>
      ) : (
        <>
          {icon && iconPosition === 'left' && icon}
          {children}
          {icon && iconPosition === 'right' && icon}
        </>
      )}
    </button>
  );
};

export default Button;