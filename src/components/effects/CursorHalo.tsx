import { motion } from 'motion/react';
import { useEffect, useState, useCallback } from 'react';
import { useDarkMode } from '../../hooks/useDarkMode';

const CursorHalo = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const { isDarkMode } = useDarkMode();

  const handleMouseMove = useCallback((e: MouseEvent) => {
    // Throttle updates for better performance
    requestAnimationFrame(() => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
      setIsVisible(true);
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  useEffect(() => {
    // Only enable on desktop (non-touch devices)
    const isDesktop = !('ontouchstart' in window) && window.innerWidth > 1024;
    
    if (!isDesktop) {
      return;
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return (
    <>
      {/* Main halo effect */}
      <motion.div
        className="fixed pointer-events-none z-[1] mix-blend-screen"
        style={{
          left: 0,
          top: 0,
          width: '100vw',
          height: '100vh',
        }}
        animate={{
          background: isVisible
            ? isDarkMode
              ? `radial-gradient(circle 350px at ${mousePosition.x}px ${mousePosition.y}px, 
                 rgba(255, 255, 255, 0.15) 0%, 
                 rgba(255, 255, 255, 0.08) 30%, 
                 rgba(255, 255, 255, 0.03) 60%, 
                 transparent 100%)`
              : `radial-gradient(circle 350px at ${mousePosition.x}px ${mousePosition.y}px, 
                 rgba(59, 130, 246, 0.12) 0%, 
                 rgba(59, 130, 246, 0.06) 30%, 
                 rgba(59, 130, 246, 0.02) 60%, 
                 transparent 100%)`
            : 'transparent',
        }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 25,
          mass: 0.5,
        }}
      />

      {/* Secondary subtle glow */}
      <motion.div
        className="fixed pointer-events-none z-[0] mix-blend-soft-light"
        style={{
          left: 0,
          top: 0,
          width: '100vw',
          height: '100vh',
        }}
        animate={{
          background: isVisible
            ? isDarkMode
              ? `radial-gradient(circle 150px at ${mousePosition.x}px ${mousePosition.y}px, 
                 rgba(255, 255, 255, 0.1) 0%, 
                 rgba(255, 255, 255, 0.05) 40%, 
                 transparent 80%)`
              : `radial-gradient(circle 150px at ${mousePosition.x}px ${mousePosition.y}px, 
                 rgba(37, 99, 235, 0.1) 0%, 
                 rgba(37, 99, 235, 0.05) 40%, 
                 transparent 80%)`
            : 'transparent',
        }}
        transition={{
          type: 'spring',
          stiffness: 120,
          damping: 30,
          mass: 0.8,
        }}
      />
    </>
  );
};

export default CursorHalo;