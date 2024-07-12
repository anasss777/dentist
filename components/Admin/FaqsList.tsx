"use client";

import { useLocale, useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import firebase from "@/firebase";
import { svgAdd } from "../svgPaths";
import { useStateContext } from "@/context/stateContext";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
import Loading from "../Common/Loading";
import { Faq } from "@/types/faq";
import FaqsRow from "./FaqsRow";
const locales = ["ar", "en"];
const { Link } = createSharedPathnamesNavigation({ locales });

const FaqsList = () => {
  const locale = useLocale();
  const isArabic = locale === "ar";
  const t = useTranslations("faq");
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const { isAdmin } = useStateContext();

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("faqs")
      .onSnapshot((snapshot) => {
        const newFaqs: Faq[] = []; // Create a new array to hold updated faqs
        snapshot?.forEach((doc) => {
          newFaqs.push({
            id: doc.id,
            ...doc.data(),
          } as Faq);
        });

        setFaqs(newFaqs);
      });

    // Unsubscribe from Firestore listener when component unmounts
    return () => unsubscribe();
  }, []);

  if (!isAdmin) {
    return <Loading />;
  }

  return (
    <div className={`w-full ${isArabic && "rtl"}`}>
      {/* Button to add new Faq */}
      <Link
        href="/admin/faq/add"
        locale={locale}
        className={`btn bg-secondary rounded-none flex flex-row justify-center items-center gap-3 mb-10`}
      >
        <span>{svgAdd}</span> {t("addFaq")}
      </Link>

      {/* Faq List */}
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
              {t("question")}
            </th>
            <th className={`p-2`}>{t("answer")}</th>
            <th
              className={`p-2 ${
                isArabic ? "rounded-l-full" : "rounded-r-full"
              }`}
            >
              {t("manage")}
            </th>
          </tr>

          {/* Faqs */}
          {faqs
            .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds)
            .map((faq, index) => (
              <FaqsRow key={index} faq={faq} />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default FaqsList;
