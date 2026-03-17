export const SETTINGS_KEY = {
  FEED_DISTANCE_BUCKETS: "FEED_DISTANCE_BUCKETS",
} as const;

export type SettingsKey =
  (typeof SETTINGS_KEY)[keyof typeof SETTINGS_KEY];