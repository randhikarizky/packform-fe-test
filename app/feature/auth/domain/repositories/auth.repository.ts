import { LoginRequest, RegisterRequest } from "../../data/request/auth.request";
import { User } from "../entities/auth.entity";

export interface AuthRepository {
  login(request: LoginRequest): Promise<User>;
  register(request: RegisterRequest): Promise<User>;
  logout(): Promise<boolean>;
}
