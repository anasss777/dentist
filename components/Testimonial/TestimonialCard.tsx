import React from "react";
import Image from "next/image";
import { svgUserDark } from "../svgPaths";

type Props = {
  content: string;
  name: string;
  imgName: string;
};

const TestimonialCard = ({ content, name, imgName }: Props) => {
  return (
    <div className="px-2 py-5 sm:p-5 w-full">
      <div
        className="bg-gradient-to-b from-white via-white to-transparent dark:bg-gradient-to-b dark:from-gray-900 dark:via-gray-900
      dark:to-transparent rounded-xl p-5 h-fit flex flex-col justify-between gap-5 w-[70vw] md:w-[20vw]"
      >
        <div className={`flex flex-row justify-start items-center gap-2`}>
          {/* <Image
              height={50}
              width={50}
              src={`/images/testimonial/${imgName}.png`}
              alt="author"
              className="object-cover w-[50px] h-[50px] rounded-full shadow-lg border"
              /> */}
          <span>{svgUserDark}</span>
          <h3 className="text-secondary font-semibold">{name}</h3>
        </div>
        <p className="text-gray-400 dark:text-white mb-6">{content}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;
