import { pool } from "../Week3/dbConnection";
import { generateMarketReport } from "./marketStatisticsAgent";

async function main() {
  const city = "San Diego";

  const report = await generateMarketReport(city);

  console.log(report);
}

main()
  .catch((error) => {
    console.error("Market Statistics Agent test failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await pool.end();
  });
