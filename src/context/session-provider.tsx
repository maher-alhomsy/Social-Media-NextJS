"use client";

import { createContext, PropsWithChildren, useContext } from "react";

import { Session, User } from "lucia";

interface SessionContext {
  user: User;
  session: Session;
}

interface Props extends PropsWithChildren<{ value: SessionContext }> {}

const SessionContext = createContext<SessionContext | null>(null);

const SessionProvider = ({ value, children }: Props) => {
  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};

export default SessionProvider;

export const useSession = () => {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }

  return context;
};
