export const breakpoints = {
  values: {
    xs: 0,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
  },
  up: (breakpoint) => `@media (min-width: ${breakpoints.values[breakpoint]}px)`,
  down: (breakpoint) => `@media (max-width: ${breakpoints.values[breakpoint] - 1}px)`,
  between: (start, end) => `@media (min-width: ${breakpoints.values[start]}px) and (max-width: ${breakpoints.values[end] - 1}px)`,
  only: (breakpoint) => {
    const keys = Object.keys(breakpoints.values);
    const index = keys.indexOf(breakpoint);
    if (index === -1) return '';
    const min = breakpoints.values[breakpoint];
    const max = index < keys.length - 1 ? breakpoints.values[keys[index + 1]] - 1 : Infinity;
    return max === Infinity
      ? `@media (min-width: ${min}px)`
      : `@media (min-width: ${min}px) and (max-width: ${max}px)`;
  },
};

export const mediaQueries = {
  xs: breakpoints.up('xs'),
  sm: breakpoints.up('sm'),
  md: breakpoints.up('md'),
  lg: breakpoints.up('lg'),
  xl: breakpoints.up('xl'),
  '2xl': breakpoints.up('2xl'),
  'max-xs': breakpoints.down('sm'),
  'max-sm': breakpoints.down('md'),
  'max-md': breakpoints.down('lg'),
  'max-lg': breakpoints.down('xl'),
  'max-xl': breakpoints.down('2xl'),
};

export const containerSizes = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
  full: '100%',
};

export const spacing = {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
  32: '8rem',     // 128px
};

export const borderRadius = {
  none: '0',
  sm: '0.25rem',   // 4px
  md: '0.375rem',  // 6px
  lg: '0.5rem',    // 8px
  xl: '0.75rem',   // 12px
  '2xl': '1rem',   // 16px
  '3xl': '1.5rem', // 24px
  full: '9999px',
};

export const transitions = {
  fast: '150ms ease',
  normal: '250ms ease',
  slow: '350ms ease',
  'fast-in': '150ms ease-out',
  'fast-out': '150ms ease-in',
  'normal-in': '250ms ease-out',
  'normal-out': '250ms ease-in',
  'slow-in': '350ms ease-out',
  'slow-out': '350ms ease-in',
};

export const zIndices = {
  hide: -1,
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  fixed: 1200,
  modalBackdrop: 1300,
  modal: 1400,
  popover: 1500,
  tooltip: 1600,
  toast: 1700,
};