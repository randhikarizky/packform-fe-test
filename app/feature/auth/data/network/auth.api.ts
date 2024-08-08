import aes from "crypto-js/aes";
import Cookies from "universal-cookie";
import { LoginRequest, RegisterRequest } from "../request/auth.request";
import { User } from "../../domain/entities/auth.entity";
import { encryptStorage } from "@/app/global/utility/storage";
import { cookiesKeys } from "@/app/global/data/constants/cookies.constant";

const cookies = new Cookies();

export const authAPI = {
  async login(request: LoginRequest): Promise<User> {
    await new Promise((resolve) => setTimeout(resolve, 3000));

    function constructResponse() {
      let firstName = "";
      let lastName = "";

      const registeredUser = encryptStorage.getItem("registeredUser");
      const dummyUser = encryptStorage.getItem("dummyUser");

      if (registeredUser !== null && registeredUser !== undefined) {
        const email = JSON.parse(registeredUser)?.email;
        const password = JSON.parse(registeredUser)?.password;
        firstName = JSON.parse(registeredUser)?.name?.split(" ")?.[0];
        lastName = JSON.parse(registeredUser)?.name?.split(" ")?.[1];

        if (request.email === email && request.password === password) {
          const user = {
            id: (Math.random() * 101).toFixed(),
            email: request.email,
            name: lastName === "" ? firstName : `${firstName} ${lastName}`,
          };

          const token = aes.encrypt(JSON.stringify(user), "undefined");

          return {
            data: {
              user: user,
              token: token.toString(),
            },
          };
        }
      }

      if (dummyUser !== null && dummyUser !== undefined) {
        const email = JSON.parse(dummyUser)?.email;
        const password = JSON.parse(dummyUser)?.password.toString();

        if (request.email === email && request.password === password) {
          const splitted = request.email.split("@");

          firstName = splitted[0].includes(".")
            ? `${splitted[0]
                ?.split(".")[0]
                .charAt(0)
                .toUpperCase()} ${splitted[0]?.split(".")[0].slice(1)}`
            : splitted[0].includes("_")
            ? `${splitted[0]
                ?.split("_")[0]
                .charAt(0)
                .toUpperCase()} ${splitted[0]?.split("_")[0].slice(1)}`
            : splitted[0].includes("-")
            ? `${splitted[0]
                ?.split("-")[0]
                .charAt(0)
                .toUpperCase()} ${splitted[0]?.split("-")[0].slice(1)}`
            : `${splitted[0].charAt(0).toUpperCase()}${splitted[0].slice(1)}`;

          lastName = splitted[0].includes(".")
            ? `${splitted[0]
                ?.split(".")[1]
                .charAt(0)
                .toUpperCase()} ${splitted[0]?.split(".")[1].slice(1)}`
            : splitted[0].includes("_")
            ? `${splitted[0]
                ?.split("_")[1]
                .charAt(0)
                .toUpperCase()} ${splitted[0]?.split("_")[1].slice(1)}`
            : splitted[0].includes("-")
            ? `${splitted[0]
                ?.split("-")[1]
                .charAt(0)
                .toUpperCase()} ${splitted[0]?.split("-")[1].slice(1)}`
            : "";

          const user = {
            id: (Math.random() * 101).toFixed(0),
            email: request.email,
            name: lastName === "" ? firstName : `${firstName} ${lastName}`,
          };

          const token = aes.encrypt(JSON.stringify(user), "undefined");

          return {
            data: {
              user: user,
              token: token.toString(),
            },
          };
        }
      }

      throw new Error("Invalid Email or Password combination!");
    }

    const response = constructResponse();

    if (response !== undefined) {
      if (response.data.token) {
        encryptStorage.setItem(cookiesKeys.JWT_TOKEN, response.data.token);
      }

      if (response.data) {
        const user = {
          id: response.data.user.id,
          email: response.data.user.email,
          name: response.data.user.name,
        };

        cookies.set("user", user, { path: "/" });
      }

      return {
        id: Number(response.data.user.id),
        email: response.data.user.email,
        name: response.data.user.name,
        token: response.data.token,
      };
    }

    throw new Error("Invalid Email or Password!");
  },

  async register(request: RegisterRequest): Promise<User> {
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const constructResponse = async () => {
      const user = {
        id: (Math.random() * 101).toFixed(0),
        email: request.email,
        name: request.name,
      };

      const token = aes.encrypt(JSON.stringify(user), "undefined");

      const registeredUser = aes.encrypt(
        JSON.stringify({
          name: request.name,
          email: request.email,
          password: request.password,
        }),
        "undefined"
      );

      cookies.set("registeredUser", registeredUser.toString());

      return {
        data: {
          user: user,
          token: token.toString(),
        },
      };
    };

    const response = await constructResponse();

    if (response.data.token) {
      encryptStorage.setItem(cookiesKeys.JWT_TOKEN, response.data.token);
    }

    if (response.data) {
      const user = {
        id: response.data.user.id,
        email: response.data.user.email,
        name: response.data.user.name,
      };

      cookies.set("user", user, { path: "/" });
    }

    return {
      id: Number(response.data.user.id),
      email: response.data.user.email,
      name: response.data.user.name,
      token: response.data.token,
    };
  },

  async logout() {
    const allKey = cookies.getAll();

    return allKey !== undefined && allKey !== null;
  },
};
