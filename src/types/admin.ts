import { Account } from "./account"; // Assuming you have an Account type defined elsewhere
import { ForumComment } from "./forumComment";
import { Pharmacy } from "./pharmacy"; // Assuming you have a Pharmacy type defined elsewhere

export enum AdminRole {
  DOCTOR = "DOCTOR",
  PHARMACIST = "PHARMACIST",
  CASHIER = "CASHIER",
}

export interface Admin {
  id: string;
  createdAt: Date;
  updateAt: Date;
  deleteAt?: Date | null;
  adminRole: AdminRole;
  validToAnswerForum: boolean;
  accountId: string;
  account: Account;
  pharmacyId?: string | null;
  pharmacy?: Pharmacy | null;
  ForumComment: ForumComment[];
}