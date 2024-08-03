import { Timestamp } from "firebase/firestore";

export type Comment = {
  id: string;
  createdAt: Timestamp;
  commentContent: string;
  commenterName: string;
};
