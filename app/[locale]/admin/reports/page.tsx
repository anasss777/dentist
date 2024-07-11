"use client";

import firebase from "@/firebase";
import ReportsList from "@/components/Admin/ReportsList";
import React, { useEffect, useState } from "react";
import { Tip } from "@/types/tips";

const ReportsAdmin = () => {
  const [tips, setTips] = useState<Tip[]>([]);
  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("tips")
      .onSnapshot((snapshot) => {
        const newTips: Tip[] = []; // Create a new array to hold updated tips
        snapshot?.forEach((doc) => {
          newTips.push({
            tipId: doc.id,
            ...doc.data(),
          } as Tip);
        });

        const tipsWithComments = newTips.filter(
          (tip) => tip.comments?.length > 0
        );
        setTips(tipsWithComments);
      });

    // Unsubscribe from Firestore listener when component unmounts
    return () => unsubscribe();
  }, []);
  return (
    <div
      className={`flex flex-col gap-10 w-full h-screen px-10 py-5 overflow-y-auto`}
    >
      <ReportsList tips={tips} />
    </div>
  );
};

export default ReportsAdmin;
