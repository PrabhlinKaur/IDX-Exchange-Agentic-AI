import {
  normalizeQuery,
  parsePropertyQuery
} from "./property-search/scripts/propertySearch.ts";

async function test() {
  const queries = [
    // 1. Standard query
    "Show me 3-bedroom condos in Irvine under $1.5M with a pool",

    // 2. Bedroom/bathroom abbreviations
    "Find me a 4BR 3BA single-family home in San Diego under $2M",

    // 3. Different capitalization
    "I WANT A 2BR CONDO IN LOS ANGELES UNDER $900K",

    // 4. Extra whitespace
    "Show me    3BR    condos   in   Irvine   under   $1.2M",

    // 5. Commas in sentence
    "Show me 3BR condos in Anaheim, under $800K, with a pool",

    // 6. Full stop
    "Find 3-bedroom homes in Pasadena with a view.",

    // 7. Quotes
    "\"Show me 2BR 2BA condos in Irvine under $1M\"",

    // 8. Square-foot abbreviation
    "Find a 3BR condo in Carlsbad with 1,500 sqft",

    // 9. sq ft variation
    "Show me 4BR homes in Newport Beach with 2,500 sq ft under $3M",

    // 10. Decimal bathroom
    "Find a 4BR 3.5BA home in Laguna Beach under $4M",

    // 11. "below" instead of "under"
    "Show me 2BR condos in Irvine below $750K",

    // 12. "less than" instead of "under"
    "Find a townhouse in Costa Mesa less than $950K",

    // 13. "max" instead of "under"
    "I want a 3BR condo in Anaheim max $850K",

    // 14. Lowercase informal query
    "need 3br 2ba condo in irvine below $1.5m",

    // 15. Minimal query
    "condo in Irvine",

    // 16. No city
    "Show me 3BR condos under $1M with a pool",

    // 17. No price
    "Find a 4BR single-family home in San Diego with a view",

    // 18. Multiple formatting inconsistencies
    "   FIND   3BR, 2BA condos in Irvine, below $1.25M.   ",

    // 19. Pool + view + square footage
    "Show me 5BR 4BA single-family homes in Laguna Beach under $4M with 3,000 sqft with a pool and with a view",

    // 20. Townhouse with multiple variations
    "'Need a 3BD 2.5BA townhouse in Costa Mesa below $1.1M with 1,800 sqft.'"
  ];

  for (let i = 0; i < queries.length; i++) {
    const normalized = normalizeQuery(queries[i]);
    const result = await parsePropertyQuery(normalized);

    console.log(`\n========== Test ${i + 1} ==========`);
    console.log("Original:  ", queries[i]);
    console.log("Normalized:", normalized);
    console.log("Result:    ", result);
  }
}

test();
