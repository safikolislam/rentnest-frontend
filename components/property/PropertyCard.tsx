import { Property } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";


export default function PropertyCard({ property }: { property: Property }) {
  const rawImage = property?.images?.[0];
  const imageUrl =
    typeof rawImage === "string" && rawImage.startsWith("http")
      ? rawImage
      : "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267";

  return (
    <div className="border rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-sm flex flex-col justify-between">
      <div>
        <div className="relative w-full h-48">
          <Image
            src={imageUrl}
            alt={property?.title || "Property image"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
          {property?.category?.name && (
            <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
              {property.category.name}
            </span>
          )}
        </div>
        <div className="p-5 space-y-3">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white line-clamp-1">
              {property?.title}
            </h3>
            <span className="text-lg font-bold text-blue-600 dark:text-blue-400 whitespace-nowrap">
              ৳{property?.price?.toLocaleString() || 0}
              <span className="text-xs text-slate-500">/mo</span>
            </span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {property?.location}
          </p>
          {property?.amenities && property.amenities.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-2 border-t border-slate-100 dark:border-slate-800">
              {property.amenities.slice(0, 3).map((amenity: string) => (
                <span
                  key={amenity}
                  className="text-xs px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400"
                >
                  {amenity}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="p-5 pt-0">
        <Link
          href={`/properties/${property?.id}`}
          className="block text-center w-full py-2 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium rounded-lg hover:bg-blue-600 hover:text-white transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}