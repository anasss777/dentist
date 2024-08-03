import React from "react";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { useLocale, useTranslations } from "next-intl";
import { svgDelete, svgEdit } from "../svgPaths";
import Swal from "sweetalert2";
import { Testimonial } from "@/types/testimonial";
import { deleteTestimonial } from "@/utils/home";
import { toast } from "react-toastify";
const locales = ["ar", "en"];
const { Link } = createSharedPathnamesNavigation({ locales });

type Props = {
  testimonial: Testimonial;
};

const TestimonialsRow = ({ testimonial }: Props) => {
  const locale = useLocale();
  const isArabic = locale === "ar";
  const t = useTranslations("testimonial");

  const handleDeleteTestimonial = () => {
    Swal.fire({
      title: t("sure"),
      text: t("deleteTestimonialWarning"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#4682b4",
      cancelButtonText: t("cancel"),
      confirmButtonText: t("yesDelete"),
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTestimonial(testimonial);
        toast.success(t("testimonialDeleted"));
      }
    });
  };

  return (
    <tr className="my-4">
      <td
        className={`text-gray-400 text-center py-4 flex items-center justify-center`}
      >
        {isArabic ? testimonial.giverAr : testimonial.giverEn}
      </td>
      <td className={`text-gray-400 text-center py-3`}>
        {isArabic ? testimonial.contentAr : testimonial.contentEn}
      </td>
      <td
        className={`flex flex-row justify-center items-center gap-1 text-gray-400 py-[35px]`}
      >
        <Link
          href={`/admin/testimonials/edit/${testimonial.id}`}
          locale={locale}
          target="_blank"
          className={`bg-primary/20 border border-primary p-1 rounded-md`}
        >
          {svgEdit}
        </Link>

        <button
          onClick={handleDeleteTestimonial}
          className={`bg-primary/20 border border-primary p-1 rounded-md`}
        >
          {svgDelete}
        </button>
      </td>
    </tr>
  );
};

export default TestimonialsRow;
