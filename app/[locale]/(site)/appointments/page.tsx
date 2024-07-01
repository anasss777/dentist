"use client";

import BreadCrumb from "@/components/Common/BreadCrumb";
import AppointmentCalendar from "@/components/appointments/Calendar";
import { useLocale, useTranslations } from "next-intl";
import React, { useState } from "react";
import AppointmentCard from "./AppointmentCard";
import { getDayOfWeek } from "@/utils/Common";
import { Booking } from "@/types/booking";

const Appointments = () => {
  const t = useTranslations("appointments");
  const locale = useLocale();
  const [bookedDate, setBookedDate] = useState<Booking[]>([]);

  const OnBookedDateChange = (dateBooked: Booking[]) => {
    setBookedDate(dateBooked);
  };

  return (
    <div className={`flex flex-col justify-center items-center gap-10 pt-20`}>
      {/* Heading */}
      <div className={`flex flex-col justify-center items-center`}>
        <p className={`text-primary text-2xl md:text-4xl font-bold`}>
          {t("heading")}
        </p>
        <BreadCrumb pageName={t("heading")} pageLink="/appointments" />
      </div>

      {/* Upcoming appointments */}
      {bookedDate.length > 0 ? (
        <div
          className={`flex flex-wrap justify-center items-center gap-5 bg-third dark:bg-third/5 border-y dark:border-none
            px-5 md:px-10 lg:px-20 xl:px-40 w-full py-10`}
        >
          {bookedDate.map((booking, index) => (
            <AppointmentCard
              key={index}
              selectedDate={booking.date.toString()}
              selectedDay={getDayOfWeek(booking.date, locale)}
              selectedTimeSlot={booking.time}
              visitReason={booking.reason}
            />
          ))}
        </div>
      ) : (
        <div
          className={`flex flex-col h-72 w-full justify-center items-center bg-third dark:bg-third/5 border-y dark:border-none
            text-primary text-base md:text-lg font-bold`}
        >
          <p>{t("noUpcomingAppointments")}</p>
          <p className={`text-secondary`}>{t("bookNow")}</p>
        </div>
      )}

      {/* Make appointment */}
      <AppointmentCalendar OnBookedDateChange={OnBookedDateChange} />
    </div>
  );
};

export default Appointments;
