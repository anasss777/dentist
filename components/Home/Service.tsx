import Image from "next/image";
import React from "react";

type Props = {
  icon: string;
  title: string;
  description: string;
};

const Service = ({ icon, title, description }: Props) => (
  <div className="group mb-12 flex flex-col justify-center items-center text-center">
    <div className="relative z-10 mb-10 flex h-20 w-20 items-center justify-center rounded-[14px] bg-primary p-3">
      <span
        className="absolute top-0 left-0 -z-[1] mb-8 flex h-20 w-20 rotate-[25deg] items-center justify-center rounded-[14px]
        bg-primary bg-opacity-20 duration-300 group-hover:rotate-45"
      ></span>
      <Image
        src={icon}
        alt={title}
        height={150}
        width={150}
        className="object-scale-down h-28 w-28 invert"
      />
    </div>
    <h4 className="mb-3 text-lg lg:text-xl font-bold text-secondary">
      {title}
    </h4>
    <p className="mb-8 lg:mb-9 text-sm sm:text-base text-gray-400 font-light">
      {description}
    </p>
  </div>
);

export default Service;
