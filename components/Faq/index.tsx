"use client";

import firebase from "@/firebase";
import React, { useEffect, useState } from "react";
import FaqContent from "./FaqContent";
import { useTranslations } from "next-intl";
import { Faq } from "@/types/faq";

const FaqAdmin = () => {
  const t = useTranslations("faq");
  const [faqs, setFaqs] = useState<Faq[]>([]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("faqs")
      .onSnapshot((snapshot) => {
        const newFaqs: Faq[] = []; // Create a new array to hold updated Faqs
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

  return (
    <div
      className={`flex flex-col justify-center items-center gap-20 py-20 lg:py-32 px-5 sm:px-10 lg:px-20 xl:px-40 bg-third
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

      {/* Faq list */}
      <div
        className={`grid grid-cols-1 md:grid-cols-2 justify-center items-start gap-5`}
      >
        {faqs
          .sort((a, b) => a.createdAt.seconds - b.createdAt.seconds)
          .map((data, index) => (
            <FaqContent
              key={index}
              question={data.question}
              answer={data.answer}
              index={index}
            />
          ))}
      </div>
    </div>
  );
};

export default FaqAdmin;
