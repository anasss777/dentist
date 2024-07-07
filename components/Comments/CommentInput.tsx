"use client";

import { useLocale, useTranslations } from "next-intl";
import React, { useState } from "react";
import { svgComment, svgSend, svgSendEn } from "@/components/svgPaths";
import { AddComment } from "@/utils/tip";

type Props = {
  tipId: string;
};

const CommentInput = ({ tipId }: Props) => {
  const locale = useLocale();
  const isArabic = locale === "ar";
  const t = useTranslations("comments");
  const [commentContent, setCommentContent] = useState("");
  const [commenterName, setCommenterName] = useState("");
  const [commenterNameError, setCommenterNameError] = useState("");
  const [commentContentError, setCommentContentError] = useState("");

  const validateInputs = () => {
    if (!commenterName) {
      setCommenterNameError(t("nameError"));
    } else {
      setCommenterNameError("");
    }

    if (!commentContent) {
      setCommentContentError(t("contentError"));
    } else {
      setCommentContentError("");
    }

    if (commenterName && commentContent) {
      AddComment(tipId, commenterName, commentContent);
    }
  };

  return (
    <div
      className={`w-full rounded-md p-2 flex flex-col items-center justify-between gap-10 mx-auto h-fit ${
        isArabic && "rtl"
      }`}
    >
      <div
        className={`flex flex-col justify-center items-center text-secondary mb-3`}
      >
        <span>{svgComment}</span>
        <p className={`font-bold text-2xl`}>{t("comments")}</p>
      </div>

      {/* Comment Input */}
      <div className="flex flex-col justify-between items-end gap-5 w-full">
        <div className={`w-full`}>
          <input
            type="text"
            placeholder={t("commenterName")}
            value={commenterName}
            onChange={(e) => setCommenterName(e.target.value)}
            className={`w-full rounded-md border outline-none py-3 px-3 text-gray-400 dark:text-gray-200 dark:bg-gray-800`}
          />

          <p className={`text-[#d33]`}>{commenterNameError}</p>
        </div>

        <div className={`w-full`}>
          <textarea
            rows={4}
            cols={50}
            placeholder={t("commentContent")}
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            className="w-full rounded-md border outline-none py-3 px-3 text-gray-400 dark:text-gray-200 dark:bg-gray-800 resize-none"
          ></textarea>

          <p className={`text-[#d33]`}>{commentContentError}</p>
        </div>

        {/* Add comment button */}
        <button
          onClick={validateInputs}
          className={`btn bg-primary shadow-md hover:px-6`}
        >
          <span className={`flex justify-center items-center h-fit w-fit p-1`}>
            {isArabic ? svgSend : svgSendEn}
          </span>
        </button>
      </div>
    </div>
  );
};

export default CommentInput;
