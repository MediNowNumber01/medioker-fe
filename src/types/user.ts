import { Account } from "./account"; 
import { UserAddress } from "./userAddress";

export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN",
}

export interface User {
  id: string;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  accountId: string;
  account: Account;
  user_addresses: UserAddress[];
}