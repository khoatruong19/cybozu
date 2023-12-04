export type SeatType = {
  id: string;
  row: string;
  order: number;
};

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

export type User = {
  id: number;
  email: string;
  full_name: string;
  role: UserRole;
  avatar: string | null;
  created_at: Date;
  updated_at: Date;
};
