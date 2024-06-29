"use client";

import React, { useState } from "react";
import { Calendar } from "@nextui-org/react";
import type { DateValue } from "@react-types/calendar";
import { today, getLocalTimeZone } from "@internationalized/date";
import { timeSlots } from "./timeSlot";
import { useTranslations } from "next-intl";
import { Booking } from "@/types/booking";

type Props = {
  OnBookedDateChange: (dateBooked: Booking[]) => void;
};

const AppointmentCalendar = ({ OnBookedDateChange }: Props) => {
  const t = useTranslations("appointments");
  const [selectedDate, setSelectedDate] = useState<DateValue>(
    today(getLocalTimeZone())
  );
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [visitReason, setVisitReason] = useState("");
  const [bookedDate, setBookedDate] = useState<Booking[]>([]);

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
      className={`h-full w-full flex flex-col gap-5 justify-center items-center py-10`}
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
      <textarea
        aria-label="visitReason"
        value={visitReason}
        placeholder={t("visitReason") + "..."}
        onChange={(e) => setVisitReason(e.target.value)}
        className={`border border-primary/70 px-2 py-1 rounded-md w-full md:w-[70%] lg:w-[50%] h-40 resize-none focus:outline-none focus:outline-primary focus:border-none placeholder:text-[#ccc]`}
      />

      <button
        className={`btn bg-primary mt-4 hover:px-6 ${
          (selectedTimeSlot.length === 0 || visitReason.length === 0) &&
          "bg-primary/30 hover:px-4 hover:bg-primary/30 cursor-not-allowed"
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
