export interface UserSession {
  city?: string;
  maxPrice?: number;
  beds?: number;
  baths?: number;
  type?: string;
  pool?: boolean;
  lastResults?: unknown[];
  conversationStep?: string;
}

const sessions = new Map<string, UserSession>();

export function getSession(userId: string): UserSession {
  let session = sessions.get(userId);

  if (!session) {
    session = {
      conversationStep: "start",
    };

    sessions.set(userId, session);
  }

  return session;
}

export function updateSession(
  userId: string,
  updates: Partial<UserSession>
): UserSession {
  const session = getSession(userId);

  const updatedSession: UserSession = {
    ...session,
    ...updates,
  };

  sessions.set(userId, updatedSession);

  return updatedSession;
}

export function clearSession(userId: string): void {
  sessions.delete(userId);
}
