import { Router } from "express";
import { notificationControllers } from "./notification.controller";

const router = Router();

router.get("/:userId", notificationControllers.getAllNotifications);
router.patch("/:id/read", notificationControllers.markAsRead);

export const notificationRoutes = router;
