import { useLocale, useTranslations } from "next-intl";
import React from "react";
import Link from "next/link";

const CallToAction = () => {
  const t = useTranslations("about");
  const locale = useLocale();

  return (
    <div
      className={`flex flex-col justify-center items-center gap-20 py-20 lg:py-32 px-5 md:px-10 lg:px-20 xl:px-40`}
    >
      {/* Call to Action */}
      <div
        className={`flex flex-col justify-center items-center gap-10 py-10 px-5 bg-primary/5 w-[90%] md:w-[70%] rounded-3xl shadow-Card2
        text-center border-primary border`}
      >
        <p className={`text-gray-400 text-normal md:text-lg font-light px-5`}>
          {t("callToAction")}
        </p>

        <p className={`text-gray-400 text-normal md:text-lg font-light px-5`}>
          {t("bookAppointmentMessage")}
        </p>

        <Link
          href="/appointments"
          locale={locale}
          className={`btn bg-primary shadow-Primary text-normal md:text-xl hover:px-6`}
        >
          {t("bookAppointment")}
        </Link>
      </div>
    </div>
  );
};

export default CallToAction;
