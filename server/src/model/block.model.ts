import mongoose, { Schema } from "mongoose";

const blockSchema = new Schema(
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
  },
  { timestamps: true }
);

// prevent duplicate block
blockSchema.index({ userId: 1, blockedUserId: 1 }, { unique: true });

export default mongoose.model("Block", blockSchema);