import mongoose, { Schema } from "mongoose";
import { IFollow } from "../type/follow.type";
import { FOLLOW_STATUS } from "../constant/follow.constant";

const followSchema = new Schema<IFollow>(
  {
    fromUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    toUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(FOLLOW_STATUS),  // ["pending", "accepted", "declined", "withdrawn"]
      default: FOLLOW_STATUS.PENDING,
    },
  },
  { timestamps: true }
);

// one document per pair of users — we update status instead of creating new docs
followSchema.index({ fromUserId: 1, toUserId: 1 }, { unique: true });

export default mongoose.model<IFollow>("Follow", followSchema);