import { Timestamp } from "firebase/firestore";

export type Profile = {
  userId: string;
  createdAt: Timestamp;
  name: string;
  profileImage: string;
  email: string;
  phoneNumber: number;
  gender: string;
  country: string;
  isAdmin: boolean;
};
