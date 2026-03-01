import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { employeeServices } from "./employee.service";

const createEmployee = catchAsync(async (req, res) => {
    const result = await employeeServices.createEmployee(req.body);
    sendResponse(res, {
        success: true,
        message: "Employee created successfully",
        statusCode: 201,
        data: result,
    });
});

const getAllEmployees = catchAsync(async (req, res) => {
    const result = await employeeServices.getAllEmployees(req.query);
    sendResponse(res, {
        success: true,
        message: "Employees fetched successfully",
        statusCode: 200,
        data: result,
    });
});

const getEmployeeById = catchAsync(async (req, res) => {
    const result = await employeeServices.getEmployeeById(req.params.id as string);
    sendResponse(res, {
        success: true,
        message: "Employee fetched successfully",
        statusCode: 200,
        data: result,
    });
});

const updateEmployee = catchAsync(async (req, res) => {
    const result = await employeeServices.updateEmployee(req.params.id as string, req.body);
    sendResponse(res, {
        success: true,
        message: "Employee updated successfully",
        statusCode: 200,
        data: result,
    });
});

const deleteEmployee = catchAsync(async (req, res) => {
    const result = await employeeServices.deleteEmployee(req.params.id as string);
    sendResponse(res, {
        success: true,
        message: "Employee deleted successfully",
        statusCode: 200,
        data: result,
    });
});

export const employeeControllers = {
    createEmployee,
    getAllEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
};
