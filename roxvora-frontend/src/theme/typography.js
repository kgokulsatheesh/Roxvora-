export const typography = {
  fontFamilies: {
    primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    secondary: "'Playfair Display', Georgia, serif",
    mono: "'JetBrains Mono', 'Fira Code', monospace",
  },
  fontWeights: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  fontSizes: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
    '6xl': '3.75rem', // 60px
    '7xl': '4.5rem',  // 72px
  },
  lineHeights: {
    tight: 1.1,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
  letterSpacings: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
  headings: {
    h1: {
      fontFamily: "'Playfair Display', Georgia, serif",
      fontWeight: 700,
      fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: "'Playfair Display', Georgia, serif",
      fontWeight: 600,
      fontSize: 'clamp(2rem, 4vw, 3.5rem)',
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontFamily: "'Inter', sans-serif",
      fontWeight: 600,
      fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
      lineHeight: 1.3,
      letterSpacing: '0',
    },
    h4: {
      fontFamily: "'Inter', sans-serif",
      fontWeight: 600,
      fontSize: 'clamp(1.25rem, 2.5vw, 1.875rem)',
      lineHeight: 1.4,
      letterSpacing: '0',
    },
    h5: {
      fontFamily: "'Inter', sans-serif",
      fontWeight: 600,
      fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
      lineHeight: 1.4,
      letterSpacing: '0',
    },
    h6: {
      fontFamily: "'Inter', sans-serif",
      fontWeight: 600,
      fontSize: '1.125rem',
      lineHeight: 1.4,
      letterSpacing: '0',
    },
  },
  body: {
    large: {
      fontSize: '1.125rem',
      lineHeight: 1.6,
      fontWeight: 400,
    },
    base: {
      fontSize: '1rem',
      lineHeight: 1.5,
      fontWeight: 400,
    },
    small: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      fontWeight: 400,
    },
    xsmall: {
      fontSize: '0.75rem',
      lineHeight: 1.5,
      fontWeight: 400,
    },
  },
  button: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 600,
    fontSize: '0.875rem',
    lineHeight: 1.5,
    letterSpacing: '0.025em',
    textTransform: 'uppercase',
  },
  caption: {
    fontSize: '0.75rem',
    lineHeight: 1.5,
    fontWeight: 400,
  },
  overline: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 600,
    fontSize: '0.75rem',
    lineHeight: 1.5,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
  },
};