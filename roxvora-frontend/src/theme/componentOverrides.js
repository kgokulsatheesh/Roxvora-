export const componentOverrides = {
  Button: {
    base: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      fontFamily: 'inherit',
      fontWeight: 600,
      fontSize: '0.875rem',
      lineHeight: 1.5,
      letterSpacing: '0.025em',
      textTransform: 'uppercase',
      borderRadius: '0.5rem',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 250ms ease',
      outline: 'none',
      position: 'relative',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      userSelect: 'none',
    },
    variants: {
      primary: {
        background: 'linear-gradient(135deg, #e94560 0%, #c73659 100%)',
        color: '#ffffff',
        boxShadow: '0 4px 14px 0 rgba(233, 69, 96, 0.4)',
        '&:hover': {
          background: 'linear-gradient(135deg, #c73659 0%, #a82d4e 100%)',
          boxShadow: '0 6px 20px 0 rgba(233, 69, 96, 0.5)',
          transform: 'translateY(-2px)',
        },
        '&:active': {
          transform: 'translateY(0)',
          boxShadow: '0 2px 8px 0 rgba(233, 69, 96, 0.4)',
        },
        '&:focus-visible': {
          boxShadow: '0 0 0 3px rgba(233, 69, 96, 0.4)',
        },
        '&:disabled': {
          background: '#a3a3a3',
          color: '#e5e5e5',
          boxShadow: 'none',
          cursor: 'not-allowed',
          transform: 'none',
        },
      },
      secondary: {
        background: 'transparent',
        color: '#1a1a2e',
        border: '2px solid #1a1a2e',
        '&:hover': {
          background: '#1a1a2e',
          color: '#ffffff',
          borderColor: '#1a1a2e',
        },
        '&:active': {
          background: '#0f0f1a',
        },
        '&:focus-visible': {
          boxShadow: '0 0 0 3px rgba(26, 26, 46, 0.4)',
        },
        '&:disabled': {
          borderColor: '#a3a3a3',
          color: '#a3a3a3',
          cursor: 'not-allowed',
        },
      },
      outline: {
        background: 'transparent',
        color: '#1a1a2e',
        border: '2px solid #e5e5e5',
        '&:hover': {
          background: '#f5f5f5',
          borderColor: '#d4d4d4',
        },
        '&:active': {
          background: '#e5e5e5',
        },
        '&:focus-visible': {
          boxShadow: '0 0 0 3px rgba(26, 26, 46, 0.2)',
        },
        '&:disabled': {
          borderColor: '#e5e5e5',
          color: '#a3a3a3',
          cursor: 'not-allowed',
        },
      },
      ghost: {
        background: 'transparent',
        color: '#1a1a2e',
        border: 'none',
        '&:hover': {
          background: 'rgba(26, 26, 46, 0.08)',
        },
        '&:active': {
          background: 'rgba(26, 26, 46, 0.12)',
        },
        '&:focus-visible': {
          boxShadow: '0 0 0 3px rgba(26, 26, 46, 0.2)',
        },
        '&:disabled': {
          color: '#a3a3a3',
          cursor: 'not-allowed',
        },
      },
      link: {
        background: 'transparent',
        color: '#e94560',
        border: 'none',
        padding: '0.25rem 0',
        '&:hover': {
          color: '#c73659',
          textDecoration: 'underline',
        },
        '&:active': {
          color: '#a82d4e',
        },
        '&:focus-visible': {
          boxShadow: '0 0 0 3px rgba(233, 69, 96, 0.4)',
        },
        '&:disabled': {
          color: '#a3a3a3',
          cursor: 'not-allowed',
        },
      },
      danger: {
        background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
        color: '#ffffff',
        boxShadow: '0 4px 14px 0 rgba(239, 68, 68, 0.4)',
        '&:hover': {
          background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
          boxShadow: '0 6px 20px 0 rgba(239, 68, 68, 0.5)',
          transform: 'translateY(-2px)',
        },
        '&:active': {
          transform: 'translateY(0)',
        },
        '&:focus-visible': {
          boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.4)',
        },
        '&:disabled': {
          background: '#a3a3a3',
          color: '#e5e5e5',
          boxShadow: 'none',
          cursor: 'not-allowed',
          transform: 'none',
        },
      },
      success: {
        background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
        color: '#ffffff',
        boxShadow: '0 4px 14px 0 rgba(34, 197, 94, 0.4)',
        '&:hover': {
          background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
          boxShadow: '0 6px 20px 0 rgba(34, 197, 94, 0.5)',
          transform: 'translateY(-2px)',
        },
        '&:active': {
          transform: 'translateY(0)',
        },
        '&:focus-visible': {
          boxShadow: '0 0 0 3px rgba(34, 197, 94, 0.4)',
        },
        '&:disabled': {
          background: '#a3a3a3',
          color: '#e5e5e5',
          boxShadow: 'none',
          cursor: 'not-allowed',
          transform: 'none',
        },
      },
    },
    sizes: {
      xs: {
        padding: '0.375rem 0.75rem',
        gap: '0.375rem',
        fontSize: '0.75rem',
        borderRadius: '0.375rem',
      },
      sm: {
        padding: '0.5rem 1rem',
        gap: '0.375rem',
        fontSize: '0.8125rem',
        borderRadius: '0.375rem',
      },
      md: {
        padding: '0.75rem 1.5rem',
        gap: '0.5rem',
        fontSize: '0.875rem',
        borderRadius: '0.5rem',
      },
      lg: {
        padding: '1rem 2rem',
        gap: '0.625rem',
        fontSize: '1rem',
        borderRadius: '0.75rem',
      },
      xl: {
        padding: '1.25rem 2.5rem',
        gap: '0.75rem',
        fontSize: '1.125rem',
        borderRadius: '0.75rem',
      },
      icon: {
        padding: '0.75rem',
        borderRadius: '0.5rem',
      },
      'icon-sm': {
        padding: '0.5rem',
        borderRadius: '0.375rem',
      },
      'icon-lg': {
        padding: '1rem',
        borderRadius: '0.75rem',
      },
    },
    fullWidth: {
      width: '100%',
    },
  },
  Input: {
    base: {
      width: '100%',
      fontFamily: 'inherit',
      fontSize: '1rem',
      lineHeight: 1.5,
      color: '#1a1a2e',
      backgroundColor: '#ffffff',
      border: '1px solid #e5e5e5',
      borderRadius: '0.5rem',
      padding: '0.75rem 1rem',
      transition: 'all 200ms ease',
      outline: 'none',
      '&::placeholder': {
        color: '#a3a3a3',
        opacity: 1,
      },
      '&:hover': {
        borderColor: '#d4d4d4',
      },
      '&:focus': {
        borderColor: '#e94560',
        boxShadow: '0 0 0 3px rgba(233, 69, 96, 0.15)',
      },
      '&:disabled': {
        backgroundColor: '#f5f5f5',
        color: '#737373',
        cursor: 'not-allowed',
        borderColor: '#e5e5e5',
      },
      '&[aria-invalid="true"]': {
        borderColor: '#ef4444',
        '&:focus': {
          boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.15)',
        },
      },
    },
    sizes: {
      sm: {
        padding: '0.5rem 0.875rem',
        fontSize: '0.875rem',
        borderRadius: '0.375rem',
      },
      md: {
        padding: '0.75rem 1rem',
        fontSize: '1rem',
        borderRadius: '0.5rem',
      },
      lg: {
        padding: '1rem 1.25rem',
        fontSize: '1.125rem',
        borderRadius: '0.5rem',
      },
    },
    label: {
      display: 'block',
      fontSize: '0.875rem',
      fontWeight: 500,
      color: '#1a1a2e',
      marginBottom: '0.5rem',
    },
    helperText: {
      fontSize: '0.75rem',
      color: '#737373',
      marginTop: '0.375rem',
    },
    errorText: {
      fontSize: '0.75rem',
      color: '#ef4444',
      marginTop: '0.375rem',
    },
  },
  Select: {
    base: {
      width: '100%',
      fontFamily: 'inherit',
      fontSize: '1rem',
      lineHeight: 1.5,
      color: '#1a1a2e',
      backgroundColor: '#ffffff',
      border: '1px solid #e5e5e5',
      borderRadius: '0.5rem',
      padding: '0.75rem 2.5rem 0.75rem 1rem',
      appearance: 'none',
      backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M5.5 8.5L10 13L14.5 8.5' stroke='%23525252' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right 0.75rem center',
      transition: 'all 200ms ease',
      outline: 'none',
      '&:hover': {
        borderColor: '#d4d4d4',
      },
      '&:focus': {
        borderColor: '#e94560',
        boxShadow: '0 0 0 3px rgba(233, 69, 96, 0.15)',
      },
      '&:disabled': {
        backgroundColor: '#f5f5f5',
        color: '#737373',
        cursor: 'not-allowed',
        borderColor: '#e5e5e5',
      },
    },
  },
  Card: {
    base: {
      backgroundColor: '#ffffff',
      borderRadius: '0.75rem',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e5e5',
      overflow: 'hidden',
      transition: 'all 300ms ease',
    },
    hover: {
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
      transform: 'translateY(-4px)',
      borderColor: '#d4d4d4',
    },
  },
  Modal: {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      zIndex: 1400,
      animation: 'fadeIn 200ms ease',
    },
    content: {
      backgroundColor: '#ffffff',
      borderRadius: '1rem',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      maxWidth: '32rem',
      width: '100%',
      maxHeight: '90vh',
      overflow: 'auto',
      animation: 'slideUp 300ms ease',
    },
    header: {
      padding: '1.5rem 1.5rem 1rem',
      borderBottom: '1px solid #e5e5e5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    body: {
      padding: '1.5rem',
    },
    footer: {
      padding: '1rem 1.5rem 1.5rem',
      borderTop: '1px solid #e5e5e5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: '0.75rem',
    },
    closeButton: {
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      padding: '0.25rem',
      borderRadius: '0.375rem',
      color: '#737373',
      transition: 'all 150ms ease',
      '&:hover': {
        backgroundColor: '#f5f5f5',
        color: '#1a1a2e',
      },
    },
  },
  Loader: {
    base: {
      display: 'inline-block',
      borderRadius: '50%',
      border: '2px solid #e5e5e5',
      borderTopColor: '#e94560',
      animation: 'spin 0.8s linear infinite',
    },
    sizes: {
      xs: { width: '12px', height: '12px', borderWidth: '1.5px' },
      sm: { width: '16px', height: '16px', borderWidth: '2px' },
      md: { width: '24px', height: '24px', borderWidth: '2px' },
      lg: { width: '32px', height: '32px', borderWidth: '3px' },
      xl: { width: '48px', height: '48px', borderWidth: '3px' },
    },
    colors: {
      primary: { borderTopColor: '#e94560' },
      secondary: { borderTopColor: '#1a1a2e' },
      white: { borderTopColor: '#ffffff', borderColor: 'rgba(255,255,255,0.3)' },
    },
  },
  Badge: {
    base: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '0.625rem',
      fontWeight: 600,
      lineHeight: 1,
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
      borderRadius: '9999px',
      padding: '0.125rem 0.5rem',
      whiteSpace: 'nowrap',
    },
    variants: {
      default: { backgroundColor: '#e5e5e5', color: '#525252' },
      primary: { backgroundColor: '#e94560', color: '#ffffff' },
      secondary: { backgroundColor: '#0f3460', color: '#ffffff' },
      success: { backgroundColor: '#22c55e', color: '#ffffff' },
      warning: { backgroundColor: '#f59e0b', color: '#1a1a2e' },
      error: { backgroundColor: '#ef4444', color: '#ffffff' },
      info: { backgroundColor: '#3b82f6', color: '#ffffff' },
      outline: { backgroundColor: 'transparent', border: '1px solid currentColor' },
    },
    sizes: {
      sm: { padding: '0.125rem 0.375rem', fontSize: '0.5625rem' },
      md: { padding: '0.125rem 0.5rem', fontSize: '0.625rem' },
      lg: { padding: '0.25rem 0.625rem', fontSize: '0.75rem' },
    },
  },
  Skeleton: {
    base: {
      background: 'linear-gradient(90deg, #f5f5f5 25%, #e5e5e5 50%, #f5f5f5 75%)',
      backgroundSize: '200% 100%',
      animation: 'shimmer 1.5s infinite',
      borderRadius: '0.375rem',
    },
    variants: {
      text: { height: '1rem', borderRadius: '0.25rem' },
      circular: { borderRadius: '50%' },
      rectangular: { borderRadius: '0.5rem' },
      rounded: { borderRadius: '0.75rem' },
    },
  },
  Tooltip: {
    base: {
      position: 'absolute',
      zIndex: 1600,
      padding: '0.5rem 0.75rem',
      fontSize: '0.75rem',
      fontWeight: 500,
      color: '#ffffff',
      backgroundColor: '#1a1a2e',
      borderRadius: '0.375rem',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
      whiteSpace: 'nowrap',
      pointerEvents: 'none',
    },
    arrow: {
      position: 'absolute',
      width: '8px',
      height: '8px',
      backgroundColor: '#1a1a2e',
      transform: 'rotate(45deg)',
    },
  },
  Dropdown: {
    menu: {
      position: 'absolute',
      top: '100%',
      left: 0,
      minWidth: '12rem',
      marginTop: '0.5rem',
      backgroundColor: '#ffffff',
      border: '1px solid #e5e5e5',
      borderRadius: '0.5rem',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
      zIndex: 1500,
    },
    item: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      width: '100%',
      padding: '0.625rem 1rem',
      fontSize: '0.875rem',
      color: '#1a1a2e',
      backgroundColor: 'transparent',
      border: 'none',
      textAlign: 'left',
      cursor: 'pointer',
      transition: 'background-color 150ms ease',
      '&:hover': {
        backgroundColor: '#f5f5f5',
      },
      '&:focus': {
        outline: 'none',
        backgroundColor: '#f5f5f5',
      },
    },
    divider: {
      height: '1px',
      backgroundColor: '#e5e5e5',
      margin: '0.375rem 0',
    },
  },
};

export const keyframes = {
  fadeIn: `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `,
  slideUp: `
    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `,
  slideDown: `
    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `,
  slideLeft: `
    @keyframes slideLeft {
      from {
        opacity: 0;
        transform: translateX(20px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
  `,
  slideRight: `
    @keyframes slideRight {
      from {
        opacity: 0;
        transform: translateX(-20px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
  `,
  spin: `
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `,
  shimmer: `
    @keyframes shimmer {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
  `,
  pulse: `
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
  `,
  bounce: `
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
  `,
  wiggle: `
    @keyframes wiggle {
      0%, 100% { transform: rotate(-3deg); }
      50% { transform: rotate(3deg); }
    }
  `,
  zoomIn: `
    @keyframes zoomIn {
      from {
        opacity: 0;
        transform: scale(0.95);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
  `,
};