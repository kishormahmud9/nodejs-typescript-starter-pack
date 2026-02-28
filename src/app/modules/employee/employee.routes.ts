import { Router } from "express";
import { employeeControllers } from "./employee.controller";

const router = Router();

router.post("/", employeeControllers.createEmployee);
router.get("/", employeeControllers.getAllEmployees);
router.get("/:id", employeeControllers.getEmployeeById);
router.patch("/:id", employeeControllers.updateEmployee);
router.delete("/:id", employeeControllers.deleteEmployee);

export const employeeRoutes = router;
