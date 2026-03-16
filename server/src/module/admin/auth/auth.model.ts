import mongoose, { Schema } from "mongoose";
import { IAdminAuth } from "./auth.type";

const adminSchema = new Schema<IAdminAuth>(
  {
    phone: { 
        type: String, 
        unique: true, 
        sparse: true 
    },
  },
  { timestamps: true }
);

export default mongoose.model<IAdminAuth>("Admin", adminSchema);