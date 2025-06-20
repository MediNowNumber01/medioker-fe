import { Admin } from "./admin"; // Assuming 'Admin' type is in './admin'
import { Forum } from "./forum";

export interface ForumComment {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  forumId: string;
  forum: Forum;
  adminId: string;
  admin: Admin;
}