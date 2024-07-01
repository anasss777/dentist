import React from "react";
import { today, getLocalTimeZone } from "@internationalized/date";
import { getDaysUntilAppointment } from "@/utils/Common";
import { useTranslations } from "next-intl";

type Props = {
  selectedDate: string;
  selectedDay: string;
  selectedTimeSlot: string;
  visitReason: string;
};

const AppointmentCard = ({
  selectedDate,
  selectedDay,
  selectedTimeSlot,
  visitReason,
}: Props) => {
  const t = useTranslations("appointments");

  return (
    <div
      className={`p-[1.5px] h-fit w-fit rounded-3xl bg-gradient-to-tl from-primary via-transparent to-secondary`}
    >
      <div
        className={`flex flex-col justify-start items-start gap-3 p-6 w-64 bg-white dark:bg-gray-800 rounded-3xl shadow-Card2`}
      >
        <p>
          <span className={`text-primary font-bold`}>{t("date")}: </span>
          <span className={`text-secondary`}>{selectedDate}</span>
        </p>
        <p>
          <span className={`text-primary font-bold`}>{t("day")}: </span>
          <span className={`text-secondary`}>{selectedDay}</span>
        </p>
        <p>
          <span className={`text-primary font-bold`}>
            {t("remainingDays")}:{" "}
          </span>
          <span className={`text-secondary`}>
            {getDaysUntilAppointment(
              selectedDate,
              today(getLocalTimeZone()).toString()
            )}
          </span>
        </p>
        <p>
          <span className={`text-primary font-bold`}>{t("time")}: </span>
          <span className={`text-secondary`}>{selectedTimeSlot}</span>
        </p>
        <p>
          <span className={`text-primary font-bold`}>{t("visitReason")}: </span>
          <span className={`text-secondary`}>{visitReason}</span>
        </p>
      </div>
    </div>
  );
};

export default AppointmentCard;
