import mongoose, { Schema } from "mongoose";
import { IOtp } from "./auth.type";

const otpSchema = new Schema<IOtp>(
  {
    phone: {
      type: String,
      required: true
    },
    otp: {
      type: String,
      required: true
    },
    expiresAt: {
      type: Date,
      required: true
    },
    wrongAttempts: {
      type: Number,
      default: 0
    },
    blockedUntil: {
      type: Date,
      default: null
    },
  },
  { timestamps: true }
);

// auto delete when expiresAt passes
// expireAfterSeconds: 0 -->> delete the document exactly at expiredAt
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model<IOtp>("Otp", otpSchema);