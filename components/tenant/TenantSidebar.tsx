"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ClipboardList, CreditCard } from "lucide-react";

const links = [
  { href: "/dashboard/tenant", label: "My Requests", icon: ClipboardList },
  { href: "/dashboard/tenant/payments", label: "Payment History", icon: CreditCard },
];

export default function TenantSidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="sm:hidden m-4 flex items-center gap-2 border rounded-lg px-3 py-2 text-sm"
      >
        <Menu className="w-4 h-4" /> Menu
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 sm:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed sm:static top-0 left-0 h-full sm:h-auto w-64 bg-white border-r z-50
          transform transition-transform duration-200
          ${open ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0`}
      >
        <div className="flex items-center justify-between p-4 sm:hidden">
          <span className="font-semibold">Menu</span>
          <button onClick={() => setOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium ${
                pathname === href
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-gray-100"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}