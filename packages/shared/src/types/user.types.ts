export type UserRole = "USER" | "ADMIN";

export type CurrentUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};
