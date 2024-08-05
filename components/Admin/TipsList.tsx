"use client";

import { useLocale, useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import firebase from "@/firebase";
import { svgAdd, svgSearch } from "../svgPaths";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { Tip } from "@/types/tips";
import { searchTips } from "@/utils/searchTips";
import TipsRow from "./TipsRow";
const locales = ["ar", "en"];
const { Link } = createSharedPathnamesNavigation({ locales });

const TipsList = () => {
  const locale = useLocale();
  const isArabic = locale === "ar";
  const t = useTranslations("tips");
  const [tips, setTips] = useState<Tip[]>([]);
  const [searchedTips, setSearchedTips] = useState<Tip[]>([]);

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

        setTips(newTips);
        setSearchedTips(newTips);
      });

    // Unsubscribe from Firestore listener when component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div className={`w-full ${isArabic && "rtl"}`}>
      {/* Button to add new Tip */}
      <Link
        href="/admin/tips/add"
        locale={locale}
        className={`btn bg-secondary rounded-none flex flex-row justify-center items-center gap-3`}
      >
        <span>{svgAdd}</span> {t("add")}
      </Link>

      {/* Search Bar */}
      <div className="flex flex-row items-center justify-center w-full">
        <input
          type="text"
          onChange={(event) =>
            setSearchedTips(searchTips(event.target.value, tips))
          }
          placeholder={t("searchTips")}
          className={`py-2 px-2 rounded-s-md focus:outline-primary/70 min-[425px]:w-[300px] sm:w-1/2 lg:w-1/5 w-[80%] bg-white
          dark:bg-third/5 shadow-Card2 my-10`}
        />
        <button className="bg-primary p-[11.5px] rounded-e-md">
          {svgSearch}
        </button>
      </div>

      {/* Tips List */}
      <table className={`w-full`}>
        <tbody>
          {/* Heading */}
          <tr
            className={`bg-primary shadow-Card2 py-2 px-5 rounded-full text-white`}
          >
            <th
              className={`p-2 ${
                isArabic ? "rounded-r-full" : "rounded-l-full"
              }`}
            >
              {t("image")}
            </th>
            <th className={`p-2`}>{t("tipTitle")}</th>
            <th className={`p-2`}>{t("date")}</th>
            <th
              className={`p-2 ${
                isArabic ? "rounded-l-full" : "rounded-r-full"
              }`}
            >
              {t("manage")}
            </th>
          </tr>

          {/* Tips */}
          {searchedTips
            .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds)
            .map((tip, index) => (
              <TipsRow key={index} tip={tip} />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TipsList;
