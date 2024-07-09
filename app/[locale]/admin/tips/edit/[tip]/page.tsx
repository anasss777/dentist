"use client";

import React, { useEffect, useState } from "react";
import firebase from "@/firebase";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import {
  svgAddImage,
  svgDefaultImage,
  svgDot,
  svgLoadingWhite,
} from "@/components/svgPaths";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Image from "next/image";
import parse from "html-react-parser";
import { useStateContext } from "@/context/stateContext";
import { Tip } from "@/types/tips";
import Loading from "@/components/Common/Loading";
import { EditTip } from "@/utils/tip";

type Props = {
  params: { tip: string };
};

const Page = ({ params }: Props) => {
  const id = params.tip;
  const [tip, setTip] = useState<Tip | null>(null);
  const [loading, setLoading] = useState(true);
  const t = useTranslations("tips");
  const locale = useLocale();
  const isArabic = locale === "ar";

  const [tipImage, setTipImage] = useState<File>();
  const [imageUrl, setImageUrl] = useState<string>("");
  const [tipTitle, setTipTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [isPosting, setIsPosting] = useState(false);
  const router = useRouter();
  const { isAdmin } = useStateContext();

  let toolbarOptions = [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline"],
    [{ color: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
  ];
  const moduleOptions = {
    toolbar: toolbarOptions,
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setTipImage(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

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
          setImageUrl(tip.tipImage);
          setTipTitle(tip.tipTitle);
          setContent(tip.content);
          setLoading(false);
        }
      });

    // Unsubscribe from Firestore listener when component unmounts
    return () => unsubscribe();
  }, [id]);

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

  if (!isAdmin) {
    return <Loading />;
  }

  return (
    <div
      className={`flex flex-col gap-10 w-full h-screen px-10 py-5 overflow-y-auto`}
    >
      {/* Tip title */}
      <div className={`flex flex-col justify-center items-center`}>
        <h2 className={`text-primary text-lg font-bold mb-4 mt-20 text-center`}>
          {t("tipTitle")}
        </h2>
        <input
          aria-label="tipTitle"
          value={tipTitle}
          placeholder={t("tipTitle")}
          onChange={(e) => setTipTitle(e.target.value)}
          className={`border border-primary/70 px-2 py-1 rounded-md w-full sm:w-[70%] md:w-[50%] lg:w-[30%]`}
        />
      </div>

      <button className="flex flex-col items-center justify-center cursor-default">
        <label htmlFor={`imageInput`} className="cursor-pointer">
          <div
            className={`flex flex-row justify-center items-center gap-2 bg-primary/30 dark:bg-primary/10 btn hover:px-6
                border border-primary shadow-md`}
          >
            <span>{svgAddImage}</span>
            <p className={`text-primary`}>{t("image")}</p>
          </div>
        </label>
        <input
          aria-label="tipImage"
          type="file"
          id={`imageInput`}
          multiple
          accept="image/*"
          className="absolute -top-10"
          onChange={(e) => handleImageChange(e)}
        />
      </button>

      {/* Tip contnet */}
      <ReactQuill
        modules={moduleOptions}
        theme="snow"
        value={content}
        onChange={setContent}
        className={`bg-white/40 dark:bg-white/10 w-full h-96 pb-[44px]`}
      />

      <div className={`flex flex-col`}>
        <p
          className={`text-primary font-bold text-3xl md:text-4xl lg:text-5xl h-fit text-center mb-4`}
        >
          {tipTitle}
        </p>

        <div className="flex flex-row gap-2 mx-auto mb-12">
          <span className="text-transparent border-b border-b-primary/70 mb-4">
            __________
          </span>
          <span className={`mt-4`}>{svgDot}</span>
          <span className="text-transparent border-b border-b-primary/70 mb-4">
            __________
          </span>
        </div>

        {imageUrl ? (
          <Image
            src={imageUrl}
            alt="Tip image"
            height={1000}
            width={1000}
            className={`object-cover h-96 w-full rounded-xl border border-primary shadow-lg mb-8 flex justify-center`}
          />
        ) : (
          <span className={`flex h-fit w-fit mx-auto mb-8`}>
            {svgDefaultImage}
          </span>
        )}

        <div className="quill-content">{parse(content)}</div>
      </div>

      <button
        className={`btn px-4 mx-auto bg-primary mb-20 shadow-Card hover:px-6`}
        onClick={() => {
          setIsPosting(true);
          EditTip({
            tipId: tip.tipId,
            tipTitle,
            content,
            tipImage,
            oldTipImage: tip.tipImage,
          })
            .then(() => {
              setIsPosting(false);
              router.push(`/${locale}/admin/tips`);
            })
            .catch(() => {
              alert(t("error"));
            });
        }}
      >
        {isPosting ? (
          <span className={`flex flex-row items-center gap-1`}>
            {t("editing")} {svgLoadingWhite}
          </span>
        ) : (
          <span className={`flex flex-row items-center gap-1`}>
            {t("edit")}
          </span>
        )}
      </button>
    </div>
  );
};

export default Page;
