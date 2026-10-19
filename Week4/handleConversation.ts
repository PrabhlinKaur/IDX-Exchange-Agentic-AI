import {
  getSession,
  updateSession,
  clearSession,
} from "./sessionMemory";

import { getNextQuestion } from "./conversationAgent";
import { searchFromSession } from "./searchFromSession";

export async function handleConversation(
  userId: string,
  message: string
): Promise<string> {
  const input = message.trim();
  const session = getSession(userId);

// Refine the budget after an initial property search
if (session.conversationStep === "search") {
  const budgetMatch = input.match(
    /\b(?:under|below|less than|max(?:imum)?(?: budget)?)\s*\$?\s*([\d,]+(?:\.\d+)?)\s*(million|m|k|thousand)?\b/i
  );

  if (budgetMatch) {
    const amount = Number(budgetMatch[1].replace(/,/g, ""));
    const unit = budgetMatch[2]?.toLowerCase();

    const maxPrice =
      unit === "million" || unit === "m"
        ? amount * 1_000_000
        : unit === "k" || unit === "thousand"
          ? amount * 1_000
          : amount;

    if (!Number.isFinite(maxPrice) || maxPrice <= 0) {
      return "Please enter a valid maximum budget.";
    }

    updateSession(userId, { maxPrice });

    return await searchFromSession(userId);
  }
    // Refine the minimum number of bedrooms
  const bedroomMatch = input.match(
    /\b(\d+)\s*(?:\+)?\s*(?:bedrooms?|beds?)\b/i
  );

  if (bedroomMatch) {
    const beds = Number(bedroomMatch[1]);

    updateSession(userId, { beds });

    return await searchFromSession(userId);
  }

    // Refine the minimum number of bathrooms
  const bathroomMatch = input.match(
    /\b(\d+)\s*(?:\+)?\s*(?:bathrooms?|baths?)\b/i
  );

  if (bathroomMatch) {
    const baths = Number(bathroomMatch[1]);

    updateSession(userId, { baths });

    return await searchFromSession(userId);
  }

    // Refine the property type
  const typeMatch = input.match(
    /\b(condos?|condominiums?|townhouses?|single.family homes?)\b/i
  );

  if (typeMatch) {
    const requestedType = typeMatch[1].toLowerCase();

    const type =
      /condo|condominium/.test(requestedType)
        ? "Condominium"
        : /townhouse/.test(requestedType)
          ? "Townhouse"
          : "Single Family Residence";

    updateSession(userId, { type });

    return await searchFromSession(userId);
  }
}

  // Allow the user to restart their search
  if (/^(reset|restart|start over|new search)$/i.test(input)) {
    clearSession(userId);
    return getNextQuestion(getSession(userId))!;
  }

  // Interpret the answer to the current follow-up question
  if (!session.city) {
    const city = input
      .replace(/^(find|show me|search for)\s+(homes|houses|properties)?\s*(in\s+)?/i, "")
      .replace(/^in\s+/i, "")
      .trim();

    if (!city) {
      return "Which city would you like to search in?";
    }

    updateSession(userId, {
      city,
      conversationStep: "budget",
    });
  } else if (session.maxPrice === undefined) {
    const normalized = input.toLowerCase().replace(/[$,]/g, "");
    const match = normalized.match(/(\d+(?:\.\d+)?)\s*(million|m|k|thousand)?/);

    if (!match) {
      return "Please enter a budget, such as $1,200,000 or 1.2 million.";
    }

    const amount = Number(match[1]);
    const unit = match[2];

    const maxPrice =
      unit === "million" || unit === "m"
        ? amount * 1_000_000
        : unit === "k" || unit === "thousand"
          ? amount * 1_000
          : amount;

    if (maxPrice <= 0) {
      return "Please enter a budget greater than zero.";
    }

    updateSession(userId, {
      maxPrice,
      conversationStep: "bedrooms",
    });
  } else if (session.beds === undefined) {
    const beds = Number(input.match(/\d+/)?.[0]);

    if (!Number.isInteger(beds) || beds < 0) {
      return "How many bedrooms do you need? Please enter a number.";
    }

    updateSession(userId, {
      beds,
      conversationStep: "bathrooms",
    });
  } else if (session.baths === undefined) {
    const baths = Number(input.match(/\d+/)?.[0]);

    if (!Number.isInteger(baths) || baths < 0) {
      return "How many bathrooms do you need? Please enter a number.";
    }

    updateSession(userId, {
      baths,
      conversationStep: "search",
    });
  }

  const nextQuestion = getNextQuestion(getSession(userId));

  if (nextQuestion) {
    return nextQuestion;
  }

  // All required preferences are available
  return await searchFromSession(userId);
}
