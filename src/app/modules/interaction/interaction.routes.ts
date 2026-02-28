import { Router } from "express";
import { interactionControllers } from "./interaction.controller";

const router = Router();

router.post("/", interactionControllers.createInteraction);
router.get("/", interactionControllers.getAllInteractions);
router.get("/:id", interactionControllers.getInteractionById);
router.patch("/:id", interactionControllers.updateInteraction);
router.delete("/:id", interactionControllers.deleteInteraction);

export const interactionRoutes = router;
