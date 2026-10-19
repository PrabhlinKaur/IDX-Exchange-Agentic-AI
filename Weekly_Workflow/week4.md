# Week 4 — Conversational Property Search Agent

## IDX Exchange | Agentic AI Engineering Internship

### Objective

Build a multi-turn conversational property search agent that remembers user preferences, asks follow-up questions, and retrieves matching MLS property listings from a MySQL database.

This week extends the property search functionality developed in Week 3.

## Features Implemented

### 1. Session Memory

Created a session memory system that stores property search preferences for each user.

Stored preferences include:

- City
- Maximum budget
- Minimum bedrooms
- Minimum bathrooms
- Property type
- Pool preference (supported by the session data structure)
- Conversation step

Implemented functions to retrieve, update, and reset user sessions.

### 2. Conversational Follow-Up Questions

The agent collects missing search preferences through a guided conversation.

Example:

**User:** Find homes in Irvine

**Agent:** What is your maximum budget?

**User:** 1.5 million

**Agent:** How many bedrooms do you need?

**User:** 3 bedrooms

**Agent:** How many bathrooms do you need?

**User:** 2 bathrooms

After collecting the required preferences, the agent searches the MLS database.

### 3. MySQL Property Search Integration

Connected the conversation agent to the Week 3 property search functionality.

The agent queries the `rets_property` table and returns matching active listings.

Property results include:

- Property address and city
- Listing price
- Bedrooms and bathrooms
- Square footage
- Property type
- Photo count
- Listing ID

### 4. Conversational Search Refinement

Implemented follow-up requests that update existing search preferences without restarting the conversation.

Supported refinements include:

- **Budget:** "Only show me homes under $900,000"
- **Bedrooms:** "Show me homes with at least 4 bedrooms"
- **Bathrooms:** "Show me homes with at least 3 bathrooms"
- **Property type:** "Show me only townhouses"

After each refinement, the agent updates the user's session and performs another database search.

### 5. Conversation Reset

Implemented the `reset` command to clear stored search preferences.

After resetting, the agent asks:

"Which city would you like to search in?"

## Project Files

| File | Purpose |
|---|---|
| `sessionMemory.ts` | Stores and manages user sessions |
| `conversationAgent.ts` | Determines the next follow-up question |
| `searchFromSession.ts` | Converts session preferences into MLS search filters |
| `handleConversation.ts` | Processes messages and search refinements |
| `testSessionMemory.ts` | Tests session storage |
| `testConversationAgent.ts` | Tests follow-up questions |
| `testSearchFromSession.ts` | Tests database search integration |
| `testHandleConversation.ts` | Tests the complete guided conversation |
| `testRefinement.ts` | Tests search refinements and reset behavior |

## Testing

Run the conversation test:

```bash
npx tsx testHandleConversation.ts
```

Run the refinement and reset test:

```bash
npx tsx testRefinement.ts
```

### Verified Results

The tests confirmed that the agent can:

1. Collect city, budget, bedroom, and bathroom preferences.
2. Retrieve matching active MLS listings from MySQL.
3. Display listing details, including photo counts.
4. Update the maximum budget while preserving previous preferences.
5. Refine bedroom, bathroom, and property-type requirements.
6. Return a no-results message when no listings match.
7. Reset the session and begin a new search.

## Current Limitations

- The conversation flow uses rule-based message parsing rather than unrestricted natural-language understanding.
- Pool preferences are represented in session memory and search filters, but conversational pool refinement has not yet been implemented.
- Session memory is stored in an in-memory map and does not persist after the process restarts.
- WhatsApp integration has not yet been connected or tested.

## Week 4 Outcome

Implemented and locally tested a multi-turn conversational property search agent that maintains user preferences, retrieves MLS listings from MySQL, supports iterative search refinement, and resets conversations.

The agent is ready for further integration and testing in later project stages.
