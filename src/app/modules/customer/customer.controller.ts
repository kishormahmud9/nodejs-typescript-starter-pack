import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { customerServices } from "./customer.service";

const createCustomer = catchAsync(async (req, res) => {
    const result = await customerServices.createCustomer(req.body);
    sendResponse(res, {
        success: true,
        message: "Customer created successfully",
        statusCode: 201,
        data: result,
    });
});

const getAllCustomers = catchAsync(async (req, res) => {
    const result = await customerServices.getAllCustomers();
    sendResponse(res, {
        success: true,
        message: "Customers fetched successfully",
        statusCode: 200,
        data: result,
    });
});

const getCustomerById = catchAsync(async (req, res) => {
    const result = await customerServices.getCustomerById(req.params.id as string);
    sendResponse(res, {
        success: true,
        message: "Customer fetched successfully",
        statusCode: 200,
        data: result,
    });
});

const updateCustomer = catchAsync(async (req, res) => {
    const result = await customerServices.updateCustomer(req.params.id as string, req.body);
    sendResponse(res, {
        success: true,
        message: "Customer updated successfully",
        statusCode: 200,
        data: result,
    });
});

const deleteCustomer = catchAsync(async (req, res) => {
    const result = await customerServices.deleteCustomer(req.params.id as string);
    sendResponse(res, {
        success: true,
        message: "Customer deleted successfully",
        statusCode: 200,
        data: result,
    });
});

export const customerControllers = {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
};
