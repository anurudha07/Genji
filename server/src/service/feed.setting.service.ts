import Setting from "../model/setting.model";
import { SETTING_KEY } from "../constant/setting.constant";
import { ISettingLean } from "../type/admin.setitng.type";

const DEFAULT_BUCKETS: number[] = [50, 100];

export const readFeedBucketsFromSettings = async (): Promise<number[]> => {
  try {

    const setting = await Setting
      .findOne({ settingKey: SETTING_KEY.FEED_DISTANCE_BUCKET })
      .select("settingValue")
      .lean<ISettingLean>();

    if (!setting) {
      return DEFAULT_BUCKETS;
    }

    if (!Array.isArray(setting.settingValue)) {
      return DEFAULT_BUCKETS;
    }

    const result: number[] = [];

    for (const value of setting.settingValue) {
      if (typeof value === "number") {
        result.push(value);
      }
    }

    // sorting from smaller to larger
    result.sort((a, b) => a - b);

    if (result.length === 0) {
      return DEFAULT_BUCKETS;
    }

    return result;

  } catch {
    return DEFAULT_BUCKETS;  // fall back to defaults
  }
};