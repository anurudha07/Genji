import { Response } from "express";
import { SETTING_KEY } from "../constant/setting.constant";
import { AdminRequest } from "../type/v1.type";
import { updateSettingValueService } from "../service/admin.setting.service";



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
            req.adminId
        );

        res.status(200).json({
            success: true,
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