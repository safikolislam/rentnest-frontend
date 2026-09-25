import { getAllPropertiesAdmin } from "@/lib/api/admin";
import Image from "next/image";

const AdminPropertiesPage = async () => {
  const { data: properties } = await getAllPropertiesAdmin();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">All Properties</h1>
        <p className="text-muted-foreground">{properties.length} listings across the platform</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {properties.map((property) => (
          <div key={property.id} className="border rounded-xl overflow-hidden">
            <div className="relative w-full h-40">
              <Image
                src={property.images[0]}
                alt={property.title}
                fill
                className="object-cover"
                unoptimized
              />
              <span
                className={`absolute top-2 left-2 text-xs px-2 py-1 rounded-full ${property.status === "AVAILABLE"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-700"
                  }`}
              >
                {property.status}
              </span>
            </div>
            <div className="p-4 space-y-1.5">
              <h3 className="font-semibold line-clamp-1">{property.title}</h3>
              <p className="text-sm text-muted-foreground">{property.location}</p>
              <p className="text-sm font-semibold text-primary">
                ৳{property.price.toLocaleString()}/month
              </p>
              <div className="pt-2 border-t text-xs text-muted-foreground">
                Landlord: <span className="font-medium text-foreground">{property.landlord.name}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {properties.length === 0 && (
        <p className="text-center text-muted-foreground py-20">No properties found.</p>
      )}
    </div>
  );
};

export default AdminPropertiesPage;