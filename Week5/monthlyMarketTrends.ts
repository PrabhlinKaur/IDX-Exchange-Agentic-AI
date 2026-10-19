import { pool } from "../Week3/dbConnection";
import type { RowDataPacket } from "mysql2";

interface MonthlyMarketTrend extends RowDataPacket {
  month: string;
  totalSold: number;
  averageSalePrice: number | null;
}

export async function getMonthlyMarketTrends(
  city: string
): Promise<MonthlyMarketTrend[]> {
  const [rows] = await pool.execute<MonthlyMarketTrend[]>(
    `
    SELECT
      DATE_FORMAT(
        STR_TO_DATE(CloseDate, '%Y-%m-%d'),
        '%Y-%m'
      ) AS month,
      COUNT(*) AS totalSold,
      AVG(ClosePrice) AS averageSalePrice
    FROM california_sold
    WHERE City = ?
      AND ClosePrice > 0
      AND CloseDate REGEXP '^[0-9]{4}-[0-9]{2}-[0-9]{2}$'
      AND STR_TO_DATE(CloseDate, '%Y-%m-%d')
          BETWEEN DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
          AND CURDATE()
    GROUP BY month
    ORDER BY month ASC
    `,
    [city]
  );

  return rows;
}
