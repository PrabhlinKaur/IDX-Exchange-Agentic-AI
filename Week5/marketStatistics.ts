import { pool } from "../Week3/dbConnection";
import type { RowDataPacket } from "mysql2";

interface MarketStatistics extends RowDataPacket {
  totalSold: number;
  averageSalePrice: number | null;
  medianSalePrice: number | null;
  averageDaysOnMarket: number | null;
  averagePricePerSqFt: number | null;
  averageListToCloseRatio: number | null;
}

export async function getMarketStatistics(
  city: string
): Promise<MarketStatistics> {
  const [rows] = await pool.execute<MarketStatistics[]>(
    `
SELECT
  COUNT(*) AS totalSold,
  AVG(ClosePrice) AS averageSalePrice,
  AVG(
  CASE
    WHEN ListPrice > 0 THEN (ClosePrice / ListPrice) * 100
    ELSE NULL
  END
) AS averageListToCloseRatio,
  AVG(
  CASE
    WHEN LivingArea > 0 THEN ClosePrice / LivingArea
    ELSE NULL
  END
) AS averagePricePerSqFt,
  AVG(
    CASE
      WHEN DaysOnMarket >= 0 THEN DaysOnMarket
      ELSE NULL
    END
  ) AS averageDaysOnMarket,
  (
    SELECT AVG(middle_prices.ClosePrice)
    FROM (
      SELECT
        ClosePrice,
        ROW_NUMBER() OVER (ORDER BY ClosePrice) AS row_num,
        COUNT(*) OVER () AS total_count
      FROM california_sold
      WHERE City = ?
        AND ClosePrice > 0
        AND CloseDate REGEXP '^[0-9]{4}-[0-9]{2}-[0-9]{2}$'
        AND STR_TO_DATE(CloseDate, '%Y-%m-%d') <= CURDATE()
    ) AS middle_prices
    WHERE row_num IN (
      FLOOR((total_count + 1) / 2),
      FLOOR((total_count + 2) / 2)
    )
  ) AS medianSalePrice
FROM california_sold
    WHERE City = ?
      AND ClosePrice > 0
      AND CloseDate REGEXP '^[0-9]{4}-[0-9]{2}-[0-9]{2}$'
      AND STR_TO_DATE(CloseDate, '%Y-%m-%d') <= CURDATE()
    `,
    [city, city]
  );

  return rows[0];
}
