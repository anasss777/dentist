import React from "react";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { useLocale, useTranslations } from "next-intl";
import { svgDelete, svgEdit, svgLink } from "../svgPaths";
import { Tip } from "@/types/tips";
const locales = ["ar", "en"];
const { Link } = createSharedPathnamesNavigation({ locales });

type Props = {
  tip: Tip;
};

const TipsRow = ({ tip }: Props) => {
  const locale = useLocale();
  const t = useTranslations("tips");

  return (
    <tr className="my-4">
      <td
        className={`text-gray-400 text-center py-4 flex items-center justify-center`}
      >
        {/* was image */}
      </td>
      <td className={`text-gray-400 text-center py-3`}>{tip.tipTitle}</td>
      <td className={`text-gray-400 text-center py-3`}>
        {tip.createdAt.toDate().toLocaleDateString()}
      </td>
      <td
        className={`flex flex-row justify-center items-center gap-1 text-gray-400 py-[35px]`}
      >
        <button
          className={`bg-primary/20 border border-primary p-1 rounded-md`}
        >
          {svgDelete}
        </button>

        <Link
          href={`/tips/${tip.tipId}`}
          locale={locale}
          target="_blank"
          className={`bg-primary/20 border border-primary p-1 rounded-md`}
        >
          {svgLink}
        </Link>
      </td>
    </tr>
  );
};

export default TipsRow;
