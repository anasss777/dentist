import { Timestamp } from "firebase/firestore";
import { Comment } from "./comment";

export type Tip = {
  tipId: string;
  createdAt: Timestamp;
  tipTitleAr: string;
  tipTitleEn: string;
  tipImage: string;
  contentAr: string;
  contentEn: string;
  comments: Comment[];
};
