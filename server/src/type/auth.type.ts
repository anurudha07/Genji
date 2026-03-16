import { Document } from "mongoose";

export interface IAuth extends Document {
  phone?: string;
  email?: string;
  name?: string;
}

export interface IOtp extends Document{
  phone: string;
  otp: string;
  expiresAt: Date;
  wrongAttempts: number;
  blockedUntil: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}