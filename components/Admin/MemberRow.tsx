import React from "react";
import { svgAdmin, svgUserDark } from "../svgPaths";
import Image from "next/image";
import { Profile } from "@/types/profile";
import { Switch } from "@nextui-org/react";
import { toggleAdmin } from "@/utils/auth";
import { useStateContext } from "@/context/stateContext";

type Props = {
  member: Profile;
};

const MemberRow = ({ member }: Props) => {
  const { setIsAdmin } = useStateContext();

  const handleToggleAdmin = async (isSelected: boolean) => {
    try {
      await toggleAdmin(member.userId, isSelected);
      setIsAdmin(isSelected);
    } catch (error) {
      console.error("Failed to toggle admin status:", error);
    }
  };

  return (
    <tr className="my-4">
      <td
        className={`text-gray-400 text-center py-4 flex items-center justify-center gap-2`}
      >
        {member.isAdmin && (
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
        {member.phoneNumber === 0 || !member.phoneNumber
          ? "-"
          : member.phoneNumber}
      </td>
      <td className={`text-gray-400 text-center py-3`}>
        {member.gender ? member.gender : "-"}
      </td>
      <td className={`text-gray-400 text-center py-3`}>
        {member.country ? member.country : "-"}
      </td>
      <td className={`py-3`}>
        <Switch
          className="ltr"
          isSelected={member.isAdmin}
          onValueChange={handleToggleAdmin}
          isDisabled={member.email === "example@example.com"}
        ></Switch>
      </td>
    </tr>
  );
};

export default MemberRow;
