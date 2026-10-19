import { pool } from "../Week3/dbConnection";
import { getMonthlyMarketTrends } from "./monthlyMarketTrends";

async function main() {
  const city = "San Diego";

  const trends = await getMonthlyMarketTrends(city);

  console.log(`12-Month Market Trends for ${city}`);
  console.table(trends);
}

main()
  .catch((error) => {
    console.error("Monthly market trends test failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await pool.end();
  });
