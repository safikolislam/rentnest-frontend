import { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { getNewAccessToken } from "../service/refreshToken";
import { jwtUtils } from "./jwt";

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET as string;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;

export async function resolveAuth(request: NextRequest) {
  const cookieStore = await cookies();

  let accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  let decodedAccess = accessToken
    ? jwtUtils.verifyToken(accessToken, ACCESS_SECRET)
    : null;

  const decodedRefresh = refreshToken
    ? jwtUtils.verifyToken(refreshToken, REFRESH_SECRET)
    : null;

  // access token নষ্ট কিন্তু refresh token ঠিক থাকলে নতুন access token আনো
  if (!decodedAccess?.success && decodedRefresh?.success) {
    const result = await getNewAccessToken();

    if (result?.success) {
      accessToken = result.data.accessToken;

      cookieStore.set("accessToken", accessToken!, {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        sameSite: "lax",
      });

      decodedAccess = jwtUtils.verifyToken(accessToken!, ACCESS_SECRET);
    }
  }

  if (!decodedAccess?.success) {
    cookieStore.delete("accessToken");
  }

  let userRole: string | null = null;

  if (decodedAccess?.success && decodedAccess.data) {
    const data = decodedAccess.data as JwtPayload;
    const rawRole = data?.role || data?.user?.role || "";
    userRole = typeof rawRole === "string" ? rawRole.toUpperCase() : null;
  }

  return { accessToken, userRole };
}