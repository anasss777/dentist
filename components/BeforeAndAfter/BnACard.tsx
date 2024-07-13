import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

type Props = {
  beforeImage: string;
  afterImage: string;
};

const BnACard = ({ beforeImage, afterImage }: Props) => {
  const t = useTranslations("bna");

  return (
    <div
      className={`flex flex-col justify-center items-center w-72 border border-primary rounded-3xl shadow-lg bg-primary/20`}
    >
      <p className={`py-2 text-primary text-xl font-medium`}>{t("before")}</p>
      <Image
        src={beforeImage}
        alt={t("before")}
        height={600}
        width={600}
        className={`object-cover h-40 w-72 rounded-t-3xl border-y border-primary`}
      />
      <Image
        src={afterImage}
        alt={t("after")}
        height={600}
        width={600}
        className={`object-cover h-40 w-72 rounded-b-3xl border-y border-primary`}
      />
      <p className={`py-2 text-primary text-xl font-medium`}>{t("after")}</p>
    </div>
  );
};

export default BnACard;
