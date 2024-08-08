import { User } from "../../domain/entities/auth.entity";
import { AuthRepository } from "../../domain/repositories/auth.repository";
import { authAPI } from "../network/auth.api";
import { LoginRequest, RegisterRequest } from "../request/auth.request";

class AuthRepositoryImpl implements AuthRepository {
  async login(request: LoginRequest): Promise<User> {
    return authAPI.login(request);
  }

  async register(request: RegisterRequest): Promise<User> {
    return authAPI.register(request);
  }

  async logout(): Promise<boolean> {
    return authAPI.logout();
  }
}

export const authService = Object.freeze(new AuthRepositoryImpl());
