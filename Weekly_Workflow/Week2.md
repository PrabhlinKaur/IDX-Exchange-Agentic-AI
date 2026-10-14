# Week 2 – Natural Language Property Search

## Goal
Build a property search parser that converts a user's natural-language request into structured property filters.

### Example
User query:

"Show me 3-bedroom condos in Irvine under $1.5M with a pool."

Expected structured output:

- City: Irvine
- Maximum price: $1.5M
- Bedrooms: 3
- Property type: Condo
- Pool: Yes

---

## Step 1 – Create the Property Search File

Created `propertySearch.ts` to contain the natural-language property search logic.

---

## Step 2 – Define the Property Filter Structure

Created the `PropertyFilters` interface.

This defines the information that can be extracted from a user's property search, including:

- City
- Maximum price
- Bedrooms
- Bathrooms
- Square footage
- Property type
- Pool
- View

If a user does not specify a filter, its value can be `null`.

---

## Step 3 – Start the Query Parser

Created the `parsePropertyQuery()` function.

The function accepts the user's search request as text and begins extracting individual property filters.

The first filter being implemented is the city.

## Step 4 – Extract Maximum Price

Added logic to identify a maximum price from the user's query.

The parser recognizes price units such as `M` for millions and `K` for thousands and converts them into numeric values.

Example:

`under $1.5M` → `1500000`

## Step 5 – Create a Test File

Created `testPropertySearch.ts` to test the property search parser.

The tests will help verify that each filter is extracted correctly before adding more search features.

## Step 6 – Write the First Parser Test

Added the first test query to check whether the parser correctly extracts the city and maximum price.

Test query:

`Show me condos in Irvine under $1.5M`

Expected result:

- City: Irvine
- Maximum price: 1500000

## Step 7 – Set Up the TypeScript Environment

Confirmed that Node.js is installed.

Initialized the Week 2 folder as a Node.js project using npm so that TypeScript and other required packages can be managed locally.

## Step 8 – Extract Number of Bedrooms

Added logic to identify the number of bedrooms mentioned in the user's property search.

The parser supports formats such as:

- `3-bedroom`
- `3 bedroom`
- `3 bedrooms`

Example:

`3-bedroom condos` → `beds: 3`

## Step 9 – Add Bathrooms, Square Footage, and Property Type

Expanded the parser to extract three additional property filters:

- Bathrooms
- Square footage
- Property type

The parser can recognize examples such as:

- `2.5 baths` → `baths: 2.5`
- `2,000 sq ft` → `sqft: 2000`
- `condos` → `type: Condominium`

At this stage, the parser supports six structured filters:
city, maximum price, bedrooms, bathrooms, square footage, and property type.

## Step 10 – Add Pool and View Filters

Added the final two property filters:

- Pool
- View

The parser checks whether the user's query requests these features.

Examples:

`with a pool` → `pool: True`

`with a view` → `hasView: True`

The parser now supports all eight property search filters.

## Step 11 – Complete the Initial Parser

Completed the initial natural-language parser with support for eight property filters:

- City
- Maximum price
- Bedrooms
- Bathrooms
- Square footage
- Property type
- Pool
- View

A complete test query successfully returned all eight structured fields.

The next step is to validate the parser against at least 10 different natural-language property searches.

## Step 12 – Add Query Normalization

Added a preprocessing function, `normalizeQuery()`, to standardize common variations in user queries before they are passed to the property parser.

The normalization handles:

- Converting text to lowercase
- BR / BD → bedrooms
- BA → bathrooms
- sqft / sq ft → square feet
- below / less than / max → under
- Removing quotation marks
- Standardizing commas and periods while preserving numeric formats
- Removing extra spaces, tabs, and line breaks

This improves the parser's ability to handle informal and inconsistent WhatsApp-style property searches.


## Step 13 – Validate with 20 Varied Queries

Expanded testing from a single complete query to 20 different natural-language property searches.

The test cases included:

- Standard property searches
- BR, BD, and BA abbreviations
- Different capitalization
- Extra whitespace
- Quotes, commas, and periods
- sqft and sq ft variations
- Different price expressions such as under, below, less than, and max
- Decimal bathroom values
- Queries with missing optional filters
- Queries combining multiple filters such as pool, view, square footage, price, bedrooms, and bathrooms

Each query was first passed through `normalizeQuery()` and then through `parsePropertyQuery()`.

All 20 test queries successfully returned the expected structured property filters. Fields that were not specified by the user correctly returned `null`.
