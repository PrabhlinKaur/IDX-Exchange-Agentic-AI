
export interface PropertyListing {
  L_ListingID: string;
  L_Address: string | null;
  L_City: string | null;
  L_SystemPrice: number | null;
  bedrooms: number | null;
  bathrooms: string | number | null;
  squareFeet: number | null;
  propertyType: string | null;
}

export function formatProperties(
  properties: PropertyListing[]
): string {
  if (properties.length === 0) {
    return "No matching properties found.";
  }

  return properties.map((property, index) => {
    const price = property.L_SystemPrice == null
      ? "Price unavailable"
      : `$${property.L_SystemPrice.toLocaleString("en-US")}`;

    const sqft = property.squareFeet == null
      ? "N/A"
      : property.squareFeet.toLocaleString("en-US");

    const baths = property.bathrooms == null
      ? "N/A"
      : Number(property.bathrooms).toString();

    return [
      `${index + 1}. ${property.L_Address ?? "Address unavailable"}, ${property.L_City ?? "City unavailable"}`,
      `   Price: ${price}`,
      `   Beds: ${property.bedrooms ?? "N/A"} | Baths: ${baths} | Sq Ft: ${sqft}`,
      `   Type: ${property.propertyType ?? "N/A"}`,
      `   Listing ID: ${property.L_ListingID}`
    ].join("\n");
  }).join("\n\n");
}
