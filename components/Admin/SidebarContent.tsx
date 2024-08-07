"use client";

import React from "react";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import {
  svgAddAppointment,
  svgAdmin,
  svgAppointment,
  svgBulb,
  svgBulbOn,
  svgCompare,
  svgOverview,
  svgQuestion,
  svgQuestion2,
  svgThought,
  svgThought2,
  svgVideo,
} from "../svgPaths";
const locales = ["ar", "en"];
const { Link } = createSharedPathnamesNavigation({ locales });

const SidebarContent = () => {
  const t = useTranslations("adminPanel");
  const locale = useLocale();
  const currentPage = usePathname();

  return (
    <div
      className={`flex flex-col gap-1 items-start justify-start w-full overflow-y-scroll`}
    >
      {/* dashboard button */}
      <Link
        href="/admin"
        locale={locale}
        className={`w-full py-2 text-primary hover:text-gray-50 hover:bg-primary/50 transition-all duration-300 ease-linear px-2 
          rounded-xl flex flex-row justify-start items-center gap-2 ${
            currentPage === `/${locale}/admin` &&
            "bg-primary hover:bg-primary/90 text-white font-semibold transition-all ease-linear"
          }`}
      >
        <span
          className={`dark:bg-gray-900 bg-gray-50 rounded-full border border-secondary p-[6px]`}
        >
          {svgOverview}
        </span>
        {t("dashboard")}
      </Link>

      {/* Appointments section */}
      <Link
        href="/admin/appointments"
        locale={locale}
        className={`w-full py-2 text-primary hover:text-gray-50 hover:bg-primary/50 transition-all duration-300 ease-linear px-2 
            rounded-xl flex flex-row justify-start items-center gap-2 ${
              currentPage === `/${locale}/admin/appointments` &&
              "bg-primary hover:bg-primary/90 text-white font-semibold transition-all ease-linear"
            }`}
      >
        <span
          className={`dark:bg-gray-900 bg-gray-50 rounded-full border border-secondary p-[6px]`}
        >
          {svgAppointment}
        </span>
        {t("appointments")}
      </Link>

      {/* Add appointments section */}
      <Link
        href="/admin/appointments/add"
        locale={locale}
        className={`w-full py-2 text-primary hover:text-gray-50 hover:bg-primary/50 transition-all duration-300 ease-linear px-2 
            rounded-xl flex flex-row justify-start items-center gap-2 ${
              currentPage === `/${locale}/admin/appointments/add` &&
              "bg-primary hover:bg-primary/90 text-white font-semibold transition-all ease-linear"
            }`}
      >
        <span
          className={`dark:bg-gray-900 bg-gray-50 rounded-full border border-secondary p-[6px]`}
        >
          {svgAddAppointment}
        </span>
        {t("addAppointment")}
      </Link>

      {/* Tips section */}
      <Link
        href="/admin/tips"
        locale={locale}
        className={`w-full py-2 text-primary hover:text-gray-50 hover:bg-primary/50 transition-all duration-300 ease-linear px-2 
            rounded-xl flex flex-row justify-start items-center gap-2 ${
              currentPage === `/${locale}/admin/tips` &&
              "bg-primary hover:bg-primary/90 text-white font-semibold transition-all ease-linear"
            }`}
      >
        <span
          className={`dark:bg-gray-900 bg-gray-50 rounded-full border border-secondary p-[6px]`}
        >
          {svgBulb}
        </span>
        {t("tips")}
      </Link>

      {/* Add tips section */}
      <Link
        href="/admin/tips/add"
        locale={locale}
        className={`w-full py-2 text-primary hover:text-gray-50 hover:bg-primary/50 transition-all duration-300 ease-linear px-2 
            rounded-xl flex flex-row justify-start items-center gap-2 ${
              currentPage === `/${locale}/admin/tips/add` &&
              "bg-primary hover:bg-primary/90 text-white font-semibold transition-all ease-linear"
            }`}
      >
        <span
          className={`dark:bg-gray-900 bg-gray-50 rounded-full border border-secondary p-[6px]`}
        >
          {svgBulbOn}
        </span>
        {t("addTip")}
      </Link>

      {/* Testimonials section */}
      <Link
        href="/admin/testimonials"
        locale={locale}
        className={`w-full py-2 text-primary hover:text-gray-50 hover:bg-primary/50 transition-all duration-300 ease-linear px-2 
            rounded-xl flex flex-row justify-start items-center gap-2 ${
              currentPage === `/${locale}/admin/testimonials` &&
              "bg-primary hover:bg-primary/90 text-white font-semibold transition-all ease-linear"
            }`}
      >
        <span
          className={`dark:bg-gray-900 bg-gray-50 rounded-full border border-secondary p-[6px]`}
        >
          {svgThought2}
        </span>
        {t("testimonials")}
      </Link>

      {/* Add testimonials section */}
      <Link
        href="/admin/testimonials/add"
        locale={locale}
        className={`w-full py-2 text-primary hover:text-gray-50 hover:bg-primary/50 transition-all duration-300 ease-linear px-2 
            rounded-xl flex flex-row justify-start items-center gap-2 ${
              currentPage === `/${locale}/admin/testimonials/add` &&
              "bg-primary hover:bg-primary/90 text-white font-semibold transition-all ease-linear"
            }`}
      >
        <span
          className={`dark:bg-gray-900 bg-gray-50 rounded-full border border-secondary p-[6px]`}
        >
          {svgThought}
        </span>
        {t("addTestimonials")}
      </Link>

      {/* FAQ section */}
      <Link
        href="/admin/faq"
        locale={locale}
        className={`w-full py-2 text-primary hover:text-gray-50 hover:bg-primary/50 transition-all duration-300 ease-linear px-2 
            rounded-xl flex flex-row justify-start items-center gap-2 ${
              currentPage === `/${locale}/admin/faq` &&
              "bg-primary hover:bg-primary/90 text-white font-semibold transition-all ease-linear"
            }`}
      >
        <span
          className={`dark:bg-gray-900 bg-gray-50 rounded-full border border-secondary p-[6px]`}
        >
          {svgQuestion}
        </span>
        {t("faq")}
      </Link>

      {/* Add faq section */}
      <Link
        href="/admin/faq/add"
        locale={locale}
        className={`w-full py-2 text-primary hover:text-gray-50 hover:bg-primary/50 transition-all duration-300 ease-linear px-2 
            rounded-xl flex flex-row justify-start items-center gap-2 ${
              currentPage === `/${locale}/admin/faq/add` &&
              "bg-primary hover:bg-primary/90 text-white font-semibold transition-all ease-linear"
            }`}
      >
        <span
          className={`dark:bg-gray-900 bg-gray-50 rounded-full border border-secondary p-[6px]`}
        >
          {svgQuestion2}
        </span>
        {t("addFaq")}
      </Link>

      {/* Before and After section */}
      <Link
        href="/admin/before-and-after"
        locale={locale}
        className={`w-full py-2 text-primary hover:text-gray-50 hover:bg-primary/50 transition-all duration-300 ease-linear px-2 
            rounded-xl flex flex-row justify-start items-center gap-2 ${
              currentPage === `/${locale}/admin/before-and-after` &&
              "bg-primary hover:bg-primary/90 text-white font-semibold transition-all ease-linear"
            }`}
      >
        <span
          className={`dark:bg-gray-900 bg-gray-50 rounded-full border border-secondary p-[6px]`}
        >
          {svgCompare}
        </span>
        {t("bna")}
      </Link>

      {/* Add Before and After section */}
      <Link
        href="/admin/before-and-after/add"
        locale={locale}
        className={`w-full py-2 text-primary hover:text-gray-50 hover:bg-primary/50 transition-all duration-300 ease-linear px-2 
            rounded-xl flex flex-row justify-start items-center gap-2 ${
              currentPage === `/${locale}/admin/before-and-after/add` &&
              "bg-primary hover:bg-primary/90 text-white font-semibold transition-all ease-linear"
            }`}
      >
        <span
          className={`dark:bg-gray-900 bg-gray-50 rounded-full border border-secondary p-[6px]`}
        >
          {svgCompare}
        </span>
        {t("addBna")}
      </Link>

      {/* Manage section */}
      <Link
        href="/admin/manage"
        locale={locale}
        className={`w-full py-2 text-primary hover:text-gray-50 hover:bg-primary/50 transition-all duration-300 ease-linear px-2 
            rounded-xl flex flex-row justify-start items-center gap-2 ${
              currentPage === `/${locale}/admin/manage` &&
              "bg-primary hover:bg-primary/90 text-white font-semibold transition-all ease-linear"
            }`}
      >
        <span
          className={`dark:bg-gray-900 bg-gray-50 rounded-full border border-secondary p-[6px]`}
        >
          {svgAdmin}
        </span>
        {t("manage")}
      </Link>
    </div>
  );
};

export default SidebarContent;
