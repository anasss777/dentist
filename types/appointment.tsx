import { Timestamp } from "firebase/firestore";

export type Appointment = {
  id?: string;
  createdAt: Timestamp;
  name?: string;
  email?: string;
  phoneNumber?: number;
  date: Timestamp;
  time: string;
  reason: string;
};
