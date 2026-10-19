import {
  clearSession,
  updateSession,
  getSession,
} from "./sessionMemory";

import { searchFromSession } from "./searchFromSession";

async function main() {
  const userId = "week4TestUser";

  // Start with a fresh session
  clearSession(userId);

  // Simulate preferences collected during a conversation
  updateSession(userId, {
    city: "Irvine",
    maxPrice: 1500000,
    beds: 3,
  });

  console.log("=== WEEK 4 SESSION PREFERENCES ===");
  console.log(getSession(userId));

  console.log("\n=== MLS PROPERTY SEARCH RESULTS ===");

  // Search MySQL using the saved preferences
  const results = await searchFromSession(userId);

  console.log(results);
}

main().catch((error) => {
  console.error("MLS search failed:", error);
  process.exitCode = 1;
});
