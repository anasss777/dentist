"use client";

import firebase from "@/firebase";
import { useLocale, useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import Loading from "@/components/Common/Loading";
import { BeforeAndAfter } from "@/types/beforeAndAfter";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { svgAdd, svgDelete, svgEdit } from "@/components/svgPaths";
import BnACard from "@/components/BeforeAndAfter/BnACard";
import { deleteBeforeAndAfter } from "@/utils/home";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NoAccess from "@/components/Admin/NoAccess";
import { Profile } from "@/types/profile";
import { useRouter } from "next/navigation";
const locales = ["ar", "en"];
const { Link } = createSharedPathnamesNavigation({ locales });

const BeforeAndAfterAdmin = () => {
  const locale = useLocale();
  const t = useTranslations("bna");
  const [bnas, setBnas] = useState<BeforeAndAfter[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleDeleteBna = (bna: BeforeAndAfter) => {
    Swal.fire({
      title: t("sure"),
      text: t("deleteBnaWarning"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#4682b4",
      cancelButtonText: t("cancel"),
      confirmButtonText: t("yesDelete"),
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBeforeAndAfter(bna);
        toast.success(t("bnaDeleted"));
      }
    });
  };

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("bnas")
      .onSnapshot((snapshot) => {
        const newBnas: BeforeAndAfter[] = []; // Create a new array to hold updated bnas
        snapshot?.forEach((doc) => {
          newBnas.push({
            id: doc.id,
            ...doc.data(),
          } as BeforeAndAfter);
        });

        setBnas(newBnas);
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
        className={`flex flex-col gap-10 w-full h-screen px-10 pt-5 pb-20 overflow-y-auto`}
      >
        {/* Button to add new Bna */}
        <Link
          href="/admin/before-and-after/add"
          locale={locale}
          className={`btn bg-secondary rounded-none flex flex-row justify-center items-center gap-3 mb-10`}
        >
          <span>{svgAdd}</span> {t("addBna")}
        </Link>

        <div
          className={`grid grid-cols-1 min-[850px]:grid-cols-2 min-[1250px]:grid-cols-3 justify-center items-center gap-y-10 w-full`}
        >
          {bnas
            .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds)
            .map((bna, index) => (
              <div
                key={index}
                className={`flex flex-col justify-center items-center gap-3`}
              >
                <BnACard
                  beforeImage={bna.beforeImage}
                  afterImage={bna.afterImage}
                />

                {/* Edit and delete button */}
                <div
                  className={`flex flex-row gap-3 justify-center items-center`}
                >
                  {/* Edit button */}
                  <Link
                    href={`/admin/before-and-after/edit/${bna.id}`}
                    locale={locale}
                    target="_blank"
                    className={`flex flex-row justify-center items-center gap-2 bg-primary/20 dark:bg-primary/10 btn border border-primary
                hover:px-6`}
                  >
                    <span>{svgEdit}</span>
                    <p className={`text-primary`}>{t("edit")}</p>
                  </Link>

                  {/* Delete button */}
                  <button
                    onClick={() => handleDeleteBna(bna)}
                    className={`flex flex-row justify-center items-center gap-2 bg-primary/20 dark:bg-primary/10 btn border border-primary
                hover:px-6`}
                  >
                    <span>{svgDelete}</span>
                    <p className={`text-primary`}>{t("delete")}</p>
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default BeforeAndAfterAdmin;
