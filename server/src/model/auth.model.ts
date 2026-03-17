import mongoose, { Schema } from "mongoose";
import { IAuth } from "../type/auth.type";

const userSchema = new Schema<IAuth>(
  {
    phone: {
      type: String,
      unique: true,
      sparse: true
    },
    email: {
      type: String,
      unique: true,
      sparse: true
    },
    name: {
      type: String,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    }

  },
  { timestamps: true }
);

export default mongoose.model<IAuth>("User", userSchema);