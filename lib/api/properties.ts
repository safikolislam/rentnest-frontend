import { PropertiesResponse, SinglePropertyResponse } from "../types/property";


export async function getProperties(searchParams?: URLSearchParams): Promise<PropertiesResponse> {
  const query = searchParams?.toString();
  const url = `${process.env.API_URL}/api/properties${query ? `?${query}` : ""}`;

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch properties");
  return res.json();
}

export async function getPropertyById(id: string): Promise<SinglePropertyResponse> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/properties/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch property");
  return res.json();
}