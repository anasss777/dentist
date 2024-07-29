import { Profile } from "@/types/profile";

export const searchUsers = (
  searchTerm: string,
  users: Profile[]
): Profile[] => {
  const lowerCaseSearchTerm = searchTerm.toLowerCase();

  return users.filter((user) =>
    user.email.toLowerCase().includes(lowerCaseSearchTerm)
  );
};
