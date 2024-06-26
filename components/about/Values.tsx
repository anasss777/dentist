import { useTranslations } from "next-intl";
import React from "react";
import { svgTick } from "../svgPaths";

const Values = () => {
  const t = useTranslations("about");

  return (
    <div
      className={`flex flex-col justify-start items-start gap-10 py-10 lg:py-20 px-5 md:px-10 lg:px-20 xl:px-40`}
    >
      <div className={`flex justify-center items-center w-full`}>
        <p className={`text-primary text-2xl md:text-4xl font-bold`}>
          {t("valuesTitle")}
        </p>
      </div>

      <div
        className={`flex flex-wrap justify-center items-center gap-2 text-gray-400 text-normal md:text-lg font-light px-5`}
      >
        <span>{svgTick}</span>
        <p className={`text-secondary font-medium`}>{t("value1Title")}:</p>
        <p>{t("value1Content")}</p>
      </div>
      <div
        className={`flex flex-wrap justify-center items-center gap-2 text-gray-400 text-normal md:text-lg font-light px-5`}
      >
        <span>{svgTick}</span>
        <p className={`text-secondary font-medium`}>{t("value2Title")}:</p>
        <p>{t("value2Content")}</p>
      </div>
      <div
        className={`flex flex-wrap justify-center items-center gap-2 text-gray-400 text-normal md:text-lg font-light px-5`}
      >
        <span>{svgTick}</span>
        <p className={`text-secondary font-medium`}>{t("value3Title")}:</p>
        <p>{t("value3Content")}</p>
      </div>
      <div
        className={`flex flex-wrap justify-center items-center gap-2 text-gray-400 text-normal md:text-lg font-light px-5`}
      >
        <span>{svgTick}</span>
        <p className={`text-secondary font-medium`}>{t("value4Title")}:</p>
        <p>{t("value4Content")}</p>
      </div>
      <div
        className={`flex flex-wrap justify-center items-center gap-2 text-gray-400 text-normal md:text-lg font-light px-5`}
      >
        <span>{svgTick}</span>
        <p className={`text-secondary font-medium`}>{t("value5Title")}:</p>
        <p>{t("value5Content")}</p>
      </div>
      <div
        className={`flex flex-wrap justify-center items-center gap-2 text-gray-400 text-normal md:text-lg font-light px-5`}
      >
        <span>{svgTick}</span>
        <p className={`text-secondary font-medium`}>{t("value6Title")}:</p>
        <p>{t("value6Content")}</p>
      </div>
    </div>
  );
};

export default Values;
