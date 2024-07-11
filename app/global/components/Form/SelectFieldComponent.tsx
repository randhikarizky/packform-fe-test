import { ChangeEvent, ReactNode } from "react";
import { SelectOption } from "@/app/global/interfaces/select-option";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { FieldErrors, UseFormSetValue } from "react-hook-form";

type Props = {
  label: string;
  name: string;
  placeholder: string;
  size?: "small" | "medium";
  error?: boolean | any;
  helperText?: ReactNode;
  defaultValue?: string;
  fullWidth?: boolean;
  options: SelectOption[] | [];
  setValue?: UseFormSetValue<any>;
  onChange?: (e: any) => void;
};

const SelectField = (props: Props) => {
  return (
    <TextField
      select
      size={props.size ?? "medium"}
      label={props.label}
      error={!!props.error}
      helperText={props.helperText ?? ""}
      defaultValue={props.defaultValue ? props.defaultValue : ""}
      placeholder={props.placeholder}
      fullWidth={props.fullWidth ?? false}
      onChange={(e) => props.onChange !== undefined && props.onChange(e)}
    >
      <MenuItem value="''">Pilih {props.label}</MenuItem>
      {props.options.length > 0 &&
        props.options?.map((d, i) => (
          <MenuItem
            key={i}
            value={Number(d.value)}
            onClick={() =>
              props.setValue !== undefined &&
              props.setValue(props.name, {
                label: d.label,
                value: d.value,
                data: d.data,
              })
            }
          >
            {d.label}
          </MenuItem>
        ))}
    </TextField>
  );
};

export default SelectField;
