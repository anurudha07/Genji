import mongoose, { Schema, Types, Mixed } from 'mongoose';
import { ISettings } from '../type/admin.setitng.type';
import { SETTINGS_KEY } from '../constant/setting.constant';
import { validateSettingKeys } from '../util/validateSetting';
const SettingsSchema = new Schema<ISettings>(
    {
        settingsKey: {
            type: String,
            enum: {
                values: Object.values(SETTINGS_KEY),
                message: `{VALUE} doesn't exists,please provide the valid key.`
            },
            required: true,
            unique: true,
        },
        settingsValue: {
            type: mongoose.Schema.Types.Mixed,
            validate: {
                validator: validateSettingKeys,
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