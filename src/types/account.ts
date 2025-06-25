export interface Account {
  id: string;
  fullName: string;
  email: string;
  password: string | null;
  role: Role;
  profilePict: string | null;
  isVerified: boolean;
  provider: string | null;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN",
}
