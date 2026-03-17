import { Document, Types, Schema } from 'mongoose';
import { SettingKey } from '../constant/setting.constant';

export interface ISettings extends Document {
    settingKey: SettingKey;
    settingValue: SettingValue;
    lastUpdatedBy: Types.ObjectId;
}

export type SettingValue =
  | number
  | string
  | boolean
  | number[]
  | string[]
  | object;