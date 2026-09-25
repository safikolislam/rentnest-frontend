export type UserStatus = "ACTIVE" | "BANNED";
export type UserRole = "TENANT" | "LANDLORD" | "ADMIN";

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
};

export type GetAllUsersResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: AdminUser[];
};

export type UpdateUserStatusPayload = {
  status: UserStatus;
};

export type UpdateUserStatusResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data?: AdminUser;
};