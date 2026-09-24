import Link from "next/link";
import TenantRequestCard from "@/components/tenant/TenantRequestCard";
import { getMyRentalRequests } from "@/lib/api/rental";
import { RentalRequestWithProperty } from "@/lib/types";


export default async function TenantDashboard() {
  const res = await getMyRentalRequests();
  
  
  const requests: RentalRequestWithProperty[] = Array.isArray(res?.data)
    ? res.data
    : Array.isArray(res)
    ? res
    : [];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Rental Requests</h1>
        <p className="text-muted-foreground">
          {requests.length} {requests.length === 1 ? "request" : "requests"} found
        </p>
      </div>

      {requests.length === 0 ? (
        <div className="text-center py-20 space-y-3">
          <p className="text-muted-foreground">You haven&apos;t made any rental requests yet.</p>
          <Link
            href="/properties"
            className="inline-block text-primary font-medium hover:underline text-sm"
          >
            Browse properties
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((request: RentalRequestWithProperty) => (
            <TenantRequestCard key={request.id} request={request} />
          ))}
        </div>
      )}
    </div>
  );
}