import { Request } from "express";

export interface UserAuthBody {
  phone: string;
  otp: string;
  idToken: string;
}
// authenticated user type declaration for req object
export interface AuthRequest extends Request {
  userId?: string;
  body: UserAuthBody;
}