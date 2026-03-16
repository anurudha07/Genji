import { Document } from "mongoose";

export interface IAuth extends Document {
  phone?: string;
  email?: string;
  name?: string;
  role: 'user' | 'admin';
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