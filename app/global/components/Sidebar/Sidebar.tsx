import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useResponsive } from "../../hooks/useResponsive";
import {
  Avatar,
  Box,
  Drawer,
  Link,
  Stack,
  Typography,
  alpha,
  styled,
} from "@mui/material";
import Scrollbar from "../Scrollbar/Scrollbar";
import SidebarMenu from "./peripherals/Menu/SidebarMenu";
import { menu } from "../../data/constants/menu.constant";

const NAV_DESKTOP_WIDTH = 280;

interface User {
  email?: string;
  name?: string;
}

type Props = {
  show: boolean;
  handleClose: () => void;
  account: User | null;
};

const AccountContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.primary.light, 0.12),
}));

const Sidebar = (props: Props) => {
  const router = useRouter();
  const isDesktop = useResponsive("up", "lg");

  const [ProfilePictURL, setProfilePictURL] = useState("");

  // const Me = useGetMe(props.account?.id ?? 0);

  // useEffect(() => {
  //   if (Me.data) {
  //     const { data } = Me;

  //     if (data.profile_picture_url !== null) {
  //       setProfilePictURL(
  //         `${process.env.NEXT_PUBLIC_IMG}${data.profile_picture_url}`
  //       );
  //     }
  //   }
  // }, [Me.data, Me.isSuccess]);

  useEffect(() => {
    if (props.show) {
      props.handleClose();
    }
  }, [router.pathname]);

  const Content = (
    <Scrollbar
      sx={{
        height: 1,
        pt: 2.5,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box sx={{ mb: 5, mx: 2.5 }}>
        <AccountContainer>
          <Avatar src={ProfilePictURL ?? ""} color="primary" alt="photoURL" />

          <Box sx={{ pl: 2, pr: 4, width: "100%" }}>
            <Typography
              variant="subtitle2"
              title={props.account?.name}
              sx={{ color: "text.primary" }}
            >
              {props.account?.name}
            </Typography>

            <Typography
              variant="body2"
              sx={{ color: "text.secondary" }}
              title={props.account?.email}
              noWrap
            >
              {props.account?.email}
            </Typography>
          </Box>
        </AccountContainer>
      </Box>

      <Stack
        component="nav"
        sx={{
          mx: 2.5,
        }}
      >
        <SidebarMenu menu={menu} />
      </Stack>
    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_DESKTOP_WIDTH },
      }}
    >
      {isDesktop ? (
        <Stack
          sx={{
            height: 1,
            width: NAV_DESKTOP_WIDTH,
            position: "fixed",
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
            borderTop: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {Content}
        </Stack>
      ) : (
        <Drawer
          open={props.show}
          onClose={props.handleClose}
          PaperProps={{
            sx: { width: NAV_DESKTOP_WIDTH },
          }}
        >
          {Content}
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
