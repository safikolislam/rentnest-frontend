"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { UpdateUserStatusResponse } from "@/lib/types";


export const updateUserStatus = async (
  userId: string,
  status: "ACTIVE" | "BANNED"
): Promise<UpdateUserStatusResponse> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return { success: false, statusCode: 401, message: "Not authorized" };
  }

  try {
    const res = await fetch(`${process.env.API_URL}/api/admin/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    const result: UpdateUserStatusResponse = await res.json();

    if (result.success) {
      revalidatePath("/dashboard/admin/users");
    }

    return result;
  } catch (error) {
    console.log("Update user status failed:", error);
    return { success: false, statusCode: 500, message: "Something went wrong" };
  }
};