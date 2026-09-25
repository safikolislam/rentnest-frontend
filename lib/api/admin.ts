import { cookies } from "next/headers";
import { GetAllUsersResponse, LandlordRequestsResponse, PropertiesResponse } from "../types";


export async function getAllUsers(): Promise<GetAllUsersResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  const res = await fetch(`${process.env.NEXT_API_URL}/api/admin/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}



export async function getAllPropertiesAdmin(): Promise<PropertiesResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  const res = await fetch(`${process.env.NEXT_API_URL}/api/admin/properties`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch properties");
  return res.json();
}



export async function getAllRentalsAdmin(): Promise<LandlordRequestsResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  const res = await fetch(`${process.env.NEXT_API_URL}/api/admin/rentals`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch rentals");
  return res.json();
}