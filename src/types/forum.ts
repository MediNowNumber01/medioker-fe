import { User } from "./user"; 
import { ForumComment } from "./forumComment"; 

export interface Forum {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  userId: string;
  user: User;
  ForumComment: ForumComment[];
}