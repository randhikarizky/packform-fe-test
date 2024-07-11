import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { encryptStorage } from "../../utility/storage";
import { cookiesKeys } from "../constants/cookies.constant";
import { enqueueSnackbar } from "notistack";
import Router from "next/router";
import Cookies from "universal-cookie";

const semprit = new Cookies();

const apiNoAuth = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_ENDPOINT}/`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_ENDPOINT}/`,
  headers: {
    Accept: "*/*",
    "Content-Type": "multipart/form-data",
  },
});

api.interceptors.request.use(
  function (config: InternalAxiosRequestConfig<any>) {
    if (config.headers) {
      const token = encryptStorage.getItem(cookiesKeys.JWT_TOKEN);

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return {
      data: response.data,
      status: response.status,
      config: response.config,
      headers: response.headers,
      statusText: response.statusText,
    };
  },

  async (error) => {
    if (error.response.status === 401) {
      enqueueSnackbar("Session telah habis, silakan login kembali.", {
        variant: "warning",
        autoHideDuration: 3000,
      });

      const all = semprit.getAll();
      for (var key in all) {
        encryptStorage.removeItem(key);
      }

      return Router.push("/auth/register");
    }

    if (error.response.data.code === 401) {
      enqueueSnackbar("Session telah habis, silakan login kembali.", {
        variant: "warning",
        autoHideDuration: 3000,
      });

      const all = semprit.getAll();
      for (var key in all) {
        encryptStorage.removeItem(key);
      }

      return Router.push("/auth/register");
    }
    return Promise.reject({
      data: error.response.data,
      status: error.response.status,
    });
  }
);

export { api, apiNoAuth };
