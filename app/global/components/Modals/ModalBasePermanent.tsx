import {
  Breakpoint,
  Dialog,
  DialogContentText,
  DialogTitle,
  Grow,
  SxProps,
  Theme,
} from '@mui/material';

type Props = {
  show: boolean;
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactElement;
  submitLabel?: string;
  sx?: SxProps<Theme>;
  maxWidth?: false | Breakpoint;
};

export default function ModalBasePermanent(props: Props) {
  return (
    <Grow in={props.show} timeout={350}>
      <div>
        <Dialog
          open={props.show}
          maxWidth={props.maxWidth}
          disableEscapeKeyDown
        >
          <DialogTitle>{props.title}</DialogTitle>
          {props.subtitle && (
            <>
              <DialogContentText>
                <small>{props.subtitle}</small>
              </DialogContentText>
              <br />
            </>
          )}
          {props.children}
        </Dialog>
      </div>
    </Grow>
  );
}
