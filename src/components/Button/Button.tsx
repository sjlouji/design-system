import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    backgroundColor: '#2563eb',
    color: '#ffffff',
    border: '1px solid transparent',
  },
  secondary: {
    backgroundColor: '#ffffff',
    color: '#374151',
    border: '1px solid #d1d5db',
  },
  danger: {
    backgroundColor: '#ef4444',
    color: '#ffffff',
    border: '1px solid transparent',
  },
  ghost: {
    backgroundColor: 'transparent',
    color: '#374151',
    border: '1px solid transparent',
  },
};

const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
  sm: { fontSize: '0.875rem', padding: '0.375rem 0.75rem', borderRadius: '0.375rem' },
  md: { fontSize: '1rem', padding: '0.5rem 1rem', borderRadius: '0.375rem' },
  lg: { fontSize: '1.125rem', padding: '0.75rem 1.5rem', borderRadius: '0.5rem' },
};

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  children,
  style,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        fontWeight: '500',
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        opacity: disabled || loading ? 0.6 : 1,
        transition: 'opacity 150ms, background-color 150ms',
        lineHeight: '1.5',
        ...variantStyles[variant],
        ...sizeStyles[size],
        ...style,
      }}
      {...props}
    >
      {loading && (
        <span style={{ display: 'inline-block', width: '1em', height: '1em' }}>⏳</span>
      )}
      {children}
    </button>
  );
}
