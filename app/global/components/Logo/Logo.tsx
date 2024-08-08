import { Stack, Typography } from "@mui/material";

interface Props {
  size: "small" | "medium" | "large";
}

export default function Logo(props: Props) {
  return (
    <Stack direction="row" sx={{ cursor: "default" }}>
      <Typography
        variant={
          props.size === "small" ? "h5" : props.size === "medium" ? "h3" : "h1"
        }
        fontWeight="800"
        color="primary.main"
      >
        In
      </Typography>
      <Typography
        color="grey.600"
        variant={
          props.size === "small" ? "h5" : props.size === "medium" ? "h3" : "h1"
        }
        fontWeight="800"
      >
        AI
      </Typography>
    </Stack>
  );
}
