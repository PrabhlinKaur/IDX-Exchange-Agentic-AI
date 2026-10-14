---
name: mls-search
description: Search real estate listings in the IDX Exchange MySQL database, including active properties and sold properties, using natural-language requests.
---

# MLS Search

Use this skill when a user asks to find, search, or compare real estate listings in the IDX Exchange database.

## Supported searches

- Active property listings
- Sold property listings
- City
- Maximum price
- Minimum bedrooms
- Minimum bathrooms
- Minimum square footage
- Property type
- Pool preference
- View preference

## How to run

Run the MLS search script using the terminal:

```bash
cd ~/Documents/IDX_Exchange/Week3
node runMLS.ts '<user property search request>'
```

Pass the user's property search request as one quoted argument.

Use single quotes around the query to preserve dollar signs in prices such as `$1.5M`.

## Listing status

- Search active listings by default.
- If the user requests sold properties, recent sales, or closed listings, search sold properties.

## Results

Return the property listings produced by the script.

Do not invent properties, listing IDs, prices, or property details.

If the script returns no matching properties, explain that no results matched the requested filters.

## Data source

- Active listings: `rets_property`
- Sold listings: `california_sold`

The database is accessed through the Week 3 TypeScript code using parameterized SQL queries.
