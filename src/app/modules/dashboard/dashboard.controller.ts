import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { dashboardServices } from "./dashboard.service";

const getStats = catchAsync(async (req, res) => {
    const result = await dashboardServices.getStats();
    sendResponse(res, {
        success: true,
        message: "Dashboard stats fetched successfully",
        statusCode: 200,
        data: result,
    });
});

export const dashboardControllers = {
    getStats,
};
