import { useLocale, useTranslations } from "next-intl";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
const locales = ["ar", "en"];
const { Link } = createSharedPathnamesNavigation({ locales });
import React from "react";

const Footer = () => {
  const todayYear = new Date().getFullYear();
  const t = useTranslations("footer");
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <div
      className={`flex flex-col gap-6 bg-primary pt-4 px-3 mt-10 relative bottom-0 ${
        isArabic ? "rtl" : "ltr"
      }`}
    >
      <div className={`flex flex-row gap-5 justify-center items-center`}>
        <Link
          href="/"
          locale={locale}
          className={`flex flex-row justify-center items-center gap-1`}
        >
          <p
            className={`text-white text-xl bg-white/10 rounded-xl px-2 border-2 border-white`}
          >
            Demo
          </p>
        </Link>
      </div>

      <div className={`flex flex-col gap-3`}>
        <div>
          <p className="flex justify-center font-bold text-white">
            {t("email")}
          </p>
          <a
            href="mailto:example@example.com"
            className="flex justify-center text-white/60 text-sm"
          >
            example@example.com
          </a>
        </div>
        <div>
          <p className="flex justify-center font-bold text-white">
            {t("phoneNumber")}
          </p>
          <a
            href="tel:+123456789"
            className="flex justify-center text-white/60 text-sm ltr"
          >
            +123456789
          </a>
        </div>
      </div>

      <p
        className={`flex justify-center text-blue-100 mx-auto rtl bg-white/20 pb-1 w-full text-sm font-light ${
          isArabic ? "rtl" : "ltr"
        }`}
      >
        {t("developedBy")}
        <Link
          href="https://anas-chammam.vercel.app"
          target="_blank"
          locale={locale}
          className={`text-white font-semibold`}
        >
          &nbsp;Anas Chammam&nbsp;
        </Link>
        {todayYear}©
      </p>
    </div>
  );
};

export default Footer;
