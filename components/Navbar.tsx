
"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { logout } from "@/service/logout";
import {
  LayoutDashboard,
  LogOut,
  Menu,
  User,
  X,
  Home,
} from "lucide-react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { MyProfileResponse } from "@/lib/types";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/properties" },
];

type NavbarProps = {
  user: MyProfileResponse | null;
};

export function Navbar({ user }: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

 
  const profileData = user?.data?.profile;
  const role = profileData?.role;

  const dashboardPath =
    role === "TENANT"
      ? "/dashboard/tenant"
      : role === "LANDLORD"
      ? "/dashboard/landlord"
      : "/dashboard/admin";

  const handleLogout = async () => {
    await logout();
    toast.success("User Logged Out Successfully!");
    router.push("/auth/login");
  };

  return (
    <nav className="border-b border-border bg-white dark:bg-slate-950 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

        
          <Link href="/" className="shrink-0 flex items-center gap-2">
            <Home className="w-6 h-6 text-primary" />
            <span className="text-2xl font-bold text-primary">
              RentNest
            </span>
          </Link>

        
          <div className="hidden md:absolute md:left-1/2 md:transform md:-translate-x-1/2 md:flex md:items-center md:gap-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive
                      ? "text-primary"
                      : "text-foreground hover:text-primary"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

       
          <div className="flex items-center gap-3">
            {user?.success && profileData ? (
              <DropdownMenu>

       
                <DropdownMenuTrigger className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer">
                  <User className="w-4 h-4 text-primary" />
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium">
                          {profileData.name || "User"}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          {profileData.email || ""}
                        </p>

                        {role && (
                          <span className="inline-block mt-1 text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full capitalize w-fit">
                            {role.toLowerCase()}
                          </span>
                        )}
                      </div>
                    </DropdownMenuLabel>
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator />

                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      onClick={() => router.push(dashboardPath)}
                      className="cursor-pointer flex items-center"
                    >
                      <LayoutDashboard className="w-4 h-4 mr-2" />
                      <span>Dashboard</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/20"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link href="/auth/login">
                  <Button variant="ghost" className="cursor-pointer">
                    Login
                  </Button>
                </Link>

                <Link href="/auth/register">
                  <Button className="cursor-pointer">
                    Register
                  </Button>
                </Link>
              </div>
            )}

       
            <button
              className="md:hidden text-foreground p-1 rounded-md"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

     
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t border-border pt-3">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block py-2 font-medium transition-colors ${
                    isActive
                      ? "text-primary"
                      : "text-foreground hover:text-primary"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}

            <div className="pt-2 flex flex-col gap-2">
              {user?.success && profileData ? (
                <>
                  <Link
                    href={dashboardPath}
                    onClick={() => setIsOpen(false)}
                    className="w-full text-center py-2 text-foreground font-medium border border-border rounded-lg"
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={() => {
                      setIsOpen(false);
                      handleLogout();
                    }}
                    className="w-full text-center py-2 bg-red-600 text-white font-semibold rounded-lg"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    onClick={() => setIsOpen(false)}
                    className="w-full text-center py-2 text-foreground font-medium border border-border rounded-lg"
                  >
                    Login
                  </Link>

                  <Link
                    href="/auth/register"
                    onClick={() => setIsOpen(false)}
                    className="w-full text-center py-2 bg-primary text-primary-foreground font-semibold rounded-lg"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

