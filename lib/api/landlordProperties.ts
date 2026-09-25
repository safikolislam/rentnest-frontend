import { PropertiesResponse } from "../types";


export async function getMyProperties(landlordId: string): Promise<PropertiesResponse> {
  const res = await fetch(`${process.env.NEXT_API_URL}/api/properties`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch properties");
  const result: PropertiesResponse = await res.json();

  return {
    ...result,
    data: result.data.filter((p) => p.landlordId === landlordId),
  };
}