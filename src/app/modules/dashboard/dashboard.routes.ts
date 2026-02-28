import { Router } from "express";
import { dashboardControllers } from "./dashboard.controller";

const router = Router();

router.get("/stats", dashboardControllers.getStats);

export const dashboardRoutes = router;
