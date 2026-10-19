# Week 5 — Market Statistics Agent

## Objective

Build a Market Statistics Agent for IDX Exchange that analyzes historical sold-property data from MySQL and generates readable city-level real estate market reports.

## Work Completed

- Reused the Week 3 MySQL database connection.
- Inspected the `california_sold` table and verified the `CloseDate` format.
- Added date filtering to exclude future-dated sales.
- Implemented six market statistics:
  - Total sold properties
  - Average sale price
  - Median sale price
  - Average days on market
  - Average price per square foot
  - Average list-to-close price ratio
- Implemented monthly sales trends for the last 12 months.
- Created formatting functions for currency, percentages, and days on market.
- Integrated the calculations into `generateMarketReport(city)`.

## Testing

Successfully tested the Market Statistics Agent using San Diego data.

| Statistic | Result |
|---|---|
| Total sold properties | 4,620 |
| Average sale price | $1,173,090 |
| Median sale price | $950,000 |
| Average days on market | 27.6 days |
| Average price per square foot | $724.81 |
| Average list-to-close ratio | 99.46% |

The monthly trends query returned data from March through September 2026. Although the query covers the last 12 months, only seven months contained matching records.

## Files Created

- `Week5/inspectSoldColumns.ts`
- `Week5/marketStatistics.ts`
- `Week5/monthlyMarketTrends.ts`
- `Week5/formatMarketStatistics.ts`
- `Week5/marketStatisticsAgent.ts`
- `Week5/testMarketStatistics.ts`
- `Week5/testMonthlyMarketTrends.ts`
- `Week5/testFormatMarketStatistics.ts`
- `Week5/testMarketStatisticsAgent.ts`

## Current Limitations

- Overall statistics use all matching historical sales rather than a specific reporting period.
- Monthly trends include only months with matching sales records.
- The agent currently runs as a TypeScript function and has not yet been integrated into OpenClaw or a messaging interface.

## Outcome

Successfully developed and tested a read-only Market Statistics Agent that produces city-level real estate statistics and monthly sales trends using the IDX Exchange MySQL database.
