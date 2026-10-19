import { pool } from "../Week3/dbConnection";
import { getMarketStatistics } from "./marketStatistics";

async function main() {
  const city = "San Diego";

  const statistics = await getMarketStatistics(city);

  console.log(`Market Statistics for ${city}`);
  console.table([statistics]);
}

main()
  .catch((error) => {
    console.error("Market statistics test failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await pool.end();
  });
