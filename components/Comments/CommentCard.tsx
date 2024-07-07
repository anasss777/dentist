"use client";

import React, { useState } from "react";
import { svgClock, svgUserDark } from "@/components/svgPaths";
import { useLocale, useTranslations } from "next-intl";
import { Comment } from "@/types/comment";

type Props = {
  comment: Comment;
};

const CommentCard = ({ comment }: Props) => {
  const locale = useLocale();
  const isArabic = locale === "ar";
  const t = useTranslations("comments");
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="mb-5 mx-2">
      <div className="flex flex-col h-fit w-full py-2 px-3 bg-third dark:bg-third/5 rounded-xl">
        {/* Profile phoho and image */}
        <div className=" flex flex-row gap-3 items-center justify-start mb-2">
          <span>{svgUserDark}</span>

          <div className="flex flex-row justify-between items-start w-full">
            {/* Commenter name */}
            <p className={`ltr font-bold text-secondary ${isArabic && "rtl"}`}>
              {comment.commenterName}
            </p>

            {/* time ago */}
            <div
              className={`btn  dark:text-gray-300 text-gray-500 flex flex-row items-center gap-1 ${
                !isArabic && "ltr"
              }`}
            >
              <span>{svgClock}</span>
              {comment.createdAt.toDate().getDate()}/
              {comment.createdAt.toDate().getMonth() + 1}/
              {comment.createdAt.toDate().getFullYear()}
            </div>
          </div>
        </div>

        {/* The comment */}
        {showMore && comment.commentContent?.length > 100 ? (
          <p className="rtl mr-4" onClick={() => setShowMore(true)}>
            {comment.commentContent.substring(0, 100)}
            <span>
              <span>...</span>
              <span
                className="rtl text-gray-500 underline cursor-pointer h-fit"
                onClick={() => setShowMore(true)}
              >
                {t("showMore")}
              </span>
            </span>
          </p>
        ) : (
          <p className="mr-4 mb-5" onClick={() => setShowMore(false)}>
            {comment.commentContent}
          </p>
        )}
      </div>
    </div>
  );
};

export default CommentCard;
