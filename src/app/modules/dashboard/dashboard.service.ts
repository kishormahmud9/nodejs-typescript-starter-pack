import { prisma } from "../../db_connection";

const db = prisma as any;

const getStats = async () => {
    const totalUsers = await db.user.count();
    const totalInteractions = await db.interaction.count();

    // Mock chart data structure based on Figma screenshots
    const monthlyInteractionProgress = [
        { month: "Jan", value: 40 },
        { month: "Feb", value: 120 },
        { month: "Mar", value: 180 },
        { month: "Apr", value: 450 },
        { month: "May", value: 400 },
        { month: "Jun", value: 500 },
        { month: "Jul", value: 1000 },
        { month: "Aug", value: 860 },
        { month: "Sept", value: 620 },
        { month: "Oct", value: 650 },
        { month: "Nov", value: 720 },
        { month: "Dec", value: 1300 },
    ];

    const weeklyBookingProgress = [
        { day: "Sat", value: 0 },
        { day: "Sun", value: 20 },
        { day: "Mon", value: 30 },
        { day: "Tue", value: 80 },
        { day: "Wed", value: 70 },
        { day: "Thu", value: 90 },
        { day: "Fri", value: 180 },
    ];

    return {
        totalUsers,
        totalInteractions,
        monthlyInteractionProgress,
        weeklyBookingProgress,
    };
};

export const dashboardServices = {
    getStats,
};
