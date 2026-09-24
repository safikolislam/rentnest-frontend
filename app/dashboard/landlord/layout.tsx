"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LayoutDashboard, Home, ClipboardList, Menu, X } from "lucide-react";

const navItems = [
  { label: "Overview", href: "/dashboard/landlord", icon: LayoutDashboard },
  { label: "Properties", href: "/dashboard/landlord/properties", icon: Home },
  { label: "Requests", href: "/dashboard/landlord/requests", icon: ClipboardList },
];

const LandlordLayout = ({ children }: { children: React.ReactNode }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
     
      <button
        onClick={() => setDrawerOpen(true)}
        className="flex items-center gap-2 mb-6 border rounded-lg px-4 py-2 text-sm font-medium hover:bg-muted transition"
      >
        <Menu className="w-4 h-4" />
        Menu
      </button>

   
      {drawerOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setDrawerOpen(false)}
          />
          <nav className="absolute left-0 top-0 h-full w-64 bg-background p-4 space-y-1 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold">Landlord Menu</span>
              <button onClick={() => setDrawerOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setDrawerOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}

      <div>{children}</div>
    </div>
  );
};

export default LandlordLayout;