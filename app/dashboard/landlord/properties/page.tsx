
import { getMyProperties } from "@/lib/api/landlordProperties";
import Link from "next/link";
import { Plus } from "lucide-react";
import { getMyProfile } from "@/lib/api/auth";

const LandlordPropertiesPage = async () => {
  const profile = await getMyProfile();
  const landlordId = profile?.data?.profile?.id;

  const { data: properties } = await getMyProperties(landlordId as string);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">My Properties</h1>
          <p className="text-muted-foreground">{properties.length} listings</p>
        </div>
        <Link
          href="/dashboard/landlord/properties/new"
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          Add Property
        </Link>
      </div>

      {properties.length === 0 ? (
        <p className="text-center text-muted-foreground py-20">
          You  have not listed any properties yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {properties.map((property) => (
            <div key={property.id} className="border rounded-xl p-4">
              <h3 className="font-semibold">{property.title}</h3>
              <p className="text-sm text-muted-foreground">{property.location}</p>
              <p className="text-sm font-semibold text-primary mt-1">
                ৳{property.price.toLocaleString()}/month
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LandlordPropertiesPage;