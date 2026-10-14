export interface PropertyFilters {
  city: string | null;
  maxPrice: number | null;
  beds: number | null;
  baths: number | null;
  sqft: number | null;
  type: string | null;
  pool: string | null;
  hasView: string | null;
}

export function normalizeQuery(query: string): string {
  let normalized = query;

  // Convert text to lowercase
  normalized = normalized.toLowerCase();

  // Remove quotation marks
  normalized = normalized.replace(/["'“”‘’]/g, "");

  // Remove commas used as punctuation
  // Keep commas that are inside numbers such as 1,500
  normalized = normalized.replace(/,(?!\d)/g, " ");

  // Remove periods used as sentence punctuation
  // Keep decimal points such as 1.5
  normalized = normalized.replace(/\.(?!\d)/g, " ");

  // Normalize bedroom abbreviations
  normalized = normalized.replace(
    /\b(\d+)\s*(br|bd)\b/g,
    "$1 bedrooms"
  );

  // Normalize bathroom abbreviations
  normalized = normalized.replace(
    /\b(\d+(?:\.\d+)?)\s*ba\b/g,
    "$1 bathrooms"
  );

  // Normalize square footage abbreviations
  normalized = normalized.replace(
    /\b([\d,]+)\s*(sqft|sq\.?\s*ft\.?)\b/g,
    "$1 square feet"
  );

  // Normalize price wording
  normalized = normalized.replace(/\bbelow\b/g, "under");
  normalized = normalized.replace(/\bless than\b/g, "under");
  normalized = normalized.replace(/\bmax\b/g, "under");

  // Normalize tabs, new lines, and repeated spaces
  normalized = normalized.replace(/\s+/g, " ").trim();

  return normalized;
}


export async function parsePropertyQuery(query: string) {
  query = normalizeQuery(query);

  const cityMatch = query.match(
    /in ([A-Za-z\s]+?)(?:\s+under|\s+with|\s+at|$)/i
  );

  const city = cityMatch?.[1]?.trim() || null;


  // Extract maximum price: $1.5M, $900K, $1,250,000
  const priceMatch = query.match(
    /\bunder\s+\$?\s*(\d[\d,]*(?:\.\d+)?)\s*(million|thousand|m|k)?\b/i
  );

  let maxPrice: number | null = null;

  if (priceMatch) {
    const value = Number(priceMatch[1].replace(/,/g, ""));
    const unit = priceMatch[2]?.toLowerCase();

    if (unit === "m" || unit === "million") {
      maxPrice = value * 1_000_000;
    } else if (unit === "k" || unit === "thousand") {
      maxPrice = value * 1_000;
    } else {
      maxPrice = value;
    }
  }


    const bedsMatch = query.match(/(\d+)[-\s]*bed(?:room)?s?/i);

    const beds = bedsMatch
    ? parseInt(bedsMatch[1])
    : null;

    // Extract bathrooms
    const bathsMatch = query.match(/(\d+(?:\.\d+)?)[-\s]*bath/i);

    const baths = bathsMatch
    ? parseFloat(bathsMatch[1])
    : null;


    // Extract square footage
    const sqftMatch = query.match(
    /([\d,]+)\s*(?:sq\s*ft|sqft|square\s*feet)/i
    );

    const sqft = sqftMatch
    ? parseInt(sqftMatch[1].replace(/,/g, ""))
    : null;


    // Extract property type
    let type: string | null = null;

    if (/\bcondo(?:minium)?s?\b/i.test(query)) {
    type = "Condominium";
    } else if (/\bsingle[-\s]?family\b/i.test(query)) {
    type = "Single Family";
    } else if (/\btownhome?s?\b|\btownhouse?s?\b/i.test(query)) {
    type = "Townhouse";
    }

        // Extract pool preference
    const pool = /\bwith (?:a )?pool\b/i.test(query)
    ? "True"
    : null;


    // Extract view preference
    const hasView = /\bwith (?:a )?view\b/i.test(query)
    ? "True"
    : null;

  return {
    city,
    maxPrice,
    beds,
    baths,
    sqft,
    type,
    pool,
    hasView
  };
}
