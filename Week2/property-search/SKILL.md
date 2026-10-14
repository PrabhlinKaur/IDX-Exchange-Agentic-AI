---
name: property-search
description: "Parse natural-language real estate property searches into structured property filter objects."
---

# Property Search

Use this skill when a user provides a natural-language property search request.

The skill converts the user's query into structured property filters that can later be used to search MLS property data.

## Supported filters

- City
- Maximum price
- Bedrooms
- Bathrooms
- Square footage
- Property type
- Pool
- View

## Query processing

The parser normalizes common variations before extracting filters, including:

- BR / BD → bedrooms
- BA → bathrooms
- sqft / sq ft → square feet
- below / less than / max → under
- capitalization
- extra whitespace
- quotation marks
- common punctuation

## Command

Run:

```bash
node {baseDir}/scripts/runPropertySearch.ts "<property query>"
```
