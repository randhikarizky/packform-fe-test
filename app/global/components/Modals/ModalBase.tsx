import { LoadingButton } from "@mui/lab";
import {
  Breakpoint,
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
  handleSubmit?: () => void;
  submitLabel?: string;
  cancelLabel?: string;
  isLoading?: boolean;
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactElement;
  sx?: SxProps<Theme>;
  maxWidth?: false | Breakpoint;
  padding?: "narrow" | "default";
};

export default function ModalBase(props: Props) {
  const theme = useTheme();

  return (
    <Grow in={props.show} timeout={350}>
      <div>
        <Dialog
          open={props.show}
          onClose={props.handleClose}
          maxWidth={props.maxWidth}
          fullWidth
          disableEscapeKeyDown
        >
          <DialogTitle
            sx={{ padding: props.padding === "narrow" ? "1rem" : "2rem" }}
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
          <DialogContent
            sx={{ padding: props.padding === "narrow" ? "1rem" : "2rem" }}
          >
            {props.children}
          </DialogContent>
          <DialogActions
            sx={{
              borderTop: `dashed 1px ${theme.palette.divider}`,
              padding: props.padding === "narrow" ? "1rem" : "2rem",
            }}
          >
            <Button
              type="button"
              variant="outlined"
              color="inherit"
              onClick={props.handleClose}
              disabled={props.isLoading}
            >
              {props.cancelLabel ? props.cancelLabel : "Tutup"}
            </Button>
            {props.handleSubmit !== undefined && (
              <LoadingButton
                type="button"
                variant="contained"
                loading={props.isLoading}
                onClick={props.handleSubmit}
              >
                {props.submitLabel ? props.submitLabel : "Simpan"}
              </LoadingButton>
            )}
          </DialogActions>
        </Dialog>
      </div>
    </Grow>
  );
}
