import { getMarketStatistics } from "./marketStatistics";
import { getMonthlyMarketTrends } from "./monthlyMarketTrends";

import {
  formatCurrency,
  formatPercentage,
  formatDays,
  formatPricePerSqFt,
} from "./formatMarketStatistics";

export async function generateMarketReport(city: string): Promise<string> {
  const statistics = await getMarketStatistics(city);
  const trends = await getMonthlyMarketTrends(city);

  const monthlyTrends = trends.length
    ? trends
        .map(
          (trend) =>
            `${trend.month}: ${trend.totalSold} sales, ` +
            `average ${formatCurrency(trend.averageSalePrice)}`
        )
        .join("\n")
    : "No sales data available for the last 12 months.";

  return `
Market Statistics Report — ${city}

Total Sold Properties: ${statistics.totalSold}
Average Sale Price: ${formatCurrency(statistics.averageSalePrice)}
Median Sale Price: ${formatCurrency(statistics.medianSalePrice)}
Average Days on Market: ${formatDays(statistics.averageDaysOnMarket)}
Average Price per Sq. Ft.: ${formatPricePerSqFt(statistics.averagePricePerSqFt)}
Average List-to-Close Ratio: ${formatPercentage(statistics.averageListToCloseRatio)}

Historical statistics include all matching sales through today.

Monthly Market Trends (Last 12 Months):
${monthlyTrends}
`.trim();
}
