import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { store } from './store/store';
import AppRoutes from './routes/AppRoutes';
import { cssVariables } from './theme/theme';
// import { colors } from './theme/colors';
import { colors } from './theme/colors';
import { typography } from './theme/typography';
import './styles/index.css';

// Inject the design-system CSS custom properties into <head> once.
const styleEl = document.createElement('style');
styleEl.textContent = cssVariables;
document.head.appendChild(styleEl);

// Build an MUI theme that mirrors the design-system colour palette so MUI
// components (Button, Rating, Tooltip, etc.) use the same colours as the
// rest of the app.
const muiTheme = createTheme({
  palette: {
    primary: {
      main: colors.primary.main,
      light: colors.primary.light,
      dark: colors.primary.dark,
      contrastText: colors.primary.contrastText,
    },
    secondary: {
      main: colors.secondary.main,
      light: colors.secondary.light,
      dark: colors.secondary.dark,
      contrastText: colors.secondary.contrastText,
    },
    error: {
      main: colors.error.main,
    },
    success: {
      main: colors.success.main,
    },
    warning: {
      main: colors.warning.main,
    },
    info: {
      main: colors.info.main,
    },
    background: {
      default: colors.background.default,
      paper: colors.background.paper,
    },
    text: {
      primary: colors.text.primary,
      secondary: colors.text.secondary,
      disabled: colors.text.disabled,
    },
    divider: colors.divider,
  },
  typography: {
    fontFamily: typography.fontFamilies.primary,
    h1: { fontFamily: typography.fontFamilies.secondary },
    h2: { fontFamily: typography.fontFamilies.secondary },
    h3: { fontFamily: typography.fontFamilies.secondary },
    h4: { fontFamily: typography.fontFamilies.secondary },
    h5: { fontFamily: typography.fontFamilies.secondary },
    h6: { fontFamily: typography.fontFamilies.secondary },
  },
  breakpoints: {
    values: { xs: 0, sm: 640, md: 768, lg: 1024, xl: 1280 },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    // Remove the default MUI box-shadow / border-radius overrides so our own
    // Tailwind / CSS-variable styles always win.
    MuiCssBaseline: {
      styleOverrides: {
        // Let our own global stylesheet handle the body reset.
        body: { margin: 0, padding: 0 },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none' },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <AppRoutes />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1a1a2e',
              color: '#fff',
              borderRadius: '12px',
              padding: '16px',
            },
            success: {
              iconTheme: {
                primary: '#22c55e',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);