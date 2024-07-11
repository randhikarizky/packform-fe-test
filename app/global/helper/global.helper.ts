import { enqueueSnackbar } from "notistack";

export const copy = (name: string, value: string) => {
  navigator.clipboard.writeText(value);

  return enqueueSnackbar(name ? `Copied ${name}!` : "Copied!", {
    variant: "success",
  });
};
