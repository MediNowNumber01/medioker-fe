import { Account } from "./account"; 
import { ForumComment } from "./forumComment";
import { Pharmacy } from "./pharmacy"; 

export enum AdminRole {
  DOCTOR = "DOCTOR",
  PHARMACIST = "PHARMACIST",
  CASHIER = "CASHIER",
}

export interface Admin {
  id: string;
  createdAt?: Date;
  updateAt?: Date;
  deleteAt?: Date | null;
  adminRole?: AdminRole;
  validToAnswerForum?: boolean;
  accountId?: string;
  account?: Account;
  pharmacyId?: string | null;
  pharmacy?: Pharmacy | null;
  ForumComment?: ForumComment[];
}