export const colors = {
  // Primitives
  white: '#ffffff',
  black: '#000000',

  // Neutral
  neutral: {
    50: '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },

  // Brand
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },

  // Semantic
  success: {
    light: '#d1fae5',
    base: '#10b981',
    dark: '#065f46',
  },
  warning: {
    light: '#fef3c7',
    base: '#f59e0b',
    dark: '#92400e',
  },
  danger: {
    light: '#fee2e2',
    base: '#ef4444',
    dark: '#991b1b',
  },
} as const;
