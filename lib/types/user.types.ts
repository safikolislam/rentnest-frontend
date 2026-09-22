// types/user.types.ts

export type Role = "TENANT" | "LANDLORD" | "ADMIN";

export type UserProfile = {
  id: string;
  profilePhoto: string;
  bio: string | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  activeStatus: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
  profile: UserProfile;
};


export type MyProfileResponse = {
  success: boolean;
  message: string;
  data: {
    profile: User;
  } | null;
};