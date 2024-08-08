import { alpha } from "@mui/material/styles";

// ----------------------------------------------------------------------

export type ColorSchema =
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning"
  | "error";

declare module "@mui/material/styles/createPalette" {
  interface TypeBackground {
    neutral: string;
  }
  interface SimplePaletteColorOptions {
    lighter: string;
    darker: string;
  }
  interface PaletteColor {
    lighter: string;
    darker: string;
  }
}

// SETUP COLORS

export const grey = {
  0: "#FFFFFF",
  100: "#EBF3F9",
  200: "#D8E6F3",
  300: "#B7C9DC",
  400: "#92A4B9",
  500: "#64748B",
  600: "#495A77",
  700: "#324264",
  800: "#1F2D50",
  900: "#131E42",
};

export const primary = {
  lighter: "#F1D2FC",
  light: "#C577F0",
  main: "#7E22CE",
  dark: "#491194",
  darker: "#240662",
  contrastText: "#FFFFFF",
};

export const secondary = {
  lighter: "#CBFCF4",
  light: "#64F2F0",
  main: "#06B6D4",
  dark: "#036B98",
  darker: "#013765",
  contrastText: "#FFFFFF",
};

export const info = {
  lighter: "#DDDAFD",
  light: "#9790F7",
  main: "#4F46E5",
  dark: "#2923A4",
  darker: "#100D6D",
  contrastText: "#FFFFFF",
};

export const success = {
  lighter: "#D3FCD2",
  light: "#77ED8B",
  main: "#22C55E",
  dark: "#118D57",
  darker: "#065E49",
  contrastText: "#ffffff",
};

export const warning = {
  lighter: "#FEF9DB",
  light: "#FEEA94",
  main: "#FCD34D",
  dark: "#B58D26",
  darker: "#78550E",
  contrastText: grey[800],
};

export const error = {
  lighter: "#FEE0D8",
  light: "#FB8D8B",
  main: "#F43F5E",
  dark: "#AF1F53",
  darker: "#750C45",
  contrastText: "#FFFFFF",
};

export const common = {
  black: "#000000",
  white: "#FFFFFF",
};

export const action = {
  hover: alpha(grey[500], 0.08),
  selected: alpha(grey[500], 0.16),
  disabled: alpha(grey[500], 0.8),
  disabledBackground: alpha(grey[500], 0.24),
  focus: alpha(grey[500], 0.24),
  hoverOpacity: 0.08,
  disabledOpacity: 0.48,
};

const base = {
  primary,
  secondary,
  info,
  success,
  warning,
  error,
  grey,
  common,
  divider: alpha(grey[500], 0.2),
  action,
};

// ----------------------------------------------------------------------

export function palette(mode: "light" | "dark") {
  const light = {
    ...base,
    mode: "light",
    text: {
      primary: grey[800],
      secondary: grey[600],
      disabled: grey[500],
    },
    background: {
      paper: "#FFFFFF",
      default: "#FFFFFF",
      neutral: grey[200],
    },
    action: {
      ...base.action,
      active: grey[600],
    },
  };

  const dark = {
    ...base,
    mode: "dark",
    text: {
      primary: "#FFFFFF",
      secondary: grey[500],
      disabled: grey[600],
    },
    background: {
      paper: grey[800],
      default: grey[900],
      neutral: alpha(grey[500], 0.12),
    },
    action: {
      ...base.action,
      active: grey[500],
    },
  };

  return mode === "light" ? light : dark;
}
