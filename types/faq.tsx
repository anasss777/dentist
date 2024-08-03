import { Timestamp } from "firebase/firestore";

export type Faq = {
  id: string;
  createdAt: Timestamp;
  questionAr: string;
  questionEn: string;
  answerAr: string;
  answerEn: string;
};
