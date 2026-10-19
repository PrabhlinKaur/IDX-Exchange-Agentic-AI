import { UserSession } from "./sessionMemory";

export function getNextQuestion(
  session: UserSession
): string | null {
  if (!session.city) {
    return "Which city would you like to search in?";
  }

  if (session.maxPrice === undefined) {
    return "What is your maximum budget?";
  }

  if (session.beds === undefined) {
    return "How many bedrooms do you need?";
  }

  if (session.baths === undefined) {
    return "How many bathrooms do you need?";
  }

  return null;
}
