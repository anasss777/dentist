"use client";

import React from "react";
import { today, getLocalTimeZone } from "@internationalized/date";
import { getDayOfWeek, getDaysUntilAppointment } from "@/utils/Common";
import { useLocale, useTranslations } from "next-intl";
import { Appointment } from "@/types/appointment";
import Swal from "sweetalert2";
import { deleteAppointment } from "@/utils/appointment";

type Props = {
  appointment: Appointment;
};

const AppointmentCard = ({ appointment }: Props) => {
  const t = useTranslations("appointments");
  const locale = useLocale();

  const handleDeleteAppointment = () => {
    Swal.fire({
      title: t("sure"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#4682b4",
      cancelButtonText: t("cancel"),
      confirmButtonText: t("yesCancel"),
    }).then((result) => {
      if (result.isConfirmed) {
        deleteAppointment(appointment);
        Swal.fire({
          text: t("appointmentCanceled"),
          icon: "success",
          confirmButtonColor: "#4682b4",
          confirmButtonText: t("ok"),
        });
      }
    });
  };

  return (
    <div
      className={`p-[1.5px] h-fit w-fit rounded-3xl bg-gradient-to-tl from-primary via-transparent to-secondary`}
    >
      <div
        className={`flex flex-col justify-start items-start gap-3 p-6 w-full min-[350px]:w-80 bg-white dark:bg-gray-800 rounded-3xl
          shadow-Card2 pb-3`}
      >
        <p>
          <span className={`text-primary font-bold`}>{t("date")}: </span>
          <span className={`text-secondary`}>
            {appointment.date.toDate().toLocaleDateString()}
          </span>
        </p>
        <p>
          <span className={`text-primary font-bold`}>{t("day")}: </span>
          <span className={`text-secondary`}>
            {getDayOfWeek(appointment?.date?.toDate().getDay(), locale)}
          </span>
        </p>
        <p>
          <span className={`text-primary font-bold`}>
            {t("remainingDays")}:{" "}
          </span>
          <span className={`text-secondary ltr`}>
            {getDaysUntilAppointment(
              appointment.date.toDate().toString(),
              today(getLocalTimeZone()).toString()
            )}
          </span>
        </p>
        <p>
          <span className={`text-primary font-bold`}>{t("time")}: </span>
          <span className={`text-secondary`}>{appointment.time}</span>
        </p>
        <p>
          <span className={`text-primary font-bold`}>{t("visitReason")}: </span>
          <span className={`text-secondary`}>{appointment.reason}</span>
        </p>

        <div className={`flex justify-center items-center mt-3 w-full`}>
          <p
            onClick={handleDeleteAppointment}
            className={`btn bg-[#d332] border border-[#d33] text-[#d33] hover:px-6`}
          >
            {t("cancelAppointment")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
