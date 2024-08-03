import React from "react";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { useLocale, useTranslations } from "next-intl";
import { svgDelete, svgEdit } from "../svgPaths";
import Swal from "sweetalert2";
import { Faq } from "@/types/faq";
import { deleteFaq } from "@/utils/home";
const locales = ["ar", "en"];
const { Link } = createSharedPathnamesNavigation({ locales });
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
type Props = {
  faq: Faq;
};

const FaqsRow = ({ faq }: Props) => {
  const locale = useLocale();
  const isArabic = locale === "ar";
  const t = useTranslations("faq");

  const handleDeleteFaq = () => {
    Swal.fire({
      title: t("sure"),
      text: t("deleteFaqWarning"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#4682b4",
      cancelButtonText: t("cancel"),
      confirmButtonText: t("yesDelete"),
    }).then((result) => {
      if (result.isConfirmed) {
        deleteFaq(faq);
        toast.success(t("faqDeleted"));
      }
    });
  };

  return (
    <tr className="my-4">
      <td className={`text-gray-400 text-center py-3`}>
        {isArabic ? faq.questionAr : faq.questionEn}
      </td>
      {faq.answerAr.length > 70 ? (
        <td className={`text-gray-400 text-center py-3`}>
          {isArabic ? faq.answerAr.slice(0, 70) : faq.answerEn.slice(0, 70)}...
        </td>
      ) : (
        <td className={`text-gray-400 text-center py-3`}>
          {isArabic ? faq.answerAr : faq.answerEn}
        </td>
      )}
      <td
        className={`flex flex-row justify-center items-center gap-1 text-gray-400 py-[35px] px-10`}
      >
        <Link
          href={`/admin/faq/edit/${faq.id}`}
          locale={locale}
          target="_blank"
          className={`bg-primary/20 border border-primary p-1 rounded-md`}
        >
          {svgEdit}
        </Link>

        <button
          onClick={handleDeleteFaq}
          className={`bg-primary/20 border border-primary p-1 rounded-md`}
        >
          {svgDelete}
        </button>
      </td>
    </tr>
  );
};

export default FaqsRow;
