import { Response } from "express";
import { SETTING_KEY, SettingKey } from "../constant/setting.constant";
import { AdminRequest } from "../type/req.body";
import { getSettingValueService, updateSettingValueService } from "../service/admin.setting.service";



// add or update setting value

export const updateSettingValue = async (
    req: AdminRequest,
    res: Response
): Promise<void> => {
    try {

        const { key, value } = req.body;

        if (!key || value === undefined) {
            res.status(400).json({
                success: false,
                message: "Key and Value are required"
            });
            return;
        }

        if (!Object.values(SETTING_KEY).includes(key)) {
            res.status(400).json({
                success: false,
                message: "Invalid settings key"
            });
            return;
        }

        const setting = await updateSettingValueService(
            key,
            value,
            req.adminId as string
        );

        res.status(200).json({
            success: true,
            message: "Setting Value updated successfully",
            key: setting.settingKey,
            value: setting.settingValue,
        });

    } catch (err) {
        const errorMessage = err instanceof Error
            ? ` ${err.message}`
            : String(err);
        res.status(500).json({
            success: false,
            message: `Failed to update Setting Value. ${errorMessage}`
        });
    }
};



// get setting value

export const getSettingValue = async (
    req: AdminRequest,
    res: Response
): Promise<void> => {

    try {

        const { keys } = req.body;

        if (!Array.isArray(keys)) {
            res.status(400).json({ message: "keys must be an array" });
            return;
        }

        const validKeys = keys.filter((key) =>
            Object.values(SETTING_KEY).includes(key as SettingKey)
        );

        if (validKeys.length === 0) {
            res.status(400).json({ message: "No valid keys provided" });
            return;
        }

        const result = await getSettingValueService(validKeys);

        res.status(200).json({
            success: true,
            message: "Setting Value fetched successfully",
            result
        });

    } catch (err) {
        const errorMessage = err instanceof Error
            ? err.message
            : String(err);
        res.status(500).json({
            success: false,
            message: `Failed to fetch Setting Value. ${errorMessage}`
        });
    }
};