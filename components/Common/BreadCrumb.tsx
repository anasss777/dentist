import React from "react";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { useLocale, useTranslations } from "next-intl";
import { svgSmallDot } from "../svgPaths";
const locales = ["ar", "en"];
const { Link } = createSharedPathnamesNavigation({ locales });

type Props = {
  pageName: string;
  pageLink: string;
};

const BreadCrumb = ({ pageName, pageLink }: Props) => {
  const locale = useLocale();
  const t = useTranslations("breadcrumbs");

  return (
    <div className={`flex flex-row justify-center items-center gap-1`}>
      <Link href="/" locale={locale} className={`text-gray-600`}>
        {t("home")}
      </Link>
      {svgSmallDot}
      <Link href={pageLink} locale={locale} className={`text-gray-400`}>
        {pageName}
      </Link>
    </div>
  );
};

export default BreadCrumb;
