import { getPropertyById } from "@/lib/api/properties";
import Image from "next/image";
import { MapPin, Mail } from "lucide-react";

type PageProps = {
  params: Promise<{ id: string }>;
};

const PropertyDetailsPage = async ({ params }: PageProps) => {
  const { id } = await params;
  const { data: property } = await getPropertyById(id);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
     
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {property.images.map((img, i) => (
          <div key={i} className="relative w-full h-72 rounded-xl overflow-hidden">
            <Image src={img} alt={`${property.title} ${i + 1}`} fill className="object-cover" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
       
        <div className="md:col-span-2 space-y-4">
          <div>
            <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
              {property.category.name}
            </span>
            <h1 className="text-2xl font-bold mt-2">{property.title}</h1>
            <div className="flex items-center gap-1 text-muted-foreground mt-1">
              <MapPin className="w-4 h-4" />
              <span>{property.location}</span>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed">{property.description}</p>

          <div>
            <h3 className="font-semibold mb-2">Amenities</h3>
            <div className="flex flex-wrap gap-2">
              {property.amenities.map((amenity) => (
                <span
                  key={amenity}
                  className="text-sm px-3 py-1 bg-muted rounded-full text-muted-foreground"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold mb-2">Landlord</h3>
            <p className="text-sm">{property.landlord.name}</p>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Mail className="w-4 h-4" />
              <span>{property.landlord.email}</span>
            </div>
          </div>
        </div>

      
        <div className="border rounded-xl p-5 h-fit sticky top-20 space-y-4">
          <p className="text-2xl font-bold">
            ৳{property.price.toLocaleString()}
            <span className="text-sm font-normal text-muted-foreground"> /month</span>
          </p>
          <button className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg font-medium">
            Request to Rent
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsPage;