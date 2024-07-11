import { Timestamp } from "firebase/firestore";
import { Report } from "./report";

export type Comment = {
  id: string;
  createdAt: Timestamp;
  commentContent: string;
  commenterName: string;
  reports?: Report[];
};
