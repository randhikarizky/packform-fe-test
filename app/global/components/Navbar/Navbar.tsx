// material
import { alpha, styled } from "@mui/material/styles";
import {
  Box,
  Stack,
  AppBar,
  Toolbar,
  IconButton,
  Icon,
  Typography,
  useTheme,
} from "@mui/material";
// components
//
import AccountPopover from "./peripherals/AccountPopover";
import { useResponsive } from "../../hooks/useResponsive";
import Iconify from "../Icon/iconify";
import { bgBlur } from "@/assets/theme/css";
import { User } from "../../interfaces/global.interface";
import Logo from "../Logo/Logo";

// ----------------------------------------------------------------------

const NAV_MOBILE_HEIGHT = 64;
const NAV_DESKTOP_HEIGHT = 80;
const NAV_DESKTOP_WIDTH = 280;

type Props = {
  open: () => void;
  account: User | null;
};

const Navbar = (props: Props) => {
  const theme = useTheme();
  const isDesktop = useResponsive("up", "lg");

  return (
    <AppBar
      sx={{
        height: NAV_MOBILE_HEIGHT,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(["height"], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(isDesktop && {
          width: `calc(100%)`,
          height: NAV_DESKTOP_HEIGHT,
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        <Stack
          sx={{ flexGrow: 1 }}
          direction={isDesktop ? "row" : "row-reverse"}
          justifyContent="space-between"
          alignItems="center"
        >
          <IconButton
            onClick={props.open}
            sx={{
              display: { lg: "none" },
            }}
          >
            <Iconify icon="eva:menu-2-fill" />
          </IconButton>
          <Box
            sx={{
              px: isDesktop ? "unset" : 2.5,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Logo size={isDesktop ? "medium" : "small"} />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <AccountPopover user={props.account} {...props} />
          </Box>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
