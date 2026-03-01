import { prisma } from "../../db_connection";

const db = prisma as any;

const getStats = async () => {
    const totalUsers = await db.user.count();
    const totalInteractions = await db.interaction.count();

    // Fetch all interactions to simply aggregate them by month and week locally
    const interactions = await db.interaction.findMany({
        select: { date: true, bookingStatus: true }
    });

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Initialize metrics arrays with 0
    const monthlyInteractionProgress = monthNames.map(month => ({ month, value: 0 }));
    const weeklyBookingProgress = dayNames.map(day => ({ day, value: 0 }));

    // Aggregate real values
    interactions.forEach((item: any) => {
        if (!item.date) return;
        const d = new Date(item.date);

        // Month aggregation
        const monthIndex = d.getMonth();
        monthlyInteractionProgress[monthIndex].value += 1;

        // Week aggregation (only count if they have a confirmed booking)
        if (item.bookingStatus === "Confirmed") {
            const dayIndex = d.getDay();
            weeklyBookingProgress[dayIndex].value += 1;
        }
    });

    // Rearrange weekly to start from Saturday to match previous Figma mock format
    const arrangedWeekly = [
        weeklyBookingProgress[6], // Sat
        weeklyBookingProgress[0], // Sun
        weeklyBookingProgress[1], // Mon
        weeklyBookingProgress[2], // Tue
        weeklyBookingProgress[3], // Wed
        weeklyBookingProgress[4], // Thu
        weeklyBookingProgress[5], // Fri
    ];

    return {
        totalUsers,
        totalInteractions,
        monthlyInteractionProgress,
        weeklyBookingProgress: arrangedWeekly,
    };
};

export const dashboardServices = {
    getStats,
};
