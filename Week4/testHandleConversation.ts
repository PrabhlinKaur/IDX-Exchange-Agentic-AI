import { handleConversation } from "./handleConversation";
import { clearSession } from "./sessionMemory";

async function main() {
  const userId = "week4ConversationTest";

  // Start with a fresh session
  clearSession(userId);

  const messages = [
    "Find homes in Irvine",
    "1.5 million",
    "3 bedrooms",
    "2 bathrooms",
  ];

  for (const message of messages) {
    console.log(`\nUSER: ${message}`);

    const response = await handleConversation(userId, message);

    console.log(`AGENT: ${response}`);
  }
}

main().catch((error) => {
  console.error("Conversation test failed:", error);
  process.exitCode = 1;
});
