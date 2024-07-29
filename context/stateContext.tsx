"use client";

import { createContext, useContext, useEffect, useState } from "react";
import firebase from "@/firebase";
import { Profile } from "@/types/profile";

export interface contextType {
  isAdmin: boolean;
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
}

const TheContext = createContext<contextType | undefined>(undefined);

const ContextProvider = ({ children }: any) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribeAuth = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const profileRef = firebase
          .firestore()
          .collection("profiles")
          .doc(user.uid);
        const profileDoc = await profileRef.get();

        if (profileDoc.exists) {
          const profileData = profileDoc.data() as Profile;
          setIsAdmin(profileData?.isAdmin);
        } else {
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
    });

    // Cleanup function to unsubscribe from the auth listener
    return () => unsubscribeAuth();
  }, [isAdmin]);

  return (
    <TheContext.Provider value={{ isAdmin, setIsAdmin }}>
      {children}
    </TheContext.Provider>
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
