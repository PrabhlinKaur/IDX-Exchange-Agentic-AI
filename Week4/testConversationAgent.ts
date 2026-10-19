import { getNextQuestion } from "./conversationAgent";
import {
  getSession,
  updateSession,
  clearSession,
} from "./sessionMemory";

const userId = "testUser123";

// Start with a fresh conversation
clearSession(userId);

console.log("TEST 1: New user");
console.log("Agent:", getNextQuestion(getSession(userId)));

// User provides a city
updateSession(userId, { city: "Irvine" });

console.log("\nTEST 2: City provided");
console.log("Agent:", getNextQuestion(getSession(userId)));

// User provides a budget
updateSession(userId, { maxPrice: 1200000 });

console.log("\nTEST 3: Budget provided");
console.log("Agent:", getNextQuestion(getSession(userId)));

// User provides bedrooms
updateSession(userId, { beds: 3 });

console.log("\nTEST 4: Bedrooms provided");
console.log("Agent:", getNextQuestion(getSession(userId)));

// User provides bathrooms
updateSession(userId, { baths: 2 });

console.log("\nTEST 5: All preferences provided");
console.log("Agent:", getNextQuestion(getSession(userId)));
