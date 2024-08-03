"use client";

import firebase from "@/firebase";
import Loading from "@/components/Common/Loading";
import { svgLoadingWhite } from "@/components/svgPaths";
import { Faq } from "@/types/faq";
import { editFaq } from "@/utils/home";
import { useLocale, useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import NoAccess from "@/components/Admin/NoAccess";
import { Profile } from "@/types/profile";
import FaqContent from "@/components/Faq/FaqContent";
import { Tab, Tabs } from "@nextui-org/react";

type Props = {
  params: { faq: string };
};

const EditFaqAdmin = ({ params }: Props) => {
  const id = params.faq;
  const t = useTranslations("faq");
  const [questionAr, setQuestionAr] = useState("");
  const [questionEn, setQuestionEn] = useState("");
  const [answerAr, setAnswerAr] = useState("");
  const [answerEn, setAnswerEn] = useState("");
  const [tipLanguage, setTipLanguage] = useState("ar");
  const [faq, setFaq] = useState<Faq | null>(null);
  const [loadingFaq, setLoadingFaq] = useState(true);
  const [isPosting, setIsPosting] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const locale = useLocale();
  const isArabic = locale === "ar";

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("faqs")
      .onSnapshot((snapshot) => {
        const newFaqs: Faq[] = []; // Create a new array to hold updated Faqs
        snapshot?.forEach((doc) => {
          newFaqs.push({
            id: doc.id,
            ...doc.data(),
          } as Faq);
        });

        // Set a Faq based on if
        const faq = newFaqs.find((faq) => faq.id === id);
        if (faq) {
          setFaq(faq);
          setQuestionAr(faq.questionAr);
          setQuestionEn(faq.questionEn);
          setAnswerAr(faq.answerAr);
          setAnswerEn(faq.answerEn);
          setLoadingFaq(false);
        }
      });

    // Unsubscribe from Firestore listener when component unmounts
    return () => unsubscribe();
  }, [id]);

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

  if (loadingFaq) {
    return (
      <div
        className={`flex flex-col justify-center items-center pb-20 pt-10 px-2 md:px-10 lg:px-20`}
      >
        <Loading />
      </div>
    );
  }

  if (!faq) {
    return <p>No faq found.</p>;
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
          {/* Faq in Arabic */}
          <Tab
            key="ar"
            title={t("inArabic")}
            className={`flex flex-col gap-10 w-full justify-start items-center`}
          >
            {/* Faq question in Arabic */}
            <div className={`flex flex-col justify-center items-center w-full`}>
              <h2
                className={`text-primary text-lg font-bold mb-4 mt-20 text-center`}
              >
                {t("question")}
              </h2>
              <input
                aria-label="question"
                value={questionAr}
                placeholder={t("question")}
                onChange={(e) => setQuestionAr(e.target.value)}
                className={`border border-primary/70 px-2 py-1 rounded-md w-full sm:w-[70%] md:w-[50%] lg:w-[30%] placeholder:text-gray-400
                outline-primary`}
              />
            </div>

            {/* Faq answer in Arabic */}
            <div className={`flex flex-col justify-center items-center w-full`}>
              <h2
                className={`text-primary text-lg font-bold mb-4 mt-10 text-center`}
              >
                {t("answer")}
              </h2>
              <textarea
                rows={4}
                cols={50}
                placeholder={t("answer")}
                value={answerAr}
                onChange={(e) => setAnswerAr(e.target.value)}
                className="border border-primary/70 w-full rounded-md p-2 dark:bg-gray-800 resize-none placeholder:text-gray-400
                outline-primary"
              ></textarea>
            </div>

            {/* Preview in Arabic */}
            {questionAr.length > 0 && answerAr.length > 0 && (
              <FaqContent question={questionAr} answer={answerAr} index={0} />
            )}
          </Tab>

          {/* Faq in English */}
          <Tab
            key="en"
            title={t("inEnglish")}
            className={`flex flex-col gap-10 w-full justify-start items-center`}
          >
            {/* Faq question in English */}
            <div className={`flex flex-col justify-center items-center w-full`}>
              <h2
                className={`text-primary text-lg font-bold mb-4 mt-20 text-center`}
              >
                {t("question")}
              </h2>
              <input
                aria-label="question"
                value={questionEn}
                placeholder={t("question")}
                onChange={(e) => setQuestionEn(e.target.value)}
                className={`border border-primary/70 px-2 py-1 rounded-md w-full sm:w-[70%] md:w-[50%] lg:w-[30%] placeholder:text-gray-400
                outline-primary text-left ltr ${
                  isArabic ? "placeholder:text-right" : "placeholder:text-left"
                }`}
              />
            </div>

            {/* Faq answer in English */}
            <div className={`flex flex-col justify-center items-center w-full`}>
              <h2
                className={`text-primary text-lg font-bold mb-4 mt-10 text-center`}
              >
                {t("answer")}
              </h2>
              <textarea
                rows={4}
                cols={50}
                placeholder={t("answer")}
                value={answerEn}
                onChange={(e) => setAnswerEn(e.target.value)}
                className={`border border-primary/70 w-full rounded-md p-2 dark:bg-gray-800 resize-none placeholder:text-gray-400
                outline-primary  text-left ltr ${
                  isArabic ? "placeholder:text-right" : "placeholder:text-left"
                }`}
              ></textarea>
            </div>

            {/* Preview in English */}
            {questionEn.length > 0 && answerEn.length > 0 && (
              <FaqContent
                question={questionEn}
                answer={answerEn}
                index={0}
                isEnglish
              />
            )}
          </Tab>
        </Tabs>

        {/* Submit button */}
        <button
          className={`btn px-4 mx-auto bg-primary mt-14 shadow-Card hover:px-6`}
          onClick={() => {
            setIsPosting(true);
            editFaq(id, questionAr, answerAr, questionEn, answerEn)
              .then(() => {
                toast.success(t("editSuccess"));
                setTimeout(() => {
                  setIsPosting(false);
                  router.push(`/admin/faq`);
                }, 1500);
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
    </>
  );
};

export default EditFaqAdmin;
