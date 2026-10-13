export const AUTH_ROUTES = ["/auth/login", "/auth/register"];
export const PUBLIC_ROUTES = ["/", "/properties"];

const DASHBOARD_BY_ROLE: Record<string, string> = {
  TENANT: "/dashboard/tenant",
  LANDLORD: "/dashboard/landlord",
  ADMIN: "/dashboard/admin",
};

export const matchesRoute = (pathname: string, routes: string[]) =>
  routes.some((route) => pathname === route || pathname.startsWith(route + "/"));

export const getRoleRedirect = (role: string) =>
  DASHBOARD_BY_ROLE[role] ?? "/";

export const isWrongDashboard = (pathname: string, role: string | null) =>
  Object.entries(DASHBOARD_BY_ROLE).some(
    ([allowedRole, path]) => pathname.startsWith(path) && role !== allowedRole
  );