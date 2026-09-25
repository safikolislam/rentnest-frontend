import { cookies } from "next/headers";
import { PropertiesResponse } from "../types";

export async function getMyProperties(landlordId: string): Promise<PropertiesResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  const baseUrl = process.env.NEXT_API_URL || process.env.API_URL || "https://rentnest-backend-chi.vercel.app/api";
  const endpoint = baseUrl.endsWith("/api") ? `${baseUrl}/properties` : `${baseUrl}/api/properties`;

  try {
    const res = await fetch(endpoint, {
      method: "GET",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch properties: ${res.statusText}`);
    }

    const result: PropertiesResponse = await res.json();
    const allProperties = result.data || [];

    // যদি landlordId না পাওয়া যায়, তবে সব প্রপার্টি রিটার্ন করবে অথবা আইডি মিললে ফিল্টার করবে
    const filteredData = !landlordId
      ? allProperties
      : allProperties.filter((p: any) => {
        const propertyLandlordId = p.landlordId || p.landlord?.id || p.landlord;
        return propertyLandlordId === landlordId;
      });

    return {
      ...result,
      data: filteredData,
    };
  } catch (error) {
    console.error("Error in getMyProperties:", error);
    return { success: false, statusCode: 500, message: "Failed to fetch properties", data: [] } as any;
  }
}