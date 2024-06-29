import BreadCrumb from "@/components/Common/BreadCrumb";
import Contact from "@/components/Home/Contact";
import Bio from "@/components/about/Bio";
import Values from "@/components/about/Values";
import { useLocale, useTranslations } from "next-intl";
import React from "react";
import { createSharedPathnamesNavigation } from "next-intl/navigation";

const locales = ["ar", "en"];
const { Link } = createSharedPathnamesNavigation({ locales });

const AboutPage = () => {
  const t = useTranslations("about");
  const locale = useLocale();

  return (
    <div
      className={`flex flex-col justify-center items-center gap-10 py-10 lg:py-20 text-center`}
    >
      {/* Heading */}
      <div className={`flex flex-col justify-center items-center`}>
        <p className={`text-primary text-2xl md:text-4xl font-bold`}>
          {t("heading")}
        </p>
        <BreadCrumb pageName={t("heading")} pageLink="/about" />
      </div>

      {/* Bio */}
      <Bio />

      {/* Mission */}
      <div
        className={`flex flex-col justify-center items-center gap-10 py-10 lg:py-20 px-5 md:px-10 lg:px-20 xl:px-40 bg-third
          dark:bg-third/5 border-y dark:border-none`}
      >
        <p className={`text-primary text-2xl md:text-4xl font-bold`}>
          {t("missionTitle")}
        </p>

        <p className={`text-gray-400 text-normal md:text-lg font-light px-5`}>
          {t("missionContent")}
        </p>
      </div>

      {/* Values */}
      <Values />

      {/* Call to Action */}
      <div
        className={`flex flex-col justify-center items-center gap-10 py-10 px-5 bg-third dark:bg-third/5 border w-[90%] md:w-[70%]
          rounded-3xl shadow-Card2`}
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

      {/* Contact */}
      <Contact />
    </div>
  );
};

export default AboutPage;
