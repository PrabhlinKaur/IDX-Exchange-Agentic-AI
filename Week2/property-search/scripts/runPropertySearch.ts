import {
  normalizeQuery,
  parsePropertyQuery
} from "./propertySearch.ts";

async function main() {
  const query = process.argv.slice(2).join(" ");

  if (!query) {
    console.error("Please provide a property search query.");
    process.exit(1);
  }

  const normalizedQuery = normalizeQuery(query);
  const filters = await parsePropertyQuery(normalizedQuery);

  console.log(JSON.stringify(filters, null, 2));
}

main();
