"use client";

import React, { useState } from "react";
import { Calendar, Select, SelectItem } from "@nextui-org/react";
import type { DateValue } from "@react-types/calendar";
import { today, getLocalTimeZone } from "@internationalized/date";
import { timeSlots } from "./timeSlot";
import { useLocale, useTranslations } from "next-intl";
import { Booking } from "@/types/booking";

type Props = {
  OnBookedDateChange: (dateBooked: Booking[]) => void;
};

const AppointmentCalendar = ({ OnBookedDateChange }: Props) => {
  const t = useTranslations("appointments");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const [selectedDate, setSelectedDate] = useState<DateValue>(
    today(getLocalTimeZone())
  );
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [visitReason, setVisitReason] = useState("");
  const [bookedDate, setBookedDate] = useState<Booking[]>([]);

  const reasonData = [
    "فحص وتنظيف روتيني",
    "ألم أو انزعاج في الأسنان",
    "أمراض اللثة أو نزيف اللثة",
    "تسوس الأسنان",
    "حساسية الأسنان",
    "رائحة الفم الكريهة (رائحة الفم)",
    "إصابة الأسنان",
    "تحسينات تجميلية (مثل التبييض، الفينير)",
    "مشاكل تقويم الأسنان (مثل التقويم، المشدات)",
    "ألم الفك أو مشاكل المفصل الفكي الصدغي",
    "زراعة الأسنان أو أطقم الأسنان",
    "فحص سرطان الفم",
    "مشاكل جفاف الفم",
    "الحفاظ على صحة الفم العامة",
  ];

  const handleConfirmBooking: any = () => {
    const newBooking = {
      date: selectedDate,
      time: selectedTimeSlot,
      reason: visitReason,
    };
    if (
      !bookedDate.some(
        (booking) =>
          booking.date === selectedDate && booking.time === selectedTimeSlot
      ) &&
      selectedTimeSlot
    ) {
      setBookedDate([newBooking, ...bookedDate]);
      OnBookedDateChange([newBooking, ...bookedDate]);
    }
  };

  return (
    <div
      className={`h-full w-full flex flex-col gap-5 justify-center items-center py-10 px-5 md:px-10 lg:px-20 xl:px-40`}
    >
      {/* Date Calendar */}
      <Calendar
        dir="ltr"
        aria-label="Date (Controlled)"
        value={selectedDate}
        onChange={setSelectedDate}
        defaultValue={today(getLocalTimeZone())}
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
              bookedDate.some(
                (booking) =>
                  booking.date === selectedDate && booking.time === timeSlot
              ) || selectedDate.toString() === "2024-06-29"
            }
            className={`btn shadow-sm border text-gray-400 ${
              selectedTimeSlot === timeSlot &&
              selectedDate.toString() !== "2024-06-29" &&
              "border bg-primary text-white"
            } ${
              (bookedDate.some(
                (booking) =>
                  booking.date === selectedDate && booking.time === timeSlot
              ) ||
                selectedDate.toString() === "2024-06-29") &&
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
        {t("confirm")}
      </button>
    </div>
  );
};

export default AppointmentCalendar;
