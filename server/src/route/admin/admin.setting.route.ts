import { Router } from "express";
import { getSettingValue, updateSettingValue } from "../../controller/admin.setting.controller";
import { adminAuth } from "../../middleware/admin.auth.middleware";

const settingRouter = Router();

// update setting value for the setting key
settingRouter.post('/update-value', adminAuth, updateSettingValue);

// get setting value from setting key
settingRouter.get('/value', adminAuth, getSettingValue);



export default settingRouter;