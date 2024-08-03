"use client";

import firebase from "@/firebase";
import Loading from "@/components/Common/Loading";
import { svgLoadingWhite } from "@/components/svgPaths";
import TestimonialCard from "@/components/Testimonial/TestimonialCard";
import { Profile } from "@/types/profile";
import { addTestimonial } from "@/utils/home";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NoAccess from "@/components/Admin/NoAccess";
import { Tab, Tabs } from "@nextui-org/react";

const AddTestimonialAdmin = () => {
  const t = useTranslations("testimonial");
  const [giverAr, setGiverAr] = useState("");
  const [giverEn, setGiverEn] = useState("");
  const [contentAr, setContentAr] = useState("");
  const [contentEn, setContentEn] = useState("");
  const [tipLanguage, setTipLanguage] = useState("ar");
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const locale = useLocale();
  const isArabic = locale === "ar";

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
        className={`flex flex-col gap-10 w-full h-screen px-10 pb-5 pt-8 overflow-y-auto`}
      >
        <Tabs
          aria-label="Options"
          selectedKey={tipLanguage}
          onSelectionChange={(key) => setTipLanguage(key.toString())}
          className={`flex justify-center items-center`}
        >
          {/* Testimonial in Arabic */}
          <Tab
            key="ar"
            title={t("inArabic")}
            className={`flex flex-col gap-10 w-full justify-start items-center`}
          >
            {/* Heading */}
            <div
              className={`flex flex-col justify-center items-center gap-3 text-center`}
            >
              <p className={`text-primary text-2xl md:text-4xl font-bold`}>
                {t("addTestimonialAr")}
              </p>
            </div>

            {/* Giver Name in Arabic */}
            <div className={`flex flex-col justify-center items-center w-full`}>
              <h2
                className={`text-primary text-lg font-bold mb-4 mt-20 text-center`}
              >
                {t("addGiverName")}
              </h2>
              <input
                aria-label="giver"
                value={giverAr}
                placeholder={t("addGiverName")}
                onChange={(e) => setGiverAr(e.target.value)}
                className={`border border-primary/70 px-2 py-1 rounded-md w-full sm:w-[70%] md:w-[50%] lg:w-[30%] placeholder:text-gray-400
                outline-primary`}
              />
            </div>

            {/* Testimonial content in Arabic */}
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
                value={contentAr}
                onChange={(e) => setContentAr(e.target.value)}
                className="border border-primary/70 w-full rounded-md p-2 dark:bg-gray-800 resize-none placeholder:text-gray-400
            outline-primary"
              ></textarea>
            </div>

            {/* Preview in Arabic */}
            <div
              className={`flex flex-row justify-center items-center w-fit p-5 bg-secondary/5 sm:rounded-3xl`}
            >
              <TestimonialCard content={contentAr} name={giverAr} />
            </div>
          </Tab>

          {/* Testimonial in English */}
          <Tab
            key="en"
            title={t("inEnglish")}
            className={`flex flex-col gap-10 w-full justify-start items-center`}
          >
            {/* Heading */}
            <div
              className={`flex flex-col justify-center items-center gap-3 text-center`}
            >
              <p className={`text-primary text-2xl md:text-4xl font-bold`}>
                {t("addTestimonialEn")}
              </p>
            </div>

            {/* Giver Name in English */}
            <div className={`flex flex-col justify-center items-center w-full`}>
              <h2
                className={`text-primary text-lg font-bold mb-4 mt-20 text-center`}
              >
                {t("addGiverName")}
              </h2>
              <input
                aria-label="giver"
                value={giverEn}
                placeholder={t("addGiverName")}
                onChange={(e) => setGiverEn(e.target.value)}
                className={`border border-primary/70 px-2 py-1 rounded-md w-full sm:w-[70%] md:w-[50%] lg:w-[30%] placeholder:text-gray-400
                outline-primary text-left ltr ${
                  isArabic ? "placeholder:text-right" : "placeholder:text-left"
                }`}
              />
            </div>

            {/* Testimonial content in English */}
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
                value={contentEn}
                onChange={(e) => setContentEn(e.target.value)}
                className={`border border-primary/70 w-full rounded-md p-2 dark:bg-gray-800 resize-none placeholder:text-gray-400
                outline-primary text-left ltr ${
                  isArabic ? "placeholder:text-right" : "placeholder:text-left"
                }`}
              ></textarea>
            </div>

            {/* Preview in Arabic */}
            <div
              className={`flex flex-row justify-center items-center w-fit p-5 bg-secondary/5 sm:rounded-3xl`}
            >
              <TestimonialCard content={contentEn} name={giverEn} isEnglish />
            </div>
          </Tab>
        </Tabs>

        {/* Submit button */}
        <button
          className={`btn px-4 mx-auto bg-primary mt-14 shadow-Card hover:px-6`}
          onClick={() => {
            setIsLoading(true);
            addTestimonial(giverAr, giverEn, contentAr, contentEn)
              .then(() => {
                toast.success(t("success"));
                setTimeout(() => {
                  setIsLoading(false);
                  setGiverAr("");
                  setGiverEn("");
                  setContentAr("");
                  setContentEn("");
                  router.push(`/admin/testimonials`);
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

export default AddTestimonialAdmin;
