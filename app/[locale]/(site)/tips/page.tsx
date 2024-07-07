"use client";

import React, { useEffect, useState } from "react";
import firebase from "@/firebase";
import { useTranslations } from "next-intl";
import { svgSearch } from "@/components/svgPaths";
import { Tip } from "@/types/tips";
import Loading from "@/components/Common/Loading";
import BreadCrumb from "@/components/Common/BreadCrumb";
import { searchTips } from "@/utils/searchTips";
import TipsCard from "@/components/Tips/TipsCard";

const TipsPage = () => {
  const [tips, setTips] = useState<Tip[]>([]);
  const [searchedTips, setSearchedTips] = useState<Tip[]>([]);
  const t = useTranslations("tips");

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("tips")
      .onSnapshot((snapshot) => {
        const newTips: Tip[] = [];
        snapshot?.forEach((doc) => {
          newTips.push({
            tipId: doc.id,
            ...doc.data(),
          } as Tip);
        });

        setTips(newTips);
        setSearchedTips(newTips);
      });

    // Unsubscribe from Firestore listener when component unmounts
    return () => unsubscribe();
  }, []);

  if (tips.length === 0) {
    return (
      <div
        className={`flex flex-col justify-center items-center gap-10 pt-20 px-5 md:px-10 lg:px-20 xl:px-40`}
      >
        {/* Heading */}
        <div className={`flex flex-col justify-center items-center`}>
          <p className={`text-primary text-2xl md:text-4xl font-bold`}>
            {t("heading")}
          </p>
          <BreadCrumb pageName={t("heading")} />
        </div>

        <Loading />
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col justify-center items-center gap-10 w-full py-20 px-5 md:px-10 lg:px-20 xl:px-40`}
    >
      {/* Heading */}
      <div className={`flex flex-col justify-center items-center`}>
        <p className={`text-primary text-2xl md:text-4xl font-bold`}>
          {t("heading")}
        </p>
        <BreadCrumb pageName={t("heading")} />
      </div>

      {/* Search Bar */}
      <div className="flex flex-row items-center justify-center w-full">
        <input
          type="text"
          onChange={(event) =>
            setSearchedTips(searchTips(event.target.value, tips))
          }
          placeholder={t("searchTips")}
          className={`py-2 px-2 rounded-s-md focus:outline-primary/70 min-[425px]:w-[300px] sm:w-1/2 lg:w-1/5 w-[80%] bg-gray-50
            shadow-Card2`}
        />
        <button className="bg-primary p-[11.5px] rounded-e-md">
          {svgSearch}
        </button>
      </div>

      {/* Tips card */}
      <div
        className={`flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 justify-center`}
      >
        {searchedTips
          .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds)
          .map((tip, index) => (
            <div key={index}>
              <TipsCard
                title={tip.tipTitle}
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

export default TipsPage;
