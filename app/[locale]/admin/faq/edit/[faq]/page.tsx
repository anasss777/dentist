"use client";

import firebase from "@/firebase";
import Loading from "@/components/Common/Loading";
import { svgLoadingWhite } from "@/components/svgPaths";
import { useStateContext } from "@/context/stateContext";
import { Faq } from "@/types/faq";
import { addFaq, editFaq } from "@/utils/home";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

type Props = {
  params: { faq: string };
};

const EditFaqAdmin = ({ params }: Props) => {
  const id = params.faq;
  const t = useTranslations("faq");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [faq, setFaq] = useState<Faq | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPosting, setIsPosting] = useState(false);
  const { isAdmin } = useStateContext();
  const router = useRouter();

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
          setQuestion(faq.question);
          setAnswer(faq.answer);
          setLoading(false);
        }
      });

    // Unsubscribe from Firestore listener when component unmounts
    return () => unsubscribe();
  }, [id]);

  if (loading) {
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

  if (!isAdmin) {
    return <Loading />;
  }

  return (
    <>
      <ToastContainer />
      <div
        className={`flex flex-col justify-center items-center gap-10 w-full h-screen px-10 pb-5 pt-8 overflow-y-auto`}
      >
        {/* Faq question */}
        <div className={`flex flex-col justify-center items-center w-full`}>
          <h2
            className={`text-primary text-lg font-bold mb-4 mt-20 text-center`}
          >
            {t("question")}
          </h2>
          <input
            aria-label="question"
            value={question}
            placeholder={t("question")}
            onChange={(e) => setQuestion(e.target.value)}
            className={`border border-primary/70 px-2 py-1 rounded-md w-full sm:w-[70%] md:w-[50%] lg:w-[30%] placeholder:text-gray-400
                outline-primary`}
          />
        </div>

        {/* Faq answer */}
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
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="border border-primary/70 w-full rounded-md p-2 dark:bg-gray-800 resize-none placeholder:text-gray-400
            outline-primary"
          ></textarea>
        </div>

        {/* Preview */}

        {/* Submit button */}
        <button
          className={`btn px-4 mx-auto bg-primary mt-14 shadow-Card hover:px-6`}
          onClick={() => {
            setIsPosting(true);
            editFaq(id, question, answer)
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
