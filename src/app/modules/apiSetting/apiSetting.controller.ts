import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { apiSettingServices } from "./apiSetting.service";

const createAPISetting = catchAsync(async (req, res) => {
    const result = await apiSettingServices.createAPISetting(req.body);
    sendResponse(res, {
        success: true,
        message: "API Setting created successfully",
        statusCode: 201,
        data: result,
    });
});

const getAllAPISettings = catchAsync(async (req, res) => {
    const result = await apiSettingServices.getAllAPISettings(req.query);
    sendResponse(res, {
        success: true,
        message: "API Settings fetched successfully",
        statusCode: 200,
        data: result,
    });
});

const getAPISettingById = catchAsync(async (req, res) => {
    const result = await apiSettingServices.getAPISettingById(req.params.id as string);
    sendResponse(res, {
        success: true,
        message: "API Setting fetched successfully",
        statusCode: 200,
        data: result,
    });
});

const updateAPISetting = catchAsync(async (req, res) => {
    const result = await apiSettingServices.updateAPISetting(req.params.id as string, req.body);
    sendResponse(res, {
        success: true,
        message: "API Setting updated successfully",
        statusCode: 200,
        data: result,
    });
});

const deleteAPISetting = catchAsync(async (req, res) => {
    const result = await apiSettingServices.deleteAPISetting(req.params.id as string);
    sendResponse(res, {
        success: true,
        message: "API Setting deleted successfully",
        statusCode: 200,
        data: result,
    });
});

export const apiSettingControllers = {
    createAPISetting,
    getAllAPISettings,
    getAPISettingById,
    updateAPISetting,
    deleteAPISetting,
};
