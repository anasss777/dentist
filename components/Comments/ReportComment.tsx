"use client";

import React, { useState } from "react";
import { svgCloseDark, svgLoadingWhite, svgReport } from "../svgPaths";
import { useTranslations } from "next-intl";
import { Comment } from "@/types/comment";
import { toast } from "react-toastify";
import Popup from "reactjs-popup";
import { reportComment } from "@/utils/tip";
import { Tip } from "@/types/tips";

type Props = {
  comment: Comment;
  tip: Tip;
};

const ReportComment = ({ comment, tip }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [reportContent, setReportContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const t = useTranslations("comments");

  const handleReporting = () => {
    setIsSubmitting(true);
    reportComment(comment, tip, reportContent);
    setTimeout(() => {
      toast.success(t("success"));
      setIsOpen(!isOpen);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <Popup
      trigger={
        <div
          className={`rounded-md p-1 bg-primary/20 border border-primary hover:opacity-75 cursor-pointer`}
        >
          {svgReport}
        </div>
      }
      open={isOpen}
      onOpen={() => setIsOpen(!isOpen)}
      modal
      nested
      lockScroll
      overlayStyle={{
        background: "#000000cc",
      }}
      contentStyle={{
        width: "90%",
      }}
    >
      <div
        className={`flex flex-col justify-between items-start gap-5 bg-third dark:bg-gray-900 m-5 rounded-lg overflow-y-auto h-fit
            mx-auto p-2 min-[400px]:w-96 w-64 shadow-Card`}
      >
        {/* Close button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`ring-0 outline-none`}
        >
          {svgCloseDark}
        </button>

        {/* Report textArea */}
        <textarea
          rows={4}
          cols={50}
          placeholder={t("reportContent")}
          value={reportContent}
          onChange={(e) => setReportContent(e.target.value)}
          className="w-full rounded-md border outline-none p-2 dark:bg-gray-800 resize-none"
        ></textarea>

        {/* Submit report button */}
        <div className={`flex flex-col justify-center items-center w-full`}>
          {reportContent.length > 0 ? (
            <button
              className={`btn bg-primary flex flex-row gap-2 justify-center items-center hover:px-6`}
              onClick={handleReporting}
            >
              {isSubmitting && <span>{svgLoadingWhite}</span>}
              <p>{t("report")}</p>
            </button>
          ) : (
            <button disabled className={`btn bg-primary/60 cursor-not-allowed`}>
              {t("report")}
            </button>
          )}
        </div>
      </div>
    </Popup>
  );
};

export default ReportComment;
