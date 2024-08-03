import React from "react";
import { svgQuote } from "../svgPaths";

type Props = {
  content: string;
  name: string;
  isEnglish?: boolean;
};

const TestimonialCard = ({ content, name, isEnglish }: Props) => {
  return (
    <div className={`px-2 py-5 sm:p-5 w-full ${isEnglish && "ltr"}`}>
      <div
        className="bg-gradient-to-b from-white via-white to-transparent dark:bg-gradient-to-b dark:from-gray-900 dark:via-gray-900
      dark:to-transparent rounded-xl p-5 h-fit flex flex-row justify-between w-[70vw] md:w-[20vw]"
      >
        <div className={`flex flex-row justify-start items-start`}>
          <span className={`${isEnglish ? "" : "rotate-180"}`}>{svgQuote}</span>
        </div>
        <div
          className={`flex flex-col justify-center items-center text-center gap-3`}
        >
          <h3 className="text-secondary font-semibold">{name}</h3>
          <p className="text-gray-400 dark:text-white mb-6">{content}</p>
        </div>
        <div className={`flex flex-row justify-end items-end`}>
          <span className={`${isEnglish ? "rotate-180" : ""}`}>{svgQuote}</span>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
