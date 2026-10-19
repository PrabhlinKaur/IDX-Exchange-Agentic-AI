import { pool } from "../Week3/dbConnection";

async function main() {
  const [rows] = await pool.query(`
    SELECT
  City,
  CloseDate,
  ClosePrice,
  ListPrice,
  DaysOnMarket,
  LivingArea
FROM california_sold
WHERE CloseDate IS NOT NULL
  AND CloseDate REGEXP '^[0-9]{4}-[0-9]{2}-[0-9]{2}$'
  AND STR_TO_DATE(CloseDate, '%Y-%m-%d') <= CURDATE()
LIMIT 10
  `);

  console.table(rows);
  await pool.end();
}

main().catch((error) => {
  console.error("Column inspection failed:", error);
  process.exitCode = 1;
});
