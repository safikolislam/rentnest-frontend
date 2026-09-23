"use server";

import { cookies } from "next/headers";

export const getNewAccessToken = async () => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value || null;

  if (!refreshToken) {
    return {
      success: false,
      message: "Refresh token not found!",
    };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/refresh-token`, {
      method: "POST",
      headers: {
        Cookie: `refreshToken=${refreshToken}`,
      },
      cache: "no-cache",
    });

    const result = await res.json();
    return result;
  } catch (error) {
    console.log("Refresh token request failed:", error);
    return {
      success: false,
      message: "Failed to refresh token",
    };
  }
};