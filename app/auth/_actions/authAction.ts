"use server";

import { LoginState, RegisterState } from "@/lib/types";
import { cookies } from "next/headers";

export const loginAction = async (prevState: LoginState, formData: FormData) => {
  const email = formData.get("email");
  const password = formData.get("password");

  const payload = { email, password };

  try {
    const res = await fetch(`${process.env.API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result: LoginState = await res.json();

    if (result?.success && result.data) {
      const cookieStore = await cookies();

      if (result.data.accessToken) {
        cookieStore.set("accessToken", result.data.accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 60 * 60 * 24,
          sameSite: "lax",
          path: "/",
        });
      }

      if (result.data.refreshToken) {
        cookieStore.set("refreshToken", result.data.refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 60 * 60 * 24 * 7,
          sameSite: "lax",
          path: "/",
        });
      }
    }

    return result;
  } catch (error) {
    return {
      success: false,
      message: "Server connection failed!",
    };
  }
};

export const registerAction = async (prevState: RegisterState, formData: FormData) => {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const roleInput = formData.get("role") as string;

  const role = roleInput ? roleInput.toUpperCase() : "TENANT";

  const registerPayload = { name, email, password, role };

  try {
   
    const res = await fetch(`${process.env.API_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerPayload),
    });

    const result: RegisterState = await res.json();

  
    if (result?.success) {
      const loginPayload = { email, password };

      const loginRes = await fetch(`${process.env.API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginPayload),
      });

      const loginResult = await loginRes.json();

    
      if (loginResult?.success && loginResult?.data) {
        const cookieStore = await cookies();

        if (loginResult.data.accessToken) {
          cookieStore.set("accessToken", loginResult.data.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24,
            sameSite: "lax",
            path: "/",
          });
        }

        if (loginResult.data.refreshToken) {
          cookieStore.set("refreshToken", loginResult.data.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7,
            sameSite: "lax",
            path: "/",
          });
        }
      }
    }

    return result;
  } catch (error) {
    return {
      success: false,
      message: "Server connection failed!",
    };
  }
};