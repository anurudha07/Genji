import mongoose, { Schema, Types, Mixed } from 'mongoose';
import { ISettings } from '../type/admin.setitng.type';
import { SETTING_KEY } from '../constant/setting.constant';
import { validateSettingKey } from '../util/validateSetting';
const SettingsSchema = new Schema<ISettings>(
    {
        settingKey: {
            type: String,
            enum: {
                values: Object.values(SETTING_KEY),
                message: `{VALUE} doesn't exists,please provide the valid key.`
            },
            required: true,
            unique: true,
        },
        settingValue: {
            type: mongoose.Schema.Types.Mixed,
            validate: {
                validator: validateSettingKey,
                message: `Invalid value type for key`
            }
        },
        lastUpdatedBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<ISettings>('Setting', SettingsSchema);