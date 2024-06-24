import { useTranslations } from "next-intl";
import React from "react";
import Map from "../Common/Map";

const Contact = () => {
  const t = useTranslations("contact");

  return (
    <div
      className={`flex flex-col justify-center items-center gap-20 py-20 lg:py-32 px-5 md:px-10 lg:px-20 xl:px-40`}
    >
      {/* Heading */}
      <div className={``}></div>

      {/* Socail Media */}
      <div className={``}></div>

      {/* Maps */}
      <div className={``}>{/* <Map lat={41.019202} lng={28.946408} /> */}</div>
    </div>
  );
};

export default Contact;
