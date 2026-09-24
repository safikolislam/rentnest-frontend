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
  const res = await fetch(`${process.env.API_URL}/api/properties/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch property");
  return res.json();
}


export async function getCategories() {
  const res = await fetch(`${process.env.API_URL}/api/categories`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}