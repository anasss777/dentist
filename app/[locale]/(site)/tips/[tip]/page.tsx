"use client";

import React, { useEffect, useState } from "react";
import firebase from "@/firebase";
import parse from "html-react-parser";
import Image from "next/image";
import { svgDot } from "@/components/svgPaths";
import { useLocale, useTranslations } from "next-intl";
import { Comment } from "@/types/comment";
import { Tip } from "@/types/tips";
import Loading from "@/components/Common/Loading";
import BreadCrumb from "@/components/Common/BreadCrumb";
import CommentInput from "@/components/Comments/CommentInput";
import CommentCard from "@/components/Comments/CommentCard";

type Props = {
  params: { tip: string };
};

const Page = ({ params }: Props) => {
  const id = params.tip;
  const [tip, setTip] = useState<Tip | null>(null);
  const [comments, setComments] = useState<Comment[]>();
  const [loading, setLoading] = useState(true);
  const locale = useLocale();
  const t = useTranslations("tips");
  const isArabic = locale === "ar";

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("tips")
      .onSnapshot((snapshot) => {
        const newTips: Tip[] = []; // Create a new array to hold updated tips
        snapshot.forEach((doc) => {
          newTips.push({
            tipId: doc.id,
            ...doc.data(),
          } as Tip);
        });

        // Set a tip based on tipId
        const tipId = id; // Replace with your tipId
        const tip = newTips.find((tip) => tip.tipId === tipId);
        if (tip) {
          setTip(tip);
          setLoading(false);
        }
      });

    // Unsubscribe from Firestore listener when component unmounts
    return () => unsubscribe();
  }, [id]);

  useEffect(() => {
    const fetchComments = async () => {
      const commentsIds = tip?.comments?.map((comment) => comment.id);
      const commentsRefs = commentsIds?.map((commentId) =>
        firebase.firestore().doc(`comments/${commentId}`)
      );

      if (commentsRefs) {
        const commentSnaps = await Promise.all(
          commentsRefs.map(async (ref) => await ref.get())
        );

        const commentsData: Comment[] = commentSnaps?.map(
          (commentSnap) => ({ ...commentSnap.data() } as Comment)
        );

        setComments(commentsData);
      }
    };

    fetchComments();
  }, [tip?.comments]);

  if (loading) {
    return (
      <div
        className={`flex flex-col justify-center items-center pb-20 pt-10 px-2 md:px-10 lg:px-20 ${
          isArabic && "rtl"
        }`}
      >
        <Loading />
      </div>
    );
  }

  if (!tip) {
    return <p>No tip found.</p>;
  }

  return (
    <div
      className={`flex flex-col justify-center items-center px-5 lg:px-32 pb-5 pt-10 lg:py-20`}
    >
      <div className={`lg:mb-6 mb-20`}>
        <BreadCrumb pageName={t("heading")} pageLink="/tips" />
      </div>

      <div className={`flex flex-col mb-32`}>
        {/* Tip title */}
        <p
          className={`text-primary font-bold text-3xl md:text-4xl lg:text-5xl h-fit text-center mb-4`}
        >
          {tip.tipTitle}
        </p>

        {/* Fancy underline */}
        <div className="flex flex-row gap-2 mx-auto mb-12">
          <span className="text-transparent border-b border-b-primary/70 mb-4">
            __________
          </span>
          <span className={`mt-4`}>{svgDot}</span>
          <span className="text-transparent border-b border-b-primary/70 mb-4">
            __________
          </span>
        </div>

        {/* Tip image */}
        <Image
          src={tip.tipImage ? tip.tipImage : "/images/testing.png"}
          alt="testing"
          height={1000}
          width={1000}
          priority
          className={`object-cover h-96 w-full rounded-xl border border-primary shadow-Card mb-12`}
        />

        {/* Tip content */}
        <div className="quill-content">{parse(tip.content)}</div>
      </div>

      {/* Add new comment */}
      <CommentInput tipId={tip.tipId} />

      {/* Tip Comments */}
      {comments && (
        <div className={`w-full mt-10`}>
          {comments
            .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds)
            .map((comment, index) => (
              <div key={index}>
                <CommentCard comment={comment} tip={tip} />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Page;
