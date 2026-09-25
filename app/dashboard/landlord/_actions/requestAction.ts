"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { UpdateRequestStatusResponse } from "@/lib/types";


export const updateRequestStatus = async (
  requestId: string,
  status: "APPROVED" | "REJECTED"
): Promise<UpdateRequestStatusResponse> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return { success: false, statusCode: 401, message: "Not authorized" };
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_API_URL}/api/landlord/requests/${requestId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      }
    );

    const result: UpdateRequestStatusResponse = await res.json();

    if (result.success) {
      revalidatePath("/dashboard/landlord/requests");
    }

    return result;
  } catch (error) {
    console.log("Update request status failed:", error);
    return { success: false, statusCode: 500, message: "Something went wrong" };
  }
};