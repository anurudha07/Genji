export const SETTING_KEY = {
  FEED_DISTANCE_BUCKET: "FEED_DISTANCE_BUCKET",
} as const;

export type SettingKey =
  (typeof SETTING_KEY)[keyof typeof SETTING_KEY];