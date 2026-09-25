import { cookies } from "next/headers";
import { LandlordRequestsResponse } from "../types";


export async function getLandlordRequests(): Promise<LandlordRequestsResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  const res = await fetch(`${process.env.NEXT_API_URL}/api/landlord/requests`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch landlord requests");
  return res.json();
}