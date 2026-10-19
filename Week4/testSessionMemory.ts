import {
  getSession,
  updateSession,
  clearSession,
} from "./sessionMemory";

// Test 1: Create a new session
const userId = "testUser123";

console.log("TEST 1: Create session");
console.log(getSession(userId));

// Test 2: Save the user's city
console.log("\nTEST 2: Save city");
updateSession(userId, { city: "Irvine" });
console.log(getSession(userId));

// Test 3: Add budget and bedrooms
console.log("\nTEST 3: Update preferences");
updateSession(userId, {
  maxPrice: 1200000,
  beds: 3,
});
console.log(getSession(userId));

// Test 4: Clear the session
console.log("\nTEST 4: Clear session");
clearSession(userId);
console.log(getSession(userId));
