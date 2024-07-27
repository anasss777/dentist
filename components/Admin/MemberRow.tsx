import React from "react";
import { svgAdmin, svgUserDark } from "../svgPaths";
import Image from "next/image";
import { Profile } from "@/types/profile";

type Props = {
  member: Profile;
};

const MemberRow = ({ member }: Props) => {
  const isProfileAdmin = member.email === "example@example.com";

  return (
    <tr className="my-4">
      <td
        className={`text-gray-400 text-center py-4 flex items-center justify-center gap-2`}
      >
        {isProfileAdmin && (
          <span
            className={`bg-gray-50 dark:bg-gray-900 rounded-full border border-secondary p-2`}
          >
            {svgAdmin}
          </span>
        )}
        {member.profileImage ? (
          <Image
            src={member.profileImage}
            alt={member.name}
            height={500}
            width={500}
            className={`object-scale-down h-12 w-fit rounded-md shadow-md`}
          />
        ) : (
          <span>{svgUserDark}</span>
        )}
      </td>
      <td className={`text-gray-400 text-center py-3`}>{member.name}</td>
      <td className={`text-gray-400 text-center py-3`}>{member.email}</td>
      <td className={`text-gray-400 text-center py-3`}>
        {member.phoneNumber === 0 ? "-" : member.phoneNumber}
      </td>
      <td className={`text-gray-400 text-center py-3`}>
        {member.gender ? member.gender : "-"}
      </td>
      <td className={`text-gray-400 text-center py-3`}>
        {member.country ? member.country : "-"}
      </td>
    </tr>
  );
};

export default MemberRow;
