import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { svgDelete, svgEdit } from "../svgPaths";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { Appointment } from "@/types/appointment";
import { deleteAppointment } from "@/utils/appointment";
import { getDayOfWeek, getDaysUntilAppointment } from "@/utils/Common";
import { today, getLocalTimeZone } from "@internationalized/date";
const locales = ["ar", "en"];
const { Link } = createSharedPathnamesNavigation({ locales });

type Props = {
  appointment: Appointment;
};

const AppointmentsRow = ({ appointment }: Props) => {
  const locale = useLocale();
  const t = useTranslations("appointments");

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
        toast.success(t("appointmentCanceled"));
      }
    });
  };

  return (
    <tr className="my-4">
      <td className={`text-gray-400 text-center py-3`}>{appointment.name}</td>
      <td className={`text-gray-400 text-center py-3`}>
        {appointment.date.toDate().toLocaleDateString()}
      </td>
      <td className={`text-gray-400 text-center py-3`}>
        {getDayOfWeek(appointment?.date?.toDate().getDay(), locale)}
      </td>
      <td className={`text-gray-400 text-center py-3`}>
        {getDaysUntilAppointment(
          appointment.date.toDate().toString(),
          today(getLocalTimeZone()).toString()
        )}
      </td>
      <td className={`text-gray-400 text-center py-3`}>{appointment.time}</td>
      <td className={`text-gray-400 text-center py-3 w-1/5`}>
        {appointment.reason}
      </td>
      <td
        className={`flex flex-row justify-center items-center gap-1 text-gray-400 py-[35px]`}
      >
        <button
          onClick={handleDeleteAppointment}
          className={`bg-primary/20 border border-primary p-1 rounded-md`}
        >
          {svgDelete}
        </button>
      </td>
    </tr>
  );
};

export default AppointmentsRow;
