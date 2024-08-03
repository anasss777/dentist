"use client";

import firebase from "@/firebase";
import React, { useEffect, useState } from "react";
import TipsCard from "./TipsCard";
import { useLocale, useTranslations } from "next-intl";
import { Tip } from "@/types/tips";
import Loading from "../Common/Loading";

const TipsSection = () => {
  const [tips, setTips] = useState<Tip[]>([]);
  const locale = useLocale();
  const isArabic = locale === "ar";
  const t = useTranslations("tips");

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("tips")
      .onSnapshot((snapshot) => {
        const newTips: Tip[] = []; // Create a new array to hold updated Tips
        snapshot?.forEach((doc) => {
          newTips.push({
            tipId: doc.id,
            ...doc.data(),
          } as Tip);
        });

        setTips(newTips);
      });

    // Unsubscribe from Firestore listener when component unmounts
    return () => unsubscribe();
  }, []);

  if (tips.length === 0) {
    return (
      <div
        className={`flex flex-col justify-center items-center gap-20 py-20 lg:py-32 px-5 md:px-10 lg:px-20 xl:px-40 bg-third
        dark:bg-third/5 border-y dark:border-none`}
      >
        {/* Heading */}
        <div
          className={`flex flex-col justify-center items-center gap-3 text-center`}
        >
          <p className={`text-primary text-2xl md:text-4xl font-bold`}>
            {t("heading")}
          </p>
          <p className={`text-secondary text-normal md:text-lg font-light`}>
            {t("subheading")}
          </p>
        </div>
        <Loading />
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col justify-center items-center gap-20 py-20 lg:py-32 px-5 md:px-10 lg:px-20 xl:px-40 bg-third
        dark:bg-third/5 border-y dark:border-none`}
    >
      {/* Heading */}
      <div
        className={`flex flex-col justify-center items-center gap-3 text-center`}
      >
        <p className={`text-primary text-2xl md:text-4xl font-bold`}>
          {t("heading")}
        </p>
        <p className={`text-secondary text-normal md:text-lg font-light`}>
          {t("subheading")}
        </p>
      </div>

      {/* Tips card */}
      <div
        className={`flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 justify-center`}
      >
        {tips
          .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds)
          .slice(0, 3)
          .map((tip, index) => (
            <div key={index}>
              <TipsCard
                title={isArabic ? tip.tipTitleAr : tip.tipTitleEn}
                imageSrc={tip.tipImage}
                tipId={`${tip.tipId}`}
                createdAt={tip.createdAt}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default TipsSection;
