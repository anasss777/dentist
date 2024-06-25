import { useTranslations } from "next-intl";
import React from "react";
import { svgEmail, svgInstagram, svgPhone, svgTiktok } from "../svgPaths";
import Link from "next/link";

const Contact = () => {
  const t = useTranslations("contact");

  return (
    <div
      className={`flex flex-col justify-center items-center gap-20 py-20 lg:py-32 px-5 md:px-10 lg:px-20 xl:px-40`}
    >
      {/* Heading */}
      <div
        className={`flex flex-col justify-center items-center gap-3 text-center`}
      >
        <p className={`text-primary text-2xl md:text-4xl font-bold`}>
          {t("heading")}
        </p>
        <p className={`text-secondary text-base md:text-lg font-light`}>
          {t("subheading")}
        </p>
      </div>

      {/* Socail Media */}
      <div className={`flex flex-wrap justify-center items-center gap-3`}>
        {/* Email */}
        <a
          href="mailto:example@example.com"
          className={`flex flex-row justify-center items-center gap-2 btn border shadow-lg shadow-gray-200 dark:shadow-none bg-third
            bg-third/10 group hover:px-6`}
        >
          <span
            className={`bg-primary/20 border border-primary rounded-full p-1`}
          >
            {svgEmail}
          </span>
          <p
            className={`text-base md:text-lg font-extralight text-gray-400 dark:text-white dark:group-hover:text-secondary
              group-hover:text-secondary transition-all duration-300 ease-linear cursor-pointer`}
          >
            example@example.com
          </p>
        </a>

        {/* Phone */}
        <a
          href="tel:+90123456789"
          className={`flex flex-row justify-center items-center gap-2 btn border shadow-lg shadow-gray-200 dark:shadow-none bg-third
            bg-third/10 group hover:px-6`}
        >
          <span
            className={`bg-primary/20 border border-primary rounded-full p-1`}
          >
            {svgPhone}
          </span>
          <p
            className={`text-base md:text-lg font-extralight text-gray-400 dark:text-white dark:group-hover:text-secondary
              group-hover:text-secondary transition-all duration-300 ease-linear cursor-pointer ltr`}
          >
            +90123456789
          </p>
        </a>

        {/* Instagram */}
        <Link
          href="https://www.instagram.com/"
          target="_blank"
          className={`flex flex-row justify-center items-center gap-2 btn border shadow-lg shadow-gray-200 dark:shadow-none bg-third
            bg-third/10 group hover:px-6`}
        >
          <span>{svgInstagram}</span>
          <p
            className={`text-base md:text-lg font-extralight text-gray-400 dark:text-white dark:group-hover:text-secondary
              group-hover:text-secondary transition-all duration-300 ease-linear cursor-pointer`}
          >
            Instagram
          </p>
        </Link>

        {/* Tik Tok */}
        <Link
          href="https://www.tiktok.com/"
          target="_blank"
          className={`flex flex-row justify-center items-center gap-2 btn border shadow-lg shadow-gray-200 dark:shadow-none bg-third
            bg-third/10 group hover:px-6`}
        >
          <span>{svgTiktok}</span>
          <p
            className={`text-base md:text-lg font-extralight text-gray-400 dark:text-white dark:group-hover:text-secondary
              group-hover:text-secondary transition-all duration-300 ease-linear cursor-pointer`}
          >
            TikTok
          </p>
        </Link>
      </div>

      {/* Maps */}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2486.9679786553806!2d28.943033411944455!3d41.01907840580304!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cabb1f079d7591%3A0x947397da64d09f7b!2z2K_Zg9iq2YjYsSDYp9it2YXYryDYudir2YXYp9mGL0RlbnRpc3QgL0RpxZ8gaGVraW1pIEFobWVkIE9TTUFO!5e0!3m2!1sen!2str!4v1719303811540!5m2!1sen!2str"
        width="600"
        height="450"
        loading="lazy"
        className={`rounded-3xl shadow-Card h-[450px] w-full`}
      ></iframe>
    </div>
  );
};

export default Contact;
