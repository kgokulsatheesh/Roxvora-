import { createTheme } from "@mui/material/styles";

const theme = createTheme({

  palette: {

    primary: {
      main: "#073f3a",
      contrastText: "#ffffff"
    },

    secondary: {
      main: "#d8a63c"
    },

    background: {
      default: "#f5f7f7",
      paper: "#ffffff"
    },

    text: {
      primary: "#172322",
      secondary: "#687573"
    },

    success: {
      main: "#1f8a65"
    },

    warning: {
      main: "#c58a20"
    },

    error: {
      main: "#c64b4b"
    }
  },

  typography: {

    fontFamily:
      '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',

    h4: {
      fontWeight: 800
    },

    h5: {
      fontWeight: 800
    },

    h6: {
      fontWeight: 700
    },

    button: {
      textTransform: "none",
      fontWeight: 700
    }
  },

  shape: {
    borderRadius: 14
  },

  components: {

    MuiButton: {
      defaultProps: {
        disableElevation: true
      }
    },

    MuiCard: {

      styleOverrides: {

        root: {
          border: "1px solid #e7eceb",

          boxShadow:
            "0 8px 28px rgba(10,45,42,.06)"
        }
      }
    },

    MuiTableCell: {

      styleOverrides: {

        head: {
          fontWeight: 800,
          color: "#52615f"
        }
      }
    }
  }
});

export default theme;