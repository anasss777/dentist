"use client";

import firebase from "@/firebase";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import BnACard from "./BnACard";
import { useLocale, useTranslations } from "next-intl";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BeforeAndAfter } from "@/types/beforeAndAfter";

const BeforeAndAfterSection: React.FC = () => {
  const t = useTranslations("bna");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const [beforeAndAfter, setBeforeAndAfter] = useState<BeforeAndAfter[]>([]);

  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    rtl: isArabic && true,
    arrows: true,
    dots: true,
    responsive: [
      {
        breakpoint: 1150, // tablet and below
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 700, // mobile and below
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

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
      <div className="flex flex-col justify-center items-center gap-3 text-center">
        <p className="text-primary text-2xl md:text-4xl font-bold">
          {t("heading")}
        </p>
        <p className="text-secondary text-normal md:text-lg font-light">
          {t("subheading")}
        </p>
      </div>

      <div className={`w-[90%]`}>
        <Slider {...settings}>
          {beforeAndAfter.map((bna, index) => (
            <div
              key={index}
              className={`py-10 !flex !justify-center !items-center`}
            >
              <BnACard
                beforeImage={bna.beforeImage}
                afterImage={bna.afterImage}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default BeforeAndAfterSection;
