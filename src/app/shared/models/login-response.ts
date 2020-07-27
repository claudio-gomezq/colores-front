import User from "./user.model";

export default interface LoginResponse {
  user: User;
  token: string;
}

export interface LoginBody {
  email: string;
  password: string;
}
