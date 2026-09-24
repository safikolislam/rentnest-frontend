import PropertyCard from "@/components/property/PropertyCard";
import PropertyFilters from "@/components/property/propertyFilter";

import { getCategories, getProperties } from "@/lib/api/properties";

type PageProps = {
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

const PropertiesPage = async ({ searchParams }: PageProps) => {
  const params = await searchParams;


  const query = new URLSearchParams();
  if (params.location) query.set("location", params.location);
  if (params.minPrice) query.set("minPrice", params.minPrice);
  if (params.maxPrice) query.set("maxPrice", params.maxPrice);
  if (params.categoryId) query.set("categoryId", params.categoryId);

  const [propertiesRes, categoriesRes] = await Promise.all([
    getProperties(query),
    getCategories(),
  ]);

  const properties = propertiesRes.data;
  const categories = categoriesRes.data;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Browse Properties</h1>
        <p className="text-muted-foreground">
          {properties.length} properties found
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
   
        <div className="md:col-span-1">
          <PropertyFilters categories={categories} />
        </div>

     
        <div className="md:col-span-3">
          {properties.length === 0 ? (
            <p className="text-center text-muted-foreground py-20">
              No properties match your filters.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertiesPage;