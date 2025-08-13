import React from 'react';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  variant?: 'text' | 'rectangular' | 'circular';
  animation?: 'pulse' | 'wave' | 'none';
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = '1rem',
  variant = 'rectangular',
  animation = 'pulse',
  className = '',
}) => {
  const baseClasses = 'bg-gray-200 dark:bg-gray-700';
  
  const variantClasses = {
    text: 'rounded',
    rectangular: 'rounded-lg',
    circular: 'rounded-full',
  };
  
  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'skeleton-wave',
    none: '',
  };
  
  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${animationClasses[animation]} ${className}`;
  
  return (
    <div
      className={combinedClasses}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
      }}
      aria-hidden="true"
    >
      {animation === 'wave' && (
        <style jsx>{`
          @keyframes wave {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
          
          .skeleton-wave {
            position: relative;
            overflow: hidden;
          }
          
          .skeleton-wave::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(
              90deg,
              transparent,
              rgba(255, 255, 255, 0.2),
              transparent
            );
            animation: wave 1.5s linear infinite;
          }
        `}</style>
      )}
    </div>
  );
};

// Compound component for loading states
export const SkeletonGroup: React.FC<{ children: React.ReactNode; loading?: boolean }> = ({
  children,
  loading = true,
}) => {
  if (!loading) return <>{children}</>;
  
  return <div className="space-y-2 animate-pulse">{children}</div>;
};

export default Skeleton;