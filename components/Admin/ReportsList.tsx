"use client";

import { useLocale, useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { useStateContext } from "@/context/stateContext";
import Loading from "../Common/Loading";
import { Tip } from "@/types/tips";
import { Comment } from "@/types/comment";
import ReportsRow from "./ReportsRow";
import { getReportedCommentsByTip } from "@/utils/tip";

type Props = {
  tips: Tip[];
};

const ReportsList = ({ tips }: Props) => {
  const locale = useLocale();
  const isArabic = locale === "ar";
  const t = useTranslations("comments");

  const [comments, setComments] = useState<Comment[]>([]);
  const { isAdmin } = useStateContext();

  useEffect(() => {
    const fetchComments = async () => {
      const reportedComments = await getReportedCommentsByTip(tips[0]);
      setComments(reportedComments);
    };

    fetchComments();
  }, [tips]);

  if (!isAdmin) {
    return <Loading />;
  }

  return (
    <div className={`w-full ${isArabic && "rtl"}`}>
      {/* Tips List */}
      {tips.map((tip, index) => (
        <table key={index} className={`w-full`}>
          <tbody>
            {/* Heading */}
            <tr
              className={`bg-primary shadow-Card2 py-2 px-5 rounded-full text-white`}
            >
              <th
                className={`p-2 ${
                  isArabic ? "rounded-r-full" : "rounded-l-full"
                }`}
              >
                {comments[0]?.id || "hi"}
              </th>
              <th className={`p-2`}>{t("tipTitle")}</th>
              <th className={`p-2`}>{t("date")}</th>
              <th
                className={`p-2 ${
                  isArabic ? "rounded-l-full" : "rounded-r-full"
                }`}
              >
                {t("manage")}
              </th>
            </tr>

            {/* Tips */}
            {tips
              .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds)
              .map((tip, index) => (
                <ReportsRow key={index} tip={tip} />
              ))}
          </tbody>
        </table>
      ))}
    </div>
  );
};

export default ReportsList;
