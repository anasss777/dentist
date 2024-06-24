"use client";

import { useLocale, useTranslations } from "next-intl";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { useEffect, useState } from "react";
import firebase from "@/firebase";
import { useRouter } from "next/navigation";
import { handleSignOut } from "@/utils/auth";
import Image from "next/image";
import { Profile } from "@/types/profile";
import { svgUser } from "../svgPaths";

export const locales = ["ar", "en"];
const { Link } = createSharedPathnamesNavigation({ locales });

const Account = () => {
  const t = useTranslations("accountHeader");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const [user, setUser] = useState<firebase.User | null>(null);
  const [userData, setUserData] = useState<Profile | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const signOut = async () => {
    const isSignedOut = await handleSignOut();

    if (isSignedOut) {
      router.push("/sign-in");
    }
  };

  useEffect(() => {
    if (user) {
      const docRef = firebase.firestore().collection("profiles").doc(user.uid);

      const unsubscribe = docRef.onSnapshot(
        (doc) => {
          if (doc.exists) {
            setUserData({
              userId: doc.id,
              ...doc.data(),
            } as Profile);
          } else {
            console.log("No such profile!");
          }
        },
        (error) => {
          console.log("Error getting profile:", error);
        }
      );

      // Cleanup function to unsubscribe from the snapshot listener
      return () => unsubscribe();
    }
  }, [user]);

  if (!userData) {
    return (
      <div
        className={`group relative hidden lg:block lg:hover:contrast-[110%] contrast-[95%] py-1 ${
          locale === "ar" && "rtl"
        }`}
      >
        {svgUser}
        <div
          className={`border border-primary relative top-full hidden w-[125px] rounded-md bg-white py-2 transition-[top] duration-300
          group-hover:opacity-100 lg:invisible lg:absolute lg:top-[110%] lg:block lg:opacity-0 lg:shadow-lg lg:group-hover:visible
          lg:group-hover:top-full dark:bg-gray-800 ${
            locale === "ar" ? "left-0" : "right-0"
          }`}
        >
          <Link
            locale={locale}
            href="/sign-in"
            className={`block rounded py-2 px-3 text-sm hover:opacity-50 w-full ${
              isArabic ? "text-right" : "text-left"
            }`}
          >
            {t("signIn")}
          </Link>
          <Link
            locale={locale}
            href="/sign-up"
            className={`block rounded py-2 px-3 text-sm hover:opacity-50 w-full ${
              isArabic ? "text-right" : "text-left"
            }`}
          >
            {t("signUp")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="hidden justify-end pr-16 lg:flex lg:pr-0">
      <div
        className={`group relative hidden lg:block lg:hover:contrast-[110%] contrast-[95%] py-1 ${
          locale === "ar" && "rtl"
        }`}
      >
        {user && userData.profileImage ? (
          <Image
            src={userData.profileImage}
            alt="Poster profile image"
            height={400}
            width={400}
            className="object-cover h-10 w-10 rounded-full shadow-lg"
          />
        ) : (
          <span>{svgUser}</span>
        )}

        <div
          className={`border border-primary relative top-full hidden w-[125px] rounded-md bg-white py-2 transition-[top] duration-300
          group-hover:opacity-100 lg:invisible lg:absolute lg:top-[110%] lg:block lg:opacity-0 lg:shadow-lg lg:group-hover:visible 
          lg:group-hover:top-full dark:bg-gray-800 ${
            locale === "ar" ? "left-0" : "right-0"
          }`}
        >
          <Link
            locale={locale}
            href={`/${userData.userId}`}
            className={`block rounded py-2 px-3 text-sm hover:opacity-50 w-full ${
              isArabic ? "text-right" : "text-left"
            }`}
          >
            {t("profile")}
          </Link>
          <Link
            locale={locale}
            href="/change-password"
            className={`block rounded py-2 px-3 text-sm hover:opacity-50 w-full ${
              isArabic ? "text-right" : "text-left"
            }`}
          >
            {t("changePassword")}
          </Link>
          <button
            className={`block rounded py-2 px-3 text-sm hover:opacity-50 w-full ${
              isArabic ? "text-right" : "text-left"
            }`}
            onClick={signOut}
          >
            {t("signout")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;
