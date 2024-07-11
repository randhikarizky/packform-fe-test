"use client";

import { useMemo } from "react";
import merge from "lodash/merge";

import CssBaseline from "@mui/material/CssBaseline";
import {
  createTheme,
  ThemeOptions,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";

// system
import { palette } from "./palette";
import { shadows } from "./shadows";
import { typography } from "./typography";
// options
import RTL from "./options/right-to-left";
import { customShadows } from "./custom-shadows";
import { componentsOverrides } from "./overrides";
import { createContrast } from "./options/contrast";
import NextAppDirEmotionCacheProvider from "./next-emotion-cache";
import { useSettingsContext } from "./settings";
import Snackbar from "@/app/global/components/Snackbar/Snackbar";

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function ThemeConfig({ children }: Props) {
  const settings = useSettingsContext();

  const contrast = createContrast(settings.themeContrast, "light");

  const memoizedValue = useMemo(
    () => ({
      palette: {
        ...palette("light"),
        ...contrast.palette,
      },
      customShadows: {
        ...customShadows("light"),
      },
      direction: settings.themeDirection,
      shadows: shadows("light"),
      shape: { borderRadius: 8 },
      typography,
    }),
    [, settings.themeDirection, contrast.palette]
  );

  const theme = createTheme(memoizedValue as ThemeOptions);

  theme.components = merge(componentsOverrides(theme), contrast.components);

  return (
    <NextAppDirEmotionCacheProvider options={{ key: "css" }}>
      <MuiThemeProvider theme={theme}>
        <RTL themeDirection={settings.themeDirection}>
          <Snackbar>
            <CssBaseline />
            {children}
          </Snackbar>
        </RTL>
      </MuiThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
