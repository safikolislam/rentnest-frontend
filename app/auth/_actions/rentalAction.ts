"use server";

import { RentalRequestPayload, RentalRequestResponse } from "@/lib/types";
import { cookies } from "next/headers";


export const submitRentalRequest = async (
  payload: RentalRequestPayload
): Promise<RentalRequestResponse> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return {
      success: false,
      statusCode: 401,
      message: "You must be logged in to request a rental",
    };
  }

  try {
    const res = await fetch(`${process.env.API_URL}/api/rentals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const result: RentalRequestResponse = await res.json();
    return result;
  } catch (error) {
    console.log("Rental request failed:", error);
    return {
      success: false,
      statusCode: 500,
      message: "Something went wrong. Please try again.",
    };
  }
};