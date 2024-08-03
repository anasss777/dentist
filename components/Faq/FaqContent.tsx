"use client";

import { useLocale } from "next-intl";
import React, { useState } from "react";

type Props = {
  question: string;
  answer: string;
  index: number;
  isEnglish?: boolean;
};

const FaqContent = ({ question, answer, index, isEnglish }: Props) => {
  // Initialize state to keep track of active FAQ items
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const locale = useLocale();
  const rtl = locale == "ar" ? "rtl" : "";

  const handleFaqClick = (index: number) => {
    // Toggle the active state when the button is clicked
    if (activeFaq === index) {
      setActiveFaq(null);
    } else {
      setActiveFaq(index);
    }
  };

  return (
    <div
      key={index}
      className={`faq border-b border-stroke text-white ${isEnglish && "ltr"} ${
        activeFaq === index ? "active" : ""
      }`}
    >
      <button
        className={`faq-btn relative flex w-full justify-between py-6 px-[18px] text-base font-semibold  sm:px-[26px] sm:text-lg
        bg-primary/70 ${locale == "ar" ? "text-right" : "text-left"}`}
        onClick={() => handleFaqClick(index)}
      >
        {question}
      </button>
      <div
        className={`faq-content h-auto overflow-hidden border-t border-stroke px-[18px] sm:px-[26px] bg-primary/30 ${
          locale == "ar" ? "text-right" : "text-left"
        } ${isEnglish && "!text-left"}`}
      >
        <p className="font-medium">{answer}</p>
      </div>
    </div>
  );
};

export default FaqContent;
