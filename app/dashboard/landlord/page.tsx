
import Link from "next/link";
import { Home, ClipboardList } from "lucide-react";
import { getLandlordRequests } from "@/lib/api/landlordRequest";

const LandlordPage = async () => {
  const { data: requests } = await getLandlordRequests();

  const pendingCount = requests.filter((r) => r.status === "PENDING").length;
  const activeCount = requests.filter((r) => r.status === "ACTIVE").length;
  const totalEarnings = requests
    .filter((r) => r.status === "ACTIVE" || r.status === "COMPLETED")
    .reduce((sum, r) => sum + (r.property?.price || 0) * r.rentPeriod, 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Overview</h1>
        <p className="text-muted-foreground">Your properties and requests at a glance</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="border rounded-xl p-5 space-y-1">
          <p className="text-sm text-muted-foreground">Pending requests</p>
          <p className="text-2xl font-bold">{pendingCount}</p>
        </div>
        <div className="border rounded-xl p-5 space-y-1">
          <p className="text-sm text-muted-foreground">Active rentals</p>
          <p className="text-2xl font-bold">{activeCount}</p>
        </div>
        <div className="border rounded-xl p-5 space-y-1">
          <p className="text-sm text-muted-foreground">Total earnings</p>
          <p className="text-2xl font-bold">৳{totalEarnings.toLocaleString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/dashboard/landlord/properties"
          className="border rounded-xl p-5 flex items-center gap-4 hover:shadow-md transition"
        >
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <Home className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">Manage Properties</h3>
            <p className="text-sm text-muted-foreground">Add, edit, or remove listings</p>
          </div>
        </Link>

        <Link
          href="/dashboard/landlord/requests"
          className="border rounded-xl p-5 flex items-center gap-4 hover:shadow-md transition"
        >
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <ClipboardList className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">Rental Requests</h3>
            <p className="text-sm text-muted-foreground">
              {pendingCount} pending request{pendingCount !== 1 && "s"}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default LandlordPage;