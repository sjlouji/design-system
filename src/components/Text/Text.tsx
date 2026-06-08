import React from 'react';

export type TextVariant = 'body' | 'caption' | 'label' | 'code';
export type TextSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
export type TextWeight = 'normal' | 'medium' | 'semibold' | 'bold';
export type TextAs = 'p' | 'span' | 'div' | 'label' | 'code' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  as?: TextAs;
  variant?: TextVariant;
  size?: TextSize;
  weight?: TextWeight;
  muted?: boolean;
  children: React.ReactNode;
}

const fontSizeMap: Record<TextSize, string> = {
  xs: '0.75rem',
  sm: '0.875rem',
  base: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.875rem',
  '4xl': '2.25rem',
};

const fontWeightMap: Record<TextWeight, string> = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
};

export function Text({
  as: Tag = 'p',
  variant = 'body',
  size = 'base',
  weight = 'normal',
  muted = false,
  children,
  style,
  ...props
}: TextProps) {
  return (
    <Tag
      style={{
        margin: 0,
        fontFamily: variant === 'code'
          ? 'ui-monospace, SFMono-Regular, Menlo, monospace'
          : 'Inter, ui-sans-serif, system-ui, sans-serif',
        fontSize: fontSizeMap[size],
        fontWeight: fontWeightMap[weight],
        color: muted ? '#6b7280' : 'inherit',
        lineHeight: '1.5',
        ...(variant === 'code' && {
          backgroundColor: '#f4f4f5',
          padding: '0.125rem 0.375rem',
          borderRadius: '0.25rem',
        }),
        ...style,
      }}
      {...props}
    >
      {children}
    </Tag>
  );
}
