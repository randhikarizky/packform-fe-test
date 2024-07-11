import { copy } from "@/app/global/helper/global.helper";
import {
  Box,
  Skeleton,
  SxProps,
  Typography,
  Theme,
  Stack,
  Link,
  IconButton,
  SvgIcon,
} from "@mui/material";
import Iconify from "../../Icon/iconify";

type Props = {
  label?: string;
  value?: string | any;
  helper?: string | null | any;
  className?: string;
  noLabel?: boolean;
  isLoading?: boolean;
  align?: "center" | "left" | "right" | "inherit" | "justify" | undefined;
  onClick?: () => void;
  sx?: SxProps<Theme>;
  trim?: boolean;
  paragraph?: boolean;
  link?: boolean;
  copy?: boolean;
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "subtitle1"
    | "subtitle2"
    | "body1"
    | "body2"
    | "caption";
};

export default function TextInfoComponent(props: Props) {
  return (
    <Stack title={props.value}>
      <Typography variant="body2" align={props.align} color="text.secondary">
        {props.label}
      </Typography>
      {props.isLoading ? (
        <Skeleton width="100%" height="2rem" animation="wave" />
      ) : (
        <Stack direction="row" gap={0.5}>
          <Typography
            variant={props.variant ?? "subtitle1"}
            align={props.align}
            color="text.primary"
            sx={props.sx}
            noWrap={props.trim}
            paragraph={props.paragraph}
          >
            {props.link ? (
              <Link href={props.value} target="_blank">
                Buka
              </Link>
            ) : (
              props.value
            )}
          </Typography>
          {props.copy && (
            <IconButton
              size="small"
              onClick={() => {
                copy(props.label ?? "", props.value?.toString() ?? "");
              }}
            >
              <Iconify width={16} icon="solar:copy-bold" />
            </IconButton>
          )}
        </Stack>
      )}
      {props.helper && (
        <Typography
          variant="caption"
          align={props.align}
          color="text.secondary"
        >
          {props.helper}
        </Typography>
      )}
    </Stack>
  );
}
