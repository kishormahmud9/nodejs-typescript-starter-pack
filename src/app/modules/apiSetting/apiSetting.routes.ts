import { Router } from "express";
import { apiSettingControllers } from "./apiSetting.controller";

const router = Router();

router.post("/", apiSettingControllers.createAPISetting);
router.get("/", apiSettingControllers.getAllAPISettings);
router.get("/:id", apiSettingControllers.getAPISettingById);
router.patch("/:id", apiSettingControllers.updateAPISetting);
router.delete("/:id", apiSettingControllers.deleteAPISetting);

export const apiSettingRoutes = router;
