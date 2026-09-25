"use server";

import { cookies, headers } from "next/headers";
import { IPaymentHistoryResponse } from "../types";

const BASE_URL = process.env.NEXT_API_URL || "https://rentnest-backend-chi.vercel.app";

export const createPayment = async ({
  rentalRequestId,
}: {
  rentalRequestId: string;
}) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

 
  const headersList = await headers();
  const host = headersList.get("host") || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const frontendUrl = `${protocol}://${host}/dashboard/tenant`;

  try {
    const res = await fetch(`${BASE_URL}/api/payments/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}), 
      },
     
      body: JSON.stringify({
        rentalRequestId,
        successUrl: frontendUrl,
        failUrl: frontendUrl,
      }),
    });

    return await res.json();
  } catch (error) {
    console.error("Payment creation failed:", error);
    return {
      success: false,
      statusCode: 500,
      message: "Something went wrong during payment creation",
    };
  }
};

export const getMyPayments = async (): Promise<IPaymentHistoryResponse> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  try {
    const res = await fetch(`${BASE_URL}/api/payments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return { success: false, data: [] };
    }

    return await res.json();
  } catch (error) {
    return { success: false, data: [] };
  }
};