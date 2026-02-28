import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { notificationServices } from "./notification.service";

const getAllNotifications = catchAsync(async (req, res) => {
    const result = await notificationServices.getAllNotifications(req.params.userId as string);
    sendResponse(res, {
        success: true,
        message: "Notifications fetched successfully",
        statusCode: 200,
        data: result,
    });
});

const markAsRead = catchAsync(async (req, res) => {
    const result = await notificationServices.markAsRead(req.params.id as string);
    sendResponse(res, {
        success: true,
        message: "Notification marked as read",
        statusCode: 200,
        data: result,
    });
});

export const notificationControllers = {
    getAllNotifications,
    markAsRead,
};
