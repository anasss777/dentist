"use client";

import React, { useState } from "react";
import { svgClock, svgDelete, svgUserDark } from "@/components/svgPaths";
import { useLocale, useTranslations } from "next-intl";
import { Comment } from "@/types/comment";
import { useStateContext } from "@/context/stateContext";
import { deleteComment } from "@/utils/tip";
import Swal from "sweetalert2";
import { Tip } from "@/types/tips";
import ReportComment from "./ReportComment";

type Props = {
  comment: Comment;
  tip: Tip;
};

const CommentCard = ({ comment, tip }: Props) => {
  const locale = useLocale();
  const isArabic = locale === "ar";
  const t = useTranslations("comments");
  const [showMore, setShowMore] = useState(false);
  const { isAdmin } = useStateContext();

  const handleDeleteComment = () => {
    Swal.fire({
      title: t("sure"),
      text: t("deleteCommentWarning"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#4682b4",
      cancelButtonText: t("cancel"),
      confirmButtonText: t("yesDelete"),
    }).then((result) => {
      if (result.isConfirmed) {
        deleteComment(tip, comment.id);
        Swal.fire({
          text: t("commentDeleted"),
          icon: "success",
          confirmButtonColor: "#4682b4",
          confirmButtonText: t("ok"),
        });
      }
    });
  };

  return (
    <div className="mb-5 mx-2">
      <div className="flex flex-col h-fit w-full p-3 border dark:border-none shadow-Card2 bg-third dark:bg-third/5 rounded-xl">
        {/* Profile phoho and image */}
        <div className="flex flex-row gap-3 items-center justify-start mb-2">
          <span>{svgUserDark}</span>

          <div className="flex flex-row justify-between items-start w-full">
            {/* Commenter name */}
            <p className={`ltr font-bold text-secondary ${isArabic && "rtl"}`}>
              {comment.commenterName}
            </p>

            {/* time ago */}
            <div
              className={`dark:text-gray-300 text-gray-500 flex flex-row items-center gap-1 px-1 ${
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
        {!showMore && comment.commentContent?.length > 100 ? (
          <p
            className="rtl mr-4 cursor-pointer"
            onClick={() => setShowMore(true)}
          >
            {comment.commentContent.substring(0, 300)}
            <span>
              <span>...</span>
              <span
                className="rtl text-gray-500 underline h-fit"
                onClick={() => setShowMore(true)}
              >
                {t("showMore")}
              </span>
            </span>
          </p>
        ) : (
          <p
            className="mr-4 mb-5 cursor-pointer"
            onClick={() => setShowMore(false)}
          >
            {comment.commentContent}
          </p>
        )}

        <div className={`flex flex-row gap-1 justify-end items-end mt-5`}>
          {/* Report */}
          <ReportComment comment={comment} />

          {/* Delete (admin exclusive) */}
          {isAdmin && (
            <div
              className={`rounded-md p-1 bg-primary/20 border border-primary hover:opacity-75 cursor-pointer`}
              onClick={handleDeleteComment}
            >
              {svgDelete}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
