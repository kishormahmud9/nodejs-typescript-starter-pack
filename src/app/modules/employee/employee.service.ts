import { Employee, Prisma } from "../../../generated/prisma";
import { prisma } from "../../db_connection";

const db = prisma as any;

const createEmployee = async (data: Prisma.EmployeeCreateInput) => {
    return await db.employee.create({ data });
};

const getAllEmployees = async (filters: any = {}) => {
    const {
        page = "1",
        limit = "10",
        searchTerm,
        sortBy = "createdAt",
        sortOrder = "desc",
        status,
        department,
    } = filters;

    const allowedSortFields = new Set(["name", "email", "phone", "position", "department", "createdAt", "updatedAt", "status"]);
    const orderField = allowedSortFields.has(String(sortBy)) ? String(sortBy) : "createdAt";
    const orderDirection = String(sortOrder).toLowerCase() === "asc" ? "asc" : "desc";

    const where: any = {};

    if (searchTerm) {
        where.OR = [
            { name: { contains: searchTerm, mode: "insensitive" } },
            { email: { contains: searchTerm, mode: "insensitive" } },
            { phone: { contains: searchTerm, mode: "insensitive" } },
            { position: { contains: searchTerm, mode: "insensitive" } },
            { department: { contains: searchTerm, mode: "insensitive" } },
        ];
    }

    if (status) where.status = status;
    if (department) where.department = department;

    const pageNum = Math.max(parseInt(page as string, 10) || 1, 1);
    const limitNum = Math.max(parseInt(limit as string, 10) || 10, 1);
    const skip = (pageNum - 1) * limitNum;

    const total = await db.employee.count({ where });
    const data = await db.employee.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { [orderField]: orderDirection },
    });

    return {
        meta: {
            page: pageNum,
            limit: limitNum,
            total,
            totalPages: Math.ceil(total / limitNum),
        },
        data,
    };
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
