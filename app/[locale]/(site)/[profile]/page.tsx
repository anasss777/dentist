"use client";

import Loading from "@/components/Common/Loading";
import firebase from "@/firebase";
import { Profile } from "@/types/profile";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { handleSignOut } from "@/utils/auth";
import { svgLoadingWhite, svgUserDark } from "@/components/svgPaths";
import Image from "next/image";

type Props = {
  params: { profile: string };
};

const ProfilePage = ({ params }: Props) => {
  const id = params.profile;
  const router = useRouter();
  const t = useTranslations("profile");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    const unsubscribeAuth = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const db = firebase.firestore();
        const docRef = db.collection("profiles").doc(id);

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
  }, [id, locale, router]);

  if (!profile || loading) {
    return <Loading />;
  }

  return (
    <div
      className={`flex flex-col justify-center items-center gap-2 py-20 px-10 lg:px-32`}
    >
      <div
        className={`flex flex-col justify-center items-center md:flex-row md:justify-start md:items-start md:gap-5`}
      >
        {/* Profile image */}
        <div className={`pt-3`}>
          {/* <ProfileImage profile={profile} /> */}
          {profile.profileImage ? (
            <Image src={profile.profileImage} alt={""} />
          ) : (
            <span>{svgUserDark}</span>
          )}
        </div>

        {/* User info */}
        <div
          className={`flex flex-col justify-center items-center md:justify-start md:items-start gap-2 text-sm font-light`}
        >
          <p className={`font-bold text-primary`}>{`${profile.name}`}</p>
          <p className={`font-extralight`}>{`${profile?.email}`}</p>
          <p className={`font-extralight`}>{`${profile?.country}`}</p>
          <p className={`font-extralight`}>{`${profile?.phoneNumber}`}</p>
        </div>
      </div>

      {/* Sign out */}
      <div
        className={`btn bg-[#d33] flex flex-row justify-center items-center gap-2`}
        onClick={() => {
          handleSignOut();
          setSigningOut(true);
        }}
      >
        {t("signOut")}
        {signingOut && svgLoadingWhite}
      </div>
    </div>
  );
};

export default ProfilePage;
