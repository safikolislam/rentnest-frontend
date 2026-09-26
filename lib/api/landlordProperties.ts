import { cookies } from "next/headers";
import { PropertiesResponse } from "../types";

export async function getMyProperties(): Promise<PropertiesResponse> {
  try {
    const cookieStore = await cookies();

   
    const token = cookieStore.get("accessToken")?.value || cookieStore.get("token")?.value;



    if (!token) {
      return {
        success: false,
        statusCode: 401,
        message: "No token found, please login again",
        data: []
      } as unknown as PropertiesResponse;
    }

    const baseUrl = process.env.NEXT_API_URL || process.env.API_URL || "https://rentnest-backend-chi.vercel.app/api";
    const endpoint = baseUrl.endsWith("/api")
      ? `${baseUrl}/properties/my-properties`
      : `${baseUrl}/api/properties/my-properties`;

    const res = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
   
      
      return {
        success: false,
        statusCode: res.status,
        message: "Failed to fetch properties",
        data: []
      } as unknown as PropertiesResponse;
    }

    const result: PropertiesResponse = await res.json();
    return result;
  } catch (error) {
    console.error("Error in getMyProperties catch block:", error);
    return {
      success: false,
      statusCode: 500,
      message: "Something went wrong",
      data: []
    } as unknown as PropertiesResponse;
  }
}