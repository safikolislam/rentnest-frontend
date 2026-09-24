
import Hero from "@/components/Hero";
import { PropertiesResponse, Property } from "@/lib/types/property";
import Image from "next/image";
import Link from "next/link";
;

async function getFeaturedProperties(): Promise<Property[]> {
  try {
    const res = await fetch(`${process.env.API_URL}/api/properties`, {
      cache: "no-store",
    });

    if (!res.ok) return [];

    const data: PropertiesResponse = await res.json();
    return data?.data || [];
  } catch (error) {
    console.error("Error fetching properties:", error);
    return [];
  }
}

export default async function Home() {
  const properties = await getFeaturedProperties();
  const featuredProperties = properties.slice(0, 3);

  return (
    <>
      <Hero />
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                Featured Properties
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Handpicked places available for rent right now
              </p>
            </div>
            <Link href="/properties" className="text-blue-600 font-semibold hover:underline">
              View All →
            </Link>
          </div>

          {featuredProperties.length === 0 ? (
            <div className="text-center py-10 text-slate-500">
              No properties found. Add a property from Landlord Dashboard!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties.map((property) => {
                const imageUrl =
                  property.images?.length > 0
                    ? property.images[0]
                    : "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80";

                return (
                  <div
                    key={property.id}
                    className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-md transition"
                  >
                    <div className="relative w-full h-48">
                      <Image
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        src={imageUrl}
                        alt={property.title}
                        fill
                        className="object-cover"
                      />
                      <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                        {property.category?.name}
                      </span>
                    </div>
                    <div className="p-5 space-y-3">
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white line-clamp-1">
                          {property.title}
                        </h3>
                        <span className="text-lg font-bold text-blue-600 dark:text-blue-400 whitespace-nowrap">
                          ৳{property.price.toLocaleString()}
                          <span className="text-xs text-slate-500">/mo</span>
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {property.location}
                      </p>

                      <div className="flex flex-wrap gap-1 pt-2 border-t border-slate-100 dark:border-slate-800">
                        {property.amenities?.slice(0, 3).map((amenity) => (
                          <span
                            key={amenity}
                            className="text-xs px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400"
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>

                      <Link
                        href={`/properties/${property.id}`}
                        className="block text-center w-full mt-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium rounded-lg hover:bg-blue-600 hover:text-white transition"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </>
  );
}
