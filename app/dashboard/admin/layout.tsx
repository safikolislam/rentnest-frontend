// app/dashboard/admin/layout.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LayoutDashboard, Users, Home, ClipboardList, Menu, X } from "lucide-react";

const navItems = [
  { label: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
  { label: "Users", href: "/dashboard/admin/users", icon: Users },
  { label: "Properties", href: "/dashboard/admin/properties", icon: Home },
  { label: "Rentals", href: "/dashboard/admin/rentals", icon: ClipboardList },
];

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen flex-col sm:flex-row">
      {/* Mobile menu toggle */}
      <button
        onClick={() => setOpen(true)}
        className="sm:hidden m-4 flex items-center gap-2 border rounded-lg px-3 py-2 text-sm"
      >
        <Menu className="w-4 h-4" /> Menu
      </button>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 sm:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar: drawer on mobile, static on desktop */}
      <aside
        className={`fixed sm:static top-0 left-0 h-full sm:h-auto w-64 bg-white border-r z-50
          transform transition-transform duration-200
          ${open ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0`}
      >
        <div className="flex items-center justify-between p-4 sm:hidden">
          <span className="font-semibold">Admin Menu</span>
          <button onClick={() => setOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium ${isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-gray-100"
                  }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <main className="flex-1">{children}</main>
    </div>
  );
};

export default AdminLayout;