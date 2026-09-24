
import StatusBadge from "@/components/rental/StatusBadge";
import { getMyRentalRequests } from "@/lib/api/rental";
import Image from "next/image";
import Link from "next/link";

const TenantDashboard = async () => {
  const { data: requests } = await getMyRentalRequests();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Rental Requests</h1>
        <p className="text-muted-foreground">
          {requests.length} request{requests.length !== 1 && "s"} found
        </p>
      </div>

      {requests.length === 0 ? (
        <div className="text-center py-20 space-y-3">
          <p className="text-muted-foreground">You haven`t made any rental requests yet.</p>
          <Link href="/properties" className="text-primary font-medium hover:underline">
            Browse properties
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((request) => (
            <div
              key={request.id}
              className="border rounded-xl p-4 flex flex-col sm:flex-row gap-4"
            >
              <div className="relative w-full sm:w-40 h-32 rounded-lg overflow-hidden shrink-0">
                <Image
                  src={request.property.images[0]}
                  alt={request.property.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 space-y-1.5">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="font-semibold">{request.property.title}</h3>
                  <StatusBadge status={request.status} />
                </div>
                <p className="text-sm text-muted-foreground">{request.property.location}</p>
                <p className="text-sm">
                  Rent period: <span className="font-medium">{request.rentPeriod} months</span>
                </p>
                <p className="text-sm font-semibold text-primary">
                  ৳{request.property.price.toLocaleString()}/month
                </p>

                {request.status === "APPROVED" && (
                  <Link
                    href={`/dashboard/tenant/requests/${request.id}/pay`}
                    className="inline-block mt-2 bg-primary text-primary-foreground text-sm px-4 py-2 rounded-lg font-medium"
                  >
                    Pay Now
                  </Link>
                )}

                {request.status === "ACTIVE" && (
                  <button className="inline-block mt-2 border text-sm px-4 py-2 rounded-lg font-medium">
                    Leave Review
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TenantDashboard;