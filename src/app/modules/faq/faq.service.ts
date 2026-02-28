import { FAQ, Prisma } from "../../../generated/prisma";
import { prisma } from "../../db_connection";

const db = prisma as any;

const createFAQ = async (data: Prisma.FAQCreateInput) => {
    return await db.fAQ.create({ data });
};

const getAllFAQs = async () => {
    return await db.fAQ.findMany();
};

const getFAQById = async (id: string) => {
    return await db.fAQ.findUnique({ where: { id } });
};

const updateFAQ = async (id: string, data: Prisma.FAQUpdateInput) => {
    return await db.fAQ.update({ where: { id }, data });
};

const deleteFAQ = async (id: string) => {
    return await db.fAQ.delete({ where: { id } });
};

export const faqServices = {
    createFAQ,
    getAllFAQs,
    getFAQById,
    updateFAQ,
    deleteFAQ,
};
