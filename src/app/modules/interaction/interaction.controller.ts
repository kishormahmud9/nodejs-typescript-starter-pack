import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { interactionServices } from "./interaction.service";

const createInteraction = catchAsync(async (req, res) => {
    const result = await interactionServices.createInteraction(req.body);
    sendResponse(res, {
        success: true,
        message: "Interaction created successfully",
        statusCode: 201,
        data: result,
    });
});

const getAllInteractions = catchAsync(async (req, res) => {
    const result = await interactionServices.getAllInteractions(req.query);
    sendResponse(res, {
        success: true,
        message: "Interactions fetched successfully",
        statusCode: 200,
        data: result,
    });
});

const getInteractionById = catchAsync(async (req, res) => {
    const result = await interactionServices.getInteractionById(req.params.id as string);
    sendResponse(res, {
        success: true,
        message: "Interaction fetched successfully",
        statusCode: 200,
        data: result,
    });
});

const updateInteraction = catchAsync(async (req, res) => {
    const result = await interactionServices.updateInteraction(req.params.id as string, req.body);
    sendResponse(res, {
        success: true,
        message: "Interaction updated successfully",
        statusCode: 200,
        data: result,
    });
});

const deleteInteraction = catchAsync(async (req, res) => {
    const result = await interactionServices.deleteInteraction(req.params.id as string);
    sendResponse(res, {
        success: true,
        message: "Interaction deleted successfully",
        statusCode: 200,
        data: result,
    });
});

export const interactionControllers = {
    createInteraction,
    getAllInteractions,
    getInteractionById,
    updateInteraction,
    deleteInteraction,
};
