"use client";

import firebase from "@/firebase";
import { svgLoadingWhite } from "@/components/svgPaths";
import TestimonialCard from "@/components/Testimonial/TestimonialCard";
import { Testimonial } from "@/types/testimonial";
import { editTestimonial } from "@/utils/home";
import { useLocale, useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "@/components/Common/Loading";
import { useRouter } from "next/navigation";
import { Profile } from "@/types/profile";
import NoAccess from "@/components/Admin/NoAccess";

type Props = {
  params: { testimonial: string };
};

const EditTestimonialAdmin = ({ params }: Props) => {
  const id = params.testimonial;
  const t = useTranslations("testimonial");
  const [giver, setGiver] = useState("");
  const [testimonial, setTestimonial] = useState<Testimonial | null>(null);
  const [content, setContent] = useState("");
  const [loadingTestimonial, setLoadingTestimonial] = useState(true);
  const [isPosting, setIsPosting] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const locale = useLocale();

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("testimonials")
      .onSnapshot((snapshot) => {
        const newTestimonials: Testimonial[] = []; // Create a new array to hold updated Testimonials
        snapshot?.forEach((doc) => {
          newTestimonials.push({
            id: doc.id,
            ...doc.data(),
          } as Testimonial);
        });

        // Set a Testimonial based on if
        const testimonial = newTestimonials.find(
          (testimonial) => testimonial.id === id
        );
        if (testimonial) {
          setTestimonial(testimonial);
          setGiver(testimonial.giver);
          setContent(testimonial.content);
          setLoadingTestimonial(false);
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

  if (loadingTestimonial) {
    return (
      <div
        className={`flex flex-col justify-center items-center pb-20 pt-10 px-2 md:px-10 lg:px-20`}
      >
        <Loading />
      </div>
    );
  }

  if (!testimonial) {
    return <p>No testimonial found.</p>;
  }

  return (
    <>
      <ToastContainer />
      <div
        className={`flex flex-col justify-center items-center gap-10 w-full h-screen px-10 pb-5 pt-8 overflow-y-auto`}
      >
        {/* Giver Name */}
        <div className={`flex flex-col justify-center items-center w-full`}>
          <h2
            className={`text-primary text-lg font-bold mb-4 mt-20 text-center`}
          >
            {t("addGiverName")}
          </h2>
          <input
            aria-label="giver"
            value={giver}
            placeholder={t("addGiverName")}
            onChange={(e) => setGiver(e.target.value)}
            className={`border border-primary/70 px-2 py-1 rounded-md w-full sm:w-[70%] md:w-[50%] lg:w-[30%] placeholder:text-gray-400
                outline-primary`}
          />
        </div>

        {/* Testimonial content */}
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
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border border-primary/70 w-full rounded-md p-2 dark:bg-gray-800 resize-none placeholder:text-gray-400
            outline-primary"
          ></textarea>
        </div>

        {/* Preview */}
        <div
          className={`flex flex-row justify-center items-center w-fit p-5 bg-secondary/5 sm:rounded-3xl`}
        >
          <TestimonialCard content={content} name={giver} />
        </div>

        {/* Submit button */}
        <button
          className={`btn px-4 mx-auto bg-primary mt-14 shadow-Card hover:px-6`}
          onClick={() => {
            setIsPosting(true);
            editTestimonial(id, giver, content)
              .then(() => {
                toast.success(t("editSuccess"));
                setTimeout(() => {
                  setIsPosting(false);
                  router.push(`/admin/testimonials`);
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

export default EditTestimonialAdmin;
