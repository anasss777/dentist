import React from "react";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { useLocale, useTranslations } from "next-intl";
import { svgDelete, svgEdit, svgLink } from "../svgPaths";
import Swal from "sweetalert2";
import Image from "next/image";
import { Tip } from "@/types/tips";
import { deleteTip } from "@/utils/tip";
const locales = ["ar", "en"];
const { Link } = createSharedPathnamesNavigation({ locales });

type Props = {
  tip: Tip;
};

const TipsRow = ({ tip }: Props) => {
  const locale = useLocale();
  const t = useTranslations("tips");

  const handleDeleteTip = () => {
    Swal.fire({
      title: t("sure"),
      text: t("deleteTipWarning"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#4682b4",
      cancelButtonText: t("cancel"),
      confirmButtonText: t("yesDelete"),
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTip(tip);
        Swal.fire({
          text: t("tipDeleted"),
          icon: "success",
          confirmButtonColor: "#4682b4",
          confirmButtonText: t("ok"),
        });
      }
    });
  };

  return (
    <tr className="my-4">
      <td
        className={`text-gray-400 text-center py-4 flex items-center justify-center`}
      >
        <Image
          src={tip.tipImage || "/images/testing.png"}
          alt={tip.tipTitle}
          height={500}
          width={500}
          className={`object-scale-down h-12 w-fit rounded-md shadow-md`}
        />
      </td>
      <td className={`text-gray-400 text-center py-3`}>{tip.tipTitle}</td>
      <td className={`text-gray-400 text-center py-3`}>
        {tip.createdAt.toDate().toLocaleDateString()}
      </td>
      <td
        className={`flex flex-row justify-center items-center gap-1 text-gray-400 py-[35px]`}
      >
        <Link
          href={`/admin/tips/edit/${tip.tipId}`}
          locale={locale}
          target="_blank"
          className={`bg-primary/20 border border-primary p-1 rounded-md`}
        >
          {svgEdit}
        </Link>

        <button
          onClick={handleDeleteTip}
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
