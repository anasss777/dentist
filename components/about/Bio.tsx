import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

const Bio = () => {
  const t = useTranslations("about");

  return (
    <div
      className={`flex flex-col justify-center items-center gap-10 py-10 lg:py-20 px-5 md:px-10 lg:px-20 xl:px-40`}
    >
      <p className={`text-secondary text-2xl md:text-4xl font-light`}>
        {t("title")}
      </p>

      <div
        className={`flex flex-col lg:flex-row justify-center items-center gap-10`}
      >
        <Image
          src="/images/about-img.png"
          alt="Bio Image"
          height={1000}
          width={1000}
          className={`object-cover h-96 w-auto rounded-3xl shadow-Card`}
        />

        <div
          className={`flex flex-col justify-center items-center gap-3 text-center`}
        >
          <p className={`text-gray-400 text-normal md:text-lg font-light px-5`}>
            {t("content1")}
          </p>
          <p className={`text-gray-400 text-normal md:text-lg font-light px-5`}>
            {t("content2")}
          </p>
          <p className={`text-gray-400 text-normal md:text-lg font-light px-5`}>
            {t("content3")}
          </p>
          <p className={`text-gray-400 text-normal md:text-lg font-light px-5`}>
            {t("content4")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Bio;
