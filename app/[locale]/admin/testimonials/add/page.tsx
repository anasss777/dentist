"use client";

import Loading from "@/components/Common/Loading";
import { svgLoadingWhite } from "@/components/svgPaths";
import TestimonialCard from "@/components/Testimonial/TestimonialCard";
import { useStateContext } from "@/context/stateContext";
import { addTestimonial } from "@/utils/home";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddTestimonialAdmin = () => {
  const t = useTranslations("testimonial");
  const [giver, setGiver] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { isAdmin } = useStateContext();

  if (!isAdmin) {
    return <Loading />;
  }

  return (
    <>
      <ToastContainer />
      <div
        className={`flex flex-col justify-center items-center gap-10 w-full h-screen px-10 pb-5 pt-8 overflow-y-auto`}
      >
        {/* Giver Name */}
        <div className={`flex flex-col justify-center items-center w-full`}>
          <h2
            className={`text-primary text-lg font-bold mb-4 mt-20 text-center`}
          >
            {t("addGiverName")}
          </h2>
          <input
            aria-label="giver"
            value={giver}
            placeholder={t("addGiverName")}
            onChange={(e) => setGiver(e.target.value)}
            className={`border border-primary/70 px-2 py-1 rounded-md w-full sm:w-[70%] md:w-[50%] lg:w-[30%] placeholder:text-gray-400
                outline-primary`}
          />
        </div>

        {/* Testimonial content */}
        <div className={`flex flex-col justify-center items-center w-full`}>
          <h2
            className={`text-primary text-lg font-bold mb-4 mt-10 text-center`}
          >
            {t("content")}
          </h2>
          <textarea
            rows={4}
            cols={50}
            placeholder={t("content")}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border border-primary/70 w-full rounded-md p-2 dark:bg-gray-800 resize-none placeholder:text-gray-400
            outline-primary"
          ></textarea>
        </div>

        {/* Preview */}
        <div
          className={`flex flex-row justify-center items-center w-fit p-5 bg-secondary/5 sm:rounded-3xl`}
        >
          <TestimonialCard content={content} name={giver} />
        </div>

        {/* Submit button */}
        <button
          className={`btn px-4 mx-auto bg-primary mt-14 shadow-Card hover:px-6`}
          onClick={() => {
            setIsLoading(true);
            addTestimonial(giver, content)
              .then(() => {
                setTimeout(() => {
                  toast.success(t("success"));
                  setIsLoading(false);
                  setGiver("");
                  setContent("");
                }, 1000);
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

export default AddTestimonialAdmin;
