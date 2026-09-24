"use server";

import { cookies } from "next/headers";





export async function getMyRentalRequests() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    console.error("No access token found in cookies");
    return { success: false, data: [] };
  }

  try {
    const res = await fetch(`${process.env.API_URL}/api/rentals`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store", 
    });

    if (!res.ok) {
      console.error(`getMyRentalRequests Failed Status: ${res.status}`);
      return { success: false, data: [] };
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching tenant requests:", error);
    return { success: false, data: [] };
  }
}