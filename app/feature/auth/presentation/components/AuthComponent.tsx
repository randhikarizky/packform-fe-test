import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldError, useForm } from "react-hook-form";
import { useSnackbar } from "notistack";

import { useResponsive } from "@/app/global/hooks/useResponsive";
import { useEffect, useState } from "react";
import { Alert, Box, Card, Grid, Stack, Typography } from "@mui/material";
import Logo from "@/app/global/components/Logo/Logo";
import LoginForm from "./peripherals/form/LoginForm";
import { LoadingButton } from "@mui/lab";
import Iconify from "@/app/global/components/Icon/iconify";
import { encryptStorage } from "@/app/global/utility/storage";
import RegisterForm from "./peripherals/form/RegisterForm";
import { LoginFormData, RegisterFormData } from "../interface/auth.interface";
import { LoginRequest, RegisterRequest } from "../../data/request/auth.request";
import { useLogin, useRegister } from "../controller/auth.controller";

const AuthComponent = () => {
  const [dummyUser, setDummyUser] = useState<{
    email: string;
    password: string;
  } | null>(null);

  const [LoginMode, setLoginMode] = useState(true);

  const [errorMessage, setErrorMessage] = useState("");

  const Login = useLogin();
  const Register = useRegister();

  const loginSchema = Yup.object({
    email: Yup.string()
      .required("Email is required.")
      .email("Email should be valid format.")
      .matches(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Email only allowed to contain certain special characters such as period (.), dash (-), and underscore (_)"
      ),
    password: Yup.string().required("Password is required."),
  });

  const registerSchema = Yup.object({
    first_name: Yup.string().required("First Name is required."),
    last_name: Yup.string().required("Last Name is required."),
    email: Yup.string()
      .required("Email is required.")
      .email("Email should be valid format.")
      .matches(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Email only allowed to contain certain special characters such as period (.), dash (-), and underscore (_)"
      ),
    password: Yup.string()
      .required("Password is required.")
      .min(8, "Minimum 8 characters")
      .matches(/^(?=.*[a-z])/, "Password need at least 1 lowercase.")
      .matches(/^(?=.*[A-Z])/, "Password need at least 1 uppercase.")
      .matches(/^(?=.*[0-9])/, "Password need at least 1 number.")
      .matches(
        /^(?=.*[!@#\$%\^&\*])/,
        "Password need at least 1 special character."
      ),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Password isn't same.")
      .required("Password Confirmation is required."),
  });

  const {
    register: loginForm,
    handleSubmit: loginSubmit,
    reset: loginReset,
    formState: { errors: loginError },
  } = useForm<LoginFormData>({
    mode: "onChange",
    resolver: yupResolver(loginSchema),
  });

  const {
    register: registerForm,
    handleSubmit: registerSubmit,
    reset: registerReset,
    formState: { errors: registerError },
  } = useForm<RegisterFormData>({
    mode: "onChange",
    resolver: yupResolver(registerSchema),
  });

  useEffect(() => {
    const dummyUser = encryptStorage.getItem("dummyUser");

    if (dummyUser !== null) {
      const parsed = JSON.parse(dummyUser);

      setDummyUser(parsed);
    }
  }, []);

  const onLogin = loginSubmit((data: LoginFormData) => {
    const payload: LoginRequest = {
      email: data.email,
      password: data.password,
    };

    return Login.mutate(payload, {
      onSuccess: () => {
        loginReset({
          email: "",
          password: "",
        });

        setErrorMessage("");
      },
      onError: (error) => {
        loginReset({
          password: "",
        });

        setErrorMessage(error.message);
      },
    });
  });

  const onRegister = registerSubmit((data: RegisterFormData) => {
    const payload: RegisterRequest = {
      name: `${data.first_name} ${data.last_name}`,
      email: data.email,
      password: data.password,
    };

    return Register.mutate(payload, {
      onSuccess: () => {
        registerReset({
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          password_confirmation: "",
        });

        setErrorMessage("");
      },
      onError: (error) => setErrorMessage(error.message),
    });
  });

  return (
    <>
      <Card
        sx={{
          width: 1,
          mx: "auto",
          maxWidth: 480,
          px: { xs: 2, md: 3 },
          pb: 5,
        }}
      >
        <Stack direction="column">
          <Box
            sx={{
              mt: { md: 8, xs: 5 },
              mb: { md: 3 },
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Logo size="medium" />
          </Box>

          <Box
            sx={{
              py: { xs: 5, md: 0 },
              px: { xs: 3, md: 0 },
            }}
          >
            <Stack sx={{ mb: { md: 5, xs: 0 }, position: "relative" }}>
              <Typography variant="h3" align="center">
                {LoginMode ? "Welcome Back" : "Welcome"}
              </Typography>
            </Stack>
          </Box>

          <Grid container>
            {LoginMode && (
              <Grid item xs={12} mb={3}>
                <Alert variant="outlined" severity="info" closeText="Tutup">
                  <Typography variant="body2" mb={1}>
                    For demo purposes you can use the account below, or you can
                    register your own.
                  </Typography>
                  <Box>
                    <Typography variant="body2" fontWeight={700}>
                      Email: {dummyUser?.email ?? "-"}
                    </Typography>
                    <Typography variant="body2" fontWeight={700}>
                      Password: {dummyUser?.password ?? "-"}
                    </Typography>
                  </Box>
                </Alert>
              </Grid>
            )}
            {errorMessage !== "" && (
              <Grid item xs={12} mb={2}>
                <Alert
                  variant="filled"
                  severity="error"
                  onClose={() => setErrorMessage("")}
                  closeText="Tutup"
                  sx={{
                    fontSize: errorMessage.length >= 130 ? ".80rem" : ".90rem",
                  }}
                >
                  {errorMessage}
                </Alert>
              </Grid>
            )}
            <Grid item xs={12}>
              <form
                onSubmit={LoginMode ? onLogin : onRegister}
                autoComplete="off"
                noValidate
                className="form"
              >
                <Grid container spacing={1.5}>
                  {LoginMode ? (
                    <LoginForm
                      register={loginForm}
                      errors={loginError}
                      loading={Login.isPending}
                    />
                  ) : (
                    <RegisterForm
                      register={registerForm}
                      errors={registerError}
                      loading={Register.isPending}
                    />
                  )}
                  <Grid item xs={12}>
                    <LoadingButton
                      fullWidth
                      size="large"
                      variant="contained"
                      type="submit"
                      loading={LoginMode ? Login.isPending : Register.isPending}
                      endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
                      sx={{
                        justifyContent: "space-between",
                        pl: 2,
                        pr: 1.5,
                        mt: 5,
                      }}
                    >
                      {LoginMode ? "Sign In" : "Sign Up"}
                    </LoadingButton>
                  </Grid>
                </Grid>
              </form>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                mb: { md: 8, xs: 5 },
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
                <Typography variant="caption" mr={0.5}>
                  {LoginMode ? "New to InAI?" : "Already have an account?"}
                </Typography>
                <Typography
                  variant="caption"
                  color="primary.main"
                  sx={{
                    cursor: "pointer",
                    "&:hover": { textDecoration: "underline" },
                  }}
                  onClick={() => setLoginMode(!LoginMode)}
                >
                  {LoginMode ? "Sign Up Here." : "Sign In Now."}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Stack>
      </Card>
    </>
  );
};

export default AuthComponent;
