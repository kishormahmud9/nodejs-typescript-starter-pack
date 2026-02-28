import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { faqServices } from "./faq.service";

const createFAQ = catchAsync(async (req, res) => {
    const result = await faqServices.createFAQ(req.body);
    sendResponse(res, {
        success: true,
        message: "FAQ created successfully",
        statusCode: 201,
        data: result,
    });
});

const getAllFAQs = catchAsync(async (req, res) => {
    const result = await faqServices.getAllFAQs();
    sendResponse(res, {
        success: true,
        message: "FAQs fetched successfully",
        statusCode: 200,
        data: result,
    });
});

const getFAQById = catchAsync(async (req, res) => {
    const result = await faqServices.getFAQById(req.params.id as string);
    sendResponse(res, {
        success: true,
        message: "FAQ fetched successfully",
        statusCode: 200,
        data: result,
    });
});

const updateFAQ = catchAsync(async (req, res) => {
    const result = await faqServices.updateFAQ(req.params.id as string, req.body);
    sendResponse(res, {
        success: true,
        message: "FAQ updated successfully",
        statusCode: 200,
        data: result,
    });
});

const deleteFAQ = catchAsync(async (req, res) => {
    const result = await faqServices.deleteFAQ(req.params.id as string);
    sendResponse(res, {
        success: true,
        message: "FAQ deleted successfully",
        statusCode: 200,
        data: result,
    });
});

export const faqControllers = {
    createFAQ,
    getAllFAQs,
    getFAQById,
    updateFAQ,
    deleteFAQ,
};
