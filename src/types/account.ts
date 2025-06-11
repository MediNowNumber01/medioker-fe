export interface Account {
  id: string;
  fullName: string;
  email: string;
  password: string | null;
  role: Role;
  profilePict: string | null;
  isVerified: boolean;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
//   User: User | null; // Relasi ke model User
//   Admin: Admin | null; // Relasi ke model Admin
//   SuperAdmin: SuperAdmin | null; // Relasi ke model SuperAdmin
}

export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN",
}