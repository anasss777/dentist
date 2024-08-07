"use client";

import firebase from "@/firebase";
import React, { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { BeforeAndAfter } from "@/types/beforeAndAfter";
import ReactCompareImage from "react-compare-image";
import { createSharedPathnamesNavigation } from "next-intl/navigation";

const locales = ["ar", "en"];
const { Link } = createSharedPathnamesNavigation({ locales });

const BeforeAndAfterSection: React.FC = () => {
  const t = useTranslations("bna");
  const locale = useLocale();
  const [beforeAndAfter, setBeforeAndAfter] = useState<BeforeAndAfter[]>([]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("bnas")
      .onSnapshot((snapshot) => {
        const newBnas: BeforeAndAfter[] = []; // Create a new array to hold updated bnas
        snapshot?.forEach((doc) => {
          newBnas.push({
            id: doc.id,
            ...doc.data(),
          } as BeforeAndAfter);
        });

        setBeforeAndAfter(newBnas);
      });

    // Unsubscribe from Firestore listener when component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div
      className="flex flex-col justify-center items-center gap-20 py-20 lg:py-32 px-5 md:px-10 lg:px-20 xl:px-40 bg-third
      dark:bg-third/5 border-y dark:border-none"
    >
      {/* Heading */}
      <div className="flex flex-col justify-center items-center gap-3 text-center">
        <p className="text-primary text-2xl md:text-4xl font-bold">
          {t("heading")}
        </p>
        <p className="text-secondary text-normal md:text-lg font-light">
          {t("subheading")}
        </p>
      </div>

      <div
        className={`flex flex-wrap justify-center items-center gap-10 w-full`}
      >
        {beforeAndAfter
          .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds)
          .slice(0, 3)
          .map((bna, index) => (
            <div
              key={index}
              className="h-fit w-full sm:w-80 rounded-3xl overflow-hidden shadow-lg border-2 border-secondary"
            >
              <ReactCompareImage
                handleSize={30}
                hover
                sliderLineColor="#70cff9"
                leftImage={bna?.beforeImage}
                rightImage={bna?.afterImage}
              />
            </div>
          ))}
      </div>

      {/* See more */}
      <Link
        href="/before-and-after"
        locale={locale}
        className={`btn bg-primary text-normal md:text-lg hover:px-6`}
      >
        {t("seeMore")}
      </Link>
    </div>
  );
};

export default BeforeAndAfterSection;
