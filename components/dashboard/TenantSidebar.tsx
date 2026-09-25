"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { ListOrdered, CreditCard } from "lucide-react";

export default function TenantSidebar() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // URL-er current tab search query read korbe
  const currentTab = searchParams.get("tab") || "requests";

  const handleTabChange = (tab: string) => {
    // Explicitly full path & query parameter set kora hocche
    router.push(`/dashboard/tenant?tab=${tab}`);
  };

  return (
    <aside className="w-full md:w-64 bg-slate-50 border-r min-h-[80vh] p-4 space-y-2 shrink-0">
      <button
        type="button"
        onClick={() => handleTabChange("requests")}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${currentTab === "requests"
            ? "bg-blue-100 text-blue-700 font-semibold"
            : "text-slate-600 hover:bg-slate-100"
          }`}
      >
        <ListOrdered className="w-5 h-5" />
        My Requests
      </button>

      <button
        type="button"
        onClick={() => handleTabChange("payments")}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${currentTab === "payments"
            ? "bg-blue-100 text-blue-700 font-semibold"
            : "text-slate-600 hover:bg-slate-100"
          }`}
      >
        <CreditCard className="w-5 h-5" />
        Payment History
      </button>
    </aside>
  );
}