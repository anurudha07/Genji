import { Document } from "mongoose";

export interface IAdminAuth extends Document {
  phone?: string;
}