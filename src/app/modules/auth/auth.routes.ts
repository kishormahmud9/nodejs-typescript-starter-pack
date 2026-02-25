import { Router } from "express";
import { authControllers } from "./auth.controller";

const router = Router()

router.post("/login",authControllers.userLogin)
router.post("/register",authControllers.userRegister)
router.post("/logout",authControllers.userLogout)

export const authRouter = router;