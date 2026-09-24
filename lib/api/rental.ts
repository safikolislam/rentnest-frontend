import { cookies } from "next/headers";
import { MyRentalRequestsResponse } from "../types";


export async function getMyRentalRequests(): Promise<MyRentalRequestsResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  const res = await fetch(`${process.env.API_URL}/api/rentals`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch rental requests");
  return res.json();
}