import BreadCrumb from "@/components/Common/BreadCrumb";
import InstagramReel from "@/components/Common/InstagramReel";
import { useTranslations } from "next-intl";
import React from "react";

const Page = () => {
  const t = useTranslations("tips");

  const reelsLink = [
    "https://www.instagram.com/reel/CqiLhGaqha7/",
    "https://www.instagram.com/reel/Cp-eMyzK5mM/",
    "https://www.instagram.com/reel/CoKxRQuKjA9",
    "https://www.instagram.com/reel/CqiLhGaqha7/",
    "https://www.instagram.com/reel/Cp-eMyzK5mM/",
    "https://www.instagram.com/reel/CoKxRQuKjA9",
    "https://www.instagram.com/reel/CqiLhGaqha7/",
    "https://www.instagram.com/reel/Cp-eMyzK5mM/",
    "https://www.instagram.com/reel/CoKxRQuKjA9",
    "https://www.instagram.com/reel/CqiLhGaqha7/",
  ];

  return (
    <div
      className={`flex flex-col justify-center items-center gap-20 py-20 lg:py-32 px-5 md:px-10 lg:px-20 xl:px-40`}
    >
      {/* Heading */}
      <div className={`flex flex-col justify-center items-center`}>
        <p className={`text-primary text-2xl md:text-4xl font-bold`}>
          {t("heading")}
        </p>
        <BreadCrumb pageName={t("heading")} />
      </div>

      {/* Tips List */}
      <div className={`flex flex-wrap justify-center items-start w-full`}>
        {reelsLink.map((reel, index) => (
          <InstagramReel key={index} url={reel} />
        ))}
      </div>
    </div>
  );
};

export default Page;
