import { Timestamp } from "firebase/firestore";

export type BeforeAndAfter = {
  id: string;
  createdAt: Timestamp;
  beforeImage: string;
  afterImage: string;
};
