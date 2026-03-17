import Setting from "../model/setting.model";
import { SettingKey } from "../constant/setting.constant";
import { Schema } from "mongoose";
import { SettingValue } from "../type/admin.setitng.type";


// update setting value service

export const updateSettingValueService = async (
  key: SettingKey,
  value: SettingValue,
  adminId: string
) => {

  const setting = await Setting
  .findOneAndUpdate(
    { settingKey: key },
    {
      $set: {
        settingValue: value,
        lastUpdatedBy: adminId,
      },
    },
    { new: true, upsert: true }
  );

  return setting;
};