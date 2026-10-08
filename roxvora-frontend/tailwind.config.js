/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],

  theme: {
    // ── Container ────────────────────────────────────────────────────────────
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        md: '2rem',
        lg: '2.5rem',
        xl: '3rem',
        '2xl': '3.5rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1400px',
      },
    },

    extend: {
      // ── Colors — all backed by CSS custom properties ─────────────────────
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary-main)',
          50:  'var(--color-primary-50, #f0f4f8)',
          100: 'var(--color-primary-100, #d9e2ec)',
          200: 'var(--color-primary-200, #bcccdc)',
          300: 'var(--color-primary-300, #9fb3c8)',
          400: 'var(--color-primary-400, #829ab1)',
          500: 'var(--color-primary-500, #627d98)',
          600: 'var(--color-primary-600, #486581)',
          700: 'var(--color-primary-700, #334e68)',
          800: 'var(--color-primary-800, #243b53)',
          900: 'var(--color-primary-900, #0a0a0b)',
          light: 'var(--color-primary-light)',
          dark:  'var(--color-primary-dark)',
          contrast: 'var(--color-primary-contrast)',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary-main)',
          50:  'var(--color-secondary-50, #fff8f0)',
          100: 'var(--color-secondary-100)',
          200: 'var(--color-secondary-200)',
          300: 'var(--color-secondary-300)',
          400: 'var(--color-secondary-400)',
          500: 'var(--color-secondary-500)',
          600: 'var(--color-secondary-600)',
          700: 'var(--color-secondary-700)',
          800: 'var(--color-secondary-800)',
          900: 'var(--color-secondary-900)',
          light: 'var(--color-secondary-light)',
          dark:  'var(--color-secondary-dark)',
          contrast: 'var(--color-secondary-contrast)',
        },
        accent: {
          DEFAULT: 'var(--color-accent-main)',
          light: 'var(--color-accent-light)',
          dark:  'var(--color-accent-dark)',
          contrast: 'var(--color-accent-contrast)',
        },
        neutral: {
          50:  'var(--color-neutral-50)',
          100: 'var(--color-neutral-100)',
          200: 'var(--color-neutral-200)',
          300: 'var(--color-neutral-300)',
          400: 'var(--color-neutral-400)',
          500: 'var(--color-neutral-500)',
          600: 'var(--color-neutral-600)',
          700: 'var(--color-neutral-700)',
          800: 'var(--color-neutral-800)',
          900: 'var(--color-neutral-900)',
        },
        success: {
          DEFAULT: 'var(--color-success-main)',
          light: 'var(--color-success-light)',
          dark:  'var(--color-success-dark)',
        },
        warning: {
          DEFAULT: 'var(--color-warning-main)',
          light: 'var(--color-warning-light)',
          dark:  'var(--color-warning-dark)',
        },
        error: {
          DEFAULT: 'var(--color-error-main)',
          light: 'var(--color-error-light)',
          dark:  'var(--color-error-dark)',
        },
        info: {
          DEFAULT: 'var(--color-info-main)',
          light: 'var(--color-info-light)',
          dark:  'var(--color-info-dark)',
        },
        // Semantic surface colours
        background: {
          DEFAULT: 'var(--color-background-default)',
          paper:   'var(--color-background-paper)',
          subtle:  'var(--color-background-subtle, #faf8f4)',
          muted:   'var(--color-background-muted, #f2efe9)',
          dark:    'var(--color-background-dark)',
          darker:  'var(--color-background-darker)',
        },
        text: {
          primary:   'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          hint:      'var(--color-text-hint)',
          disabled:  'var(--color-text-disabled)',
          inverse:   'var(--color-text-inverse)',
        },
        border:  'var(--color-border)',
        divider: 'var(--color-divider)',
      },

      // ── Typography ────────────────────────────────────────────────────────
      fontFamily: {
        primary:   'var(--font-family-primary)',
        secondary: 'var(--font-family-secondary)',
        mono:      'var(--font-family-mono)',
        sans:      'var(--font-family-primary)',
        serif:     'var(--font-family-secondary)',
      },

      fontSize: {
        xs:   ['var(--font-size-xs,   0.75rem)',  { lineHeight: '1rem' }],
        sm:   ['var(--font-size-sm,   0.875rem)', { lineHeight: '1.25rem' }],
        base: ['var(--font-size-base, 1rem)',     { lineHeight: '1.6' }],
        lg:   ['var(--font-size-lg,   1.125rem)', { lineHeight: '1.75rem' }],
        xl:   ['var(--font-size-xl,   1.25rem)',  { lineHeight: '1.75rem' }],
        '2xl':['var(--font-size-2xl,  1.5rem)',   { lineHeight: '2rem' }],
        '3xl':['var(--font-size-3xl,  1.875rem)', { lineHeight: '2.25rem' }],
        '4xl':['var(--font-size-4xl,  2.25rem)',  { lineHeight: '2.5rem' }],
        '5xl':['var(--font-size-5xl,  3rem)',     { lineHeight: '1' }],
        '6xl':['var(--font-size-6xl,  3.75rem)',  { lineHeight: '1' }],
        '7xl':['var(--font-size-7xl,  4.5rem)',   { lineHeight: '1' }],
      },

      fontWeight: {
        light:    'var(--font-weight-light,    300)',
        normal:   'var(--font-weight-regular,  400)',
        medium:   'var(--font-weight-medium,   500)',
        semibold: 'var(--font-weight-semibold, 600)',
        bold:     'var(--font-weight-bold,     700)',
      },

      lineHeight: {
        tight:   'var(--line-height-tight,   1.2)',
        snug:    'var(--line-height-snug,    1.375)',
        normal:  'var(--line-height-normal,  1.6)',
        relaxed: 'var(--line-height-relaxed, 1.7)',
        loose:   'var(--line-height-loose,   1.9)',
      },

      letterSpacing: {
        tight:   'var(--letter-spacing-tight,   -0.02em)',
        wide:    'var(--letter-spacing-wide,    0.06em)',
        widest:  'var(--letter-spacing-widest,  0.18em)',
        normal:  '0em',
      },

      // ── Spacing ───────────────────────────────────────────────────────────
      spacing: {
        1:  'var(--spacing-1,  0.25rem)',
        2:  'var(--spacing-2,  0.5rem)',
        3:  'var(--spacing-3,  0.75rem)',
        4:  'var(--spacing-4,  1rem)',
        5:  'var(--spacing-5,  1.25rem)',
        6:  'var(--spacing-6,  1.5rem)',
        8:  'var(--spacing-8,  2rem)',
        10: 'var(--spacing-10, 2.5rem)',
        12: 'var(--spacing-12, 3rem)',
        16: 'var(--spacing-16, 4rem)',
        20: 'var(--spacing-20, 5rem)',
        24: 'var(--spacing-24, 6rem)',
        // Keep common Tailwind defaults that components use
        0: '0px',
        px: '1px',
        0.5: '0.125rem',
        1.5: '0.375rem',
        2.5: '0.625rem',
        3.5: '0.875rem',
        7: '1.75rem',
        9: '2.25rem',
        11: '2.75rem',
        14: '3.5rem',
        28: '7rem',
        32: '8rem',
        36: '9rem',
        40: '10rem',
        44: '11rem',
        48: '12rem',
        52: '13rem',
        56: '14rem',
        60: '15rem',
        64: '16rem',
        72: '18rem',
        80: '20rem',
        96: '24rem',
      },

      // ── Border radius ─────────────────────────────────────────────────────
      borderRadius: {
        none: '0px',
        xs:   'var(--border-radius-xs,  2px)',
        sm:   'var(--border-radius-sm,  4px)',
        DEFAULT: 'var(--border-radius-md, 8px)',
        md:   'var(--border-radius-md,  8px)',
        lg:   'var(--border-radius-lg,  14px)',
        xl:   'var(--border-radius-xl,  18px)',
        '2xl':'var(--border-radius-2xl, 24px)',
        '3xl':'var(--border-radius-3xl, 32px)',
        full: 'var(--border-radius-full, 9999px)',
      },

      // ── Box shadows ───────────────────────────────────────────────────────
      boxShadow: {
        xs:   'var(--shadow-xs)',
        sm:   'var(--shadow-sm)',
        DEFAULT: 'var(--shadow-md)',
        md:   'var(--shadow-md)',
        lg:   'var(--shadow-lg)',
        xl:   'var(--shadow-xl)',
        '2xl':'var(--shadow-2xl)',
        inner:'var(--shadow-inner)',
        'glow-gold': 'var(--glow-gold, 0 0 0 1px rgba(201,168,106,0.5), 0 10px 40px -10px rgba(201,168,106,0.45))',
        none: 'none',
      },

      // ── Transitions ───────────────────────────────────────────────────────
      transitionTimingFunction: {
        DEFAULT: 'var(--ease, cubic-bezier(0.22, 1, 0.36, 1))',
        ease:   'var(--ease, cubic-bezier(0.22, 1, 0.36, 1))',
        'in-out': 'var(--ease-in-out, cubic-bezier(0.65, 0, 0.35, 1))',
      },

      transitionDuration: {
        fast: 'var(--t-fast, 180ms)',
        med:  'var(--t-med,  400ms)',
        slow: 'var(--t-slow, 800ms)',
        DEFAULT: '400ms',
        75: '75ms',
        100: '100ms',
        150: '150ms',
        200: '200ms',
        300: '300ms',
        500: '500ms',
        700: '700ms',
        1000: '1000ms',
      },

      // ── Z-index ───────────────────────────────────────────────────────────
      zIndex: {
        0:    '0',
        10:   '10',
        20:   '20',
        30:   '30',
        40:   '40',
        50:   '50',
        auto: 'auto',
        dropdown: 'var(--z-index-dropdown, 100)',
        sticky:   'var(--z-index-sticky,   200)',
        header:   'var(--z-index-header,   900)',
        modal:    'var(--z-index-modal,    1100)',
        toast:    'var(--z-index-toast,    1200)',
      },

      // ── Background gradients ──────────────────────────────────────────────
      backgroundImage: {
        'gradient-button':  'var(--gradient-button)',
        'gradient-gold':    'var(--gradient-gold)',
        'gradient-ink':     'var(--gradient-ink)',
        'gradient-ivory':   'var(--gradient-ivory)',
        'gradient-shimmer': 'var(--gradient-shimmer)',
      },

      // ── Screen breakpoints ────────────────────────────────────────────────
      screens: {
        xs: '480px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1400px',
      },

      // ── Aspect ratios ─────────────────────────────────────────────────────
      aspectRatio: {
        '4/5':  '4 / 5',
        '3/4':  '3 / 4',
        '2/3':  '2 / 3',
        '16/9': '16 / 9',
        '1/1':  '1 / 1',
      },

      // ── Keyframe animations ───────────────────────────────────────────────
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-left': {
          from: { opacity: '0', transform: 'translateX(-32px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-in-right': {
          from: { opacity: '0', transform: 'translateX(32px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.92)' },
          to:   { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },

      animation: {
        'fade-in':       'fade-in 0.5s var(--ease, cubic-bezier(0.22,1,0.36,1)) both',
        'slide-up':      'slide-up 0.6s var(--ease, cubic-bezier(0.22,1,0.36,1)) both',
        'slide-in-left': 'slide-in-left 0.6s var(--ease, cubic-bezier(0.22,1,0.36,1)) both',
        'slide-in-right':'slide-in-right 0.6s var(--ease, cubic-bezier(0.22,1,0.36,1)) both',
        'scale-in':      'scale-in 0.5s var(--ease, cubic-bezier(0.22,1,0.36,1)) both',
        shimmer:         'shimmer 1.5s linear infinite',
      },

      // ── Min/max heights ───────────────────────────────────────────────────
      minHeight: {
        screen: '100vh',
        0: '0',
      },
      maxHeight: {
        screen: '100vh',
        820: '820px',
      },
      minWidth: {
        520: '520px',
      },
    },
  },

  plugins: [],
};
