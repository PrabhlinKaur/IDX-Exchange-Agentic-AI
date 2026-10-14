
import { pool } from "./dbConnection.ts";

// Filters produced by our Week 2 property-search parser.
export interface PropertyFilters {
  city?: string | null;
  maxPrice?: number | null;
  beds?: number | null;
  baths?: number | null;
  sqft?: number | null;
  type?: string | null;
  pool?: string | null;
  hasView?: string | null;
}

export async function searchProperties(
  filters: PropertyFilters,
  page: number = 1,
  pageSize: number = 10
) {
  let sql = `
    SELECT
      L_ListingID,
      L_Address,
      L_City,
      L_SystemPrice,
      L_Keyword2 AS bedrooms,
      LM_Dec_3 AS bathrooms,
      LM_Int2_3 AS squareFeet,
      L_Type_ AS propertyType
    FROM rets_property
    WHERE L_Status = 'Active'
  `;

  const values: Array<string | number> = [];

  if (filters.city) {
    sql += " AND L_City = ?";
    values.push(filters.city);
  }

  if (filters.maxPrice != null) {
    sql += " AND L_SystemPrice <= ?";
    values.push(filters.maxPrice);
  }

  if (filters.beds != null) {
    sql += " AND L_Keyword2 >= ?";
    values.push(filters.beds);
  }

  if (filters.baths != null) {
    sql += " AND LM_Dec_3 >= ?";
    values.push(filters.baths);
  }

  if (filters.sqft != null) {
    sql += " AND LM_Int2_3 >= ?";
    values.push(filters.sqft);
  }

  if (filters.type) {
    const typeMapping: Record<string, string> = {
      "Single Family": "SingleFamilyResidence",
      "Condominium": "Condominium",
      "Townhouse": "Townhouse"
    };

    sql += " AND L_Type_ = ?";
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

// Keep pagination values within safe limits.
page = Number.isSafeInteger(page) ? Math.max(1, page) : 1;
pageSize = Number.isSafeInteger(pageSize)
  ? Math.min(50, Math.max(1, pageSize))
  : 10;

const offset = (page - 1) * pageSize;

sql += " ORDER BY L_SystemPrice ASC LIMIT ? OFFSET ?";
values.push(pageSize, offset);

  const [rows] = await pool.execute(sql, values);
  return rows;
}
