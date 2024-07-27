import { useLocale, useTranslations } from "next-intl";
import React from "react";
import { Profile } from "@/types/profile";
import MemberRow from "./MemberRow";

type Props = {
  members: Profile[];
};

const UsersList = ({ members }: Props) => {
  const locale = useLocale();
  const isArabic = locale === "ar";
  const t = useTranslations("adminPanel");

  return (
    <div className={`w-[250px] md:w-full ${isArabic && "rtl"}`}>
      {/* Posts List */}
      <table className={`w-[250px] md:w-full overflow-x-scroll`}>
        <tbody>
          {/* Heading */}
          <tr
            className={`bg-primary shadow-Card2 py-2 px-5 rounded-full text-white`}
          >
            <th
              className={`p-2 ${
                isArabic ? "rounded-r-full" : "rounded-l-full"
              }`}
            >
              {t("image")}
            </th>
            <th className={`p-2`}>{t("name")}</th>
            <th className={`p-2`}>{t("email")}</th>
            <th className={`p-2`}>{t("phoneNumber")}</th>
            <th className={`p-2`}>{t("gender")}</th>
            <th
              className={`p-2 ${
                isArabic ? "rounded-l-full" : "rounded-r-full"
              }`}
            >
              {t("country")}
            </th>
          </tr>

          {/* Members */}
          {members
            ?.sort((a, b) => a.name.localeCompare(b.name))
            .map((member, index) => (
              <MemberRow key={index} member={member} />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
