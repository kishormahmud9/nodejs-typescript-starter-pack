import { Interaction, Prisma } from "../../../generated/prisma";
import { prisma } from "../../db_connection";
import ApiError from "../../errors/ApiError";

const db = prisma as any;

const createInteraction = async (data: any) => {
    let customerId = data?.customer;
    let employeeId = data?.employee;

    // Support if the frontend sends the ID directly in the payload
    if (!customerId && data?.customerId) customerId = data.customerId;
    if (!employeeId && data?.employeeId) employeeId = data.employeeId;

    if (customerId) {
        const isExistCustomer = await db.customer.findUnique({ where: { id: customerId } });
        if (!isExistCustomer) {
            throw new ApiError(404, "Customer not found")
        }
    }
    if (employeeId) {
        const isExistEmployee = await db.employee.findUnique({ where: { id: employeeId } });
        if (!isExistEmployee) {
            throw new ApiError(404, "Employee not found")
        }
    }

    // Prepare correct data object for prisma
    const createData = {
        ...data,
        customerId,
        employeeId
    };

    // Remove the incorrect keys to avoid Prisma errors if they exist
    delete createData.customer;
    delete createData.employee;

    return await db.interaction.create({ data: createData });
};

const getAllInteractions = async (filters: any = {}) => {
    const {
        searchTerm,
        category,
        type,
        progress,
        bookingType,
        bookingStatus,
        page = "1",
        limit = "10",
        sortBy = "date",
        sortOrder = "desc",
    } = filters;

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

    const allowedSortFields = new Set(["date", "interactionId", "createdAt", "updatedAt"]);
    const orderField = allowedSortFields.has(String(sortBy)) ? String(sortBy) : "date";
    const orderDirection = String(sortOrder).toLowerCase() === "asc" ? "asc" : "desc";

    const pageNum = Math.max(parseInt(page as string, 10) || 1, 1);
    const limitNum = Math.max(parseInt(limit as string, 10) || 10, 1);
    const skip = (pageNum - 1) * limitNum;

    const total = await db.interaction.count({ where });
    const data = await db.interaction.findMany({
        where,
        include: {
            customer: true,
            employee: true,
        },
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

const confirmBooking = async (id: string) => {
    // Verify the interaction exists
    const interaction = await db.interaction.findUnique({ where: { id } });
    if (!interaction) {
        throw new ApiError(404, "Interaction not found");
    }

    return await db.interaction.update({
        where: { id },
        data: { bookingStatus: "Confirmed", progress: "Confirmed" }
    });
};

const declineBooking = async (id: string) => {
    // Verify the interaction exists
    const interaction = await db.interaction.findUnique({ where: { id } });
    if (!interaction) {
        throw new ApiError(404, "Interaction not found");
    }

    return await db.interaction.update({
        where: { id },
        data: { bookingStatus: "Decline" }
    });
};

export const interactionServices = {
    createInteraction,
    getAllInteractions,
    getInteractionById,
    updateInteraction,
    deleteInteraction,
    confirmBooking,
    declineBooking
};

