import { handleConversation } from "./handleConversation";
import { clearSession, getSession } from "./sessionMemory";

async function main() {
  const userId = "week4RefinementTest";

  clearSession(userId);

  const messages = [
    "Find homes in Irvine",
    "1.5 million",
    "3 bedrooms",
    "2 bathrooms",
    "Only show me homes under $900,000",
    "Show me homes with at least 4 bedrooms",
    "Show me homes with at least 3 bathrooms",
    "Show me only townhouses",
    "reset",
  ];

  for (const message of messages) {
    console.log(`\nUSER: ${message}`);

    const response = await handleConversation(userId, message);

    console.log(`AGENT: ${response}`);
  }

  console.log("\n=== FINAL SESSION ===");
  console.log(getSession(userId));
}

main().catch((error) => {
  console.error("Refinement test failed:", error);
  process.exitCode = 1;
});
