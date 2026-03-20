import Setting from "../model/setting.model";
import { SettingKey } from "../constant/setting.constant";
import { ISettingLean, ISettings, SettingValue } from "../type/admin.setitng.type";


// update setting value service

export const updateSettingValueService = async (
  key: SettingKey,
  value: SettingValue,
  adminId: string
) : Promise<ISettings> => {

  const setting = await Setting
  .findOneAndUpdate(
    { settingKey: key },
    {
      $set: {
        settingValue: value,
        lastUpdatedBy: adminId,
      },
    },
    { returnDocument: "after", upsert: true }
  );

  return setting;
};



// get setting value service

export const getSettingValueService = async (
  keys: SettingKey[]
): Promise<Partial<Record<SettingKey, SettingValue>>> => {

  const settings = await Setting
  .find({
    settingKey: { $in: keys },
  })
  .lean<ISettingLean[]>();

  const result: Partial<Record<SettingKey, SettingValue>> = {};

  for (const setting of settings) {

    // take the key and put its value in result object
    // example: result["FEED_DISTANCE_BUCKET"] = 10
    result[setting.settingKey] = setting.settingValue;
  }

  return result;
};