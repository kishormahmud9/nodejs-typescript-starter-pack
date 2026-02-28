import { Router } from "express";
import { faqControllers } from "./faq.controller";

const router = Router();

router.post("/", faqControllers.createFAQ);
router.get("/", faqControllers.getAllFAQs);
router.get("/:id", faqControllers.getFAQById);
router.patch("/:id", faqControllers.updateFAQ);
router.delete("/:id", faqControllers.deleteFAQ);

export const faqRoutes = router;
