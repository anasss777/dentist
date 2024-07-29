"use client";

import firebase from "@/firebase";
import { Calendar, Select, SelectItem } from "@nextui-org/react";
import type { DateValue } from "@react-types/calendar";
import { useLocale, useTranslations } from "next-intl";
import { today, getLocalTimeZone } from "@internationalized/date";
import React, { useEffect, useState } from "react";
import { Appointment } from "@/types/appointment";
import { Profile } from "@/types/profile";
import { addAppointment } from "@/utils/appointment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { timeSlots } from "@/components/appointments/timeSlot";
import { svgLoadingWhite } from "@/components/svgPaths";
import Loading from "@/components/Common/Loading";
import NoAccess from "@/components/Admin/NoAccess";
import { useRouter } from "next/navigation";

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

const AddAppointmentAdmin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [selectedDate, setSelectedDate] = useState<DateValue>(getDefaultDate());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [visitReason, setVisitReason] = useState("");
  const [bookedDates, setBookedDates] = useState<Appointment[]>([]);
  const [currentUser, setCurrentUser] = useState<Profile>();
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const t = useTranslations("appointments");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const router = useRouter();

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

  useEffect(() => {
    const unsubscribeAuth = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const db = firebase.firestore();
        const docRef = db.collection("profiles").doc(user.uid);

        const unsubscribeProfile = docRef.onSnapshot(
          (doc) => {
            if (doc.exists) {
              setCurrentUser({
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

  if (!currentUser?.isAdmin) {
    return <NoAccess />;
  }

  return (
    <>
      <ToastContainer />
      <div
        className={`flex flex-col justify-start items-start py-20 gap-20 h-screen overflow-y-auto`}
      >
        <div
          className={`flex flex-col justify-center items-center gap-5 w-full px-5 md:px-10 lg:px-20 xl:px-40`}
        >
          {/* Name */}
          <input
            aria-label="name"
            name="name"
            type="text"
            placeholder={t("name")}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={`rounded-md outline-none border focus:border-primary/50 p-3 w-full mx-auto ${
              isArabic && "rtl"
            }`}
          />

          {/* Email */}
          <input
            aria-label="email"
            name="email"
            type="email"
            placeholder={t("email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={`rounded-md outline-none border focus:border-primary/50 p-3 w-full mx-auto ltr ${
              isArabic && "placeholder:text-right"
            }`}
          />

          {/* Phone number */}
          <input
            aria-label="phoneNumber"
            name="phoneNumber"
            type="tel"
            placeholder={t("phoneNumber")}
            value={phoneNumber === 0 ? "" : phoneNumber}
            onChange={(e) => setPhoneNumber(+e.target.value)}
            required
            className={`rounded-md outline-none border focus:border-primary/50 p-3 w-full ${
              (phoneNumber === 0 || !phoneNumber) && "rtl"
            }`}
          />
        </div>

        {/* Make appointment */}
        <div
          className={`h-screen w-full flex flex-col gap-5 justify-center items-center py-10`}
        >
          {/* Date Calendar */}
          <div
            className={`flex flex-col justify-center items-center w-full h-96`}
          >
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
          </div>

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
              selectedTimeSlot.length === 0 ||
              visitReason.length === 0 ||
              name.length === 0 ||
              email.length === 0 ||
              phoneNumber === 0
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
      </div>
    </>
  );
};

export default AddAppointmentAdmin;
