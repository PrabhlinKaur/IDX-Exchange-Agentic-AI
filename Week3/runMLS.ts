
import { parsePropertyQuery } from "../Week2/property-search/scripts/propertySearch.ts";
import { unifiedPropertySearch, type ListingStatus } from "./unifiedPropertySearch.ts";
import { pool } from "./dbConnection.ts";

async function main() {
  try {
    const query = process.argv[2];

    if (!query) {
      console.error("Please provide a property search query.");
      process.exitCode = 1;
      return;
    }

    const status: ListingStatus = /\b(sold|recent sales|closed)\b/i.test(query)
      ? "sold"
      : "active";

    const filters = await parsePropertyQuery(query);

    const results = await unifiedPropertySearch(filters, status);

    console.log(results);
  } catch (error) {
    console.error("MLS search failed:", error);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

main();
