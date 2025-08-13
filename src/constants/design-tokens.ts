// Design System Tokens - Single source of truth for design values
export const DESIGN_TOKENS = {
  // Typography Scale - Improved for better readability
  fontSize: {
    '2xs': '11px',    // Minimum readable size
    xs: '13px',       // Small text
    sm: '15px',       // Secondary text
    base: '17px',     // Body text - increased for readability
    lg: '19px',       // Emphasized body
    xl: '22px',       // Small headings
    '2xl': '26px',    // Section headings
    '3xl': '34px',    // Main headings
    '4xl': '42px',    // Hero headings
    '5xl': '52px',    // Extra large headings
  },
  
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  
  // Spacing Scale
  spacing: {
    0: '0',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
  },
  
  // Colors
  colors: {
    primary: '#1D1D1B',
    primaryTransparent: 'rgba(29, 29, 27, 0.3)',
    primarySemiTransparent: 'rgba(29, 29, 27, 0.5)',
    white: '#FFFFFF',
    black: '#000000',
    error: '#ef4444',
    warning: '#f59e0b',
    success: '#10b981',
    info: '#3b82f6',
  },
  
  // Breakpoints
  breakpoints: {
    xs: '375px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  
  // Animation
  animation: {
    duration: {
      fast: '150ms',
      base: '250ms',
      slow: '500ms',
      slower: '750ms',
    },
    easing: {
      linear: 'linear',
      in: 'ease-in',
      out: 'ease-out',
      inOut: 'ease-in-out',
      spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },
  
  // Border Radius
  borderRadius: {
    none: '0',
    sm: '0.25rem',
    base: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    full: '9999px',
  },
  
  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  
  // Z-index Scale
  zIndex: {
    base: 0,
    dropdown: 10,
    sticky: 20,
    fixed: 30,
    overlay: 40,
    modal: 50,
    popover: 60,
    tooltip: 70,
  },
} as const;

export type DesignTokens = typeof DESIGN_TOKENS;