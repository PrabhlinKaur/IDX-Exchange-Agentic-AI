import { getSession } from "./sessionMemory";
import { unifiedPropertySearch } from "../Week3/unifiedPropertySearch";
import type { PropertyFilters } from "../Week3/propertyQueries";

export async function searchFromSession(
  userId: string
): Promise<string> {
  // Retrieve the user's saved preferences
  const session = getSession(userId);

  // Convert session preferences into MLS search filters
  const filters: PropertyFilters = {
    city: session.city ?? null,
    maxPrice: session.maxPrice ?? null,
    beds: session.beds ?? null,
    baths: session.baths ?? null,
    type: session.type ?? null,
    pool:
      session.pool === undefined
        ? null
        : session.pool
          ? "Yes"
          : "No",
  };

  // Search the existing Week 3 MLS database
  const results = await unifiedPropertySearch(
    filters,
    "active",
    1
  );

  return results;
}
