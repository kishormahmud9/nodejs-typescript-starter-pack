import { Router } from "express";
import { customerControllers } from "./customer.controller";

const router = Router();

router.post("/", customerControllers.createCustomer);
router.get("/", customerControllers.getAllCustomers);
router.get("/:id", customerControllers.getCustomerById);
router.patch("/:id", customerControllers.updateCustomer);
router.delete("/:id", customerControllers.deleteCustomer);

export const customerRoutes = router;
