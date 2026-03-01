import { APISetting, Prisma } from "../../../generated/prisma";
import { prisma } from "../../db_connection";

const db = prisma as any;

const createAPISetting = async (data: Prisma.APISettingCreateInput) => {
    return await db.aPISetting.create({ data });
};

const getAllAPISettings = async (filters: any = {}) => {
    const {
        page = "1",
        limit = "10",
        searchTerm,
        sortBy = "createdAt",
        sortOrder = "desc",
        status,
    } = filters;

    const allowedSortFields = new Set(["label", "apiName", "status", "createdAt", "updatedAt"]);
    const orderField = allowedSortFields.has(String(sortBy)) ? String(sortBy) : "createdAt";
    const orderDirection = String(sortOrder).toLowerCase() === "asc" ? "asc" : "desc";

    const where: any = {};

    if (searchTerm) {
        where.OR = [
            { label: { contains: searchTerm, mode: "insensitive" } },
            { apiName: { contains: searchTerm, mode: "insensitive" } },
        ];
    }

    if (status) where.status = status;

    const pageNum = Math.max(parseInt(page as string, 10) || 1, 1);
    const limitNum = Math.max(parseInt(limit as string, 10) || 10, 1);
    const skip = (pageNum - 1) * limitNum;

    const total = await db.aPISetting.count({ where });
    const data = await db.aPISetting.findMany({
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

const getAPISettingById = async (id: string) => {
    return await db.aPISetting.findUnique({ where: { id } });
};

const updateAPISetting = async (id: string, data: Prisma.APISettingUpdateInput) => {
    return await db.aPISetting.update({ where: { id }, data });
};

const deleteAPISetting = async (id: string) => {
    return await db.aPISetting.delete({ where: { id } });
};

export const apiSettingServices = {
    createAPISetting,
    getAllAPISettings,
    getAPISettingById,
    updateAPISetting,
    deleteAPISetting,
};
