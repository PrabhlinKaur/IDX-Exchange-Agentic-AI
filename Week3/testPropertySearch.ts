import { formatProperties, type PropertyListing } from "./formatProperties.ts";
import { searchProperties } from "./propertyQueries.ts";
import { pool } from "./dbConnection.ts";

async function testPropertySearch() {
  try {
    console.log("Searching for properties in Irvine...\n");

   const properties = await searchProperties({
  city: "Irvine",
  maxPrice: 1500000,
  beds: 3,
  baths: 2
}, 2);

console.log("Formatted property results:\n");
console.log(formatProperties(properties as PropertyListing[]));

    if (Array.isArray(properties)) {
      console.log(`\nFound ${properties.length} properties (maximum 10).`);
    }

  } catch (error) {
    console.error("Property search failed:", error);
  } finally {
    await pool.end();
  }
}

testPropertySearch();
