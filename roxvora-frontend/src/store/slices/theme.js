import { createTheme } from "@mui/material/styles";

const display = '"Bricolage Grotesque", "DM Sans", system-ui, sans-serif';

export const theme = createTheme({
  palette: {
    primary: { main: "#1976D2" },
    secondary: { main: "#10243E" },
    background: { default: "#F6F2EA", paper: "#FFFFFF" },
    text: { primary: "#10243E", secondary: "#5B6676" },
  },
  shape: { borderRadius: 16 },
  typography: {
    fontFamily: '"DM Sans", system-ui, sans-serif',
    h1: { fontFamily: display, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.05 },
    h2: { fontFamily: display, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1 },
    h3: { fontFamily: display, fontWeight: 700, letterSpacing: "-0.02em" },
    h4: { fontFamily: display, fontWeight: 700, letterSpacing: "-0.02em" },
    h5: { fontFamily: display, fontWeight: 700 },
    h6: { fontFamily: display, fontWeight: 700 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "@media (prefers-reduced-motion: reduce)": {
          "*": { transitionDuration: "0.01ms !important", animationDuration: "0.01ms !important" },
        },
      },
    },
    MuiButton: { styleOverrides: { root: { borderRadius: 999, paddingInline: 24 } } },
    MuiChip: { styleOverrides: { root: { fontWeight: 600 } } },
  },
});