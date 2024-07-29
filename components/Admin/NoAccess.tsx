import { useTranslations } from "next-intl";
import React from "react";

const NoAccess = () => {
  const t = useTranslations("adminPanel");

  return (
    <div
      className={`flex flex-col justify-center items-center w-full h-screen`}
    >
      <p className={`text-primary font-bold md:text-lg lg:text-xl`}>
        {t("noAccess")}
      </p>
    </div>
  );
};

export default NoAccess;
