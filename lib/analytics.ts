import prisma from './prisma';

/**
 * Calculate total revenue from all rentals
 * @param startDate Optional start date filter
 * @param endDate Optional end date filter
 * @returns Total revenue in dollars
 */
export async function calculateRevenue(
  startDate?: Date,
  endDate?: Date
): Promise<number> {
  const result = await prisma.rental.aggregate({
    _sum: {
      totalCost: true,
    },
    where: {
      status: {
        in: ['active', 'completed'],
      },
      ...(startDate && endDate
        ? {
            startDate: {
              gte: startDate,
              lte: endDate,
            },
          }
        : {}),
    },
  });

  return parseFloat(result._sum.totalCost?.toString() || '0');
}

/**
 * Calculate fleet utilization percentage
 * @returns Utilization percentage (0-100)
 */
export async function calculateUtilization(): Promise<number> {
  const totalVehicles = await prisma.vehicle.count();

  if (totalVehicles === 0) {
    return 0;
  }

  const rentedVehicles = await prisma.vehicle.count({
    where: {
      isAvailable: false,
    },
  });

  return (rentedVehicles / totalVehicles) * 100;
}

/**
 * Calculate average customer satisfaction rating
 * @param startDate Optional start date filter
 * @param endDate Optional end date filter
 * @returns Average rating (0-5)
 */
export async function calculateSatisfaction(
  startDate?: Date,
  endDate?: Date
): Promise<number> {
  const result = await prisma.feedback.aggregate({
    _avg: {
      rating: true,
    },
    ...(startDate && endDate
      ? {
          where: {
            createdAt: {
              gte: startDate,
              lte: endDate,
            },
          },
        }
      : {}),
  });

  return parseFloat(result._avg.rating?.toFixed(2) || '0');
}

/**
 * Get KPI summary
 */
export async function getKPISummary(startDate?: Date, endDate?: Date) {
  const [revenue, utilization, satisfaction, activeRentals, totalCustomers, totalVehicles] =
    await Promise.all([
      calculateRevenue(startDate, endDate),
      calculateUtilization(),
      calculateSatisfaction(startDate, endDate),
      prisma.rental.count({ where: { status: 'active' } }),
      prisma.customer.count({ where: { isDeleted: false } }),
      prisma.vehicle.count(),
    ]);

  return {
    revenue: revenue.toFixed(2),
    utilization: utilization.toFixed(1),
    satisfaction: satisfaction.toFixed(2),
    activeRentals,
    totalCustomers,
    totalVehicles,
  };
}

/**
 * Get revenue trend data
 * @param days Number of days to look back
 * @returns Array of daily revenue data
 */
export async function getRevenueTrend(days: number = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const rentals = await prisma.rental.findMany({
    where: {
      startDate: {
        gte: startDate,
      },
    },
    select: {
      startDate: true,
      totalCost: true,
    },
    orderBy: {
      startDate: 'asc',
    },
  });

  // Group by date
  const revenueByDate = new Map<string, number>();

  rentals.forEach((rental) => {
    const dateKey = rental.startDate.toISOString().split('T')[0];
    const current = revenueByDate.get(dateKey) || 0;
    revenueByDate.set(dateKey, current + parseFloat(rental.totalCost.toString()));
  });

  // Convert to array
  return Array.from(revenueByDate.entries()).map(([date, revenue]) => ({
    date,
    revenue: parseFloat(revenue.toFixed(2)),
  }));
}

/**
 * Get utilization trend data
 * @param days Number of days to look back
 * @returns Array of daily utilization data
 */
export async function getUtilizationTrend(days: number = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  // Get rental history
  const rentals = await prisma.rental.findMany({
    where: {
      startDate: {
        gte: startDate,
      },
    },
    select: {
      startDate: true,
      endDate: true,
    },
  });

  const totalVehicles = await prisma.vehicle.count();

  if (totalVehicles === 0) {
    return [];
  }

  // Calculate utilization per day
  const utilizationByDate = new Map<string, number>();

  // Initialize all dates with 0
  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    const dateKey = date.toISOString().split('T')[0];
    utilizationByDate.set(dateKey, 0);
  }

  // Count active rentals per day
  rentals.forEach((rental) => {
    const start = new Date(rental.startDate);
    const end = new Date(rental.endDate);

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const dateKey = d.toISOString().split('T')[0];
      if (utilizationByDate.has(dateKey)) {
        utilizationByDate.set(dateKey, (utilizationByDate.get(dateKey) || 0) + 1);
      }
    }
  });

  // Convert to percentages
  return Array.from(utilizationByDate.entries())
    .map(([date, count]) => ({
      date,
      utilization: parseFloat(((count / totalVehicles) * 100).toFixed(1)),
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

/**
 * Get satisfaction trend data
 * @param days Number of days to look back
 * @returns Array of daily satisfaction data
 */
export async function getSatisfactionTrend(days: number = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const feedback = await prisma.feedback.findMany({
    where: {
      createdAt: {
        gte: startDate,
      },
    },
    select: {
      createdAt: true,
      rating: true,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  // Group by date and calculate average
  const ratingsByDate = new Map<string, number[]>();

  feedback.forEach((fb) => {
    const dateKey = fb.createdAt.toISOString().split('T')[0];
    const ratings = ratingsByDate.get(dateKey) || [];
    ratings.push(fb.rating);
    ratingsByDate.set(dateKey, ratings);
  });

  // Calculate averages
  return Array.from(ratingsByDate.entries()).map(([date, ratings]) => ({
    date,
    satisfaction: parseFloat(
      (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(2)
    ),
    count: ratings.length,
  }));
}
