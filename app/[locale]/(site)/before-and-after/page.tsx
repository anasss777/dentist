"use client";

import firebase from "@/firebase";
import React, { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { BeforeAndAfter } from "@/types/beforeAndAfter";
import ReactCompareImage from "react-compare-image";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
import BreadCrumb from "@/components/Common/BreadCrumb";

const locales = ["ar", "en"];
const { Link } = createSharedPathnamesNavigation({ locales });

const BeforeAndAfterPage: React.FC = () => {
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
    <div className="flex flex-col justify-center items-center gap-20 py-20 lg:py-32 px-5 md:px-10 lg:px-20 xl:px-40">
      {/* Heading */}
      <div className={`flex flex-col justify-center items-center`}>
        <p className={`text-primary text-2xl md:text-4xl font-bold`}>
          {t("heading")}
        </p>
        <BreadCrumb pageName={t("heading")} />
      </div>

      <div
        className={`flex flex-wrap justify-center items-center gap-10 w-full`}
      >
        {beforeAndAfter.map((bna, index) => (
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
    </div>
  );
};

export default BeforeAndAfterPage;