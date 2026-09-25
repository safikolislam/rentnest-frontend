import { getAllRentalsAdmin } from "@/lib/api/admin";
import StatusBadge from "@/components/rental/StatusBadge";

const AdminRentalsPage = async () => {
  const { data: rentals } = await getAllRentalsAdmin();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">All Rental Requests</h1>
        <p className="text-muted-foreground">{rentals.length} requests across the platform</p>
      </div>

      <div className="space-y-4">
        {rentals.map((rental) => (
          <div key={rental.id} className="border rounded-xl p-4 space-y-2">
            <div className="flex justify-between items-start gap-2">
              <div>
                <h3 className="font-semibold">
                  {rental.property?.title || "Property"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Tenant: {rental.tenant.name} ({rental.tenant.email})
                </p>
              </div>
              <StatusBadge status={rental.status} />
            </div>
            <p className="text-sm">
              Rent period: <span className="font-medium">{rental.rentPeriod} months</span>
            </p>
          </div>
        ))}
      </div>

      {rentals.length === 0 && (
        <p className="text-center text-muted-foreground py-20">No rental requests found.</p>
      )}
    </div>
  );
};

export default AdminRentalsPage;