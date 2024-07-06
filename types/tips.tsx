import { Timestamp } from "firebase/firestore";
import { Comment } from "./comment";

export type Tip = {
  tipId: string;
  createdAt: Timestamp;
  tipTitle: string;
  tipImage: string;
  content: string;
  comments: Comment[];
};
