"use client";

import firebase from "@/firebase";
import React, { useEffect, useState } from "react";
import { Calendar, Select, SelectItem } from "@nextui-org/react";
import type { DateValue } from "@react-types/calendar";
import { today, getLocalTimeZone } from "@internationalized/date";
import { timeSlots } from "./timeSlot";
import { useLocale, useTranslations } from "next-intl";
import { Appointment } from "@/types/appointment";
import { Profile } from "@/types/profile";
import { addAppointment } from "@/utils/appointment";
import { svgLoadingWhite } from "../svgPaths";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const isDateUnavailable = (date: DateValue) => {
  return (
    date.toDate(getLocalTimeZone()).getDay() === 0 ||
    date.toDate(getLocalTimeZone()).getDay() === 6
  );
};

const getDefaultDate = () => {
  const todayDate = today(getLocalTimeZone());
  const dayOfWeek = todayDate.toDate(getLocalTimeZone()).getDay();
  if (dayOfWeek === 0) {
    // If today is Sunday, set default to Monday
    return todayDate.add({ days: 1 });
  } else if (dayOfWeek === 6) {
    // If today is Saturday, set default to Monday
    return todayDate.add({ days: 2 });
  }
  return todayDate;
};

type Props = {
  name?: string;
  email?: string;
  phoneNumber?: number;
};

const AppointmentCalendar = ({ name, email, phoneNumber }: Props) => {
  const t = useTranslations("appointments");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const [selectedDate, setSelectedDate] = useState<DateValue>(getDefaultDate());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [visitReason, setVisitReason] = useState("");
  const [bookedDates, setBookedDates] = useState<Appointment[]>([]);
  const [currentUser, setCurrentUser] = useState<Profile>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const reasonData = [
    "فحص وتنظيف روتيني",
    "ألم أو انزعاج في الأسنان",
    "أمراض اللثة أو نزيف اللثة",
    "تسوس الأسنان",
    "حساسية الأسنان",
    "رائحة الفم الكريهة",
    "إصابة الأسنان",
    "تحسينات تجميلية (مثل التبييض، الفينير)",
    "مشاكل تقويم الأسنان",
    "زراعة الأسنان أو أطقم الأسنان",
    "فحص سرطان الفم",
    "مشاكل جفاف الفم",
    "الحفاظ على صحة الفم العامة",
  ];

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
        const newAppointment: Appointment[] = []; // Create a new array to hold updated bnas
        snapshot?.forEach((doc) => {
          newAppointment.push({
            id: doc.id,
            ...doc.data(),
          } as Appointment);
        });

        setBookedDates(newAppointment);
      });

    // Unsubscribe from Firestore listener when component unmounts
    return () => unsubscribe();
  }, []);

  const handleConfirmBooking = () => {
    setIsSubmitting(true);
    if (name && email && phoneNumber) {
      addAppointment({
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        date: selectedDate.toDate(getLocalTimeZone()),
        time: selectedTimeSlot,
        reason: visitReason,
      })
        .then(() => {
          setIsSubmitting(false);
          toast.success(t("success"));
          setSelectedTimeSlot("");
        })
        .catch((error) => {
          alert(t("error"));
          console.log(t("error"), error);
          setIsSubmitting(false);
        });
    } else if (currentUser) {
      addAppointment({
        name: currentUser?.name,
        email: currentUser?.email,
        phoneNumber: currentUser?.phoneNumber,
        date: selectedDate.toDate(getLocalTimeZone()),
        time: selectedTimeSlot,
        reason: visitReason,
      })
        .then(() => {
          setIsSubmitting(false);
          toast.success(t("success"));
          setSelectedTimeSlot("");
        })
        .catch((error) => {
          alert(t("error"));
          console.log(t("error"), error);
          setIsSubmitting(false);
        });
    }
  };

  return (
    <>
      <ToastContainer />
      <div
        className={`h-full w-full flex flex-col gap-5 justify-center items-center py-10 px-5 md:px-10 lg:px-20 xl:px-40 bg-third
          dark:bg-third/5 border-y dark:border-none`}
      >
        {/* Date Calendar */}
        <Calendar
          isDateUnavailable={isDateUnavailable}
          dir="ltr"
          aria-label="Date (Controlled)"
          value={selectedDate}
          onChange={setSelectedDate}
          defaultValue={getDefaultDate()}
          minValue={today(getLocalTimeZone())}
          showMonthAndYearPickers
        />

        {/* Time slots */}
        <div
          className={`grid grid-cols-3 min-[430px]:grid-cols-4 gap-5 p-5 rounded-xl border shadow-Card2 ltr`}
        >
          {timeSlots.map((timeSlot, index) => (
            <button
              key={index}
              disabled={
                bookedDates.some(
                  (booking) =>
                    booking.date.toDate().getTime() ===
                      selectedDate.toDate(getLocalTimeZone()).getTime() &&
                    booking.time === timeSlot
                ) || selectedDate.toString() === "2024-07-19"
              }
              className={`btn shadow-sm border text-gray-400 ${
                selectedTimeSlot === timeSlot &&
                selectedDate.toString() !== "2024-07-19" &&
                "border bg-primary text-white"
              } ${
                (bookedDates.some(
                  (booking) =>
                    booking.date.toDate().getTime() ===
                      selectedDate.toDate(getLocalTimeZone()).getTime() &&
                    booking.time === timeSlot
                ) ||
                  selectedDate.toString() === "2024-07-19") &&
                "border bg-[#ccc] dark:bg-gray-500 hover:bg-opacity-100 cursor-not-allowed"
              }`}
              onClick={() => setSelectedTimeSlot(timeSlot)}
            >
              {timeSlot}
            </button>
          ))}
        </div>

        {/* Visit reason input */}
        <p className={`pt-7 text-primary text-xl md:text-3xl font-light`}>
          {t("visitReason")}
        </p>
        <Select
          label={t("visitReason")}
          dir={isArabic ? "rtl" : "ltr"}
          value={visitReason}
          className="max-w-xs"
          onChange={(e) => setVisitReason(e.target.value)}
        >
          {reasonData.map((data) => (
            <SelectItem key={data}>{data}</SelectItem>
          ))}
        </Select>

        <button
          className={`btn bg-primary mt-4 ${
            selectedTimeSlot.length === 0 || visitReason.length === 0
              ? "bg-primary/30 hover:bg-primary/30 cursor-not-allowed"
              : "hover:px-6"
          }`}
          disabled={selectedTimeSlot.length === 0 || visitReason.length === 0}
          onClick={handleConfirmBooking}
        >
          {isSubmitting ? (
            <span className={`flex flex-row items-center gap-1`}>
              {t("submitting")} {svgLoadingWhite}
            </span>
          ) : (
            <span className={`flex flex-row items-center gap-1`}>
              {t("confirm")}
            </span>
          )}
        </button>
      </div>
    </>
  );
};

export default AppointmentCalendar;
