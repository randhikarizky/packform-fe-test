"use client";

import React, { useEffect, useState } from "react";
import { useResponsive } from "../../hooks/useResponsive";
import { Box, BoxProps, Typography } from "@mui/material";
import Sidebar from "../Sidebar/Sidebar";
import Cookies from "universal-cookie";
import Navbar from "../Navbar/Navbar";
import usePermission from "../../hooks/usePermission";

const NAV_MOBILE_HEIGHT = 64;
const NAV_DESKTOP_HEIGHT = 80;
const NAV_DESKTOP_WIDTH = 280;
const SPACING = 8;

const kastangel = new Cookies();

interface User {
  email?: string;
  name?: string;
}

export default function Layout({ children, sx, ...other }: BoxProps) {
  const isDesktop = useResponsive("up", "md");
  const { can } = usePermission();

  const [open, setOpen] = useState(false);
  const [account, setAccount] = useState<User | null>(null);

  useEffect(() => {
    const user = kastangel.get("user");
    if (user) {
      const parsed: User = user;

      if (parsed) {
        const obj = {
          email: parsed.email,
          name: parsed.name,
        };

        return setAccount(obj);
      }
    }
  }, []);

  return (
    <>
      <Navbar open={() => setOpen(true)} account={account} />

      <Box
        sx={{
          mt: "80px",
          minHeight: 1,
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
        }}
      >
        <Sidebar
          show={open}
          handleClose={() => setOpen(false)}
          account={account}
        />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            minHeight: 1,
            display: "flex",
            flexDirection: "column",
            py: `${SPACING + 12}px`,
            ...(isDesktop && {
              px: 2,
              // py: `${NAV_DESKTOP_HEIGHT + SPACING}px`,
              width: `calc(100% - ${NAV_DESKTOP_WIDTH}px)`,
              minHeight: `100dvh`,
            }),
            ...sx,
          }}
          {...other}
        >
          {children}

          <Box
            sx={{
              // display: "flex",
              position: "absolute",
              right: 0,
              bottom: 0,
            }}
          ></Box>
        </Box>
      </Box>
    </>
  );
}
