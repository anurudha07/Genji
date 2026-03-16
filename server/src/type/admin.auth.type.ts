import { Document } from "mongoose";

export interface IAdminAuth extends Document {
  phone?: string;
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