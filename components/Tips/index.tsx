import { useTranslations } from "next-intl";
import React from "react";
import InstagramReel from "../Common/InstagramReel";

const Tips = () => {
  const t = useTranslations("tips");

  const reelsLink = [
    "https://www.instagram.com/reel/CqiLhGaqha7/",
    "https://www.instagram.com/reel/Cp-eMyzK5mM/",
    "https://www.instagram.com/reel/CoKxRQuKjA9/?utm_source=ig_web_copy_link",
  ];

  return (
    <div
      className={`flex flex-col justify-center items-center gap-20 py-20 lg:py-32 px-5 md:px-10 lg:px-20 xl:px-40 bg-third dark:bg-third/5
        border-y dark:border-none`}
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

      {/* Tips List */}
      <div className={``}>
        {reelsLink.map((reel, index) => (
          <InstagramReel
            key={index}
            url="https://www.instagram.com/reel/Cp-eMyzK5mM/"
          />
        ))}
      </div>
    </div>
  );
};

export default Tips;
