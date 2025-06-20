import { User } from "./user"; // Assuming 'User' type is in './user'
import { ForumComment } from "./forumComment"; // Assuming 'ForumComment' type is in './forumComment'

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