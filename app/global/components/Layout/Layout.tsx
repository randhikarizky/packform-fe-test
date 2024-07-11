import React from "react";
import { useResponsive } from "../../hooks/useResponsive";
import { Stack } from "@mui/material";

type Props = {
  children: React.ReactNode;
};

export default function Layout(props: Props) {
  const isDesktop = useResponsive("up", "md");

  return (
    <Stack
      component="main"
      direction="row"
      sx={{
        minHeight: "100dvh",
        position: "relative",
        justifyContent: "center",
        alignItems: isDesktop ? "unset" : "center",
        px: isDesktop ? 0 : "1rem",
        pt: isDesktop ? 0 : "5dvh",
        // pb: isDesktop ? 0 : "10dvh",
        "&:before": {
          width: 1,
          height: 1,
          zIndex: -1,
          content: "''",
          position: "absolute",
          backgroundSize: "cover",
          opacity: { xs: 0.24, md: 0 },
          filter: `blur(10px)`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundImage: "url(/assets/background/mesjid_agung.jpg)",
        },
      }}
    >
      {props.children}
    </Stack>
  );
}
