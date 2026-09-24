import Link from "next/link";
import { LayoutDashboard, Home, ClipboardList } from "lucide-react";

const navItems = [
  { label: "Overview", href: "/dashboard/landlord", icon: LayoutDashboard },
  { label: "Properties", href: "/dashboard/landlord/properties", icon: Home },
  { label: "Requests", href: "/dashboard/landlord/requests", icon: ClipboardList },
];

const LandlordLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      
        <aside className="md:col-span-1">
          <nav className="border rounded-xl p-3 space-y-1 sticky top-20">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition"
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

      
        <div className="md:col-span-3">{children}</div>
      </div>
    </div>
  );
};

export default LandlordLayout;