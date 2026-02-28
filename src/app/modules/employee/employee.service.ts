import { Employee, Prisma } from "../../../generated/prisma";
import { prisma } from "../../db_connection";

const db = prisma as any;

const createEmployee = async (data: Prisma.EmployeeCreateInput) => {
    return await db.employee.create({ data });
};

const getAllEmployees = async () => {
    return await db.employee.findMany();
};

const getEmployeeById = async (id: string) => {
    return await db.employee.findUnique({ where: { id } });
};

const updateEmployee = async (id: string, data: Prisma.EmployeeUpdateInput) => {
    return await db.employee.update({ where: { id }, data });
};

const deleteEmployee = async (id: string) => {
    return await db.employee.delete({ where: { id } });
};

export const employeeServices = {
    createEmployee,
    getAllEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
};
