"use client";

import { createContext, useContext, useEffect, useState } from "react";
import firebase from "@/firebase";

export interface contextType {
  isAdmin: boolean;
}

const TheContext = createContext<contextType | undefined>(undefined);

const ContextProvider = ({ children }: any) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribeAuth = firebase.auth().onAuthStateChanged((user) => {
      setIsAdmin(user?.email === "example@example.com");
    });

    // Cleanup function to unsubscribe from the auth listener
    return () => unsubscribeAuth();
  }, []);
  return (
    <TheContext.Provider value={{ isAdmin }}>{children}</TheContext.Provider>
  );
};

export function useStateContext() {
  const context = useContext(TheContext);
  if (!context) {
    throw new Error("useStateContext must be used within contextProvider!");
  }

  return context;
}

export { TheContext, ContextProvider };
