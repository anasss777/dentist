"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import ThemeSwitcher from "../Common/ThemeSwitcher";
import { createSharedPathnamesNavigation } from "next-intl/navigation";

const locales = ["ar", "en"];
const { Link } = createSharedPathnamesNavigation({ locales });

const Sidebar = () => {
  const t = useTranslations("adminPanel");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const currentPage = usePathname();

  return (
    <div
      className={`md:flex flex-col items-center justify-between w-1/5 h-screen sticky shadow-Card py-5 px-2 border-r dark:border-r-gray-600
      border-r-primary hidden bg-secondary/10 dark:bg-white/10 ${
        isArabic && "border-l dark:border-l-gray-600 border-l-primary"
      }`}
    >
      <div className={`flex flex-col gap-1 items-center justify-center w-full`}>
        {/* Logo */}
        <Link
          href="/"
          locale={locale}
          className={`flex flex-row justify-center items-center gap-1 mb-10`}
        >
          <p
            className={`text-white text-xl bg-primary rounded-xl px-2 border-2 border-white shadow-Card`}
          >
            Demo
          </p>
        </Link>

        {/* dashboard button */}
        <Link
          href="/admin"
          locale={locale}
          className={`w-full py-2 text-primary hover:text-gray-50 hover:bg-primary/50 transition-all duration-300 ease-linear px-2 
          rounded-xl ${
            currentPage === `/${locale}/admin` &&
            "bg-primary hover:bg-primary/90 text-white font-semibold transition-all ease-linear"
          }`}
        >
          {t("dashboard")}
        </Link>

        {/* Highlights section */}
        <Link
          href="/admin/highlights"
          locale={locale}
          className={`w-full py-2 text-primary hover:text-gray-50 hover:bg-primary/50 transition-all duration-300 ease-linear px-2 
            rounded-xl ${
              currentPage === `/${locale}/admin/highlights` &&
              "bg-primary hover:bg-primary/90 text-white font-semibold transition-all ease-linear"
            }`}
        >
          {t("highlights")}
        </Link>

        {/* Tips section */}
        <Link
          href="/admin/tips"
          locale={locale}
          className={`w-full py-2 text-primary hover:text-gray-50 hover:bg-primary/50 transition-all duration-300 ease-linear px-2 
            rounded-xl ${
              currentPage === `/${locale}/admin/tips` &&
              "bg-primary hover:bg-primary/90 text-white font-semibold transition-all ease-linear"
            }`}
        >
          {t("tips")}
        </Link>

        {/* Add tips section */}
        <Link
          href="/admin/tips/add"
          locale={locale}
          className={`w-full py-2 text-primary hover:text-gray-50 hover:bg-primary/50 transition-all duration-300 ease-linear px-2 
            rounded-xl ${
              currentPage === `/${locale}/admin/tips/add` &&
              "bg-primary hover:bg-primary/90 text-white font-semibold transition-all ease-linear"
            }`}
        >
          {t("addTip")}
        </Link>

        {/* Testimonials section */}
        <Link
          href="/admin/testimonials"
          locale={locale}
          className={`w-full py-2 text-primary hover:text-gray-50 hover:bg-primary/50 transition-all duration-300 ease-linear px-2 
            rounded-xl ${
              currentPage === `/${locale}/admin/testimonials` &&
              "bg-primary hover:bg-primary/90 text-white font-semibold transition-all ease-linear"
            }`}
        >
          {t("testimonials")}
        </Link>

        {/* Add testimonials section */}
        <Link
          href="/admin/testimonials/add"
          locale={locale}
          className={`w-full py-2 text-primary hover:text-gray-50 hover:bg-primary/50 transition-all duration-300 ease-linear px-2 
            rounded-xl ${
              currentPage === `/${locale}/admin/testimonials/add` &&
              "bg-primary hover:bg-primary/90 text-white font-semibold transition-all ease-linear"
            }`}
        >
          {t("addTestimonials")}
        </Link>

        {/* FAQ section */}
        <Link
          href="/admin/faq"
          locale={locale}
          className={`w-full py-2 text-primary hover:text-gray-50 hover:bg-primary/50 transition-all duration-300 ease-linear px-2 
            rounded-xl ${
              currentPage === `/${locale}/admin/faq` &&
              "bg-primary hover:bg-primary/90 text-white font-semibold transition-all ease-linear"
            }`}
        >
          {t("faq")}
        </Link>

        {/* Add faq section */}
        <Link
          href="/admin/faq/add"
          locale={locale}
          className={`w-full py-2 text-primary hover:text-gray-50 hover:bg-primary/50 transition-all duration-300 ease-linear px-2 
            rounded-xl ${
              currentPage === `/${locale}/admin/faq/add` &&
              "bg-primary hover:bg-primary/90 text-white font-semibold transition-all ease-linear"
            }`}
        >
          {t("addFaq")}
        </Link>

        {/* Before and After section */}
        <Link
          href="/admin/before-and-after"
          locale={locale}
          className={`w-full py-2 text-primary hover:text-gray-50 hover:bg-primary/50 transition-all duration-300 ease-linear px-2 
            rounded-xl ${
              currentPage === `/${locale}/admin/before-and-after` &&
              "bg-primary hover:bg-primary/90 text-white font-semibold transition-all ease-linear"
            }`}
        >
          {t("bna")}
        </Link>

        {/* Add Before and After section */}
        <Link
          href="/admin/before-and-after/add"
          locale={locale}
          className={`w-full py-2 text-primary hover:text-gray-50 hover:bg-primary/50 transition-all duration-300 ease-linear px-2 
            rounded-xl ${
              currentPage === `/${locale}/admin/before-and-after/add` &&
              "bg-primary hover:bg-primary/90 text-white font-semibold transition-all ease-linear"
            }`}
        >
          {t("addBna")}
        </Link>

        {/* Reports section */}
        {/* <Link
          href="/admin/reports"
          locale={locale}
          className={`w-full py-2 text-primary hover:text-gray-50 hover:bg-primary/50 transition-all duration-300 ease-linear px-2 
            rounded-xl ${
              currentPage === `/${locale}/admin/reports` &&
              "bg-primary hover:bg-primary/90 text-white font-semibold transition-all ease-linear"
            }`}
        >
          {t("reports")}
        </Link> */}
      </div>

      <div
        className={`p-[6px] w-fit h-fit rounded-full mx-auto flex justify-center bg-primary/50`}
      >
        <ThemeSwitcher />
      </div>
    </div>
  );
};

export default Sidebar;
