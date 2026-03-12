export const FOLLOW_STATUS = {
  PENDING: "pending",
  ACCEPTED: "accepted",
  DECLINED: "declined",
  WITHDRAWN: "withdrawn",
} as const;

// the type of any value in FOLLOW_STATUS e.g. "pending" | "accepted" | "declined" | "withdrawn"
export type FollowStatusValue = (typeof FOLLOW_STATUS)[keyof typeof FOLLOW_STATUS];