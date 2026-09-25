"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { CreatePropertyPayload, DeletePropertyResponse, PropertyMutationResponse, UpdatePropertyPayload } from "@/lib/types";


const getBackendUrl = () => {
  return "https://rentnest-backend-chi.vercel.app/api";
};

export const createProperty = async (
  payload: CreatePropertyPayload
): Promise<PropertyMutationResponse> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  const baseUrl = getBackendUrl();

  try {
    const res = await fetch(`${baseUrl}/properties`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const result: PropertyMutationResponse = await res.json();
    if (result.success) revalidatePath("/dashboard/landlord/properties");
    return result;
  } catch (error) {
    console.log("Create property failed:", error);
    return { success: false, statusCode: 500, message: "Something went wrong" };
  }
};

export const updateProperty = async (
  propertyId: string,
  payload: UpdatePropertyPayload
): Promise<PropertyMutationResponse> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  const baseUrl = getBackendUrl();

  try {
    
    let url = `${baseUrl}/landlord/properties/${propertyId}`;
    let res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

  
    if (res.status === 404) {
      url = `${baseUrl}/properties/${propertyId}`;
      res = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
    }

    const result: PropertyMutationResponse = await res.json();
    if (result.success) revalidatePath("/dashboard/landlord/properties");
    return result;
  } catch (error) {
    console.log("Update property failed:", error);
    return { success: false, statusCode: 500, message: "Something went wrong" };
  }
};

export const deleteProperty = async (propertyId: string): Promise<DeletePropertyResponse> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  const baseUrl = getBackendUrl();

  try {
    let url = `${baseUrl}/landlord/properties/${propertyId}`;
    let res = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 404) {
      url = `${baseUrl}/properties/${propertyId}`;
      res = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    const result: DeletePropertyResponse = await res.json();
    if (result.success) revalidatePath("/dashboard/landlord/properties");
    return result;
  } catch (error) {
    console.log("Delete property failed:", error);
    return { success: false, statusCode: 500, message: "Something went wrong" };
  }
};