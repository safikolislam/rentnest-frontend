export type LoginState = {
  success: boolean;
  statusCode?: number; 
  message: string;
  data?: {             
    accessToken: string;
    refreshToken: string;
  };
} | null;

export type RegisterState = {
  success: boolean;
  message: string;
  data?: {
    accessToken: string;
    refreshToken: string;
    user: {
      id: string;
      name: string;
      email: string;
      role: "TENANT" | "LANDLORD";
    };
  };
} | null;