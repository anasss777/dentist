import React from "react";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { useLocale, useTranslations } from "next-intl";
import { svgDelete, svgEdit } from "../svgPaths";
import Swal from "sweetalert2";
import { Faq } from "@/types/faq";
import { deleteFaq } from "@/utils/home";
const locales = ["ar", "en"];
const { Link } = createSharedPathnamesNavigation({ locales });

type Props = {
  faq: Faq;
};

const FaqsRow = ({ faq }: Props) => {
  const locale = useLocale();
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
        Swal.fire({
          text: t("faqDeleted"),
          icon: "success",
          confirmButtonColor: "#4682b4",
          confirmButtonText: t("ok"),
        });
      }
    });
  };

  return (
    <tr className="my-4">
      <td className={`text-gray-400 text-center py-3`}>{faq.question}</td>
      {faq.answer.length > 70 ? (
        <td className={`text-gray-400 text-center py-3`}>
          {faq.answer.slice(0, 70)}...
        </td>
      ) : (
        <td className={`text-gray-400 text-center py-3`}>{faq.answer}</td>
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
