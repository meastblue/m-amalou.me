import React from 'react';
import { DESIGN_TOKENS } from '../../constants/design-tokens';

type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'bodySmall' | 'caption' | 'overline';
type TypographyWeight = 'normal' | 'medium' | 'semibold' | 'bold';
type TypographyAlign = 'left' | 'center' | 'right';

interface TypographyProps {
  variant?: TypographyVariant;
  weight?: TypographyWeight;
  align?: TypographyAlign;
  color?: 'primary' | 'secondary' | 'muted' | 'error' | 'success';
  opacity?: number;
  lowercase?: boolean;
  uppercase?: boolean;
  capitalize?: boolean;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
  id?: string;
  style?: React.CSSProperties;
}

const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  weight,
  align = 'left',
  color = 'primary',
  opacity,
  lowercase = false,
  uppercase = false,
  capitalize = false,
  className = '',
  as,
  children,
  id,
  style = {},
}) => {
  const variantStyles: Record<TypographyVariant, { tag: keyof JSX.IntrinsicElements; classes: string }> = {
    h1: { tag: 'h1', classes: 'text-fluid-3xl leading-tight' },
    h2: { tag: 'h2', classes: 'text-fluid-2xl leading-tight' },
    h3: { tag: 'h3', classes: 'text-fluid-xl leading-snug' },
    h4: { tag: 'h4', classes: 'text-fluid-lg leading-snug' },
    body: { tag: 'p', classes: 'text-fluid-base leading-relaxed' },
    bodySmall: { tag: 'p', classes: 'text-fluid-sm leading-relaxed' },
    caption: { tag: 'span', classes: 'text-fluid-xs leading-normal' },
    overline: { tag: 'span', classes: 'text-fluid-xs uppercase tracking-wider leading-normal' },
  };
  
  const colorStyles = {
    primary: 'var(--text-primary)',
    secondary: 'var(--text-secondary)',
    muted: 'var(--text-muted)',
    error: DESIGN_TOKENS.colors.error,
    success: DESIGN_TOKENS.colors.success,
  };
  
  const weightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };
  
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };
  
  const { tag: DefaultTag, classes: variantClasses } = variantStyles[variant];
  const Component = as || DefaultTag;
  
  const caseClass = lowercase ? 'lowercase' : uppercase ? 'uppercase' : capitalize ? 'capitalize' : '';
  const weightClass = weight ? weightClasses[weight] : variant.startsWith('h') ? 'font-bold' : 'font-normal';
  
  const combinedClasses = `
    ${variantClasses}
    ${weightClass}
    ${alignClasses[align]}
    ${caseClass}
    ${className}
  `.trim();
  
  const combinedStyles: React.CSSProperties = {
    color: colorStyles[color],
    opacity: opacity,
    ...style,
  };
  
  return (
    <Component id={id} className={combinedClasses} style={combinedStyles}>
      {children}
    </Component>
  );
};

export default Typography;