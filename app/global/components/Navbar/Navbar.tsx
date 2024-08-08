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
        <Box
          sx={{
            px: 2.5,
            width: NAV_DESKTOP_WIDTH,
          }}
        >
          <Typography variant="h6">GURILAP Admin</Typography>
        </Box>

        <IconButton
          onClick={props.open}
          sx={{
            display: { lg: "none" },
          }}
        >
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
        {/* <Searchbar /> */}
        <Box sx={{ flexGrow: 1 }} />

        <Stack
          flexGrow={1}
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          spacing={{ xs: 0.5, sm: 1 }}
        >
          {/* <NotificationsPopover /> */}
          <AccountPopover user={props.account} {...props} />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
