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
  TextField,
  Autocomplete,
  Fade,
  LinearProgress,
} from "@mui/material";
import Iconify from "../Icon/iconify";
import { SelectOption } from "../../interfaces/select-option";
import {
  Control,
  Controller,
  FieldError,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import SelectField from "./SelectFieldComponent";
import { useState } from "react";

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
  isEdit: boolean;
  type: "text" | "select" | "textarea" | "autocomplete";
  options?: SelectOption[];
  register: UseFormRegister<any>;
  control: Control<any>;
  name: string;
  disabled?: boolean;
  errors: FieldErrors<any>;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
};

export default function TextInfoEditableComponent(props: Props) {
  const [isEdit, setIsEdit] = useState(props.isEdit ?? false);
  return (
    <Stack title={props.value}>
      <Typography variant="body2" align={props.align} color="text.secondary">
        {props.label}
      </Typography>
      <Stack
        direction="row"
        flexGrow={1}
        justifyContent="space-between"
        alignItems="center"
      >
        <Box sx={{ width: "90%" }}>
          {props.isLoading ? (
            <Skeleton width="100%" height="2rem" animation="wave" />
          ) : (
            <Stack direction="row">
              {isEdit === false ? (
                <>
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
                </>
              ) : props.type === "text" ? (
                <TextField
                  {...props.register(`${props.name}`)}
                  error={!!props.errors?.[props.name]}
                  helperText={
                    (props.errors?.[props.name] as FieldError)?.message
                  }
                  fullWidth
                />
              ) : props.type === "textarea" ? (
                <TextField
                  {...props.register(`${props.name}`)}
                  error={!!props.errors?.[props.name]}
                  helperText={
                    (props.errors?.[props.name] as FieldError)?.message
                  }
                  fullWidth
                  multiline
                />
              ) : props.type === "select" ? (
                props.options !== undefined &&
                props.label !== undefined && (
                  <SelectField
                    label=""
                    placeholder={props.label}
                    name={props.name}
                    options={props.options}
                    onChange={(e) =>
                      props.setValue(props.name, {
                        label: e.target.label,
                        value: e.target.value,
                      })
                    }
                  />
                )
              ) : props.type === "autocomplete" ? (
                props.options !== undefined &&
                props.label !== undefined && (
                  <>
                    <Controller
                      control={props.control}
                      name={props.name}
                      disabled={props.isLoading}
                      render={({ field }) => (
                        <Autocomplete
                          fullWidth
                          ref={field.ref}
                          options={props.options ?? []}
                          onChange={(_, value) => {
                            value === null
                              ? props.setValue("jenis", {
                                  label: "",
                                  value: "",
                                })
                              : props.setValue("jenis", value);
                          }}
                          value={props.watch()?.[props.name]}
                          disabled={props.isLoading}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              error={!!props.errors?.[props.name]}
                              disabled={props.isLoading}
                              helperText={
                                (props.errors?.[props.name] as FieldError)
                                  ?.message
                              }
                              fullWidth
                            />
                          )}
                        />
                      )}
                    />
                    <Fade in={props.isLoading}>
                      <div>
                        <LinearProgress sx={{ mt: 0.5 }} />
                      </div>
                    </Fade>
                  </>
                )
              ) : (
                <>
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
                </>
              )}
            </Stack>
          )}
        </Box>

        <IconButton
          size="small"
          color="info"
          onClick={() => setIsEdit(!isEdit)}
        >
          {isEdit ? (
            <Iconify width={22} icon="solar:check-square-line-duotone" />
          ) : (
            <Iconify width={22} icon="solar:pen-new-square-line-duotone" />
          )}
        </IconButton>
      </Stack>
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
