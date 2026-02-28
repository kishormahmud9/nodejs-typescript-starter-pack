import { APISetting, Prisma } from "../../../generated/prisma";
import { prisma } from "../../db_connection";

const db = prisma as any;

const createAPISetting = async (data: Prisma.APISettingCreateInput) => {
    return await db.aPISetting.create({ data });
};

const getAllAPISettings = async () => {
    return await db.aPISetting.findMany();
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
