"use client";

import Loading from "@/components/Common/Loading";
import FaqContent from "@/components/Faq/FaqContent";
import { svgLoadingWhite } from "@/components/svgPaths";
import { useStateContext } from "@/context/stateContext";
import { addFaq } from "@/utils/home";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddFaqAdmin = () => {
  const t = useTranslations("faq");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { isAdmin } = useStateContext();
  const router = useRouter();

  if (!isAdmin) {
    return <Loading />;
  }

  return (
    <>
      <ToastContainer />
      <div
        className={`flex flex-col justify-center items-center gap-10 w-full h-screen px-10 pb-5 pt-8 overflow-y-auto`}
      >
        {/* Faq question */}
        <div className={`flex flex-col justify-center items-center w-full`}>
          <h2
            className={`text-primary text-lg font-bold mb-4 mt-20 text-center`}
          >
            {t("question")}
          </h2>
          <input
            aria-label="question"
            value={question}
            placeholder={t("question")}
            onChange={(e) => setQuestion(e.target.value)}
            className={`border border-primary/70 px-2 py-1 rounded-md w-full sm:w-[70%] md:w-[50%] lg:w-[30%] placeholder:text-gray-400
                outline-primary`}
          />
        </div>

        {/* Faq answer */}
        <div className={`flex flex-col justify-center items-center w-full`}>
          <h2
            className={`text-primary text-lg font-bold mb-4 mt-10 text-center`}
          >
            {t("answer")}
          </h2>
          <textarea
            rows={4}
            cols={50}
            placeholder={t("answer")}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="border border-primary/70 w-full rounded-md p-2 dark:bg-gray-800 resize-none placeholder:text-gray-400
            outline-primary"
          ></textarea>
        </div>

        {/* Preview */}
        {question.length > 0 && answer.length > 0 && (
          <FaqContent question={question} answer={answer} index={0} />
        )}

        {/* Submit button */}
        <button
          className={`btn px-4 mx-auto bg-primary mt-14 shadow-Card hover:px-6`}
          onClick={() => {
            setIsLoading(true);
            addFaq(question, answer)
              .then(() => {
                toast.success(t("success"));
                setTimeout(() => {
                  setIsLoading(false);
                  setQuestion("");
                  setAnswer("");
                  router.push(`/admin/faq`);
                }, 1500);
              })
              .catch(() => {
                alert(t("error"));
              });
          }}
        >
          {isLoading ? (
            <span className={`flex flex-row items-center gap-1`}>
              {t("loading")} {svgLoadingWhite}
            </span>
          ) : (
            <span className={`flex flex-row items-center gap-1`}>
              {t("submit")}
            </span>
          )}
        </button>
      </div>
    </>
  );
};

export default AddFaqAdmin;
