import StatusBadge from "@/components/rental/StatusBadge";
import { getMyRentalRequests } from "@/lib/api/rental";
import { RentalRequestWithProperty } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import ReviewButtonWithModal from "@/components/rental/ReviewButtonWithModal";
import PaymentHistoryTable from "@/components/payment/PaymentHistoryTable";

interface TenantDashboardProps {
  searchParams: Promise<{ tab?: string }>;
}

export default async function TenantDashboard({ searchParams }: TenantDashboardProps) {
  const resolvedParams = await searchParams;
  const activeTab = resolvedParams.tab || "requests";

  const { data: requests = [] } = await getMyRentalRequests();

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-6">
      {activeTab === "requests" && (
        <section className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold">My Rental Requests</h1>
            <p className="text-sm text-muted-foreground">
              {requests.length} request{requests.length !== 1 && "s"} found
            </p>
          </div>

          {requests.length === 0 ? (
            <div className="text-center py-16 border rounded-xl bg-gray-50/50 space-y-3">
              <p className="text-muted-foreground">
                You haven&apos;t made any rental requests yet.
              </p>
              <Link
                href="/properties"
                className="text-primary font-medium hover:underline inline-block"
              >
                Browse properties
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {requests.map((request: RentalRequestWithProperty) => (
                <div
                  key={request.id}
                  className="border rounded-xl p-4 flex flex-col sm:flex-row gap-4 bg-white shadow-sm"
                >
                  <div className="relative w-full sm:w-40 h-32 rounded-lg overflow-hidden shrink-0">
                    <Image
                      src={request.property?.images?.[0] || "/placeholder.png"}
                      alt={request.property?.title || "Property"}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>

                  <div className="flex-1 space-y-1.5">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-semibold">{request.property?.title}</h3>
                      <StatusBadge status={request.status} />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {request.property?.location}
                    </p>
                    <p className="text-sm">
                      Rent period:{" "}
                      <span className="font-medium">
                        {request.rentPeriod} months
                      </span>
                    </p>
                    <p className="text-sm font-semibold text-primary">
                      ৳{request.property?.price?.toLocaleString()}/month
                    </p>

                    {request.status === "APPROVED" && (
                      <Link
                        href={`/dashboard/tenant/requests/${request.id}/pay`}
                        className="inline-block mt-2 bg-primary text-primary-foreground text-sm px-4 py-2 rounded-lg font-medium hover:opacity-90 transition"
                      >
                        Pay Now
                      </Link>
                    )}

                    {request.status === "ACTIVE" && (
                      <div className="mt-2">
                        <ReviewButtonWithModal propertyId={request.propertyId} />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {activeTab === "payments" && (
        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold">Payment History</h2>
            <p className="text-sm text-muted-foreground">
              Track and view all your completed transactions
            </p>
          </div>

          <PaymentHistoryTable />
        </section>
      )}
    </div>
  );
}