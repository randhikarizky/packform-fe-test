import { Grid, TextField } from "@mui/material";
import { FieldError, FieldErrors, UseFormRegister } from "react-hook-form";
import { LoginFormData } from "../../../interface/auth.interface";

interface Props {
  register: UseFormRegister<LoginFormData>;
  errors: FieldErrors<LoginFormData>;
  loading: boolean;
}

export default function LoginForm(props: Props) {
  return (
    <>
      <Grid item xs={12}>
        <TextField
          label="Email"
          {...props.register("email")}
          error={!!props.errors.email}
          helperText={(props.errors.email as FieldError)?.message}
          fullWidth
          disabled={props.loading}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Password"
          {...props.register("password")}
          error={!!props.errors.password}
          helperText={(props.errors.password as FieldError)?.message}
          InputProps={{
            inputProps: {
              type: "password",
            },
          }}
          fullWidth
          disabled={props.loading}
        />
      </Grid>
    </>
  );
}
