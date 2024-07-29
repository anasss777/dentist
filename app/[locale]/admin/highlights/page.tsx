"use client";

import firebase from "@/firebase";
import InstagramReel from "@/components/Common/InstagramReel";
import { svgLoadingWhite } from "@/components/svgPaths";
import { useLocale, useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { editHighlightSection } from "@/utils/home";
import Loading from "@/components/Common/Loading";
import { useRouter } from "next/navigation";
import { Profile } from "@/types/profile";
import NoAccess from "@/components/Admin/NoAccess";

type Highlight = {
  link1: string;
  link2: string;
  link3: string;
};

const HighlightsAdmin = () => {
  const t = useTranslations("highlights");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const [link1, setLink1] = useState("");
  const [link2, setLink2] = useState("");
  const [link3, setLink3] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("highlightsSection")
      .doc("XcK8AedFG8EYkLIANt8o")
      .onSnapshot((doc) => {
        if (doc.exists) {
          setLink1((doc.data() as Highlight).link1);
          setLink2((doc.data() as Highlight).link2);
          setLink3((doc.data() as Highlight).link3);
        } else {
          console.log("No such document!");
        }
      });

    // Unsubscribe from Firestore listener when component unmounts
    return () => unsubscribe();
  }, []);

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
        {/* Links */}
        <div
          className={`flex flex-col md:flex-row justify-center items-start gap-5`}
        >
          {/* First link */}
          <div className={`flex flex-col justify-center items-center`}>
            <div
              className={`text-primary text-lg font-bold mb-4 mt-20 text-center`}
            >
              <p>{t("link1")}</p>
            </div>
            <input
              aria-label="link1"
              value={link1}
              placeholder={t("link1")}
              onChange={(e) => setLink1(e.target.value)}
              className={`border border-primary/70 px-2 py-1 rounded-md w-full ltr ${
                isArabic ? "placeholder:text-right" : "placeholder:text-left"
              }`}
            />
            {link1 && <InstagramReel url={link1} />}
          </div>

          {/* Second link */}
          <div className={`flex flex-col justify-center items-center`}>
            <div
              className={`text-primary text-lg font-bold mb-4 mt-20 text-center`}
            >
              <p>{t("link2")}</p>
            </div>
            <input
              aria-label="link2"
              value={link2}
              placeholder={t("link2")}
              onChange={(e) => setLink2(e.target.value)}
              className={`border border-primary/70 px-2 py-1 rounded-md w-full ltr ${
                isArabic ? "placeholder:text-right" : "placeholder:text-left"
              }`}
            />

            {link2 && <InstagramReel url={link2} />}
          </div>

          {/* Third link */}
          <div className={`flex flex-col justify-center items-center`}>
            <div
              className={`text-primary text-lg font-bold mb-4 mt-20 text-center`}
            >
              <p>{t("link3")}</p>
            </div>
            <input
              aria-label="link3"
              value={link3}
              placeholder={t("link3")}
              onChange={(e) => setLink3(e.target.value)}
              className={`border border-primary/70 px-2 py-1 rounded-md w-full ltr ${
                isArabic ? "placeholder:text-right" : "placeholder:text-left"
              }`}
            />

            {link3 && <InstagramReel url={link3} />}
          </div>
        </div>

        {/* Submit button */}
        {link1.length > 0 && link2.length > 0 && link1.length > 0 && (
          <button
            className={`btn px-4 mx-auto bg-primary mb-20`}
            onClick={() => {
              editHighlightSection({
                link1,
                link2,
                link3,
              });

              setIsSubmitting(true);

              setTimeout(() => {
                setIsSubmitting(false);
                toast.success(t("success"));
                setTimeout(() => {
                  location.reload();
                }, 1000);
              }, 2000);
            }}
          >
            {isSubmitting ? (
              <span className={`flex flex-row items-center gap-1`}>
                {t("editing")} {svgLoadingWhite}
              </span>
            ) : (
              <span className={`flex flex-row items-center gap-1`}>
                {t("edit")}
              </span>
            )}{" "}
          </button>
        )}
      </div>
    </>
  );
};

export default HighlightsAdmin;
