
import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { Property } from "@/lib/types/property";


const PropertyCard = ({ property }: { property: Property }) => {
  return (
    <Link
      href={`/properties/${property.id}`}
      className="block rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="relative w-full h-48">
        <Image
          src={property.images[0]}
          alt={property.title}
          fill
          className="object-cover"
        />
        <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
          {property.category.name}
        </span>
      </div>

      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-base line-clamp-1">{property.title}</h3>

        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span className="line-clamp-1">{property.location}</span>
        </div>

        <div className="flex flex-wrap gap-1">
          {property.amenities.slice(0, 3).map((amenity) => (
            <span
              key={amenity}
              className="text-xs px-2 py-0.5 bg-muted rounded-full text-muted-foreground"
            >
              {amenity}
            </span>
          ))}
        </div>

        <p className="text-lg font-bold text-primary pt-1">
          ৳{property.price.toLocaleString()}
          <span className="text-sm font-normal text-muted-foreground"> /month</span>
        </p>
      </div>
    </Link>
  );
};

export default PropertyCard;