"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Home, ClipboardList, Menu, X } from "lucide-react";

const navItems = [
  { label: "Overview", href: "/dashboard/landlord", icon: LayoutDashboard },
  { label: "Properties", href: "/dashboard/landlord/properties", icon: Home },
  { label: "Requests", href: "/dashboard/landlord/requests", icon: ClipboardList },
];

export default function LandlordLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col sm:flex-row">
    
      <div className="sm:hidden p-4 border-b">
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 border rounded-lg px-3 py-2 text-sm text-slate-700"
        >
          <Menu className="w-4 h-4" /> Menu
        </button>
      </div>

    
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 sm:hidden"
          onClick={() => setOpen(false)}
        />
      )}

    
      <aside
        className={`fixed sm:static top-0 left-0 h-full sm:min-h-full w-60 bg-white border-r border-slate-200 z-50 shrink-0
          transform transition-transform duration-200 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0`}
      >
   
        <div className="flex items-center justify-between p-4 sm:hidden border-b">
          <span className="font-semibold text-slate-700">Menu</span>
          <button onClick={() => setOpen(false)}>
            <X className="w-5 h-5 text-slate-500" />
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
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-blue-600" : "text-slate-500"}`} />
                {label}
              </Link>
            );
          })}
        </nav>
      </aside>

     
      <main className="flex-1 p-6 sm:p-8 min-w-0 bg-slate-50/50">
        <div className="max-w-5xl mx-auto">{children}</div>
      </main>
    </div>
  );
}