import { Router } from "express";

import { employeeRoutes } from "../modules/employee/employee.routes";
import { customerRoutes } from "../modules/customer/customer.routes";
import { interactionRoutes } from "../modules/interaction/interaction.routes";
import { faqRoutes } from "../modules/faq/faq.routes";
import { apiSettingRoutes } from "../modules/apiSetting/apiSetting.routes";
import { notificationRoutes } from "../modules/notification/notification.routes";
import { dashboardRoutes } from "../modules/dashboard/dashboard.routes";
import { authRouter } from "../modules/auth/auth.routes";

export const rootRoute = Router()

const modelRoutes = [
    {
        path: "/auth",
        element: authRouter
    },
    {
        path: "/employees",
        element: employeeRoutes
    },
    {
        path: "/customers",
        element: customerRoutes
    },
    {
        path: "/interactions",
        element: interactionRoutes
    },
    {
        path: "/faqs",
        element: faqRoutes
    },
    {
        path: "/api-settings",
        element: apiSettingRoutes
    },
    {
        path: "/notifications",
        element: notificationRoutes
    },
    {
        path: "/dashboard",
        element: dashboardRoutes
    }
]

modelRoutes.forEach((route) => {
    rootRoute.use(route.path, route.element)
})
