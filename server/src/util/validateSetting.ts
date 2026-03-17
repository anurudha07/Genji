import { ISettings, SettingValue } from "../type/admin.setitng.type";
import { SETTING_KEY } from "../constant/setting.constant";

export const validateSettingKey = function (
    this: ISettings,
    value: SettingValue
) {
    switch (this.settingKey) {
        case SETTING_KEY.FEED_DISTANCE_BUCKET:
            return (
                typeof value === 'number' ||
                typeof value === 'string' ||
                typeof value === 'boolean' ||
                Array.isArray(value) ||
                (typeof value === 'object' && value !== null)
            );
    }
};