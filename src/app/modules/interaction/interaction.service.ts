import { Interaction, Prisma } from "../../../generated/prisma";
import { prisma } from "../../db_connection";
import ApiError from "../../errors/ApiError";

const db = prisma as any;

const createInteraction = async (data: Prisma.InteractionCreateInput) => {
    if (data?.customer) {
        const isExistCustomer = await db.customer.findUnique({ where: { id: data.customer } });
        if (!isExistCustomer) {
            throw new ApiError(404, "Customer not found")
        }
    }
    if (data?.employee) {
        const isExistEmployee = await db.employee.findUnique({ where: { id: data.employee } });
        if (!isExistEmployee) {
            throw new ApiError(404, "Employee not found")
        }
    }
    return await db.interaction.create({ data });
};

const getAllInteractions = async (filters: any) => {
    const { searchTerm, category, type, progress, bookingType, bookingStatus } = filters;

    const where: any = {};

    if (searchTerm) {
        where.OR = [
            { interactionId: { contains: searchTerm, mode: "insensitive" } },
            { customer: { name: { contains: searchTerm, mode: "insensitive" } } },
            { customer: { email: { contains: searchTerm, mode: "insensitive" } } },
            { message: { contains: searchTerm, mode: "insensitive" } },
            { subject: { contains: searchTerm, mode: "insensitive" } },
        ];
    }

    if (category) where.category = category;
    if (type) where.type = type;
    if (progress) where.progress = progress;
    if (bookingType) where.bookingType = bookingType;
    if (bookingStatus) where.bookingStatus = bookingStatus;

    return await db.interaction.findMany({
        where,
        include: {
            customer: true,
            employee: true,
        },
        orderBy: { date: "desc" },
    });
};

const getInteractionById = async (id: string) => {
    return await db.interaction.findUnique({
        where: { id },
        include: {
            customer: true,
            employee: true,
        },
    });
};

const updateInteraction = async (id: string, data: Prisma.InteractionUpdateInput) => {
    return await db.interaction.update({ where: { id }, data });
};

const deleteInteraction = async (id: string) => {
    return await db.interaction.delete({ where: { id } });
};

export const interactionServices = {
    createInteraction,
    getAllInteractions,
    getInteractionById,
    updateInteraction,
    deleteInteraction,
};
