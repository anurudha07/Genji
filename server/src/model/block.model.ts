import mongoose, { Schema } from "mongoose";
import { IBlock } from "../type/block.type";

const blockSchema = new Schema<IBlock>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    blockedUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reason: {
      type: String,
      trim: true
    }
  },
  { timestamps: true }
);

// prevent duplicate block
blockSchema.index({ userId: 1, blockedUserId: 1 }, { unique: true });

export default mongoose.model<IBlock>("Block", blockSchema);