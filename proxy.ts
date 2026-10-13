import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { resolveAuth } from "./utils/resolveAuth";
import { AUTH_ROUTES, getRoleRedirect, isWrongDashboard, matchesRoute, PUBLIC_ROUTES } from "./utils/authRoutes";



export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const { accessToken, userRole } = await resolveAuth(request);

  const isPublicRoute = matchesRoute(pathname, PUBLIC_ROUTES);
  const isAuthRoute = matchesRoute(pathname, AUTH_ROUTES);


  if (accessToken && userRole && AUTH_ROUTES.includes(pathname)) {
    return NextResponse.redirect(
      new URL(getRoleRedirect(userRole), request.url)
    );
  }


  if (!accessToken && !isPublicRoute && !isAuthRoute) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

 
  if (isWrongDashboard(pathname, userRole)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|webp|avif|gif|ico)$).*)",
  ],
};