"use server"

import { cookies } from "next/headers";

export const getMe = async () => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value || null;

    if (!accessToken) {
        return {
            success: false,
            message: "User not logged in!"
        };
    }

    try {
        const res = await fetch(`${process.env.API_URL}/api/auth/me`, {
            method: "GET",
            headers: {
            
                Authorization: `${accessToken}`, 
                "Content-Type": "application/json",
            },
           
            cache: "no-store" 
        });

        if (!res.ok) {
            return {
                success: false,
                message: "Failed to fetch user data"
            };
        }

        const result = await res.json(); 
        return result;

    } catch (error) {
        return {
            success: false,
            message: "Something went wrong!"
        };
    }
}