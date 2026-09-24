"use server";

import { cookies } from "next/headers";

export const createPayment = async ({ requestId, amount }: { requestId: string; amount: number }) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  try {
    const res = await fetch(`${process.env.API_URL}/api/payments/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ requestId, amount }),
    });
    return await res.json();
  } catch (error) {
    console.log("Payment creation failed:", error);
    return { success: false, statusCode: 500, message: "Something went wrong" };
  }
};

export const getMyPayments = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  try {
    const res = await fetch(`${process.env.API_URL}/api/payments`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    return await res.json();
  } catch (error) {
    console.log("Fetch payments failed:", error);
    return { success: false, data: [] };
  }
};