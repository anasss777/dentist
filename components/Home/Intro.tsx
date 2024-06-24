import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

const Intro = () => {
  const t = useTranslations("intro");
  return (
    <div
      className={`flex flex-col lg:flex-row justify-center items-center gap-10 lg:gap-10 py-20 lg:py-32 px-5 md:px-10 lg:px-20 xl:px-40
        bg-third dark:bg-third/5 border-y dark:border-none`}
    >
      <div
        className={`flex flex-col justify-center items-center gap-3 text-center`}
      >
        <p className={`text-secondary text-2xl md:text-4xl font-light`}>
          {t("title")}
        </p>
        <p className={`text-gray-400 text-normal md:text-lg font-light px-5`}>
          {t("content")}
        </p>
      </div>

      <Image
        src="/images/intro-img.png"
        alt="Intro section image"
        width={500}
        height={500}
        className={`object-cover h-64 xl:h-96 w-fit rounded-3xl shadow-Card`}
      />
    </div>
  );
};

export default Intro;
