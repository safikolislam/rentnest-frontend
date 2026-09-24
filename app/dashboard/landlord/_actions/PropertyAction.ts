
"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { CreatePropertyPayload, DeletePropertyResponse, PropertyMutationResponse, UpdatePropertyPayload } from "@/lib/types";


export const createProperty = async (
  payload: CreatePropertyPayload
): Promise<PropertyMutationResponse> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  try {
    const res = await fetch(`${process.env.API_URL}/api/properties`, {
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

  try {
    const res = await fetch(`${process.env.API_URL}/api/landlord/properties/${propertyId}`, {
      method: "PUT",
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
    console.log("Update property failed:", error);
    return { success: false, statusCode: 500, message: "Something went wrong" };
  }
};

export const deleteProperty = async (propertyId: string): Promise<DeletePropertyResponse> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  try {
    const res = await fetch(`${process.env.API_URL}/api/landlord/properties/${propertyId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result: DeletePropertyResponse = await res.json();
    if (result.success) revalidatePath("/dashboard/landlord/properties");
    return result;
  } catch (error) {
    console.log("Delete property failed:", error);
    return { success: false, statusCode: 500, message: "Something went wrong" };
  }
};