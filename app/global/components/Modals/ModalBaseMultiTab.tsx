import { LoadingButton } from "@mui/lab";
import {
  Box,
  Breakpoint,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grow,
  SxProps,
  Tab,
  Tabs,
  Theme,
  useTheme,
} from "@mui/material";
import { useState } from "react";

type Props = {
  show: boolean;
  handleClose: () => void;
  handleSubmit?: () => void;
  activeTab: number;
  onChangeTab: (tab: number) => void;
  tabs:
    | {
        id?: string;
        route: number;
        label: string;
      }[]
    | [];
  isLoading?: boolean;
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactElement;
  sx?: SxProps<Theme>;
  maxWidth?: false | Breakpoint;
  fullWidth?: boolean | false;
};

export default function ModalBaseMultiTab(props: Props) {
  const theme = useTheme();

  return (
    <Grow in={props.show} timeout={350}>
      <div>
        <Dialog
          open={props.show}
          onClose={props.handleClose}
          maxWidth={props.maxWidth}
          fullWidth={props.fullWidth}
          disableEscapeKeyDown
        >
          <DialogTitle
            sx={{
              padding: "2rem",
              paddingBottom: "1rem",
              borderBottom: `dashed 1px ${theme.palette.divider}`,
            }}
          >
            {props.title}
            {props.subtitle && (
              <>
                <DialogContentText>
                  <small>{props.subtitle}</small>
                </DialogContentText>
              </>
            )}
          </DialogTitle>
          <DialogContent sx={{ padding: "2rem", marginTop: "1rem" }}>
            <Box>
              <Tabs
                value={props.activeTab}
                variant="scrollable"
                scrollButtons="auto"
              >
                {props.tabs.map((t) => (
                  <Tab
                    label={t.label}
                    onClick={() =>
                      props.onChangeTab(t.route as typeof props.activeTab)
                    }
                  />
                ))}
              </Tabs>
            </Box>
            {props.children}
          </DialogContent>
          <DialogActions
            sx={{
              borderTop: `dashed 1px ${theme.palette.divider}`,
              padding: "2rem",
            }}
          >
            <Button
              type="button"
              variant="outlined"
              color="secondary"
              disabled={props.isLoading}
              onClick={props.handleClose}
            >
              Tutup
            </Button>
            {props.handleSubmit !== undefined && (
              <LoadingButton
                type="button"
                variant="contained"
                loading={props.isLoading}
                onClick={props.handleSubmit}
              >
                Simpan
              </LoadingButton>
            )}
          </DialogActions>
        </Dialog>
      </div>
    </Grow>
  );
}
