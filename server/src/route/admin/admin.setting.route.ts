import { Router } from "express";
import { updateSettingValue } from "../../controller/admin.setting.controller";
import { adminAuth } from "../../middleware/admin.auth.middleware";

const settingRouter = Router();


settingRouter.post('/update-value', adminAuth, updateSettingValue);



export default settingRouter;