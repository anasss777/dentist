"use client";

import NoAccess from "@/components/Admin/NoAccess";
import UsersList from "@/components/Admin/UsersLists";
import Loading from "@/components/Common/Loading";
import { svgSearch } from "@/components/svgPaths";
import firebase from "@/firebase";
import { Profile } from "@/types/profile";
import { searchUsers } from "@/utils/searchUsers";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ManagePage = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [searchedProfiles, setSearchedProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("adminPanel");

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("profiles")
      .onSnapshot((snapshot) => {
        const newProfiles: Profile[] = [];
        snapshot?.forEach((doc) => {
          newProfiles.push({
            userId: doc.id,
            ...doc.data(),
          } as Profile);
        });

        setProfiles(newProfiles);
        setSearchedProfiles(newProfiles);
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
    <div
      className={`flex flex-col gap-10 w-full h-screen pb-10 pt-24 overflow-y-auto`}
    >
      {/* Search Bar */}
      <div className="flex flex-row items-center justify-center w-full">
        <input
          type="text"
          onChange={(event) =>
            setSearchedProfiles(searchUsers(event.target.value, profiles))
          }
          placeholder={t("searchUsers")}
          className={`py-2 px-2 rounded-s-md focus:outline-primary/70 min-[425px]:w-[300px] sm:w-1/2 lg:w-1/5 w-[80%] bg-white
          dark:bg-third/5 shadow-Card2 my-10`}
        />
        <button className="bg-primary p-[11.5px] rounded-e-md">
          {svgSearch}
        </button>
      </div>

      {/* Users */}
      <div className={`w-full px-10`}>
        <UsersList members={searchedProfiles} />
      </div>
    </div>
  );
};

export default ManagePage;
