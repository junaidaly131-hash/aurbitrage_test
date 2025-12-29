import { createTheme } from "@mui/material/styles";

const Theme = createTheme({
  palette: {
    primary: {
      main: "#212121",
      light: "#353535",
      contrastText: "#fff",
    },
    secondary: {
      main: "#AF8E4E",
      dark: "#745618",
      gold: "#DDA430",
      red: "#E75153",
      redLight: "#b35052ff",
    },
    info: {
      main: "#999999",
    },
    danger: {
      main: "#EA3A3D",
      light: "#D80027",
      dark: "#ff7c7c",
    },
    warning: {
      main: "#FF9800",
      light: "#57482c",
      dark: "#ffb97c",
    },
    success: {
      main: "#328d62",
      light: "#1BBF2B",
      dark: "#7cff89",
    },
    neutral: {
      main: "#666666",
      light: "#cccccc",
      dark: "#000000",
      100: "#212223",
    },
    background: {
      paper: "#191919",
      card: "#F4F4F4",
      info: "#DBE2F3",
      contrast: "#323337",
      default: "#000000",
      overlay: "#292929",
      gray: "#4E4E4E",
      grey: "#C0C0C0",
      grey1: "#696969",
      dark: "#101010",
      dark2: "#151515",
      dark3: "#353535",
      dark4: "#202020",
    },
  },
  typography: {
    fontSize: 14,
    fontFamily: '"Outfit", "Roboto", "Helvetica", "Arial", sans-serif',
    color: {
      primary: "#042439",
      secondary: "#3A5364",
      contrast: "white",
    },
    // Custom variant
    title: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "#DBA42D",
      fontFamily: "Outfit",
    },
    // Typography variants
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      lineHeight: 1.2,
      color: "#fff",
      fontFamily: "Outfit",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
      lineHeight: 1.3,
      color: "#fff",
      fontFamily: "Outfit",
    },
    h3: {
      fontSize: "18px",
      fontWeight: 400,
      lineHeight: 1.4,
      color: "#fff",
      fontFamily: "Outfit",
    },
    h4: {
      fontSize: "14px",
      fontWeight: 500,
      lineHeight: 1.4,
      color: "#fff",
      fontFamily: "Outfit",
    },
    h5: {
      fontSize: "12px",
      fontWeight: 500,
      lineHeight: 1.5,
      color: "#fff",
      fontFamily: "Outfit",
    },
    h6: {
      fontSize: "10px",
      fontWeight: 600,
      lineHeight: 1.5,
      color: "#fff",
      fontFamily: "Outfit",
    },
    subtitle1: {
      fontSize: "1rem",
      fontWeight: 500,
      lineHeight: 1.75,
      color: "#cccccc",
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: 500,
      lineHeight: 1.57,
      color: "#999999",
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: 1.5,
      color: "#fff",
    },
    body2: {
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: 1.43,
      color: "#6C6C6C",
    },
    button: {
      fontSize: "0.875rem",
      fontWeight: 600,
      lineHeight: 1.75,
      textTransform: "uppercase",
      letterSpacing: "0.02857em",
    },
    caption: {
      fontSize: "0.75rem",
      fontWeight: 400,
      lineHeight: 1.66,
      color: "#999999",
    },
    overline: {
      fontSize: "0.75rem",
      fontWeight: 600,
      lineHeight: 2.66,
      textTransform: "uppercase",
      letterSpacing: "0.08333em",
      color: "#999999",
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#fff",
        },
        gutterBottom: {
          marginBottom: "0.75em",
        },
      },
      defaultProps: {
        variantMapping: {
          h1: "h1",
          h2: "h2",
          h3: "h3",
          h4: "h4",
          h5: "h5",
          h6: "h6",
          subtitle1: "h6",
          subtitle2: "h6",
          body1: "p",
          body2: "p",
          title: "h2", // Custom variant mapping
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInput-root": {
            backgroundColor: "#191919",
            color: "#fff",
            padding: "8px 12px",
            borderRadius: "4px",
            border: "1px solid #191919",
            "&:hover": {
              borderColor: "#191919",
            },
            "&.Mui-focused": {
              borderColor: "#191919",
            },
            "&:before, &:after": {
              display: "none",
            },
          },
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#191919",
            color: "#fff",
            "& fieldset": {
              borderColor: "#666666",
            },
            "&:hover fieldset": {
              borderColor: "#191919",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#191919",
            },
          },
          "& .MuiFilledInput-root": {
            backgroundColor: "#191919",
            color: "#fff",
            border: "1px solid #666666",
            borderRadius: "4px",
            "&:hover": {
              backgroundColor: "#191919",
              borderColor: "#191919",
            },
            "&.Mui-focused": {
              backgroundColor: "#191919",
              borderColor: "#191919",
            },
            "&:before, &:after": {
              display: "none",
            },
          },
          "& .MuiInputLabel-root": {
            color: "#999999",
            "&.Mui-focused": {
              color: "#191919",
            },
            "&.MuiInputLabel-shrink": {
              color: "#999999",
            },
          },
          "& .MuiInput-input, & .MuiOutlinedInput-input, & .MuiFilledInput-input":
            {
              color: "#fff",
            },
          "& .MuiInput-input::placeholder, & .MuiOutlinedInput-input::placeholder, & .MuiFilledInput-input::placeholder":
            {
              color: "#999999",
              opacity: 1,
            },
        },
      },
    },
    MuiDateCalendar: {
      styleOverrides: {
        root: {
          backgroundColor: "#191919",
          color: "#fff",
          "& .MuiPickersDay-root": {
            color: "#fff",
            "&.Mui-selected": {
              backgroundColor: "#DBA42D",
              color: "#000",
            },
          },
          "& .MuiDayCalendar-weekDayLabel": {
            color: "#fff",
          },
          "& .MuiPickersCalendarHeader-label": {
            color: "#fff",
          },
          "& .MuiPickersCalendarHeader-switchViewButton": {
            color: "#fff",
          },
          "& .MuiPickersDay-today": {
            border: "1px solid #DBA42D",
          },
        },
      },
    },
    MuiPickersPopper: {
      styleOverrides: {
        paper: {
          backgroundColor: "#191919",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: "Outfit",
          fontWeight: 500,
          borderRadius: "6px",
          textTransform: "none",
          padding: "8px 16px",
          fontSize: "14px",
          transition: "all 0.2s ease-in-out",
          height: "36px",
        },
      },
      variants: [
        // Outlined variant for default buttons (no color specified)
        {
          props: { variant: "outlined" },
          style: {
            backgroundColor: "transparent",
            border: "1px solid #C0C0C0",
            color: "#C0C0C0",
            "&:hover": {
              backgroundColor: "rgba(192, 192, 192, 0.08)",
              border: "1px solid #C0C0C0",
              transform: "translateY(-1px)",
            },
            "&:active": {
              transform: "translateY(0)",
            },
            "&.Mui-disabled": {
              border: "1px solid rgba(192, 192, 192, 0.3)",
              color: "rgba(192, 192, 192, 0.3)",
            },
          },
        },
        // Outlined variant for primary color
        {
          props: { variant: "outlined", color: "default" },
          style: {
            backgroundColor: "transparent",
            border: "1px solid #C0C0C0",
            color: "#C0C0C0",
            "&:hover": {
              backgroundColor: "rgba(192, 192, 192, 0.08)",
              border: "1px solid #C0C0C0",
              transform: "translateY(-1px)",
            },
            "&:active": {
              transform: "translateY(0)",
            },
            "&.Mui-disabled": {
              border: "1px solid rgba(192, 192, 192, 0.3)",
              color: "rgba(192, 192, 192, 0.3)",
            },
          },
        },
        {
          props: { variant: "contained", color: "default" },
          style: {
            backgroundColor: "#292929",
            border: "1px solid #292929",
            color: "#ffffff",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "#353535",
              border: "1px solid #353535",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
              transform: "translateY(-1px)",
            },
            "&:active": {
              transform: "translateY(0)",
              boxShadow: "none",
            },
            "&.Mui-disabled": {
              backgroundColor: "rgba(41, 41, 41, 0.5)",
              border: "1px solid rgba(41, 41, 41, 0.5)",
              color: "rgba(255, 255, 255, 0.3)",
            },
          },
        },
        // Contained variant for primary color
        {
          props: { variant: "contained", color: "primary" },
          style: {
            backgroundColor: "#292929",
            border: "1px solid #292929",
            color: "#ffffff",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "#353535",
              border: "1px solid #353535",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
              transform: "translateY(-1px)",
            },
            "&:active": {
              transform: "translateY(0)",
              boxShadow: "none",
            },
            "&.Mui-disabled": {
              backgroundColor: "rgba(41, 41, 41, 0.5)",
              border: "1px solid rgba(41, 41, 41, 0.5)",
              color: "rgba(255, 255, 255, 0.3)",
            },
          },
        },
      ],
    },
  },
});

export default Theme;
