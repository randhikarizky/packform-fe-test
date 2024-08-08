import { Grid, TextField } from "@mui/material";
import { FieldError, FieldErrors, UseFormRegister } from "react-hook-form";
import { RegisterFormData } from "../../../interface/auth.interface";

interface Props {
  register: UseFormRegister<RegisterFormData>;
  errors: FieldErrors<RegisterFormData>;
  loading: boolean;
}

export default function RegisterForm(props: Props) {
  return (
    <>
      <Grid item xs={6}>
        <TextField
          label="First Name"
          {...props.register("first_name")}
          error={!!props.errors.first_name}
          helperText={(props.errors.first_name as FieldError)?.message}
          fullWidth
          disabled={props.loading}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Last Name"
          {...props.register("last_name")}
          error={!!props.errors.last_name}
          helperText={(props.errors.last_name as FieldError)?.message}
          fullWidth
          disabled={props.loading}
        />
      </Grid>
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
      <Grid item xs={6}>
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
      <Grid item xs={6}>
        <TextField
          label="Password Confirmation"
          {...props.register("password_confirmation")}
          error={!!props.errors.password_confirmation}
          helperText={
            (props.errors.password_confirmation as FieldError)?.message
          }
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
