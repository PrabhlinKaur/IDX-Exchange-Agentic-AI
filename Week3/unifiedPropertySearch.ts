
import { searchProperties, type PropertyFilters } from "./propertyQueries.ts";
import { searchSoldProperties } from "./soldPropertyQueries.ts";
import { formatProperties, type PropertyListing } from "./formatProperties.ts";

export type ListingStatus = "active" | "sold";

export async function unifiedPropertySearch(
  filters: PropertyFilters,
  status: ListingStatus = "active",
  page: number = 1
): Promise<string> {

  const properties = status === "sold"
    ? await searchSoldProperties(filters, page)
    : await searchProperties(filters, page);

  const heading = status === "sold"
    ? "Sold Property Results"
    : "Active Property Results";

  return [
    heading,
    `Page: ${page}`,
    "",
    formatProperties(properties as PropertyListing[])
  ].join("\n");
}
