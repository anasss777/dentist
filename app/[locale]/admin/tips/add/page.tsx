"use client";

import firebase from "@/firebase";
import { useLocale, useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import parse from "html-react-parser";
import { useRouter } from "next/navigation";
import {
  svgAddImage,
  svgDefaultImage,
  svgDot,
  svgLoadingWhite,
} from "@/components/svgPaths";
import Image from "next/image";
import { addTip } from "@/utils/tip";
import Loading from "@/components/Common/Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Profile } from "@/types/profile";
import NoAccess from "@/components/Admin/NoAccess";
import { Tab, Tabs } from "@nextui-org/react";

const AddTip = () => {
  const t = useTranslations("tips");
  const locale = useLocale();

  const [tipImage, setTipImage] = useState<File>();
  const [imageUrl, setImageUrl] = useState<string>();
  const [tipTitleAr, setTipTitleAr] = useState("");
  const [tipTitleEn, setTipTitleEn] = useState("");
  const [contentAr, setContentAr] = useState("");
  const [contentEn, setContentEn] = useState("");
  const [tipLanguage, setTipLanguage] = useState("ar");
  const [isPosting, setIsPosting] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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
    const unsubscribeAuth = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const db = firebase.firestore();
        const docRef = db.collection("profiles").doc(user.uid);

        const unsubscribeProfile = docRef.onSnapshot(
          (doc) => {
            if (doc.exists) {
              setProfile({
                userId: doc.id,
                ...doc.data(),
              } as Profile);
            } else {
              console.log("No such profile!");
            }
            setLoading(false);
          },
          (error) => {
            console.log("Error getting profile:", error);
            setLoading(false);
          }
        );

        // Cleanup function to unsubscribe from the snapshot listener
        return () => {
          unsubscribeProfile();
          unsubscribeAuth();
        };
      } else {
        // User is not authenticated, redirect to sign-in page
        router.push(`/${locale}/sign-up`);
      }
    });

    // Cleanup function to unsubscribe from the auth listener
    return () => unsubscribeAuth();
  }, [locale, router]);

  if (loading) {
    return <Loading />;
  }

  if (!profile?.isAdmin) {
    return <NoAccess />;
  }

  return (
    <>
      <ToastContainer />
      <div
        className={`flex flex-col gap-10 w-full h-screen px-10 py-5 overflow-y-auto`}
      >
        <Tabs
          aria-label="Options"
          selectedKey={tipLanguage}
          onSelectionChange={(key) => setTipLanguage(key.toString())}
          className={`flex justify-center items-center`}
        >
          {/* Tip in Arabic */}
          <Tab
            key="ar"
            title={t("inArabic")}
            className={`flex flex-col gap-10`}
          >
            {/* Heading */}
            <div
              className={`flex flex-col justify-center items-center gap-3 text-center`}
            >
              <p className={`text-primary text-2xl md:text-4xl font-bold`}>
                {t("addTipAr")}
              </p>
            </div>

            {/* Title */}
            <div className={`flex flex-col justify-center items-center`}>
              <h2
                className={`text-primary text-lg font-bold mb-4 mt-20 text-center`}
              >
                {t("addTitle")}
              </h2>
              <input
                aria-label="tipTitle"
                value={tipTitleAr}
                placeholder={t("addTitle")}
                onChange={(e) => setTipTitleAr(e.target.value)}
                className={`border border-primary/70 px-2 py-1 rounded-md w-full sm:w-[70%] md:w-[50%] lg:w-[30%]`}
              />
            </div>

            {/* Add image */}
            <button className="flex flex-col items-center justify-center cursor-default w-full">
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
                accept="image/*"
                className="absolute -top-10"
                onChange={(e) => handleImageChange(e)}
              />
            </button>

            {/* Tip contnet */}
            <ReactQuill
              modules={moduleOptions}
              theme="snow"
              value={contentAr}
              onChange={setContentAr}
              className={`bg-white/40 dark:bg-white/10 w-full h-96 pb-[44px]`}
            />

            {/* Tip preview */}
            <div className={`flex flex-col`}>
              <p
                className={`text-primary font-bold text-3xl md:text-4xl lg:text-5xl h-fit text-center mb-4`}
              >
                {tipTitleAr}
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
                  alt="Post image"
                  height={1000}
                  width={1000}
                  className={`object-cover h-96 w-full rounded-xl border border-primary shadow-lg mb-8 flex justify-center`}
                />
              ) : (
                <span className={`flex h-fit w-fit mx-auto mb-8`}>
                  {svgDefaultImage}
                </span>
              )}

              <div className="quill-content rtl">{parse(contentAr)}</div>
            </div>
          </Tab>

          {/* Tip in English */}
          <Tab
            key="en"
            title={t("inEnglish")}
            className={`flex flex-col gap-10`}
          >
            {/* Heading */}
            <div
              className={`flex flex-col justify-center items-center gap-3 text-center`}
            >
              <p className={`text-primary text-2xl md:text-4xl font-bold`}>
                {t("addTipEn")}
              </p>
            </div>

            {/* Title */}
            <div className={`flex flex-col justify-center items-center`}>
              <h2
                className={`text-primary text-lg font-bold mb-4 mt-20 text-center`}
              >
                {t("addTitle")}
              </h2>
              <input
                aria-label="tipTitle"
                value={tipTitleEn}
                placeholder={t("addTitle")}
                onChange={(e) => setTipTitleEn(e.target.value)}
                className={`border border-primary/70 px-2 py-1 rounded-md w-full sm:w-[70%] md:w-[50%] lg:w-[30%]`}
              />
            </div>

            {/* Add image */}
            <button className="flex flex-col items-center justify-center cursor-default w-full">
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
                accept="image/*"
                className="absolute -top-10"
                onChange={(e) => handleImageChange(e)}
              />
            </button>

            {/* Post contnet */}
            <ReactQuill
              modules={moduleOptions}
              theme="snow"
              value={contentEn}
              onChange={setContentEn}
              className={`bg-white/40 dark:bg-white/10 w-full h-96 pb-[44px] ltr`}
            />

            {/* Tip preview */}
            <div className={`flex flex-col`}>
              <p
                className={`text-primary font-bold text-3xl md:text-4xl lg:text-5xl h-fit text-center mb-4 ltr`}
              >
                {tipTitleEn}
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
                  alt="Post image"
                  height={1000}
                  width={1000}
                  className={`object-cover h-96 w-full rounded-xl border border-primary shadow-lg mb-8 flex justify-center`}
                />
              ) : (
                <span className={`flex h-fit w-fit mx-auto mb-8`}>
                  {svgDefaultImage}
                </span>
              )}

              <div className="quill-content ltr">{parse(contentEn)}</div>
            </div>
          </Tab>
        </Tabs>

        {/* Submit button */}
        <button
          className={`btn px-4 mx-auto bg-primary mb-20 shadow-Card hover:px-6`}
          onClick={() => {
            setIsPosting(true);
            addTip({
              tipTitleAr,
              tipTitleEn,
              contentAr,
              contentEn,
              tipImage,
            })
              .then(() => {
                toast.success(t("success"));
                setTimeout(() => {
                  setIsPosting(false);
                  router.push(`/${locale}/admin/tips`);
                }, 1500);
              })
              .catch(() => {
                alert(t("error"));
              });
          }}
        >
          {isPosting ? (
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

export default AddTip;
