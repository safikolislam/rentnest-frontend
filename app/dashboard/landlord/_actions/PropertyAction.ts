"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { CreatePropertyPayload, UpdatePropertyPayload } from "@/lib/types";

const getBackendUrl = () => {
  const baseUrl = process.env.NEXT_API_URL || "https://rentnest-backend-chi.vercel.app";
  return baseUrl.endsWith("/api") ? baseUrl : `${baseUrl}/api`;
};

const getToken = async () => {
  const cookieStore = await cookies();
  return cookieStore.get("accessToken")?.value || cookieStore.get("token")?.value;
};


export const getLandlordProperties = async () => {
  const token = await getToken();
  const baseUrl = getBackendUrl();

  if (!token) {
    return { success: false, statusCode: 401, message: "Unauthorized: No token found", data: [] };
  }

  try {
    const res = await fetch(`${baseUrl}/properties/my-properties`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const result = await res.json();
    return result;
  } catch (error) {
    console.log("Get landlord properties failed:", error);
    return { success: false, statusCode: 500, message: "Something went wrong", data: [] };
  }
};


export const createProperty = async (payload: CreatePropertyPayload) => {
  const token = await getToken();
  const baseUrl = getBackendUrl();

  if (!token) {
    return { success: false, statusCode: 401, message: "Unauthorized" };
  }

  try {
    const res = await fetch(`${baseUrl}/properties`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    if (result.success) {
      revalidatePath("/dashboard/landlord/properties");
    }
    return result;
  } catch (error) {
    console.log("Create property failed:", error);
    return { success: false, statusCode: 500, message: "Something went wrong" };
  }
};


export const updateProperty = async (propertyId: string, payload: UpdatePropertyPayload) => {
  const token = await getToken();
  const baseUrl = getBackendUrl();

  if (!token) {
    return { success: false, statusCode: 401, message: "Unauthorized" };
  }

  try {
    const res = await fetch(`${baseUrl}/properties/${propertyId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    if (result.success) {
      revalidatePath("/dashboard/landlord/properties");
    }
    return result;
  } catch (error) {
    console.log("Update property failed:", error);
    return { success: false, statusCode: 500, message: "Something went wrong" };
  }
};


export const deleteProperty = async (propertyId: string) => {
  const token = await getToken();
  const baseUrl = getBackendUrl();

  if (!token) {
    return { success: false, statusCode: 401, message: "Unauthorized" };
  }

  try {
    const res = await fetch(`${baseUrl}/properties/${propertyId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();
    if (result.success) {
      revalidatePath("/dashboard/landlord/properties");
    }
    return result;
  } catch (error) {
    console.log("Delete property failed:", error);
    return { success: false, statusCode: 500, message: "Something went wrong" };
  }
};