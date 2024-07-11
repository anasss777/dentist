import { Comment } from "./comment";
import { Tip } from "./tips";

export type Report = {
  id: string;
  comment: Comment;
  tip: Tip;
  reportContent: string;
};
