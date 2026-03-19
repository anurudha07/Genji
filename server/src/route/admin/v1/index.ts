import { Router } from "express";
import authRouter from "./admin.auth.route";
import settingRouter from "./admin.setting.route";

const adminRouter = Router();

adminRouter.use('/auth',authRouter);
adminRouter.use('/setting',settingRouter)

export default adminRouter;