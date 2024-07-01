import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
import { createSharedPathnamesNavigation } from "next-intl/navigation";

const locales = ["ar", "en"];
const { Link } = createSharedPathnamesNavigation({ locales });

const Hero = () => {
  const t = useTranslations("hero");
  const locale = useLocale();

  return (
    <div
      className={`flex flex-col sm:flex-row justify-center items-center gap-0 sm:gap-10 py-20 lg:py-40 px-5 min-[440px]:px-20`}
    >
      <div
        className={`bg-gradient-to-tr from-primary via-transparent to-primary animate-slow-spin p-0.5 rounded-full`}
      >
        <Image
          src="/images/hero-img.png"
          alt="Hero section image"
          width={500}
          height={500}
          className={`object-scale-down h-64 lg:h-96 w-fit rounded-full animate-reverse-spin`}
        />
      </div>

      <div
        className={`flex flex-col justify-evenly items-center h-64 lg:h-96 text-center`}
      >
        <div className={`flex flex-col justify-center items-center gap-3`}>
          <p className={`text-normal md:text-2xl text-primary font-bold`}>
            {t("tagline")}
          </p>
          <p className={`text-secondary text-2xl md:text-3xl font-light`}>
            {t("dentistName")}
          </p>
        </div>

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

export default Hero;
