import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import Cookies from "universal-cookie";
import { LoginRequest, RegisterRequest } from "../../data/request/auth.request";
import { authService } from "../../data/repositories/auth.repository.impl";
import { User } from "../../domain/entities/auth.entity";

const cookies = new Cookies();

export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const controller = useMutation<User, Error, LoginRequest>({
    mutationFn: (request: LoginRequest) => authService.login(request),
    onSuccess: () => {
      enqueueSnackbar("Login Success!", { variant: "success" });
      queryClient.invalidateQueries();

      // router.push("/dashboard");
    },
    onError: (error) => {
      queryClient.invalidateQueries();

      console.error(error);
      // router.push("/dashboard");
    },
  });

  return controller;
};

export const useRegister = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const controller = useMutation<User, Error, RegisterRequest>({
    mutationFn: (request: RegisterRequest) => authService.register(request),
    onSuccess: (response) => {
      enqueueSnackbar("Register Success!", { variant: "success" });
      queryClient.invalidateQueries();

      // router.push("/dashboard");
    },
    onError: (error) => {
      queryClient.invalidateQueries();

      console.error(error);
      // router.push("/dashboard");
    },
  });

  return controller;
};

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const controller = useMutation<boolean, Error, () => boolean>({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      enqueueSnackbar("Logout Success!", { variant: "success" });
      queryClient.invalidateQueries();

      const all = cookies.getAll();
      for (var key in all) {
        cookies.remove(key);
      }

      router.push("/auth/login");
      // router.push("/dashboard");
    },
    onError: (error) => {
      enqueueSnackbar("Logout Failed!", { variant: "error" });
      queryClient.invalidateQueries();

      console.error(error);
      // router.push("/dashboard");
    },
  });

  return controller;
};
