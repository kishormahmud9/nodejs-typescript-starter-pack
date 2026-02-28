import { Customer, Prisma } from "../../../generated/prisma";
import { prisma } from "../../db_connection";

const db = prisma as any;

const createCustomer = async (data: Prisma.CustomerCreateInput) => {
    return await db.customer.create({ data });
};

const getAllCustomers = async () => {
    return await db.customer.findMany();
};

const getCustomerById = async (id: string) => {
    return await db.customer.findUnique({ where: { id } });
};

const updateCustomer = async (id: string, data: Prisma.CustomerUpdateInput) => {
    return await db.customer.update({ where: { id }, data });
};

const deleteCustomer = async (id: string) => {
    return await db.customer.delete({ where: { id } });
};

export const customerServices = {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
};
