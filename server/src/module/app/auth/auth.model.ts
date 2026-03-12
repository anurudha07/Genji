import mongoose, { Schema } from "mongoose";
import { IAuth } from "./auth.type";

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
  },
  { timestamps: true }
);

export default mongoose.model<IAuth>("User", userSchema);