import { Router } from "express";
import { interactionControllers } from "./interaction.controller";

const router = Router();

router.post("/", interactionControllers.createInteraction);
router.get("/", interactionControllers.getAllInteractions);
router.get("/:id", interactionControllers.getInteractionById);
router.patch("/:id", interactionControllers.updateInteraction);
router.patch("/confirm-booking/:id", interactionControllers.confirmBooking);
router.patch("/decline-booking/:id", interactionControllers.declineBooking);
router.delete("/:id", interactionControllers.deleteInteraction);



export const interactionRoutes = router;
