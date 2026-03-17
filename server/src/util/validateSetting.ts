import { Mixed } from "mongoose";
import { ISettings } from "../type/admin.setitng.type";
import { SETTINGS_KEY } from "../constant/setting.constant";

export const validateSettingKeys = function (
    this: ISettings,
    value: Mixed
) {
    switch (this.settingsKey) {
        case SETTINGS_KEY.FEED_DISTANCE_BUCKETS:
            return (
                typeof value === 'number' ||
                typeof value === 'string' ||
                typeof value === 'boolean' ||
                Array.isArray(value) ||
                (typeof value === 'object' && value !== null)
            );
    }
};