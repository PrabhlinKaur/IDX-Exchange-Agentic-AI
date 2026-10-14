
import { parsePropertyQuery } from "../Week2/property-search/scripts/propertySearch.ts";
import { searchProperties } from "./propertyQueries.ts";
import { pool } from "./dbConnection.ts";

async function testNaturalLanguageSearch() {
  const query = "Find me a 3BR 2BA condo in Irvine under $1.5M";

  try {
    console.log("User query:", query);

    const filters = await parsePropertyQuery(query);
    console.log("\nParsed filters:", filters);

    const properties = await searchProperties(filters);

    console.log("\nMatching properties:");
    console.log(JSON.stringify(properties, null, 2));

    console.log(`\nReturned ${properties.length} properties.`);

  } catch (error) {
    console.error("Search failed:", error);
  } finally {
    await pool.end();
  }
}

testNaturalLanguageSearch();
