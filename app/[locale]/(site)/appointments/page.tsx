"use client";

import firebase from "@/firebase";
import BreadCrumb from "@/components/Common/BreadCrumb";
import AppointmentCalendar from "@/components/appointments/Calendar";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import AppointmentCard from "./AppointmentCard";
import { Appointment } from "@/types/appointment";
import { Profile } from "@/types/profile";
import Loading from "@/components/Common/Loading";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { deleteDocIfDatePassed } from "@/utils/appointment";

const locales = ["ar", "en"];
const { Link } = createSharedPathnamesNavigation({ locales });

const Appointments = () => {
  const t = useTranslations("appointments");
  const [bookedDates, setBookedDates] = useState<Appointment[]>([]);
  const [currentUser, setCurrentUser] = useState<Profile>();
  const [isloading, setIsloading] = useState(true);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const docRef = firebase
          .firestore()
          .collection("profiles")
          .doc(user.uid);
        docRef
          .get()
          .then((doc) => {
            if (doc.exists) {
              setCurrentUser(doc.data() as Profile);
            } else {
              console.log("No such document!");
            }
          })
          .catch((error) => {
            console.log("Error getting document:", error);
          });
      } else {
        setTimeout(() => {
          setIsloading(false);
        }, 2000);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("appointments")
      .onSnapshot((snapshot) => {
        const newAppointment: Appointment[] = []; // Create a new array to hold updated appointments
        snapshot?.forEach((doc) => {
          const appointmentData = doc.data() as Appointment;
          newAppointment.push({
            id: doc.id,
            ...appointmentData,
          } as Appointment);

          // Call deleteDocIfDatePassed for each document
          deleteDocIfDatePassed(appointmentData.date.toDate(), doc.id);
        });

        const userBookedDates = newAppointment.filter(
          (appointment) => appointment.email === currentUser?.email
        );

        setBookedDates(userBookedDates);
      });

    // Unsubscribe from Firestore listener when component unmounts
    return () => unsubscribe();
  }, [currentUser?.email]);

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

  if (!currentUser) {
    return isloading ? (
      <div className={`flex flex-col justify-center items-center gap-10 pt-20`}>
        {/* Heading */}
        <div className={`flex flex-col justify-center items-center`}>
          <p className={`text-primary text-2xl md:text-4xl font-bold`}>
            {t("heading")}
          </p>
          <BreadCrumb pageName={t("heading")} />
        </div>

        <Loading />
      </div>
    ) : (
      <div className={`flex flex-col justify-center items-center gap-10 pt-20`}>
        {/* Heading */}
        <div className={`flex flex-col justify-center items-center`}>
          <p className={`text-primary text-2xl md:text-4xl font-bold`}>
            {t("heading")}
          </p>
          <BreadCrumb pageName={t("heading")} />
        </div>

        <div
          className={`flex flex-col justify-center items-center gap-10 w-full py-20`}
        >
          <div className={`flex flex-col justify-center items-center gap-5`}>
            <p className={``}>{t("notSignedIn")}</p>
            <p className={``}>{t("signInOrUp")}</p>
          </div>

          <div className={`flex flex-row justify-center items-center gap-5`}>
            <Link href="/sign-up" className={`btn bg-primary hover:px-6`}>
              {t("signUp")}
            </Link>
            <Link href="/sign-in" className={`btn bg-primary hover:px-6`}>
              {t("signIn")}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col justify-center items-center gap-10 pt-20`}>
      {/* Heading */}
      <div className={`flex flex-col justify-center items-center`}>
        <p className={`text-primary text-2xl md:text-4xl font-bold`}>
          {t("heading")}
        </p>
        <BreadCrumb pageName={t("heading")} />
      </div>

      {/* Make appointment */}
      <AppointmentCalendar />

      {/* Upcoming appointments */}
      {bookedDates.length > 0 ? (
        <div
          className={`flex flex-wrap justify-center items-center gap-5 w-full px-5 md:px-10 lg:px-20 xl:px-40 py-10`}
        >
          {sortedAppointments.map((booking, index) => (
            <AppointmentCard key={index} appointment={booking} />
          ))}
        </div>
      ) : (
        <div
          className={`flex flex-col h-72 w-full justify-center items-center text-primary text-base md:text-lg font-bold`}
        >
          <p>{t("noUpcomingAppointments")}</p>
          <p className={`text-secondary`}>{t("bookNow")}</p>
        </div>
      )}
    </div>
  );
};

export default Appointments;
