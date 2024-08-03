import { Timestamp } from "firebase/firestore";

export type Testimonial = {
  id: string;
  createdAt: Timestamp;
  giverAr: string;
  giverEn: string;
  contentAr: string;
  contentEn: string;
};
