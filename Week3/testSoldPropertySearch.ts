
import { searchSoldProperties } from "./soldPropertyQueries.ts";
import { formatProperties, type PropertyListing } from "./formatProperties.ts";
import { pool } from "./dbConnection.ts";

async function testSoldPropertySearch() {
  try {
    console.log("Searching sold condominiums in Irvine...\n");

    const properties = await searchSoldProperties({
      city: "Irvine",
      maxPrice: 1500000,
      beds: 3,
      baths: 2,
      type: "Condominium"
    });

    console.log("Sold property results:\n");
    console.log(formatProperties(properties as PropertyListing[]));

    console.log(`\nReturned ${properties.length} sold properties.`);

  } catch (error) {
    console.error("Sold-property search failed:", error);
  } finally {
    await pool.end();
  }
}

testSoldPropertySearch();
