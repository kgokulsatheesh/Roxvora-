import { colors } from './colors';
import { typography } from './typography';
import { breakpoints, mediaQueries, spacing, borderRadius, transitions, zIndices } from './breakpoints';
import { componentOverrides, keyframes } from './componentOverrides';

// Declare BEFORE cssVariables so the template literal can reference it.
export const containerSizes = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
  full: '100%',
};

export const theme = {
  colors,
  typography,
  breakpoints,
  mediaQueries,
  spacing,
  borderRadius,
  transitions,
  zIndices,
  components: componentOverrides,
  keyframes,
  shadows: colors.shadows,
  gradients: colors.gradients,
};

export const getThemeValue = (path, defaultValue = null) => {
  const keys = path.split('.');
  let value = theme;
  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      return defaultValue;
    }
  }
  return value;
};

export const cssVariables = `
  :root {
    /* Colors */
    --color-primary-50: ${colors.primary[50]};
    --color-primary-100: ${colors.primary[100]};
    --color-primary-200: ${colors.primary[200]};
    --color-primary-300: ${colors.primary[300]};
    --color-primary-400: ${colors.primary[400]};
    --color-primary-500: ${colors.primary[500]};
    --color-primary-600: ${colors.primary[600]};
    --color-primary-700: ${colors.primary[700]};
    --color-primary-800: ${colors.primary[800]};
    --color-primary-900: ${colors.primary[900]};
    --color-primary-main: ${colors.primary.main};
    --color-primary-light: ${colors.primary.light};
    --color-primary-dark: ${colors.primary.dark};
    --color-primary-contrast: ${colors.primary.contrastText};

    --color-secondary-50: ${colors.secondary[50]};
    --color-secondary-100: ${colors.secondary[100]};
    --color-secondary-200: ${colors.secondary[200]};
    --color-secondary-300: ${colors.secondary[300]};
    --color-secondary-400: ${colors.secondary[400]};
    --color-secondary-500: ${colors.secondary[500]};
    --color-secondary-600: ${colors.secondary[600]};
    --color-secondary-700: ${colors.secondary[700]};
    --color-secondary-800: ${colors.secondary[800]};
    --color-secondary-900: ${colors.secondary[900]};
    --color-secondary-main: ${colors.secondary.main};
    --color-secondary-light: ${colors.secondary.light};
    --color-secondary-dark: ${colors.secondary.dark};
    --color-secondary-contrast: ${colors.secondary.contrastText};

    --color-accent-50: ${colors.accent[50]};
    --color-accent-100: ${colors.accent[100]};
    --color-accent-200: ${colors.accent[200]};
    --color-accent-300: ${colors.accent[300]};
    --color-accent-400: ${colors.accent[400]};
    --color-accent-500: ${colors.accent[500]};
    --color-accent-600: ${colors.accent[600]};
    --color-accent-700: ${colors.accent[700]};
    --color-accent-800: ${colors.accent[800]};
    --color-accent-900: ${colors.accent[900]};
    --color-accent-main: ${colors.accent.main};
    --color-accent-light: ${colors.accent.light};
    --color-accent-dark: ${colors.accent.dark};
    --color-accent-contrast: ${colors.accent.contrastText};

    --color-success-main: ${colors.success.main};
    --color-success-light: ${colors.success.light};
    --color-success-dark: ${colors.success.dark};

    --color-warning-main: ${colors.warning.main};
    --color-warning-light: ${colors.warning.light};
    --color-warning-dark: ${colors.warning.dark};

    --color-error-main: ${colors.error.main};
    --color-error-light: ${colors.error.light};
    --color-error-dark: ${colors.error.dark};

    --color-info-main: ${colors.info.main};
    --color-info-light: ${colors.info.light};
    --color-info-dark: ${colors.info.dark};

    --color-background-default: ${colors.background.default};
    --color-background-paper: ${colors.background.paper};
    --color-background-dark: ${colors.background.dark};
    --color-background-darker: ${colors.background.darker};

    --color-text-primary: ${colors.text.primary};
    --color-text-secondary: ${colors.text.secondary};
    --color-text-disabled: ${colors.text.disabled};
    --color-text-inverse: ${colors.text.inverse};
    --color-text-hint: ${colors.text.hint};

    --color-divider: ${colors.divider};
    --color-border: ${colors.border};

    /* Gradients */
    --gradient-button: ${colors.gradients.button};
    --gradient-hero: ${colors.gradients.hero};
    --gradient-ink: ${colors.gradients.primary};
    --gradient-gold: ${colors.gradients.secondary};

    /* Typography */
    --font-family-primary: ${typography.fontFamilies.primary};
    --font-family-secondary: ${typography.fontFamilies.secondary};
    --font-family-mono: ${typography.fontFamilies.mono};

    --font-weight-light: ${typography.fontWeights.light};
    --font-weight-regular: ${typography.fontWeights.regular};
    --font-weight-medium: ${typography.fontWeights.medium};
    --font-weight-semibold: ${typography.fontWeights.semibold};
    --font-weight-bold: ${typography.fontWeights.bold};

    --font-size-xs: ${typography.fontSizes.xs};
    --font-size-sm: ${typography.fontSizes.sm};
    --font-size-base: ${typography.fontSizes.base};
    --font-size-lg: ${typography.fontSizes.lg};
    --font-size-xl: ${typography.fontSizes.xl};
    --font-size-2xl: ${typography.fontSizes['2xl']};
    --font-size-3xl: ${typography.fontSizes['3xl']};
    --font-size-4xl: ${typography.fontSizes['4xl']};
    --font-size-5xl: ${typography.fontSizes['5xl']};
    --font-size-6xl: ${typography.fontSizes['6xl']};
    --font-size-7xl: ${typography.fontSizes['7xl']};

    --line-height-tight: ${typography.lineHeights.tight};
    --line-height-snug: ${typography.lineHeights.snug};
    --line-height-normal: ${typography.lineHeights.normal};
    --line-height-relaxed: ${typography.lineHeights.relaxed};
    --line-height-loose: ${typography.lineHeights.loose};

    /* Spacing */
    --spacing-0: ${spacing[0]};
    --spacing-1: ${spacing[1]};
    --spacing-2: ${spacing[2]};
    --spacing-3: ${spacing[3]};
    --spacing-4: ${spacing[4]};
    --spacing-5: ${spacing[5]};
    --spacing-6: ${spacing[6]};
    --spacing-8: ${spacing[8]};
    --spacing-10: ${spacing[10]};
    --spacing-12: ${spacing[12]};
    --spacing-16: ${spacing[16]};
    --spacing-20: ${spacing[20]};
    --spacing-24: ${spacing[24]};
    --spacing-32: ${spacing[32]};

    /* Border Radius */
    --border-radius-none: ${borderRadius.none};
    --border-radius-sm: ${borderRadius.sm};
    --border-radius-md: ${borderRadius.md};
    --border-radius-lg: ${borderRadius.lg};
    --border-radius-xl: ${borderRadius.xl};
    --border-radius-2xl: ${borderRadius['2xl']};
    --border-radius-3xl: ${borderRadius['3xl']};
    --border-radius-full: ${borderRadius.full};

    /* Transitions */
    --transition-fast: ${transitions.fast};
    --transition-normal: ${transitions.normal};
    --transition-slow: ${transitions.slow};

    /* Z-Indices */
    --z-index-hide: ${zIndices.hide};
    --z-index-base: ${zIndices.base};
    --z-index-dropdown: ${zIndices.dropdown};
    --z-index-sticky: ${zIndices.sticky};
    --z-index-fixed: ${zIndices.fixed};
    --z-index-modal-backdrop: ${zIndices.modalBackdrop};
    --z-index-modal: ${zIndices.modal};
    --z-index-popover: ${zIndices.popover};
    --z-index-tooltip: ${zIndices.tooltip};
    --z-index-toast: ${zIndices.toast};

    /* Container */
    --container-sm: ${containerSizes.sm};
    --container-md: ${containerSizes.md};
    --container-lg: ${containerSizes.lg};
    --container-xl: ${containerSizes.xl};
    --container-2xl: ${containerSizes['2xl']};

    /* Shadows */
    --shadow-xs: ${colors.shadows.xs};
    --shadow-sm: ${colors.shadows.sm};
    --shadow-md: ${colors.shadows.md};
    --shadow-lg: ${colors.shadows.lg};
    --shadow-xl: ${colors.shadows.xl};
    --shadow-2xl: ${colors.shadows['2xl']};
    --shadow-inner: ${colors.shadows.inner};
  }
`;

export default theme;
