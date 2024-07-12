import { Timestamp } from "firebase/firestore";

export type Faq = {
  id: string;
  createdAt: Timestamp;
  question: string;
  answer: string;
};
