import { Account } from "./account"; // Assuming 'Account' type is in './account'
// import { UserAddresses } from "./userAddresses"; // Assuming 'UserAddresses' type is in './userAddresses'
// import { Forum } from "./forum"; // Assuming 'Forum' type is in './forum'
import { UserAddress } from "./userAddress";
// import { Cart } from "./cart"; // Assuming 'Cart' type is in './cart'

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
  
//   Forum: Forum[];
//   Order?: Order | null;
//   Cart: Cart[];
}