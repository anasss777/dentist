import { useTranslations } from "next-intl";
import React from "react";
import Service from "./Service";

const Services = () => {
  const t = useTranslations("services");

  const servicesData = [
    {
      icon: "/images/service1.png",
      title: t("title1"),
      description: t("description1"),
    },
    {
      icon: "/images/service2.png",
      title: t("title2"),
      description: t("description2"),
    },
    {
      icon: "/images/service3.png",
      title: t("title3"),
      description: t("description3"),
    },
    {
      icon: "/images/service4.png",
      title: t("title4"),
      description: t("description4"),
    },
  ];

  return (
    <div
      className={`flex flex-col justify-center items-center gap-20 py-20 lg:pb-20 lg:pt-32 px-5 md:px-10 lg:px-20 xl:px-40`}
    >
      {/* Heading */}
      <div
        className={`flex flex-col justify-center items-center gap-3 text-center`}
      >
        <p className={`text-primary text-2xl md:text-4xl font-bold`}>
          {t("heading")}
        </p>
        <p className={`text-secondary text-normal md:text-lg font-light`}>
          {t("subheading")}
        </p>
      </div>

      {/* Services list */}
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 justify-center items-start gap-10`}
      >
        {servicesData.map((service, index) => (
          <Service
            key={index}
            icon={service.icon}
            title={service.title}
            description={service.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Services;
