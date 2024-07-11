import { Timestamp } from "firebase/firestore";

export type Testimonial = {
  id: string;
  createdAt: Timestamp;
  giver: string;
  content: string;
};
