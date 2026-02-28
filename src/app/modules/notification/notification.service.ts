import { Notification, Prisma } from "../../../generated/prisma";
import { prisma } from "../../db_connection";

const db = prisma as any;

const getAllNotifications = async (userId: string) => {
    return await db.notification.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
    });
};

const markAsRead = async (id: string) => {
    return await db.notification.update({
        where: { id },
        data: { isRead: true },
    });
};

const createNotification = async (data: Prisma.NotificationCreateInput) => {
    return await db.notification.create({ data });
};

export const notificationServices = {
    getAllNotifications,
    markAsRead,
    createNotification,
};
