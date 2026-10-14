
import { unifiedPropertySearch } from "./unifiedPropertySearch.ts";
import { pool } from "./dbConnection.ts";

async function testUnifiedSearch() {
  const filters = {
    city: "Irvine",
    maxPrice: 1500000,
    beds: 3,
    baths: 2,
    type: "Condominium"
  };

  try {
    console.log("========== ACTIVE LISTINGS ==========\n");

    const activeResults = await unifiedPropertySearch(
      filters,
      "active",
      1
    );

    console.log(activeResults);

    console.log("\n========== SOLD LISTINGS ==========\n");

    const soldResults = await unifiedPropertySearch(
      filters,
      "sold",
      1
    );

    console.log(soldResults);

  } catch (error) {
    console.error("Unified search failed:", error);
  } finally {
    await pool.end();
  }
}

testUnifiedSearch();
