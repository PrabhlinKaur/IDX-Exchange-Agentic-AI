
import { pool } from "./dbConnection.ts";
import type { PropertyFilters } from "./propertyQueries.ts";

export async function searchSoldProperties(
  filters: PropertyFilters,
  page: number = 1,
  pageSize: number = 10
) {
  let sql = `
    SELECT
      ListingKey AS L_ListingID,
      UnparsedAddress AS L_Address,
      City AS L_City,
      ClosePrice AS L_SystemPrice,
      BedroomsTotal AS bedrooms,
      BathroomsTotalInteger AS bathrooms,
      LivingArea AS squareFeet,
      PropertySubType AS propertyType,
      CloseDate AS soldDate
    FROM california_sold
    WHERE ClosePrice IS NOT NULL
  `;

  const values: Array<string | number> = [];

  if (filters.city) {
    sql += " AND City = ?";
    values.push(filters.city);
  }

  if (filters.maxPrice != null) {
    sql += " AND ClosePrice <= ?";
    values.push(filters.maxPrice);
  }

  if (filters.beds != null) {
    sql += " AND BedroomsTotal >= ?";
    values.push(filters.beds);
  }

  if (filters.baths != null) {
    sql += " AND BathroomsTotalInteger >= ?";
    values.push(filters.baths);
  }

  if (filters.sqft != null) {
    sql += " AND LivingArea >= ?";
    values.push(filters.sqft);
  }

  if (filters.type) {
    const typeMapping: Record<string, string> = {
      "Single Family": "SingleFamilyResidence",
      "Condominium": "Condominium",
      "Townhouse": "Townhouse"
    };

    sql += " AND PropertySubType = ?";
    values.push(typeMapping[filters.type] ?? filters.type);
  }

  if (filters.pool === "True") {
    sql += " AND PoolPrivateYN = ?";
    values.push("1");
  }

  if (filters.hasView === "True") {
    sql += " AND ViewYN = ?";
    values.push("1");
  }

  page = Number.isSafeInteger(page) ? Math.max(1, page) : 1;
  pageSize = Number.isSafeInteger(pageSize)
    ? Math.min(50, Math.max(1, pageSize))
    : 10;

  const offset = (page - 1) * pageSize;

  sql += " ORDER BY ClosePrice ASC, ListingKey ASC LIMIT ? OFFSET ?";
  values.push(pageSize, offset);

  const [rows] = await pool.execute(sql, values);
  return rows;
}
