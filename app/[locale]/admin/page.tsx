"use client";

import firebase from "@/firebase";
import React, { useEffect, useState } from "react";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Profile } from "@/types/profile";
import { useStateContext } from "@/context/stateContext";
import UsersList from "@/components/Admin/UsersLists";
import { Appointment } from "@/types/appointment";
import {
  svgAdminBig,
  svgAppointmentBig,
  svgBulbBig,
  svgCompareBig,
  svgQuestionBig,
  svgThoughtBig,
  svgVideoBig,
} from "@/components/svgPaths";
import { Tip } from "@/types/tips";
import { Testimonial } from "@/types/testimonial";
import { Faq } from "@/types/faq";
import { BeforeAndAfter } from "@/types/beforeAndAfter";
import Loading from "@/components/Common/Loading";
import AppointmentCard from "../(site)/appointments/AppointmentCard";
import { useRouter } from "next/navigation";
import NoAccess from "@/components/Admin/NoAccess";
const locales = ["ar", "en"];
const { Link } = createSharedPathnamesNavigation({ locales });

const Overview = () => {
  const locale = useLocale();
  const t = useTranslations("adminPanel");
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [tips, setTips] = useState<Tip[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [bnas, setBnas] = useState<BeforeAndAfter[]>([]);
  const [shownAppointments, setShownAppointments] = useState(3);
  const [isloading, setIsloading] = useState(true);
  const { isAdmin } = useStateContext();
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
        if (newAppointments.length > 0) {
          setTimeout(() => {
            setIsloading(false);
          }, 2000);
        } else {
          setTimeout(() => {
            setIsloading(false);
          }, 2000);
        }
      });

    // Unsubscribe from Firestore listener when component unmounts
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("tips")
      .onSnapshot((snapshot) => {
        const newTips: Tip[] = []; // Create a new array to hold updated tips
        snapshot?.forEach((doc) => {
          newTips.push({
            tipId: doc.id,
            ...doc.data(),
          } as Tip);
        });

        setTips(newTips);
      });

    // Unsubscribe from Firestore listener when component unmounts
    return () => unsubscribe();
  }, []);

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

        setTestimonials(newTestimonials);
      });

    // Unsubscribe from Firestore listener when component unmounts
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("faqs")
      .onSnapshot((snapshot) => {
        const newFaqs: Faq[] = []; // Create a new array to hold updated faqs
        snapshot?.forEach((doc) => {
          newFaqs.push({
            id: doc.id,
            ...doc.data(),
          } as Faq);
        });

        setFaqs(newFaqs);
      });

    // Unsubscribe from Firestore listener when component unmounts
    return () => unsubscribe();
  }, []);

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
        const docRef = firebase
          .firestore()
          .collection("profiles")
          .doc(user.uid);

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
      className={`flex flex-col gap-10 w-full h-screen pt-24 overflow-y-auto`}
    >
      {/* Overview */}
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 px-10`}
      >
        {/* Appointment */}
        <Link
          href="/admin/appointments"
          locale={locale}
          className={`flex flex-row justify-start items-center bg-primary/70 rounded-xl shadow-lg p-5 text-2xl gap-3 btn h-auto lg:w-auto
          hover:bg-primary/50 w-full`}
        >
          <span>{svgAppointmentBig}</span>
          <p className={`flex flex-col justify-between items-start`}>
            {t("appointments")}
            <span>{appointments.length}</span>
          </p>
        </Link>

        {/* Tips */}
        <Link
          href="/admin/tips"
          locale={locale}
          className={`flex flex-row justify-start items-center bg-primary/70 rounded-xl shadow-lg p-5 text-2xl gap-3 btn h-auto lg:w-auto
          hover:bg-primary/50 w-full`}
        >
          <span>{svgBulbBig}</span>
          <p className={`flex flex-col justify-between items-start`}>
            {t("tips")}
            <span>{tips.length}</span>
          </p>
        </Link>

        {/* Testimonial */}
        <Link
          href="/admin/testimonials"
          locale={locale}
          className={`flex flex-row justify-start items-center bg-primary/70 rounded-xl shadow-lg p-5 text-2xl gap-3 btn h-auto lg:w-auto
          hover:bg-primary/50 w-full`}
        >
          <span>{svgThoughtBig}</span>
          <p className={`flex flex-col justify-between items-start`}>
            {t("testimonials")}
            <span>{testimonials.length}</span>
          </p>
        </Link>

        {/* Faq */}
        <Link
          href="/admin/faq"
          locale={locale}
          className={`flex flex-row justify-start items-center bg-primary/70 rounded-xl shadow-lg p-5 text-2xl gap-3 btn h-auto lg:w-auto
          hover:bg-primary/50 w-full`}
        >
          <span>{svgQuestionBig}</span>
          <p className={`flex flex-col justify-between items-start`}>
            {t("faq")}
            <span>{faqs.length}</span>
          </p>
        </Link>

        {/* Before and after */}
        <Link
          href="/admin/before-and-after"
          locale={locale}
          className={`flex flex-row justify-start items-center bg-primary/70 rounded-xl shadow-lg p-5 text-2xl gap-3 btn h-auto lg:w-auto
          hover:bg-primary/50 w-full`}
        >
          <span>{svgCompareBig}</span>
          <p className={`flex flex-col justify-between items-start`}>
            {t("bna")}
            <span>{bnas.length}</span>
          </p>
        </Link>

        {/* Manage */}
        <Link
          href="/admin/manage"
          locale={locale}
          className={`flex flex-row justify-start items-center bg-primary/70 rounded-xl shadow-lg p-5 text-2xl gap-3 btn h-auto lg:w-auto
          hover:bg-primary/50 w-full`}
        >
          <span>{svgAdminBig}</span>
          <p className={`flex flex-col justify-between items-start`}>
            {t("manage")}
          </p>
        </Link>
      </div>

      {/* Upcoming appointments */}
      <div
        className={`flex flex-col justify-center items-center gap-10 w-full mt-20 py-20 px-10 bg-third dark:bg-third/5 border-y
          dark:border-none`}
      >
        <p className={`text-primary text-2xl md:text-4xl font-bold`}>
          {t("upcomingAppointments")}
        </p>

        {appointments.length > 0 ? (
          <div
            className={`grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 justify-center items-center gap-10 w-fit pt-10`}
          >
            {sortedAppointments
              .slice(0, shownAppointments)
              .map((booking, index) => (
                <AppointmentCard
                  key={index}
                  appointment={booking}
                  admin={isAdmin}
                />
              ))}
          </div>
        ) : isloading ? (
          <Loading />
        ) : (
          <div
            className={`flex flex-col h-72 w-full justify-center items-center gap-5`}
          >
            <p className={`text-secondary text-base md:text-lg font-bold`}>
              {t("noUpcomingAppointments")}
            </p>
            <Link
              href="/admin/appointments/add"
              locale={locale}
              className={`btn bg-primary shadow-Primary text-base md:text-lg hover:px-6`}
            >
              {t("bookNow")}
            </Link>
          </div>
        )}

        {/* Show more */}
        <div className={`flex justify-center items-center w-full`}>
          {appointments.length > shownAppointments && (
            <p
              onClick={() => setShownAppointments(shownAppointments + 3)}
              className={`btn bg-primary hover:px-6`}
            >
              {t("showMore")}
              {` (${appointments.length - shownAppointments})`}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Overview;
