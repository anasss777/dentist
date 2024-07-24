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
import { useStateContext } from "@/context/stateContext";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { Appointment } from "@/types/appointment";
import AppointmentCard from "../appointments/AppointmentCard";
const locales = ["ar", "en"];
const { Link } = createSharedPathnamesNavigation({ locales });

type Props = {
  params: { profile: string };
};

const ProfilePage = ({ params }: Props) => {
  const id = params.profile;
  const router = useRouter();
  const t = useTranslations("profile");
  const locale = useLocale();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [signingOut, setSigningOut] = useState(false);
  const [bookedDates, setBookedDates] = useState<Appointment[]>([]);
  const { isAdmin } = useStateContext();

  const sortedAppointments = bookedDates.sort((a, b) => {
    const dateDiff = a.date.seconds - b.date.seconds;
    if (dateDiff !== 0) {
      return dateDiff;
    }

    const timeToMinutes = (time: string) => {
      const [hours, minutes] = time.split(":").map(Number);
      return hours * 60 + minutes;
    };

    const timeDiff = timeToMinutes(a.time) - timeToMinutes(b.time);
    return timeDiff;
  });

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("appointments")
      .onSnapshot((snapshot) => {
        const newAppointment: Appointment[] = []; // Create a new array to hold updated appointments
        snapshot?.forEach((doc) => {
          const appointmentData = doc.data() as Appointment;
          if (appointmentData.email === profile?.email || isAdmin) {
            newAppointment.push({
              id: doc.id,
              ...appointmentData,
            } as Appointment);
          }
        });

        setBookedDates(newAppointment);
      });

    // Unsubscribe from Firestore listener when component unmounts
    return () => unsubscribe();
  }, [profile?.email, isAdmin]);

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

      {isAdmin && (
        <Link
          href="/admin"
          locale={locale}
          className={`btn bg-primary shadow-lg flex flex-row justify-center items-center gap-2 hover:px-6`}
        >
          {t("manageWebsite")}
        </Link>
      )}

      {/* Upcoming appointments */}
      <div
        className={`flex flex-col justify-center items-center gap-10 w-full my-20`}
      >
        <p className={`text-primary text-2xl md:text-4xl font-bold`}>
          {t("upcomingAppointments")}
        </p>

        {bookedDates.length > 0 ? (
          <div
            className={`flex flex-wrap justify-center items-start gap-5 w-full py-10`}
          >
            {sortedAppointments.map((booking, index) => (
              <AppointmentCard
                key={index}
                appointment={booking}
                admin={isAdmin}
              />
            ))}
          </div>
        ) : (
          <div
            className={`flex flex-col h-72 w-full justify-center items-center gap-5`}
          >
            <p className={`text-secondary text-base md:text-lg font-bold`}>
              {t("noUpcomingAppointments")}
            </p>
            <Link
              href="/appointments"
              locale={locale}
              className={`btn bg-primary shadow-Primary text-base md:text-lg hover:px-6`}
            >
              {t("bookNow")}
            </Link>
          </div>
        )}
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
