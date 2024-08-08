import { m } from "framer-motion";

import { alpha } from "@mui/material/styles";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  MenuItem,
  Popover,
  Stack,
  Typography,
  menuItemClasses,
} from "@mui/material";
import { varHover } from "@/assets/theme/animate";
import { useRouter } from "next/router";
import { useState } from "react";

import { LoadingButton } from "@mui/lab";

interface User {
  email?: string;
  name?: string;
}

const MENU_OPTIONS = [
  {
    label: "Dashboard",
    linkTo: "/dashboard",
  },
];

type Props = {
  user: User | null;
};

export default function AccountPopover(props: Props) {
  const router = useRouter();

  const [open, setOpen] = useState(null);
  const [ProfilePictURL, setProfilePictURL] = useState("");

  const handleOpen = (event: any) => {
    setOpen(event.currentTarget);
  };

  const handleClose = (path?: string) => {
    setOpen(null);
    if (path) {
      return router.push(path);
    }
  };

  const handleLogout = () => {};

  return (
    <>
      <IconButton
        component={m.button}
        whileTap="tap"
        whileHover="hover"
        variants={varHover(1.05)}
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) =>
            open
              ? `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`
              : alpha(theme.palette.grey[500], 0.08),
        }}
      >
        <Avatar
          src={ProfilePictURL ?? ""}
          alt="photoURL"
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          {/* {props.user?.nama} */}
        </Avatar>
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={() => handleClose()}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          paper: {
            sx: {
              overflow: "inherit",
              width: 200,
              p: 0,
              [`& .${menuItemClasses.root}`]: {
                "& svg": {
                  mr: 2,
                  flexShrink: 0,
                },
              },
            },
          },
        }}
      >
        {/* <Box sx={{ my: 1.5 }}> */}
        <Box sx={{ p: 2, pb: 1.5 }}>
          <Typography variant="subtitle2" title={props.user?.name} noWrap>
            {props.user?.name}
          </Typography>
          <Typography
            variant="body2"
            title={props.user?.email}
            sx={{ color: "text.secondary" }}
            noWrap
          >
            {props.user?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem
              key={option.label}
              onClick={() => handleClose(option.linkTo)}
            >
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem
          component={LoadingButton}
          onClick={handleLogout}
          sx={{ p: 2, fontWeight: "fontWeightBold", color: "error.main" }}
          loading={false}
          fullWidth
        >
          Logout
        </MenuItem>
        {/* </Box> */}
      </Popover>
    </>
  );
}
