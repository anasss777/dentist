"use client";

import firebase from "@/firebase";
import { Appointment } from "@/types/appointment";
import { useLocale, useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import Loading from "@/components/Common/Loading";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { svgAdd } from "@/components/svgPaths";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppointmentsRow from "@/components/Admin/AppointmentsRow";
import { useRouter } from "next/navigation";
import { Profile } from "@/types/profile";
import NoAccess from "@/components/Admin/NoAccess";
const locales = ["ar", "en"];
const { Link } = createSharedPathnamesNavigation({ locales });

const AppointmentsAdmin = () => {
  const locale = useLocale();
  const isArabic = locale === "ar";
  const t = useTranslations("appointments");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const sortedAppointments = appointments.sort((a, b) => {
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
        const newAppointments: Appointment[] = []; // Create a new array to hold updated Appointments
        snapshot?.forEach((doc) => {
          newAppointments.push({
            id: doc.id,
            ...doc.data(),
          } as Appointment);
        });

        setAppointments(newAppointments);
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
        <div className={`w-full ${isArabic && "rtl"}`}>
          {/* Button to add new Appointment */}
          <Link
            href="/admin/appointments/add"
            locale={locale}
            className={`btn bg-secondary rounded-none flex flex-row justify-center items-center gap-3 mb-10`}
          >
            <span>{svgAdd}</span> {t("addAppointment")}
          </Link>

          {/* Appointments List */}
          <table className={`w-full`}>
            <tbody>
              {/* Heading */}
              <tr
                className={`bg-primary shadow-Card2 py-2 px-5 rounded-full text-white`}
              >
                <th
                  className={`p-2 ${
                    isArabic ? "rounded-r-full" : "rounded-l-full"
                  }`}
                >
                  {t("name")}
                </th>
                <th className={`p-2`}>{t("date")}</th>
                <th className={`p-2`}>{t("day")}</th>
                <th className={`p-2`}>{t("remainingDays")}</th>
                <th className={`p-2`}>{t("time")}</th>
                <th className={`p-2`}>{t("visitReason")}</th>
                <th
                  className={`p-2 ${
                    isArabic ? "rounded-l-full" : "rounded-r-full"
                  }`}
                >
                  {t("manage")}
                </th>
              </tr>

              {/* Appointments */}
              {sortedAppointments.map((appointments, index) => (
                <AppointmentsRow key={index} appointment={appointments} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AppointmentsAdmin;
