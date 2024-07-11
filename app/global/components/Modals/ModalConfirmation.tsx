import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grow,
  SxProps,
  Theme,
  useTheme,
} from "@mui/material";

type Props = {
  show: boolean;
  handleClose: () => void;
  handleSubmit: () => void;
  submitLabel?: string;
  cancelLabel?: string;
  isLoading: boolean;
  title: string;
  subtitle?: string;
  children: React.ReactElement;
  sx?: SxProps<Theme>;
};

export default function ModalConfirmation(props: Props) {
  const theme = useTheme();

  return (
    <Grow in={props.show} timeout={350}>
      <div>
        <Dialog
          open={props.show}
          onClose={props.handleClose}
          maxWidth="xs"
          fullWidth
          disableEscapeKeyDown
          sx={props.sx}
        >
          <DialogTitle sx={{ padding: "2rem" }}>
            {props.title}
            {props.subtitle && (
              <>
                <DialogContentText>
                  <small>{props.subtitle}</small>
                </DialogContentText>
              </>
            )}
          </DialogTitle>
          <DialogContent sx={{ padding: "2rem" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {props.children}
            </Box>
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
              color="inherit"
              onClick={props.handleClose}
            >
              {props.cancelLabel ? props.cancelLabel : "Tidak"}
            </Button>
            <LoadingButton
              type="button"
              variant="contained"
              loading={props.isLoading}
              onClick={props.handleSubmit}
            >
              {props.submitLabel ? props.submitLabel : "Ya"}
            </LoadingButton>
          </DialogActions>
        </Dialog>
      </div>
    </Grow>
  );
}
