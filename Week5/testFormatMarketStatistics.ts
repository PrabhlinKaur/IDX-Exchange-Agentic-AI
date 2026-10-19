import {
  formatCurrency,
  formatPercentage,
  formatDays,
  formatPricePerSqFt,
} from "./formatMarketStatistics";

console.log("Market Statistics Formatting Test");

console.log("Average Sale Price:", formatCurrency(1173090.2348484849));
console.log("Median Sale Price:", formatCurrency(950000));
console.log("List-to-Close Ratio:", formatPercentage(99.4551885759983));
console.log("Average Days on Market:", formatDays("27.6054"));
console.log("Price per Square Foot:", formatPricePerSqFt(724.8114070689859));
