"use client";

import React from "react";
import { useResponsive } from "../../hooks/useResponsive";
import { Stack } from "@mui/material";

type Props = {
  children: React.ReactNode;
};

export default function LayoutAuth(props: Props) {
  const isDesktop = useResponsive("up", "md");

  return (
    <Stack
      component="main"
      direction="row"
      sx={{
        minHeight: "100dvh",
        display: "flex",
        px: isDesktop ? 0 : "1rem",
        py: isDesktop ? 0 : "5dvh",
        justifyContent: "center",
        alignItems: "center",
        "&:before": {
          width: 1,
          height: 1,
          zIndex: -1,
          content: "''",
          position: "absolute",
          backgroundSize: "cover",
          opacity: 0.5,
          backgroundColor: "primary.main",
        },
      }}
    >
      {props.children}
    </Stack>
  );
}
